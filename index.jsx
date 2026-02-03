import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Mic, MicOff, RefreshCw, AlertCircle, Settings, Play, Pause, FileText, Type, MoveVertical, Scaling, Upload, Check, X, Cloud, Loader2 } from 'lucide-react';
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously, onAuthStateChanged, signInWithCustomToken } from "firebase/auth";
import { getFirestore, doc, setDoc, onSnapshot, collection } from "firebase/firestore";

const VoicePrompterApp = () => {
    // --- 상태 관리: 모드 및 설정 ---
    const [mode, setMode] = useState('voice');
    const [showSettings, setShowSettings] = useState(false);
    const [showScriptEditor, setShowScriptEditor] = useState(false);

    // --- 상태 관리: 디자인 옵션 ---
    const [fontSize, setFontSize] = useState(48);
    const [letterSpacing, setLetterSpacing] = useState(0);
    const [isSerif, setIsSerif] = useState(false);
    const [lineHeight, setLineHeight] = useState(1.6);

    // --- 상태 관리: 기능 ---
    const [isListening, setIsListening] = useState(false);
    const [isManualPlaying, setIsManualPlaying] = useState(false);
    const [manualSpeed, setManualSpeed] = useState(3);

    const [activeIndex, setActiveIndex] = useState(0);
    const [errorMsg, setErrorMsg] = useState('');

    // --- 상태 관리: Firebase 및 데이터 ---
    const [user, setUser] = useState(null);
    const [syncStatus, setSyncStatus] = useState('idle'); // 'idle' | 'saving' | 'saved' | 'error'

    // 기본 대본
    const defaultScript = `안녕하세요. 오늘은 음성 인식 기술을 활용한 프롬프터 시스템에 대해 발표하겠습니다.
  
기존의 프롬프터는 정해진 속도로만 스크롤되기 때문에 발표자가 긴장해서 말이 빨라지거나, 잠시 멈추었을 때 싱크가 맞지 않는 문제가 있었습니다.

하지만 지금 보시는 이 시스템은 '음성 인식 모드'와 '수동 스크롤 모드'를 모두 지원하여 상황에 맞게 선택할 수 있습니다.

이제 여러분의 대본과 설정은 클라우드에 자동으로 저장됩니다. 브라우저를 닫았다가 다시 열어도 마지막 작업 상태 그대로 시작할 수 있습니다.

설정 메뉴를 통해 글자의 크기나 자간, 그리고 서체를 자유롭게 변경하여 발표자가 가장 편안하게 읽을 수 있는 환경을 만들어 보세요.

이제 복잡한 조작 없이, 오직 청중과의 소통에만 집중하세요. 감사합니다.`;

    const [scriptText, setScriptText] = useState(defaultScript);
    const [editingText, setEditingText] = useState('');

    // --- Refs ---
    const recognitionRef = useRef(null);
    const activeIndexRef = useRef(0);
    const wordRefs = useRef([]);
    const containerRef = useRef(null);
    const isListeningRef = useRef(false);
    const animationFrameRef = useRef(null);

    // --- Firebase 초기화 및 Auth ---
    useEffect(() => {
        const firebaseConfig = JSON.parse(__firebase_config);
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);

        const initAuth = async () => {
            try {
                if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
                    await signInWithCustomToken(auth, __initial_auth_token);
                } else {
                    await signInAnonymously(auth);
                }
            } catch (error) {
                console.error("Auth failed:", error);
                setErrorMsg("로그인에 실패했습니다. 데이터가 저장되지 않을 수 있습니다.");
            }
        };

        initAuth();
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    // --- Firestore 데이터 불러오기 (Read) ---
    useEffect(() => {
        if (!user) return;

        const db = getFirestore();
        const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

        // 사용자별 개인 데이터 경로 사용
        const docRef = doc(db, 'artifacts', appId, 'users', user.uid, 'data', 'prompter_config');

        const unsubscribe = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                // 데이터가 있으면 상태 업데이트 (로컬 변경 중이 아닐 때만 덮어쓰기 위해 주의 필요하나, 여기선 단순화)
                // *주의: 내가 방금 저장한 것이 다시 내려오는 루프를 방지하기 위해 
                // 실제 앱에서는 타임스탬프나 로컬 플래그를 확인하지만, 
                // 여기서는 간단히 값이 다를 때만 업데이트하거나 초기 로드에만 집중합니다.

                // 여기서는 "초기 로딩"과 "다른 기기에서의 변경"을 수용
                if (data.scriptText && data.scriptText !== scriptText) setScriptText(data.scriptText);
                if (data.fontSize) setFontSize(data.fontSize);
                if (data.letterSpacing) setLetterSpacing(data.letterSpacing);
                if (data.isSerif !== undefined) setIsSerif(data.isSerif);
                if (data.manualSpeed) setManualSpeed(data.manualSpeed);

                setSyncStatus('saved');
            }
        }, (error) => {
            console.error("Data fetch error:", error);
        });

        return () => unsubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]); // user가 변경될 때만 리스너 연결 (scriptText 등을 의존성에 넣으면 루프 발생)

    // --- Firestore 데이터 자동 저장 (Write / Debounce) ---
    useEffect(() => {
        if (!user) return;

        setSyncStatus('saving');
        const timer = setTimeout(async () => {
            try {
                const db = getFirestore();
                const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
                const docRef = doc(db, 'artifacts', appId, 'users', user.uid, 'data', 'prompter_config');

                await setDoc(docRef, {
                    scriptText,
                    fontSize,
                    letterSpacing,
                    isSerif,
                    manualSpeed,
                    updatedAt: new Date().toISOString()
                }, { merge: true });

                setSyncStatus('saved');
            } catch (error) {
                console.error("Save error:", error);
                setSyncStatus('error');
            }
        }, 1500); // 1.5초 동안 변경이 없으면 저장 (Debounce)

        return () => clearTimeout(timer);
    }, [scriptText, fontSize, letterSpacing, isSerif, manualSpeed, user]);


    // --- 대본 처리 (Memoization) ---
    const words = useMemo(() => {
        return scriptText.replace(/\n/g, " \n ").split(' ').filter(w => w.trim() !== "");
    }, [scriptText]);

    // --- [수동 모드] 자동 스크롤 로직 ---
    useEffect(() => {
        const animateScroll = () => {
            if (mode === 'manual' && isManualPlaying && containerRef.current) {
                const scrollAmount = manualSpeed * 0.5;
                containerRef.current.scrollTop += scrollAmount;
                animationFrameRef.current = requestAnimationFrame(animateScroll);
            }
        };

        if (isManualPlaying) {
            animationFrameRef.current = requestAnimationFrame(animateScroll);
        } else {
            cancelAnimationFrame(animationFrameRef.current);
        }

        return () => cancelAnimationFrame(animationFrameRef.current);
    }, [mode, isManualPlaying, manualSpeed]);

    // 모드 변경 시 초기화
    useEffect(() => {
        resetPrompter();
        setIsListening(false);
        setIsManualPlaying(false);
    }, [mode]);

    // 대본 편집 모달 열릴 때 텍스트 동기화
    useEffect(() => {
        if (showScriptEditor) {
            setEditingText(scriptText);
        }
    }, [showScriptEditor, scriptText]);


    // --- 파일 업로드 핸들러 ---
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setEditingText(e.target.result);
            };
            reader.readAsText(file);
        }
    };

    // --- 대본 저장 핸들러 ---
    const saveScript = () => {
        setScriptText(editingText);
        setShowScriptEditor(false);
        resetPrompter();
        // 저장은 useEffect의 Debounce에 의해 자동으로 처리됨
    };

    // --- [음성 모드] 인식 로직 ---
    const toggleListening = () => {
        if (isListening) stopRecognition();
        else startRecognition();
    };

    const startRecognition = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            setErrorMsg("이 브라우저는 음성 인식을 지원하지 않습니다. Chrome을 사용해주세요.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = 'ko-KR';
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.maxAlternatives = 1;

        recognition.onresult = (event) => {
            const results = event.results;
            const transcript = results[results.length - 1][0].transcript.trim();
            matchAndScroll(transcript);
        };

        recognition.onerror = (event) => {
            if (event.error === 'no-speech') return;
            if (event.error === 'not-allowed') {
                setErrorMsg("마이크 권한이 필요합니다.");
                stopRecognition();
            }
        };

        recognition.onend = () => {
            if (isListeningRef.current) {
                try { recognition.start(); } catch (e) { }
            }
        };

        recognitionRef.current = recognition;
        recognition.start();
        setIsListening(true);
        isListeningRef.current = true;
        setErrorMsg('');
    };

    const stopRecognition = () => {
        if (recognitionRef.current) recognitionRef.current.stop();
        setIsListening(false);
        isListeningRef.current = false;
    };

    // --- 공통 기능 ---
    const resetPrompter = () => {
        stopRecognition();
        setIsManualPlaying(false);
        setActiveIndex(0);
        activeIndexRef.current = 0;
        if (containerRef.current) containerRef.current.scrollTop = 0;
    };

    const matchAndScroll = (spokenText) => {
        const currentIndex = activeIndexRef.current;
        const lookAhead = 20;
        const searchLimit = Math.min(words.length, currentIndex + lookAhead);
        const cleanWord = (w) => w.replace(/[.,?!]/g, "").trim();
        const spokenWords = spokenText.split(' ');
        const checkRange = Math.min(spokenWords.length, 3);

        for (let j = 0; j < checkRange; j++) {
            const spokenIndex = spokenWords.length - 1 - j;
            const spokenWord = spokenWords[spokenIndex];
            const target = cleanWord(spokenWord);

            if (target.length < 2) continue;

            for (let i = currentIndex; i < searchLimit; i++) {
                const scriptWord = cleanWord(words[i]);

                if (scriptWord.includes(target) || target.includes(scriptWord)) {
                    const jumpDistance = i - currentIndex;
                    if (jumpDistance <= 5) { updatePosition(i); return; }

                    const prevSpokenIndex = spokenIndex - 1;
                    const prevScriptIndex = i - 1;
                    let isContextMatch = false;

                    if (prevSpokenIndex >= 0 && prevScriptIndex >= 0) {
                        const prevSpoken = cleanWord(spokenWords[prevSpokenIndex]);
                        const prevScript = cleanWord(words[prevScriptIndex]);
                        if (prevScript.includes(prevSpoken) || prevSpoken.includes(prevScript)) {
                            isContextMatch = true;
                        }
                    }

                    if (isContextMatch) { updatePosition(i); return; }

                    let occurrenceCount = 0;
                    for (let k = currentIndex; k < searchLimit; k++) {
                        if (cleanWord(words[k]).includes(target)) occurrenceCount++;
                    }
                    if (occurrenceCount === 1) { updatePosition(i); return; }
                }
            }
        }
    };

    const updatePosition = (index) => {
        if (activeIndexRef.current === index) return;
        activeIndexRef.current = index;
        setActiveIndex(index);
        if (wordRefs.current[index]) {
            wordRefs.current[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    // --- UI Helper: 저장 상태 표시 ---
    const SyncIndicator = () => {
        if (syncStatus === 'saving') {
            return <div className="flex items-center gap-1 text-xs text-blue-400"><Loader2 size={12} className="animate-spin" /> 저장 중...</div>
        }
        if (syncStatus === 'saved') {
            return <div className="flex items-center gap-1 text-xs text-gray-500"><Cloud size={12} /> 저장됨</div>
        }
        if (syncStatus === 'error') {
            return <div className="flex items-center gap-1 text-xs text-red-400"><AlertCircle size={12} /> 저장 실패</div>
        }
        return null;
    };

    return (
        <div className={`flex flex-col h-screen bg-black text-white ${isSerif ? 'font-serif' : 'font-sans'}`}>

            {/* --- Header & Controls --- */}
            <div className="flex flex-col z-30 bg-gray-900 border-b border-gray-800 shadow-xl relative">
                <div className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-4">
                        <h1 className="text-xl font-bold tracking-tight text-gray-200 hidden md:block">Focus Prompter</h1>

                        {/* Mode Switcher */}
                        <div className="flex bg-gray-800 rounded-lg p-1 border border-gray-700">
                            <button
                                onClick={() => setMode('voice')}
                                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${mode === 'voice' ? 'bg-gray-700 text-white shadow' : 'text-gray-400 hover:text-gray-200'
                                    }`}
                            >
                                <Mic size={14} /> 음성 인식
                            </button>
                            <button
                                onClick={() => setMode('manual')}
                                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${mode === 'manual' ? 'bg-gray-700 text-white shadow' : 'text-gray-400 hover:text-gray-200'
                                    }`}
                            >
                                <Play size={14} /> 자동 스크롤
                            </button>
                        </div>
                    </div>

                    {/* Sync Status (Mobile/Desktop) */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 top-1 md:top-auto">
                        <SyncIndicator />
                    </div>

                    <div className="flex gap-3 items-center">
                        {/* Main Action Buttons */}
                        {mode === 'voice' ? (
                            <button onClick={toggleListening} className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold transition-all ${isListening ? 'bg-red-500/10 text-red-500 border border-red-500' : 'bg-green-600 hover:bg-green-500 text-white shadow-lg'
                                }`}>
                                {isListening ? <><MicOff size={18} /> 인식 중지</> : <><Mic size={18} /> 인식 시작</>}
                            </button>
                        ) : (
                            <div className="flex items-center gap-2">
                                {/* Speed Control */}
                                <div className="hidden md:flex items-center gap-2 mr-4 bg-gray-800 px-3 py-1 rounded-lg border border-gray-700">
                                    <span className="text-xs text-gray-400 font-bold">SPEED</span>
                                    <input
                                        type="range" min="1" max="10" step="0.5"
                                        value={manualSpeed} onChange={(e) => setManualSpeed(Number(e.target.value))}
                                        className="w-24 accent-green-500 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                                    />
                                    <span className="text-xs text-white w-4 text-center">{manualSpeed}</span>
                                </div>

                                <button onClick={() => setIsManualPlaying(!isManualPlaying)} className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold transition-all ${isManualPlaying ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500' : 'bg-green-600 hover:bg-green-500 text-white shadow-lg'
                                    }`}>
                                    {isManualPlaying ? <><Pause size={18} /> 일시 정지</> : <><Play size={18} /> 재생 시작</>}
                                </button>
                            </div>
                        )}

                        <button onClick={resetPrompter} className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 text-gray-400 hover:text-white transition-colors" title="초기화">
                            <RefreshCw size={20} />
                        </button>

                        <button
                            onClick={() => { setShowScriptEditor(!showScriptEditor); setShowSettings(false); }}
                            className={`p-2 rounded-lg border border-gray-700 transition-colors ${showScriptEditor ? 'bg-blue-600 text-white border-blue-500' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
                            title="대본 편집"
                        >
                            <FileText size={20} />
                        </button>

                        <button
                            onClick={() => { setShowSettings(!showSettings); setShowScriptEditor(false); }}
                            className={`p-2 rounded-lg border border-gray-700 transition-colors ${showSettings ? 'bg-blue-600 text-white border-blue-500' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
                            title="설정"
                        >
                            <Settings size={20} />
                        </button>
                    </div>
                </div>

                {/* --- Script Editor Modal --- */}
                {showScriptEditor && (
                    <div className="absolute top-full left-0 w-full h-[calc(100vh-80px)] bg-gray-900/95 backdrop-blur-sm z-50 p-6 flex justify-center animate-in fade-in duration-200">
                        <div className="w-full max-w-4xl bg-gray-800 rounded-xl border border-gray-700 shadow-2xl flex flex-col overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center bg-gray-800">
                                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                    <FileText size={18} className="text-blue-400" /> 대본 편집
                                </h2>
                                <div className="flex gap-2">
                                    <label className="flex items-center gap-2 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg cursor-pointer text-sm transition-colors text-gray-300">
                                        <Upload size={14} /> TXT 파일 불러오기
                                        <input type="file" accept=".txt" onChange={handleFileUpload} className="hidden" />
                                    </label>
                                    <button onClick={() => setShowScriptEditor(false)} className="p-1.5 hover:bg-gray-700 rounded-lg text-gray-400">
                                        <X size={20} />
                                    </button>
                                </div>
                            </div>

                            <textarea
                                value={editingText}
                                onChange={(e) => setEditingText(e.target.value)}
                                className="flex-1 w-full p-6 bg-gray-900 text-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-lg leading-relaxed font-mono"
                                placeholder="여기에 대본을 붙여넣거나 직접 작성하세요..."
                            />

                            <div className="px-6 py-4 border-t border-gray-700 bg-gray-800 flex justify-end gap-3">
                                <button onClick={() => setShowScriptEditor(false)} className="px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 font-medium">취소</button>
                                <button onClick={saveScript} className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold shadow-lg flex items-center gap-2">
                                    <Check size={18} /> 적용하기
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- Settings Panel --- */}
                {showSettings && (
                    <div className="px-6 py-4 bg-gray-800/50 backdrop-blur border-t border-gray-700 grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-top-2 duration-200">
                        {/* Font Size */}
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between text-xs text-gray-400 font-bold uppercase">
                                <span className="flex items-center gap-1"><Scaling size={12} /> 글자 크기</span>
                                <span>{fontSize}px</span>
                            </div>
                            <input
                                type="range" min="20" max="100" step="2"
                                value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))}
                                className="w-full accent-blue-500 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>

                        {/* Letter Spacing */}
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between text-xs text-gray-400 font-bold uppercase">
                                <span className="flex items-center gap-1"><MoveVertical size={12} className="rotate-90" /> 자간</span>
                                <span>{letterSpacing}px</span>
                            </div>
                            <input
                                type="range" min="-2" max="10" step="0.5"
                                value={letterSpacing} onChange={(e) => setLetterSpacing(Number(e.target.value))}
                                className="w-full accent-blue-500 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>

                        {/* Font Family */}
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between text-xs text-gray-400 font-bold uppercase">
                                <span className="flex items-center gap-1"><Type size={12} /> 서체 스타일</span>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setIsSerif(false)}
                                    className={`flex-1 py-1.5 text-xs rounded border transition-colors ${!isSerif ? 'bg-blue-600 border-blue-500 text-white' : 'bg-gray-700 border-gray-600 text-gray-400'}`}
                                >
                                    고딕 (Sans)
                                </button>
                                <button
                                    onClick={() => setIsSerif(true)}
                                    className={`flex-1 py-1.5 text-xs rounded border transition-colors font-serif ${isSerif ? 'bg-blue-600 border-blue-500 text-white' : 'bg-gray-700 border-gray-600 text-gray-400'}`}
                                >
                                    명조 (Serif)
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* --- Error Message --- */}
            {errorMsg && (
                <div className="bg-red-900/50 text-red-200 px-4 py-2 text-sm flex items-center justify-center gap-2 z-20">
                    <AlertCircle size={16} /> {errorMsg}
                </div>
            )}

            {/* --- Teleprompter Display --- */}
            <div
                ref={containerRef}
                className="flex-1 overflow-y-auto p-8 relative scroll-smooth no-scrollbar"
                style={{
                    maskImage: 'linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)'
                }}
            >

                {/* Eye Level Guide */}
                <div className="fixed top-1/2 left-0 w-full h-px bg-yellow-500/30 pointer-events-none z-20 flex items-center justify-center">
                    <div className="bg-black/50 backdrop-blur px-3 py-1 rounded-full border border-yellow-500/30">
                        <span className="text-yellow-500 text-[10px] font-bold tracking-widest">
                            {mode === 'voice' ? 'EYE LEVEL' : 'READING LINE'}
                        </span>
                    </div>
                </div>

                {/* Text Container */}
                <div className="max-w-4xl mx-auto text-center relative z-10 break-keep py-[40vh]">
                    {words.map((word, index) => {
                        const isNewLine = word === "\n";
                        if (isNewLine) return <br key={index} className="block" style={{ marginBottom: `${fontSize * 0.8}px` }} />;

                        // 스타일 로직
                        let isHighlighted = false;
                        let opacity = 1;
                        let blur = 0;
                        let colorClass = 'text-gray-400';
                        let scale = 1;

                        if (mode === 'voice') {
                            // 음성 모드: 현재 단어 강조 + 미리보기
                            const isActive = index === activeIndex;
                            const isUpcoming = index > activeIndex && index <= activeIndex + 15;
                            const isPassed = index < activeIndex;

                            if (isActive) {
                                isHighlighted = true;
                                colorClass = 'text-yellow-400';
                                scale = 1.1;
                                opacity = 1;
                            } else if (isUpcoming) {
                                colorClass = 'text-white';
                                opacity = 0.8;
                            } else if (isPassed) {
                                colorClass = 'text-gray-600';
                                opacity = 0.2;
                                blur = 2;
                            } else {
                                // 먼 미래
                                opacity = 0.2;
                            }
                        } else {
                            // 수동 모드: 전체적으로 밝게 표시 (스크롤에 집중)
                            colorClass = 'text-white';
                            opacity = 0.9;
                        }

                        return (
                            <span
                                key={index}
                                ref={el => wordRefs.current[index] = el}
                                className={`inline-block transition-all duration-100 ease-out ${colorClass}`}
                                style={{
                                    fontSize: `${fontSize}px`,
                                    letterSpacing: `${letterSpacing}px`,
                                    lineHeight: lineHeight,
                                    marginRight: `${fontSize * 0.3}px`,
                                    opacity: opacity,
                                    filter: `blur(${blur}px)`,
                                    transform: `scale(${scale})`,
                                    textShadow: isHighlighted ? '0 0 30px rgba(253, 224, 71, 0.6)' : 'none',
                                    fontWeight: isHighlighted ? 800 : 600
                                }}
                            >
                                {word}
                            </span>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default VoicePrompterApp;
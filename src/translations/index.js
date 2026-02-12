
export const translations = {
    'ko-KR': {
        header: {
            title: 'Focus Prompter',
            saving: '저장 중...',
            saved: '저장됨',
            saveError: '저장 실패',
            presentationMode: '프리젠테이션 모드',
            fullscreen: '전체화면',
            languageSelect: '언어 선택',
            editScript: '대본 편집',
            settings: '설정'
        },
        modes: {
            voice: '음성 인식',
            manual: '자동 스크롤'
        },
        about: {
            title: '정보',
            version: '버전',
            privacyTitle: '개인정보 처리방침',
            privacyContent: 'Focus-prompter 개인정보 처리방침\n\n데이터 수집: 이 확장 프로그램은 개인 식별 정보를 수집, 저장 또는 전송하지 않습니다.\n\n오디오 데이터: 음성 인식은 Web Speech API를 통해 로컬에서 처리됩니다. 오디오 데이터는 서버로 전송되지 않습니다.\n\n로컬 스토리지: 대본과 설정은 사용자의 로컬 브라우저 저장소에만 저장됩니다.\n\n제3자 공유: 제3자와 데이터를 공유하지 않습니다.',
            close: '닫기'
        },
        actions: {
            startListening: '인식 시작',
            stopListening: '인식 중지',
            play: '재생 시작',
            pause: '일시 정지',
            speed: '속도',
            reset: '초기화'
        },
        settings: {
            microphone: '마이크 설정',
            fontSize: '글자 크기',
            letterSpacing: '자간',
            fontFamily: '서체 스타일',
            sans: '고딕 (Sans)',
            serif: '명조 (Serif)',
            mirror: '좌우 반전',
            normal: '기본',
            mirrored: '반전'
        },
        shortcuts: {
            title: '키보드 단축키 안내',
            dontShowAgain: '다시 보지 않기',
            confirm: '확인',
            categories: {
                basic: '기본 조작',
                view: '화면 제어',
                ui: 'UI 토글',
                file: '파일 관리'
            },
            descriptions: {
                togglePlay: '재생 / 일시정지',
                reset: '처음으로 리셋',
                fullscreen: '전체화면 토글',
                presentation: '프리젠테이션 모드',
                editor: '대본 편집기 열기',
                settings: '설정 패널 열기',
                closeModal: '창 닫기',
                save: '파일 저장 (.txt)',
                open: '파일 열기 (.txt)'
            }
        },
        editor: {
            title: '대본 편집',
            import: 'TXT 파일 불러오기',
            download: '다운로드',
            placeholder: '여기에 대본을 붙여넣거나 직접 작성하세요...\n\n마크다운 사용 가능:\n**굵게**, *기울임*, ~~취소선~~, __밑줄__',
            cancel: '취소',
            apply: '적용하기'
        }
    },
    'en-US': {
        header: {
            title: 'Focus Prompter',
            saving: 'Saving...',
            saved: 'Saved',
            saveError: 'Save Failed',
            presentationMode: 'Presentation Mode',
            fullscreen: 'Fullscreen',
            languageSelect: 'Select Language',
            editScript: 'Edit Script',
            settings: 'Settings'
        },
        modes: {
            voice: 'Voice Mode',
            manual: 'Auto Scroll'
        },
        about: {
            title: 'About',
            version: 'Version',
            privacyTitle: 'Privacy Policy',
            privacyContent: 'Privacy Policy for Focus-prompter\n\nData Collection: This extension does not collect, store, or transmit any personally identifiable information.\n\nAudio Data: Voice recognition is processed locally through the Web Speech API. Audio data is never sent to our servers.\n\nLocal Storage: Scripts and settings are stored strictly in the user\'s local browser storage.\n\nThird-party Sharing: No data is shared with third parties.',
            close: 'Close'
        },
        actions: {
            startListening: 'Start Listening',
            stopListening: 'Stop Listening',
            play: 'Play',
            pause: 'Pause',
            speed: 'SPEED',
            reset: 'Reset'
        },
        settings: {
            microphone: 'Microphone',
            fontSize: 'Font Size',
            letterSpacing: 'Letter Spacing',
            fontFamily: 'Font Style',
            sans: 'Sans-serif',
            serif: 'Serif',
            mirror: 'Mirror Mode',
            normal: 'Normal',
            mirrored: 'Mirrored'
        },
        shortcuts: {
            title: 'Keyboard Shortcuts',
            dontShowAgain: "Don't show again",
            confirm: 'OK',
            categories: {
                basic: 'Basic Controls',
                view: 'View Controls',
                ui: 'UI Toggles',
                file: 'File Management'
            },
            descriptions: {
                togglePlay: 'Play / Pause',
                reset: 'Reset to Start',
                fullscreen: 'Toggle Fullscreen',
                presentation: 'Presentation Mode',
                editor: 'Open Script Editor',
                settings: 'Open Settings',
                closeModal: 'Close Modal',
                save: 'Save File (.txt)',
                open: 'Open File (.txt)'
            }
        },
        editor: {
            title: 'Edit Script',
            import: 'Import TXT File',
            download: 'Download',
            placeholder: 'Type or paste your script here...\n\nMarkdown supported:\n**Bold**, *Italic*, ~~Strikethrough~~, __Underline__',
            cancel: 'Cancel',
            apply: 'Apply'
        }
    },
    'ja-JP': {
        header: {
            title: 'Focus Prompter',
            saving: '保存中...',
            saved: '保存完了',
            saveError: '保存失敗',
            presentationMode: 'プレゼンテーションモード',
            fullscreen: '全画面表示',
            languageSelect: '言語選択',
            editScript: 'スクリプト編集',
            settings: '設定'
        },
        modes: {
            voice: '音声認識',
            manual: '自動スクロール'
        },
        about: {
            title: '情報',
            version: 'バージョン',
            privacyTitle: 'プライバシーポリシー',
            privacyContent: 'Focus-prompter プライバシーポリシー\n\nデータ収集：この拡張機能は、個人を特定できる情報を収集、保存、または送信しません。\n\n音声データ：音声認識はWeb Speech APIを通じてローカルで処理されます。音声データがサーバーに送信されることはありません。\n\nローカルストレージ：スクリプトと設定は、ユーザーのローカルブラウザストレージにのみ保存されます。\n\n第三者への共有：第三者とデータを共有することはありません。',
            close: '閉じる'
        },
        actions: {
            startListening: '認識開始',
            stopListening: '認識停止',
            play: '再生',
            pause: '一時停止',
            speed: '速度',
            reset: 'リセット'
        },
        settings: {
            microphone: 'マイク設定',
            fontSize: 'フォントサイズ',
            letterSpacing: '文字間隔',
            fontFamily: 'フォントスタイル',
            sans: 'ゴシック (Sans)',
            serif: '明朝 (Serif)',
            mirror: 'ミラーモード',
            normal: '標準',
            mirrored: '反転'
        },
        shortcuts: {
            title: 'キーボードショートカット',
            dontShowAgain: '次回から表示しない',
            confirm: '確認',
            categories: {
                basic: '基本操作',
                view: '画面制御',
                ui: 'UI切り替え',
                file: 'ファイル管理'
            },
            descriptions: {
                togglePlay: '再生 / 一時停止',
                reset: '最初に戻る',
                fullscreen: '全画面切り替え',
                presentation: 'プレゼンテーションモード',
                editor: 'エディタを開く',
                settings: '設定を開く',
                closeModal: '閉じる',
                save: '保存 (.txt)',
                open: '開く (.txt)'
            }
        },
        editor: {
            title: 'スクリプト編集',
            import: 'TXTファイルを読み込む',
            download: 'ダウンロード',
            placeholder: 'ここにスクリプトを入力または貼り付けてください...\n\nMarkdown対応:\n**太字**, *斜体*, ~~打ち消し線~~, __下線__',
            cancel: 'キャンセル',
            apply: '適用'
        }
    },
    'zh-CN': {
        header: {
            title: 'Focus Prompter',
            saving: '保存中...',
            saved: '已保存',
            saveError: '保存失败',
            presentationMode: '演示模式',
            fullscreen: '全屏',
            languageSelect: '选择语言',
            editScript: '编辑脚本',
            settings: '设置'
        },
        modes: {
            voice: '语音识别',
            manual: '自动滚动'
        },
        about: {
            title: '关于',
            version: '版本',
            privacyTitle: '隐私政策',
            privacyContent: 'Focus-prompter 隐私政策\n\n数据收集：此扩展程序不收集、存储或传输任何个人身份信息。\n\n音频数据：语音识别通过 Web Speech API 在本地处理。音频数据从未发送到我们的服务器。\n\n本地存储：脚本和设置严格存储在用户的本地浏览器存储中。\n\n第三方共享：不与第三方共享任何数据。',
            close: '关闭'
        },
        actions: {
            startListening: '开始识别',
            stopListening: '停止识别',
            play: '播放',
            pause: '暂停',
            speed: '速度',
            reset: '重置'
        },
        settings: {
            microphone: '麦克风设置',
            fontSize: '字体大小',
            letterSpacing: '字间距',
            fontFamily: '字体样式',
            sans: '黑体 (Sans)',
            serif: '宋体 (Serif)',
            mirror: '镜像模式',
            normal: '正常',
            mirrored: '镜像'
        },
        shortcuts: {
            title: '键盘快捷键',
            dontShowAgain: '不再显示',
            confirm: '确认',
            categories: {
                basic: '基本控制',
                view: '视图控制',
                ui: '界面切换',
                file: '文件管理'
            },
            descriptions: {
                togglePlay: '播放 / 暂停',
                reset: '重置',
                fullscreen: '切换全屏',
                presentation: '演示模式',
                editor: '打开编辑器',
                settings: '打开设置',
                closeModal: '关闭',
                save: '保存文件 (.txt)',
                open: '打开文件 (.txt)'
            }
        },
        editor: {
            title: '编辑脚本',
            import: '导入 TXT 文件',
            download: '下载',
            placeholder: '在此输入或粘贴脚本...\n\n支持 Markdown:\n**粗体**, *斜体*, ~~删除线~~, __下划线__',
            cancel: '取消',
            apply: '应用'
        }
    }
};

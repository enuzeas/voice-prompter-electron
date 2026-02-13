
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
    },
    'es-ES': {
        header: {
            title: 'Focus Prompter',
            saving: 'Guardando...',
            saved: 'Guardado',
            saveError: 'Error al guardar',
            presentationMode: 'Modo Presentación',
            fullscreen: 'Pantalla Completa',
            languageSelect: 'Seleccionar Idioma',
            editScript: 'Editar Guion',
            settings: 'Configuración'
        },
        modes: {
            voice: 'Modo Voz',
            manual: 'Desplazamiento Auto'
        },
        about: {
            title: 'Acerca de',
            version: 'Versión',
            privacyTitle: 'Política de Privacidad',
            privacyContent: 'Política de Privacidad de Focus-prompter\n\nRecopilación de Datos: Esta extensión no recopila, almacena ni transmite ninguna información de identificación personal.\n\nDatos de Audio: El reconocimiento de voz se procesa localmente a través de Web Speech API. Los datos de audio nunca se envían a nuestros servidores.\n\nAlmacenamiento Local: Los guiones y configuraciones se almacenan estrictamente en el almacenamiento local del navegador del usuario.\n\nCompartir con Terceros: No se comparten datos con terceros.',
            close: 'Cerrar'
        },
        actions: {
            startListening: 'Escuchar',
            stopListening: 'Detener',
            play: 'Reproducir',
            pause: 'Pausa',
            speed: 'VELOCIDAD',
            reset: 'Reiniciar'
        },
        settings: {
            microphone: 'Micrófono',
            fontSize: 'Tamaño de Fuente',
            letterSpacing: 'Espaciado',
            fontFamily: 'Estilo de Fuente',
            sans: 'Sans-serif',
            serif: 'Serif',
            mirror: 'Modo Espejo',
            normal: 'Normal',
            mirrored: 'Espejo'
        },
        shortcuts: {
            title: 'Atajos de Teclado',
            dontShowAgain: "No mostrar de nuevo",
            confirm: 'OK',
            categories: {
                basic: 'Controles Básicos',
                view: 'Controles de Vista',
                ui: 'Alternar UI',
                file: 'Gestión de Archivos'
            },
            descriptions: {
                togglePlay: 'Reproducir / Pausa',
                reset: 'Reiniciar al Inicio',
                fullscreen: 'Alternar Pantalla Completa',
                presentation: 'Modo Presentación',
                editor: 'Abrir Editor',
                settings: 'Abrir Configuración',
                closeModal: 'Cerrar Modal',
                save: 'Guardar Archivo (.txt)',
                open: 'Abrir Archivo (.txt)'
            }
        },
        editor: {
            title: 'Editar Guion',
            import: 'Importar TXT',
            download: 'Descargar',
            placeholder: 'Escriba o pegue su guion aquí...\n\nMarkdown soportado:\n**Negrita**, *Cursiva*, ~~Tachado~~, __Subrayado__',
            cancel: 'Cancelar',
            apply: 'Aplicar'
        }
    },
    'fr-FR': {
        header: {
            title: 'Focus Prompter',
            saving: 'Enregistrement...',
            saved: 'Enregistré',
            saveError: 'Échec de l\'enregistrement',
            presentationMode: 'Mode Présentation',
            fullscreen: 'Plein Écran',
            languageSelect: 'Choisir la Langue',
            editScript: 'Éditer le Script',
            settings: 'Paramètres'
        },
        modes: {
            voice: 'Mode Vocal',
            manual: 'Défilement Auto'
        },
        about: {
            title: 'À Propos',
            version: 'Version',
            privacyTitle: 'Politique de Confidentialité',
            privacyContent: 'Politique de Confidentialité de Focus-prompter\n\nCollecte de Données : Cette extension ne collecte, ne stocke ni ne transmet aucune information personnelle identifiable.\n\nDonnées Audio : La reconnaissance vocale est traitée localement via l\'API Web Speech. Les données audio ne sont jamais envoyées à nos serveurs.\n\nStockage Local : Les scripts et les paramètres sont stockés strictement dans le stockage local du navigateur de l\'utilisateur.\n\nPartage avec des Tiers : Aucune donnée n\'est partagée avec des tiers.',
            close: 'Fermer'
        },
        actions: {
            startListening: 'Écouter',
            stopListening: 'Arrêter',
            play: 'Lecture',
            pause: 'Pause',
            speed: 'VITESSE',
            reset: 'Réinitialiser'
        },
        settings: {
            microphone: 'Microphone',
            fontSize: 'Taille Police',
            letterSpacing: 'Espacement',
            fontFamily: 'Style de Police',
            sans: 'Sans-serif',
            serif: 'Serif',
            mirror: 'Mode Miroir',
            normal: 'Normal',
            mirrored: 'Miroir'
        },
        shortcuts: {
            title: 'Raccourcis Clavier',
            dontShowAgain: "Ne plus afficher",
            confirm: 'OK',
            categories: {
                basic: 'Contrôles de Base',
                view: 'Contrôles de Vue',
                ui: 'Bascule UI',
                file: 'Gestion de Fichiers'
            },
            descriptions: {
                togglePlay: 'Lecture / Pause',
                reset: 'Réinitialiser au Début',
                fullscreen: 'Plein Écran',
                presentation: 'Mode Présentation',
                editor: 'Ouvrir Éditeur',
                settings: 'Ouvrir Paramètres',
                closeModal: 'Fermer',
                save: 'Enregistrer Fichier (.txt)',
                open: 'Ouvrir Fichier (.txt)'
            }
        },
        editor: {
            title: 'Éditer le Script',
            import: 'Importer TXT',
            download: 'Télécharger',
            placeholder: 'Tapez ou collez votre script ici...\n\nMarkdown supporté :\n**Gras**, *Italique*, ~~Barré~~, __Souligné__',
            cancel: 'Annuler',
            apply: 'Appliquer'
        }
    },
    'de-DE': {
        header: {
            title: 'Focus Prompter',
            saving: 'Speichern...',
            saved: 'Gespeichert',
            saveError: 'Fehler beim Speichern',
            presentationMode: 'Präsentationsmodus',
            fullscreen: 'Vollbild',
            languageSelect: 'Sprache Wählen',
            editScript: 'Skript Bearbeiten',
            settings: 'Einstellungen'
        },
        modes: {
            voice: 'Sprachmodus',
            manual: 'Auto-Scroll'
        },
        about: {
            title: 'Über',
            version: 'Version',
            privacyTitle: 'Datenschutzrichtlinie',
            privacyContent: 'Datenschutzrichtlinie für Focus-prompter\n\nDatenerfassung: Diese Erweiterung sammelt, speichert oder überträgt keine personenbezogenen Daten.\n\nAudiodaten: Die Spracherkennung wird lokal über die Web Speech API verarbeitet. Audiodaten werden niemals an unsere Server gesendet.\n\nLokaler Speicher: Skripte und Einstellungen werden ausschließlich im lokalen Browserspeicher des Benutzers gespeichert.\n\nWeitergabe an Dritte: Es werden keine Daten an Dritte weitergegeben.',
            close: 'Schließen'
        },
        actions: {
            startListening: 'Zuhören',
            stopListening: 'Stoppen',
            play: 'Abspielen',
            pause: 'Pause',
            speed: 'GESCHWINDIGKEIT',
            reset: 'Zurücksetzen'
        },
        settings: {
            microphone: 'Mikrofon',
            fontSize: 'Schriftgröße',
            letterSpacing: 'Zeichenabstand',
            fontFamily: 'Schriftart',
            sans: 'Sans-serif',
            serif: 'Serif',
            mirror: 'Spiegelmodus',
            normal: 'Normal',
            mirrored: 'Gespiegelt'
        },
        shortcuts: {
            title: 'Tastenkürzel',
            dontShowAgain: "Nicht mehr anzeigen",
            confirm: 'OK',
            categories: {
                basic: 'Grundsteuerung',
                view: 'Ansichtsteuerung',
                ui: 'UI Umschalten',
                file: 'Dateiverwaltung'
            },
            descriptions: {
                togglePlay: 'Abspielen / Pause',
                reset: 'Zum Anfang',
                fullscreen: 'Vollbild Umschalten',
                presentation: 'Präsentationsmodus',
                editor: 'Editor Öffnen',
                settings: 'Einstellungen Öffnen',
                closeModal: 'Schließen',
                save: 'Datei Speichern (.txt)',
                open: 'Datei Öffnen (.txt)'
            }
        },
        editor: {
            title: 'Skript Bearbeiten',
            import: 'TXT Importieren',
            download: 'Herunterladen',
            placeholder: 'Geben Sie Ihr Skript hier ein...\n\nMarkdown unterstützt:\n**Fett**, *Kursiv*, ~~Durchgestrichen~~, __Unterstrichen__',
            cancel: 'Abbrechen',
            apply: 'Anwenden'
        }
    },
    'it-IT': {
        header: {
            title: 'Focus Prompter',
            saving: 'Salvataggio...',
            saved: 'Salvato',
            saveError: 'Errore Salvataggio',
            presentationMode: 'Modo Presentazione',
            fullscreen: 'Schermo Intero',
            languageSelect: 'Seleziona Lingua',
            editScript: 'Modifica Script',
            settings: 'Impostazioni'
        },
        modes: {
            voice: 'Modo Vocale',
            manual: 'Scorrimento Auto'
        },
        about: {
            title: 'Info',
            version: 'Versione',
            privacyTitle: 'Informativa sulla Privacy',
            privacyContent: 'Informativa sulla Privacy per Focus-prompter\n\nRaccolta Dati: Questa estensione non raccoglie, archivia o trasmette alcuna informazione di identificazione personale.\n\nDati Audio: Il riconoscimento vocale viene elaborato localmente tramite l\'API Web Speech. I dati audio non vengono mai inviati ai nostri server.\n\nArchiviazione Locale: Gli script e le impostazioni sono archiviati rigorosamente nella memoria locale del browser dell\'utente.\n\nCondivisione con Terze Parti: Nessun dato viene condiviso con terze parti.',
            close: 'Chiudi'
        },
        actions: {
            startListening: 'Ascolta',
            stopListening: 'Stop',
            play: 'Riproduci',
            pause: 'Pausa',
            speed: 'VELOCITÀ',
            reset: 'Resetta'
        },
        settings: {
            microphone: 'Microfono',
            fontSize: 'Dimensione Font',
            letterSpacing: 'Spaziatura',
            fontFamily: 'Stile Font',
            sans: 'Sans-serif',
            serif: 'Serif',
            mirror: 'Modo Specchio',
            normal: 'Normale',
            mirrored: 'Specchiato'
        },
        shortcuts: {
            title: 'Scorciatoie Tastiera',
            dontShowAgain: "Non mostrare più",
            confirm: 'OK',
            categories: {
                basic: 'Controlli Base',
                view: 'Controlli Vista',
                ui: 'Toggle UI',
                file: 'Gestione File'
            },
            descriptions: {
                togglePlay: 'Riproduci / Pausa',
                reset: 'Resetta all\'Inizio',
                fullscreen: 'Schermo Intero',
                presentation: 'Modo Presentazione',
                editor: 'Apri Editor',
                settings: 'Apri Impostazioni',
                closeModal: 'Chiudi',
                save: 'Salva File (.txt)',
                open: 'Apri File (.txt)'
            }
        },
        editor: {
            title: 'Modifica Script',
            import: 'Importa TXT',
            download: 'Scarica',
            placeholder: 'Scrivi o incolla il tuo script qui...\n\nMarkdown supportato:\n**Grassetto**, *Corsivo*, ~~Barrato~~, __Sottolineato__',
            cancel: 'Annulla',
            apply: 'Applica'
        }
    },
    'pt-BR': {
        header: {
            title: 'Focus Prompter',
            saving: 'Salvando...',
            saved: 'Salvo',
            saveError: 'Erro ao Salvar',
            presentationMode: 'Modo Apresentação',
            fullscreen: 'Tela Cheia',
            languageSelect: 'Selecionar Idioma',
            editScript: 'Editar Script',
            settings: 'Configurações'
        },
        modes: {
            voice: 'Modo Voz',
            manual: 'Rolagem Auto'
        },
        about: {
            title: 'Sobre',
            version: 'Versão',
            privacyTitle: 'Política de Privacidade',
            privacyContent: 'Política de Privacidade do Focus-prompter\n\nColeta de Dados: Esta extensão não coleta, armazena ou transmite nenhuma informação de identificação pessoal.\n\nDados de Áudio: O reconhecimento de voz é processado localmente através da API Web Speech. Os dados de áudio nunca são enviados aos nossos servidores.\n\nArmazenamento Local: Scripts e configurações são armazenados estritamente no armazenamento local do navegador do usuário.\n\nCompartilhamento com Terceiros: Nenhum dado é compartilhado com terceiros.',
            close: 'Fechar'
        },
        actions: {
            startListening: 'Ouvir',
            stopListening: 'Parar',
            play: 'Reproduzir',
            pause: 'Pausa',
            speed: 'VELOCIDADE',
            reset: 'Reiniciar'
        },
        settings: {
            microphone: 'Microfone',
            fontSize: 'Tamanho da Fonte',
            letterSpacing: 'Espaçamento',
            fontFamily: 'Estilo da Fonte',
            sans: 'Sans-serif',
            serif: 'Serif',
            mirror: 'Modo Espelho',
            normal: 'Normal',
            mirrored: 'Espelhado'
        },
        shortcuts: {
            title: 'Atalhos de Teclado',
            dontShowAgain: "Não mostrar novamente",
            confirm: 'OK',
            categories: {
                basic: 'Controles Básicos',
                view: 'Controles de Visualização',
                ui: 'Alternar UI',
                file: 'Gerenciamento de Arquivos'
            },
            descriptions: {
                togglePlay: 'Reproduzir / Pausa',
                reset: 'Reiniciar do Início',
                fullscreen: 'Alternar Tela Cheia',
                presentation: 'Modo Apresentação',
                editor: 'Abrir Editor',
                settings: 'Abrir Configurações',
                closeModal: 'Fechar',
                save: 'Salvar Arquivo (.txt)',
                open: 'Abrir Arquivo (.txt)'
            }
        },
        editor: {
            title: 'Editar Script',
            import: 'Importar TXT',
            download: 'Baixar',
            placeholder: 'Digite ou cole seu script aqui...\n\nMarkdown suportado:\n**Negrito**, *Itálico*, ~~Tachado~~, __Sublinhado__',
            cancel: 'Cancelar',
            apply: 'Aplicar'
        }
    },
    'ru-RU': {
        header: {
            title: 'Focus Prompter',
            saving: 'Сохранение...',
            saved: 'Сохранено',
            saveError: 'Ошибка',
            presentationMode: 'Режим презентации',
            fullscreen: 'Полный экран',
            languageSelect: 'Выбрать язык',
            editScript: 'Ред. скрипт',
            settings: 'Настройки'
        },
        modes: {
            voice: 'Голосовой режим',
            manual: 'Автопрокрутка'
        },
        about: {
            title: 'О программе',
            version: 'Версия',
            privacyTitle: 'Политика конфиденциальности',
            privacyContent: 'Политика конфиденциальности Focus-prompter\n\nСбор данных: Это расширение не собирает, не хранит и не передает никакой личной информации.\n\nАудиоданные: Распознавание речи обрабатывается локально через Web Speech API. Аудиоданные никогда не отправляются на наши серверы.\n\nЛокальное хранилище: Скрипты и настройки хранятся строго в локальном хранилище браузера пользователя.\n\nПередача третьим лицам: Данные не передаются третьим лицам.',
            close: 'Закрыть'
        },
        actions: {
            startListening: 'Слушать',
            stopListening: 'Стоп',
            play: 'Пуск',
            pause: 'Пауза',
            speed: 'СКОРОСТЬ',
            reset: 'Сброс'
        },
        settings: {
            microphone: 'Микрофон',
            fontSize: 'Размер шрифта',
            letterSpacing: 'Межбуквенный',
            fontFamily: 'Стиль шрифта',
            sans: 'Без засечек',
            serif: 'С засечками',
            mirror: 'Зеркальный режим',
            normal: 'Нормальный',
            mirrored: 'Зеркальный'
        },
        shortcuts: {
            title: 'Горячие клавиши',
            dontShowAgain: "Не показывать снова",
            confirm: 'OK',
            categories: {
                basic: 'Основные',
                view: 'Вид',
                ui: 'Интерфейс',
                file: 'Файлы'
            },
            descriptions: {
                togglePlay: 'Пуск / Пауза',
                reset: 'Сброс в начало',
                fullscreen: 'Полный экран',
                presentation: 'Режим презентации',
                editor: 'Открыть редактор',
                settings: 'Открыть настройки',
                closeModal: 'Закрыть',
                save: 'Сохранить (.txt)',
                open: 'Открыть (.txt)'
            }
        },
        editor: {
            title: 'Редактировать скрипт',
            import: 'Импорт TXT',
            download: 'Скачать',
            placeholder: 'Введите или вставьте текст здесь...\n\nПоддержка Markdown:\n**Жирный**, *Курсив*, ~~Зачеркнутый~~, __Подчеркнутый__',
            cancel: 'Отмена',
            apply: 'Применить'
        }
    },
    'vi-VN': {
        header: {
            title: 'Focus Prompter',
            saving: 'Đang lưu...',
            saved: 'Đã lưu',
            saveError: 'Lỗi lưu',
            presentationMode: 'Chế độ Trình chiếu',
            fullscreen: 'Toàn màn hình',
            languageSelect: 'Chọn Ngôn ngữ',
            editScript: 'Sửa Kịch bản',
            settings: 'Cài đặt'
        },
        modes: {
            voice: 'Chế độ Giọng nói',
            manual: 'Tự động Cuộn'
        },
        about: {
            title: 'Giới thiệu',
            version: 'Phiên bản',
            privacyTitle: 'Chính sách Bảo mật',
            privacyContent: 'Chính sách Bảo mật của Focus-prompter\n\nThu thập Dữ liệu: Tiện ích mở rộng này không thu thập, lưu trữ hoặc truyền bất kỳ thông tin nhận dạng cá nhân nào.\n\nDữ liệu Âm thanh: Nhận dạng giọng nói được xử lý cục bộ thông qua Web Speech API. Dữ liệu âm thanh không bao giờ được gửi đến máy chủ của chúng tôi.\n\nLưu trữ Cục bộ: Kịch bản và cài đặt được lưu trữ nghiêm ngặt trong bộ nhớ cục bộ của trình duyệt người dùng.\n\nChia sẻ với Bên thứ ba: Không có dữ liệu nào được chia sẻ với bên thứ ba.',
            close: 'Đóng'
        },
        actions: {
            startListening: 'Bắt đầu',
            stopListening: 'Dừng',
            play: 'Phát',
            pause: 'Tạm dừng',
            speed: 'TỐC ĐỘ',
            reset: 'Đặt lại'
        },
        settings: {
            microphone: 'Micro',
            fontSize: 'Cỡ chữ',
            letterSpacing: 'Giãn cách chữ',
            fontFamily: 'Kiểu chữ',
            sans: 'Không chân',
            serif: 'Có chân',
            mirror: 'Chế độ Gương',
            normal: 'Bình thường',
            mirrored: 'Gương'
        },
        shortcuts: {
            title: 'Phím tắt',
            dontShowAgain: "Không hiện lại",
            confirm: 'OK',
            categories: {
                basic: 'Điều khiển Cơ bản',
                view: 'Điều khiển Chế độ xem',
                ui: 'Chuyển đổi Giao diện',
                file: 'Quản lý Tập tin'
            },
            descriptions: {
                togglePlay: 'Phát / Tạm dừng',
                reset: 'Đặt lại về đầu',
                fullscreen: 'Toàn màn hình',
                presentation: 'Chế độ Trình chiếu',
                editor: 'Mở Trình soạn thảo',
                settings: 'Mở Cài đặt',
                closeModal: 'Đóng',
                save: 'Lưu Tập tin (.txt)',
                open: 'Mở Tập tin (.txt)'
            }
        },
        editor: {
            title: 'Sửa Kịch bản',
            import: 'Nhập tệp TXT',
            download: 'Tải xuống',
            placeholder: 'Nhập hoặc dán kịch bản của bạn vào đây...\n\nHỗ trợ Markdown:\n**Đậm**, *Nghiêng*, ~~Gạch ngang~~, __Gạch chân__',
            cancel: 'Hủy',
            apply: 'Áp dụng'
        }
    },
    'th-TH': {
        header: {
            title: 'Focus Prompter',
            saving: 'กำลังบันทึก...',
            saved: 'บันทึกแล้ว',
            saveError: 'บันทึกไม่สำเร็จ',
            presentationMode: 'โหมดนำเสนอ',
            fullscreen: 'เต็มหน้าจอ',
            languageSelect: 'เลือกภาษา',
            editScript: 'แก้ไขสคริปต์',
            settings: 'ตั้งค่า'
        },
        modes: {
            voice: 'โหมดเสียง',
            manual: 'เลื่อนอัตโนมัติ'
        },
        about: {
            title: 'เกี่ยวกับ',
            version: 'เวอร์ชัน',
            privacyTitle: 'นโยบายความเป็นส่วนตัว',
            privacyContent: 'นโยบายความเป็นส่วนตัวสำหรับ Focus-prompter\n\nการเก็บรวบรวมข้อมูล: ส่วนขยายนี้ไม่เก็บรวบรวม จัดเก็บ หรือส่งข้อมูลส่วนบุคคลที่ระบุตัวตนได้\n\nข้อมูลเสียง: การจดจำเสียงจะถูกประมวลผลภายในเครื่องผ่าน Web Speech API ข้อมูลเสียงจะไม่ถูกส่งไปยังเซิร์ฟเวอร์ของเรา\n\nพื้นที่จัดเก็บภายในเครื่อง: สคริปต์และการตั้งค่าจะถูกจัดเก็บไว้ในพื้นที่จัดเก็บของเบราว์เซอร์ผู้ใช้เท่านั้น\n\nการแบ่งปันกับบุคคลที่สาม: ไม่มีการแบ่งปันข้อมูลกับบุคคลที่สาม',
            close: 'ปิด'
        },
        actions: {
            startListening: 'เริ่มฟัง',
            stopListening: 'หยุด',
            play: 'เล่น',
            pause: 'หยุดชั่วคราว',
            speed: 'ความเร็ว',
            reset: 'รีเซ็ต'
        },
        settings: {
            microphone: 'ไมโครโฟน',
            fontSize: 'ขนาดตัวอักษร',
            letterSpacing: 'ระยะห่างตัวอักษร',
            fontFamily: 'รูปแบบตัวอักษร',
            sans: 'ไม่มีเชิง (Sans)',
            serif: 'มีเชิง (Serif)',
            mirror: 'โหมดกระจก',
            normal: 'ปกติ',
            mirrored: 'กระจก'
        },
        shortcuts: {
            title: 'แป้นพิมพ์ลัด',
            dontShowAgain: "ไม่ต้องแสดงอีก",
            confirm: 'ตกลง',
            categories: {
                basic: 'การควบคุมพื้นฐาน',
                view: 'การควบคุมมุมมอง',
                ui: 'สลับ UI',
                file: 'การจัดการไฟล์'
            },
            descriptions: {
                togglePlay: 'เล่น / หยุดชั่วคราว',
                reset: 'รีเซ็ตไปที่เริ่มต้น',
                fullscreen: 'สลับเต็มหน้าจอ',
                presentation: 'โหมดนำเสนอ',
                editor: 'เปิดตัวแก้ไข',
                settings: 'เปิดการตั้งค่า',
                closeModal: 'ปิด',
                save: 'บันทึกไฟล์ (.txt)',
                open: 'เปิดไฟล์ (.txt)'
            }
        },
        editor: {
            title: 'แก้ไขสคริปต์',
            import: 'นำเข้าไฟล์ TXT',
            download: 'ดาวน์โหลด',
            placeholder: 'พิมพ์หรือวางสคริปต์ของคุณที่นี่...\n\nรองรับ Markdown:\n**ตัวหนา**, *ตัวเอียง*, ~~ขีดฆ่า~~, __ขีดเส้นใต้__',
            cancel: 'ยกเลิก',
            apply: 'นำไปใช้'
        }
    },
    'id-ID': {
        header: {
            title: 'Focus Prompter',
            saving: 'Menyimpan...',
            saved: 'Tersimpan',
            saveError: 'Gagal Menyimpan',
            presentationMode: 'Mode Presentasi',
            fullscreen: 'Layar Penuh',
            languageSelect: 'Pilih Bahasa',
            editScript: 'Edit Naskah',
            settings: 'Pengaturan'
        },
        modes: {
            voice: 'Mode Suara',
            manual: 'Gulir Otomatis'
        },
        about: {
            title: 'Tentang',
            version: 'Versi',
            privacyTitle: 'Kebijakan Privasi',
            privacyContent: 'Kebijakan Privasi untuk Focus-prompter\n\nPengumpulan Data: Ekstensi ini tidak mengumpulkan, menyimpan, atau mengirimkan informasi identitas pribadi apa pun.\n\nData Audio: Pengenalan suara diproses secara lokal melalui Web Speech API. Data audio tidak pernah dikirim ke server kami.\n\nPenyimpanan Lokal: Naskah dan pengaturan disimpan secara ketat di penyimpanan browser lokal pengguna.\n\nBerbagi dengan Pihak Ketiga: Tidak ada data yang dibagikan dengan pihak ketiga.',
            close: 'Tutup'
        },
        actions: {
            startListening: 'Mulai',
            stopListening: 'Berhenti',
            play: 'Putar',
            pause: 'Jeda',
            speed: 'KECEPATAN',
            reset: 'Reset'
        },
        settings: {
            microphone: 'Mikrofon',
            fontSize: 'Ukuran Font',
            letterSpacing: 'Jarak Huruf',
            fontFamily: 'Gaya Font',
            sans: 'Sans-serif',
            serif: 'Serif',
            mirror: 'Mode Cermin',
            normal: 'Normal',
            mirrored: 'Cermin'
        },
        shortcuts: {
            title: 'Pintasan Keyboard',
            dontShowAgain: "Jangan tampilkan lagi",
            confirm: 'OK',
            categories: {
                basic: 'Kontrol Dasar',
                view: 'Kontrol Tampilan',
                ui: 'Beralih UI',
                file: 'Manajemen File'
            },
            descriptions: {
                togglePlay: 'Putar / Jeda',
                reset: 'Reset ke Awal',
                fullscreen: 'Layar Penuh',
                presentation: 'Mode Presentasi',
                editor: 'Buka Editor',
                settings: 'Buka Pengaturan',
                closeModal: 'Tutup',
                save: 'Simpan File (.txt)',
                open: 'Buka File (.txt)'
            }
        },
        editor: {
            title: 'Edit Naskah',
            import: 'Impor TXT',
            download: 'Unduh',
            placeholder: 'Ketik atau tempel naskah Anda di sini...\n\nMendukung Markdown:\n**Tebal**, *Miring*, ~~Coret~~, __Garis Bawah__',
            cancel: 'Batal',
            apply: 'Terapkan'
        }
    }
};

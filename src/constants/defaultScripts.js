const defaultScripts = {
    'ko-KR': `안녕하세요. 오늘은 음성 인식 기술을 활용한 프롬프터 시스템에 대해 발표하겠습니다.
  
기존의 프롬프터는 정해진 속도로만 스크롤되기 때문에 발표자가 긴장해서 말이 빨라지거나, 잠시 멈추었을 때 싱크가 맞지 않는 문제가 있었습니다.

하지만 지금 보시는 이 시스템은 **음성 인식 모드**와 *수동 스크롤 모드*를 모두 지원하여 상황에 맞게 선택할 수 있습니다.

이제 여러분의 대본과 설정은 로컬에 자동으로 저장됩니다. 앱을 닫았다가 다시 열어도 마지막 작업 상태 그대로 시작할 수 있습니다.

설정 메뉴를 통해 글자의 크기나 자간, 그리고 서체를 자유롭게 변경하여 발표자가 가장 편안하게 읽을 수 있는 환경을 만들어 보세요.

이제 복잡한 조작 없이, 오직 청중과의 소통에만 집중하세요. 감사합니다.`,

    'en-US': `Hello, everyone. Today I'd like to introduce our voice-activated teleprompter system.

Traditional teleprompters scroll at a fixed speed, which can cause synchronization issues if the speaker speeds up due to nervousness or pauses briefly.

However, this system supports both **Voice Recognition Mode** and *Manual Scroll Mode*, allowing you to choose the best option for any situation.

Your scripts and settings are now automatically saved locally. Even if you close the app and reopen it, you can start right where you left off.

Through the settings menu, you can freely adjust font size, letter spacing, and typeface to create the most comfortable reading environment for the speaker.

Now, focus solely on communicating with your audience without complex operations. Thank you.`,

    'ja-JP': `こんにちは。今日は音声認識技術を活用したプロンプターシステムについて発表いたします。

従来のプロンプターは一定の速度でしかスクロールしないため、発表者が緊張して早口になったり、一時停止したりすると、同期がずれるという問題がありました。

しかし、現在ご覧いただいているこのシステムは、**音声認識モード**と*手動スクロールモード*の両方をサポートしており、状況に合わせて選択することができます。

これからは、スクリプトと設定がローカルに自動的に保存されます。アプリを閉じて再度開いても、最後の作業状態のまま再開できます。

設定メニューを通じて、フォントサイズや文字間隔、書体を自由に変更し、発表者が最も読みやすい環境を作ってみてください。

これからは複雑な操作なしに、聴衆とのコミュニケーションにのみ集中してください。ありがとうございます。`,

    'es-ES': `Hola a todos. Hoy me gustaría presentar nuestro sistema de teleprompter activado por voz.
    
Los teleprompters tradicionales se desplazan a una velocidad fija, lo que puede causar problemas de sincronización si el orador acelera debido a los nervios o hace una pausa breve.
    
Sin embargo, este sistema admite tanto el **Modo de Reconocimiento de Voz** como el *Modo de Desplazamiento Manual*, lo que le permite elegir la mejor opción para cualquier situación.
    
Ahora, sus guiones y configuraciones se guardan automáticamente de forma local. Incluso si cierra la aplicación y la vuelve a abrir, puede comenzar justo donde lo dejó.
    
Gracias.`,

    'fr-FR': `Bonjour tout le monde. Aujourd'hui, je voudrais vous présenter notre système de téléprompteur à commande vocale.

Les téléprompteurs traditionnels défilent à une vitesse fixe, ce qui peut entraîner des problèmes de synchronisation si l'orateur accélère à cause de la nervosité ou fait une courte pause.

Cependant, ce système prend en charge à la fois le **Mode Reconnaissance Vocale** et le *Mode Défilement Manuel*, vous permettant de choisir la meilleure option pour chaque situation.

Désormais, vos scripts et paramètres sont automatiquement enregistrés localement. Même si vous fermez l'application et la rouvrez, vous pouvez reprendre exactement là où vous vous étiez arrêté.

Merci.`,

    'de-DE': `Hallo zusammen. Heute möchte ich Ihnen unser sprachgesteuertes Teleprompter-System vorstellen.

Herkömmliche Teleprompter scrollen mit einer festen Geschwindigkeit, was zu Synchronisationsproblemen führen kann, wenn der Sprecher aufgrund von Nervosität schneller wird oder kurz pausiert.

Dieses System unterstützt jedoch sowohl den **Spracherkennungsmodus** als auch den *Manuellen Scrollmodus*, sodass Sie für jede Situation die beste Option wählen können.

Ihre Skripte und Einstellungen werden jetzt automatisch lokal gespeichert. Selbst wenn Sie die App schließen und wieder öffnen, können Sie genau dort weitermachen, wo Sie aufgehört haben.

Danke.`,

    'it-IT': `Ciao a tutti. Oggi vorrei presentarvi il nostro sistema di teleprompter ad attivazione vocale.

I teleprompter tradizionali scorrono a una velocità fissa, il che può causare problemi di sincronizzazione se l'oratore accelera a causa del nervosismo o fa una breve pausa.

Tuttavia, questo sistema supporta sia la **Modalità Riconoscimento Vocale** che la *Modalità Scorrimento Manuale*, consentendovi di scegliere l'opzione migliore per ogni situazione.

Ora, i vostri script e le impostazioni vengono salvati automaticamente in locale. Anche se chiudete l'app e la riaprite, potete ricominciare esattamente da dove avevate lasciato.

Grazie.`,

    'pt-BR': `Olá a todos. Hoje eu gostaria de apresentar nosso sistema de teleprompter ativado por voz.

Os teleprompters tradicionais rolam a uma velocidade fixa, o que pode causar problemas de sincronização se o orador acelerar devido ao nervosismo ou fizer uma breve pausa.

No entanto, este sistema suporta tanto o **Modo de Reconhecimento de Voz** quanto o *Modo de Rolagem Manual*, permitindo que você escolha a melhor opção para qualquer situação.

Agora, seus scripts e configurações são salvos automaticamente localmente. Mesmo se você fechar o aplicativo e reabri-lo, poderá começar exatamente de onde parou.

Obrigado.`,

    'ru-RU': `Всем привет. Сегодня я хотел бы представить нашу систему телесуфлера с голосовым управлением.

Традиционные телесуфлеры прокручиваются с фиксированной скоростью, что может вызвать проблемы с синхронизацией, если диктор ускоряется из-за волнения или делает короткую паузу.

Однако эта система поддерживает как **Режим распознавания речи**, так и *Режим ручной прокрутки*, что позволяет выбрать лучший вариант для любой ситуации.

Теперь ваши сценарии и настройки автоматически сохраняются локально. Даже если вы закроете приложение и откроете его снова, вы сможете начать прямо с того места, где остановились.

Спасибо.`,

    'vi-VN': `Xin chào mọi người. Hôm nay tôi muốn giới thiệu hệ thống máy nhắc chữ kích hoạt bằng giọng nói của chúng tôi.

Máy nhắc chữ truyền thống cuộn ở tốc độ cố định, điều này có thể gây ra vấn đề đồng bộ hóa nếu người nói tăng tốc do lo lắng hoặc tạm dừng một chút.

Tuy nhiên, hệ thống này hỗ trợ cả **Chế độ Nhận dạng Giọng nói** và *Chế độ Cuộn Thủ công*, cho phép bạn chọn tùy chọn tốt nhất cho mọi tình huống.

Giờ đây, kịch bản và cài đặt của bạn sẽ tự động được lưu cục bộ. Ngay cả khi bạn đóng ứng dụng và mở lại, bạn có thể bắt đầu ngay tại nơi bạn đã dừng lại.

Cảm ơn.`,

    'th-TH': `สวัสดีทุกคน วันนี้ฉันอยากจะแนะนำระบบ teleprompter ที่สั่งงานด้วยเสียงของเรา

Teleprompter แบบดั้งเดิมจะเลื่อนด้วยความเร็วคงที่ ซึ่งอาจทำให้เกิดปัญหาการซิงโครไนซ์หากผู้พูดพูดเร็วขึ้นเนื่องจากความประหม่าหรือหยุดชั่วคราว

อย่างไรก็ตาม ระบบนี้รองรับทั้ง **โหมดการจดจำเสียง** และ *โหมดการเลื่อนด้วยตนเอง* ช่วยให้คุณเลือกตัวเลือกที่ดีที่สุดสำหรับทุกสถานการณ์

ตอนนี้ สคริปต์และการตั้งค่าของคุณจะถูกบันทึกไว้ในเครื่องโดยอัตโนมัติ แม้ว่าคุณจะปิดแอปและเปิดใหม่ คุณก็สามารถเริ่มได้จากจุดที่คุณค้างไว้

ขอบคุณ`,

    'id-ID': `Halo semuanya. Hari ini saya ingin memperkenalkan sistem teleprompter yang diaktifkan dengan suara kami.

Teleprompter tradisional bergulir dengan kecepatan tetap, yang dapat menyebabkan masalah sinkronisasi jika pembicara mempercepat karena gugup atau berhenti sebentar.

Namun, sistem ini mendukung **Mode Pengenalan Suara** dan *Mode Gulir Manual*, memungkinkan Anda memilih opsi terbaik untuk situasi apa pun.

Sekarang, naskah dan pengaturan Anda disimpan secara otomatis secara lokal. Bahkan jika Anda menutup aplikasi dan membukanya kembali, Anda dapat memulai tepat di tempat Anda tinggalkan.

Terima kasih.`,

    'zh-CN': `大家好。今天我想介绍一下利用语音识别技术的提词器系统。

传统的提词器只能以固定速度滚动，如果演讲者因紧张而语速加快或暂时停顿，就会出现同步问题。

但是，您现在看到的这个系统支持**语音识别模式**和*手动滚动模式*，您可以根据情况进行选择。

现在，您的脚本和设置将自动保存在本地。即使关闭应用程序并重新打开，也可以从上次的工作状态重新开始。

通过设置菜单，您可以自由更改字体大小、字间距和字体，为演讲者创造最舒适的阅读环境。

现在，无需复杂的操作，只需专注于与听众的交流。谢谢。`
};

export default defaultScripts;

// @version      1.0.0
// @description  Initialization for ChessKing Tracker

function init() {
    console.log(`[CK Init] init: инициализация скрипта`);

    // Очищаем GM storage
    window.clearGMStorage();

    // Проверяем текущий URL
    const currentUrl = window.location.href;
    console.log(`[CK Init] Текущий URL: ${currentUrl}`);

    // Определяем тип страницы
    const isTaskPage = currentUrl.includes(window.URLS.COURSE) || currentUrl.includes(window.URLS.LEARN);
    const isTestPage = currentUrl.includes(window.URLS.TEST);
    const isLichessPage = currentUrl.includes(window.URLS.LICHESS);

    // Запускаем соответствующие функции
    if (isTaskPage) {
        console.log(`[CK Init] Страница с задачами, запускаем buildUIandStartUpdates`);
        window.buildUIandStartUpdates();
    } else if (isTestPage) {
        console.log(`[CK Init] Тестовая страница, запускаем filterMessages`);
        window.filterMessages();
    } else if (isLichessPage) {
        console.log(`[CK Init] Страница Lichess, запускаем startBerserkControl`);
        window.startBerserkControl();
    } else {
        console.log(`[CK Init] Неизвестный тип страницы`);
    }
}
window.init = init; 
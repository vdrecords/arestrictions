// @version      4.9.0
// @description  Initialization for ChessKing Tracker

function init() {
    console.log(`[CK Init] init: инициализация скрипта`);

    // Очищаем GM storage
    window.clearGMStorage();

    // Проверяем текущий URL
    const currentUrl = window.location.href;
    console.log(`[CK Init] Текущий URL: ${currentUrl}`);

    // Определяем тип страницы
    const URLS = window.URLS;
    const isTaskPage = currentUrl.includes(URLS.COURSE) || currentUrl.includes(URLS.LEARN);
    const isTestPage = currentUrl.includes(URLS.TEST);
    const isLichessPage = currentUrl.includes(URLS.LICHESS);

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
// @version      1.0.0
// @description  Initialization for ChessKing Tracker

import { URLS, LOGGING } from '../config.js';
import { clearGMStorage } from '../storage.js';
import { buildUIandStartUpdates } from './progress-tracker.js';
import { filterMessages } from './message-control.js';
import { startBerserkControl } from './berserk-control.js';

// ==== Функция: init ====
export function init() {
    console.log(`${LOGGING.PREFIXES.INIT} init: инициализация скрипта`);

    // Очищаем GM storage
    clearGMStorage();

    // Проверяем текущий URL
    const currentUrl = window.location.href;
    console.log(`${LOGGING.PREFIXES.INIT} Текущий URL: ${currentUrl}`);

    // Определяем тип страницы
    const isTaskPage = currentUrl.includes(URLS.COURSE) || currentUrl.includes(URLS.LEARN);
    const isTestPage = currentUrl.includes(URLS.TEST);
    const isLichessPage = currentUrl.includes(URLS.LICHESS);

    // Запускаем соответствующие функции
    if (isTaskPage) {
        console.log(`${LOGGING.PREFIXES.INIT} Страница с задачами, запускаем buildUIandStartUpdates`);
        buildUIandStartUpdates();
    } else if (isTestPage) {
        console.log(`${LOGGING.PREFIXES.INIT} Тестовая страница, запускаем filterMessages`);
        filterMessages();
    } else if (isLichessPage) {
        console.log(`${LOGGING.PREFIXES.INIT} Страница Lichess, запускаем startBerserkControl`);
        startBerserkControl();
    } else {
        console.log(`${LOGGING.PREFIXES.INIT} Неизвестный тип страницы`);
    }
} 
// @version      1.0.0
// @description  Initialization for ChessKing Tracker

import { URLS, LOGGING } from '../config.js';
import { clearGMStorage } from '../storage.js';
import { buildUIandStartUpdates } from './progress-tracker.js';
import { filterMessages } from './message-control.js';

// ==== Функция: init ====
export function init() {
    console.log(`${LOGGING.PREFIXES.INIT} init: инициализация скрипта`);

    // Очищаем GM storage
    clearGMStorage();

    // Проверяем текущий URL
    const currentUrl = window.location.href;
    console.log(`${LOGGING.PREFIXES.INIT} Текущий URL: ${currentUrl}`);

    // Определяем тип страницы
    const isTaskPage = currentUrl.includes(URLS.COURSE);
    const isTestPage = currentUrl.includes(URLS.TEST);

    // Запускаем соответствующие функции
    if (isTaskPage) {
        console.log(`${LOGGING.PREFIXES.INIT} Страница с задачами, запускаем buildUIandStartUpdates`);
        buildUIandStartUpdates();
    } else if (isTestPage) {
        console.log(`${LOGGING.PREFIXES.INIT} Тестовая страница, запускаем filterMessages`);
        filterMessages();
    } else {
        console.log(`${LOGGING.PREFIXES.INIT} Неизвестный тип страницы`);
    }
} 
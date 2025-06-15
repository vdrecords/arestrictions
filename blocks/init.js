// @version      1.0.0
// @description  Initialization block for ChessKing Tracker

import { URLS } from '../constants.js';
import { clearGMStorage } from '../storage.js';
import { checkUnlockRemaining } from './unlock-checker.js';
import { buildUIandStartUpdates } from './progress-tracker.js';
import { hideMessages, deleteMessages, filterMessages } from './message-control.js';

// ==== Функция: init ====
export function init() {
    console.log("[Init] init: инициализация скрипта");

    // Очищаем кеш при запуске
    clearGMStorage();

    // Проверяем URL
    const url = window.location.href;
    console.log("[Init] Текущий URL:", url);

    // Блок 1: Глобальная проверка «До разблокировки осталось решить»
    if (url.includes(URLS.COURSE)) {
        checkUnlockRemaining();
    }

    // Блок 2: Трекер прогресса ChessKing
    if (url.includes(URLS.COURSE)) {
        buildUIandStartUpdates();
    }

    // Блок 3: Управление сообщениями
    if (url.includes(URLS.MESSAGES)) {
        hideMessages();
        deleteMessages();
        filterMessages();
    }
} 
// @version      1.0.0
// @description  Storage utilities for ChessKing Tracker

import { STORAGE, LOGGING } from './config.js';

// ==== Функции для работы с GM-хранилищем ====
function writeGMNumber(key, value) {
    if (typeof value !== 'number' || isNaN(value)) {
        console.error(`${LOGGING.PREFIXES.STORAGE} Попытка записать невалидное число в ${key}:`, value);
        return;
    }
    GM.setValue(key, value);
    console.log(`${LOGGING.PREFIXES.STORAGE} Записано в ${key}:`, value);
}
window.writeGMNumber = writeGMNumber;

function readGMNumber(key) {
    const value = GM.getValue(key, 0);
    console.log(`${LOGGING.PREFIXES.STORAGE} Прочитано из ${key}:`, value);
    return value;
}
window.readGMNumber = readGMNumber;

export function writeGMString(key, value) {
    if (typeof value !== 'string') {
        console.error(`${LOGGING.PREFIXES.STORAGE} Попытка записать невалидную строку в ${key}:`, value);
        return;
    }
    GM.setValue(key, value);
    console.log(`${LOGGING.PREFIXES.STORAGE} Записано в ${key}:`, value);
}

export function readGMString(key) {
    const value = GM.getValue(key, '');
    console.log(`${LOGGING.PREFIXES.STORAGE} Прочитано из ${key}:`, value);
    return value;
}

function clearGMStorage() {
    Object.values(STORAGE.KEYS).forEach(key => {
        GM.deleteValue(key);
    });
    console.log(`${LOGGING.PREFIXES.STORAGE} GM-хранилище очищено`);
}
window.clearGMStorage = clearGMStorage; 
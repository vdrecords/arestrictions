// @version      1.0.0
// @description  Storage utilities for ChessKing Tracker

// ==== Функции для работы с GM-хранилищем ====
function writeGMNumber(key, value) {
    if (typeof value !== 'number' || isNaN(value)) {
        console.error(`[CK Storage] Попытка записать невалидное число в ${key}:`, value);
        return;
    }
    GM.setValue(key, value);
    console.log(`[CK Storage] Записано в ${key}:`, value);
}
window.writeGMNumber = writeGMNumber;

function readGMNumber(key) {
    const value = GM.getValue(key, 0);
    console.log(`[CK Storage] Прочитано из ${key}:`, value);
    return value;
}
window.readGMNumber = readGMNumber;

function writeGMString(key, value) {
    if (typeof value !== 'string') {
        console.error(`[CK Storage] Попытка записать невалидную строку в ${key}:`, value);
        return;
    }
    GM.setValue(key, value);
    console.log(`[CK Storage] Записано в ${key}:`, value);
}
window.writeGMString = writeGMString;

function readGMString(key) {
    const value = GM.getValue(key, '');
    console.log(`[CK Storage] Прочитано из ${key}:`, value);
    return value;
}
window.readGMString = readGMString;

function clearGMStorage() {
    Object.values(window.STORAGE.KEYS).forEach(key => {
        GM.deleteValue(key);
    });
    console.log(`[CK Storage] GM-хранилище очищено`);
}
window.clearGMStorage = clearGMStorage; 
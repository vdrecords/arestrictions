// @version      1.0.0
// @description  Unlock checker for ChessKing Tracker

import { SELECTORS, LOGGING } from '../config.js';
import { writeGMNumber } from '../storage.js';

// ==== Функция: checkUnlockRemaining ====
function checkUnlockRemaining() {
    console.log(`${LOGGING.PREFIXES.UNLOCK} checkUnlockRemaining: проверяем оставшиеся задачи для разблокировки`);

    const unlockRemaining = document.querySelector(SELECTORS.UNLOCK_REMAINING);
    if (!unlockRemaining) {
        console.log(`${LOGGING.PREFIXES.UNLOCK} Элемент с оставшимися задачами не найден`);
        return null;
    }

    const text = unlockRemaining.textContent.trim();
    const match = text.match(/\d+/);
    if (!match) {
        console.log(`${LOGGING.PREFIXES.UNLOCK} Не удалось извлечь число из текста: ${text}`);
        return null;
    }

    const remaining = parseInt(match[0]);
    console.log(`${LOGGING.PREFIXES.UNLOCK} Осталось задач для разблокировки: ${remaining}`);

    // Обновляем кеш
    writeGMNumber('ck_unlock_remaining', remaining);
    console.log(`${LOGGING.PREFIXES.UNLOCK} Обновлён кеш unlockRemaining: ${remaining}`);

    // Обновляем title
    const oldTitle = document.title.replace(/^\d+\s·\s/, '');
    document.title = `${remaining} · ${oldTitle}`;
    console.log(`${LOGGING.PREFIXES.UNLOCK} Обновлён title: "${document.title}"`);

    return remaining;
}
window.checkUnlockRemaining = checkUnlockRemaining; 
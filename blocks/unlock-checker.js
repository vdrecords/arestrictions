// @version      1.0.0
// @description  Unlock checker block for ChessKing Tracker

import { SELECTORS } from '../constants.js';
import { writeGMNumber } from '../storage.js';

// ==== Функция: checkUnlockRemaining ====
export function checkUnlockRemaining() {
    console.log("[UnlockChecker] checkUnlockRemaining: проверяем оставшиеся задачи");

    // Получаем unlockRemaining из DOM
    const unlockElem = document.querySelector(SELECTORS.UNLOCK_REMAINING);
    if (!unlockElem) {
        console.log("[UnlockChecker] Элемент unlockRemaining не найден");
        return;
    }

    const unlockRemaining = parseInt(unlockElem.innerText.trim(), 10);
    if (isNaN(unlockRemaining)) {
        console.log("[UnlockChecker] Не удалось распарсить unlockRemaining");
        return;
    }

    // Обновляем кеш
    writeGMNumber('ck_unlock_remaining', unlockRemaining);
    console.log(`[UnlockChecker] Обновлён кеш unlockRemaining: ${unlockRemaining}`);

    // Обновляем title
    const oldTitle = document.title.replace(/^\d+\s·\s/, '');
    document.title = `${unlockRemaining} · ${oldTitle}`;
    console.log(`[UnlockChecker] Обновлён title: "${document.title}"`);
} 
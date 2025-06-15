// @version      4.9.0
// @description  Unlock checker for ChessKing Tracker

function checkUnlockRemaining() {
    const SELECTORS = window.SELECTORS;
    const writeGMNumber = window.writeGMNumber;
    const unlockRemaining = document.querySelector(SELECTORS.UNLOCK_REMAINING);
    if (!unlockRemaining) return null;
    const text = unlockRemaining.textContent.trim();
    const match = text.match(/\d+/);
    if (!match) return null;
    const remaining = parseInt(match[0]);
    writeGMNumber('ck_unlock_remaining', remaining);
    const oldTitle = document.title.replace(/^\d+\s·\s/, '');
    document.title = `${remaining} · ${oldTitle}`;
    return remaining;
}
window.checkUnlockRemaining = checkUnlockRemaining; 
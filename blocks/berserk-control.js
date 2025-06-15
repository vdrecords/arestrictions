// @version      4.9.0
// @description  Berserk control for ChessKing Tracker

function getActionBalance() {
    const STORAGE = window.STORAGE;
    const readGMNumber = window.readGMNumber;
    const solved = readGMNumber(STORAGE.KEYS.SOLVED_TODAY) || 0;
    const cost = readGMNumber(STORAGE.KEYS.ACTIONS_COST) || 0;
    return solved - cost;
}
window.getActionBalance = getActionBalance;

function spendOnAction(actionCost) {
    const STORAGE = window.STORAGE;
    const readGMNumber = window.readGMNumber;
    const writeGMNumber = window.writeGMNumber;
    const currentTotalCost = readGMNumber(STORAGE.KEYS.ACTIONS_COST) || 0;
    writeGMNumber(STORAGE.KEYS.ACTIONS_COST, currentTotalCost + actionCost);
}
window.spendOnAction = spendOnAction;

function initBerserkControl(btn) {
    const BERSERK = window.BERSERK;
    if (btn.dataset.berserkCtrlInit) return;
    btn.dataset.berserkCtrlInit = '1';
    btn.classList.add(BERSERK.UI.BUTTON.CLASS);
    const container = btn.closest(window.SELECTORS.BERSERK.CONTAINER);
    if (!container) return;
    let infoSpan = container.querySelector(`.${BERSERK.UI.INFO_SPAN.CLASS}`);
    if (!infoSpan) {
        infoSpan = document.createElement('span');
        infoSpan.className = BERSERK.UI.INFO_SPAN.CLASS;
        Object.entries(BERSERK.UI.INFO_SPAN.STYLE).forEach(([key, value]) => {
            infoSpan.style[key.toLowerCase()] = value;
        });
        container.appendChild(infoSpan);
    }
    const baseTitle = btn.title || "GO BERSERK!";
    function refresh() {
        const balance = getActionBalance();
        const canAfford = balance >= BERSERK.COST.PER_ACTION;
        btn.disabled = !canAfford;
        infoSpan.textContent = canAfford ? `(цена: ${BERSERK.COST.PER_ACTION})` : `(надо ${BERSERK.COST.PER_ACTION - balance})`;
        infoSpan.style.color = canAfford ? '#158546' : '#b12c2c';
        btn.title = canAfford ? `${baseTitle} (Доступно: ${balance} з.)` : `Нужно еще ${BERSERK.COST.PER_ACTION - balance} з.`;
    }
    refresh();
    btn.addEventListener('click', (e) => {
        if (getActionBalance() < BERSERK.COST.PER_ACTION) {
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }
        spendOnAction(BERSERK.COST.PER_ACTION);
        refresh();
    }, true);
}
window.initBerserkControl = initBerserkControl;

function startBerserkControl() {
    const URLS = window.URLS;
    if (!window.location.hostname.includes(URLS.LICHESS)) return;
    const BERSERK = window.BERSERK;
    const SELECTORS = window.SELECTORS;
    const style = document.createElement('style');
    style.textContent = `.${BERSERK.UI.BUTTON.CLASS}:disabled { ${Object.entries(BERSERK.UI.BUTTON.STYLE.DISABLED).map(([k, v]) => `${k}: ${v}`).join(';')} }`;
    document.head.appendChild(style);
    const observer = new MutationObserver(() => {
        document.querySelectorAll(`${SELECTORS.BERSERK.BUTTON}:not([data-berserk-ctrl-init])`).forEach(initBerserkControl);
    });
    const startObserver = () => observer.observe(document.body, { childList: true, subtree: true });
    if (document.body) {
        startObserver();
    } else {
        document.addEventListener('DOMContentLoaded', startObserver);
    }
}
window.startBerserkControl = startBerserkControl; 
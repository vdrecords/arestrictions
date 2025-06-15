// @version      4.9.0
// @description  Progress tracker for ChessKing Tracker

function buildUIandStartUpdates() {
    window.createOverlay();
    fetchAndUpdate();
    setInterval(fetchAndUpdate, 60000);
}
window.buildUIandStartUpdates = buildUIandStartUpdates;

function fetchAndUpdate() {
    const SELECTORS = window.SELECTORS;
    const STORAGE = window.STORAGE;
    const readGMNumber = window.readGMNumber;
    const writeGMNumber = window.writeGMNumber;
    const checkUnlockRemaining = window.checkUnlockRemaining;
    const drawGraph = window.drawGraph;
    const updateMetrics = window.updateMetrics;
    // Получаем текущие значения
    const solvedToday = parseInt(document.querySelector(SELECTORS.SOLVED_TODAY).textContent.trim(), 10);
    const unlockRemaining = checkUnlockRemaining();
    // Получаем предыдущие значения из кеша
    const prevSolvedToday = readGMNumber(STORAGE.KEYS.SOLVED_TODAY) || 0;
    const prevUnlockRemaining = readGMNumber(STORAGE.KEYS.UNLOCK_REMAINING) || 0;
    // Вычисляем разницу
    const solvedDiff = solvedToday - prevSolvedToday;
    // Обновляем кеш
    writeGMNumber(STORAGE.KEYS.SOLVED_TODAY, solvedToday);
    writeGMNumber(STORAGE.KEYS.UNLOCK_REMAINING, unlockRemaining);
    // Обновляем график
    let graphDiffs = readGMNumber(STORAGE.KEYS.GRAPH_DIFFS) || [];
    if (!Array.isArray(graphDiffs)) graphDiffs = [];
    graphDiffs.push(solvedDiff);
    if (graphDiffs.length > 10) graphDiffs.shift();
    writeGMNumber(STORAGE.KEYS.GRAPH_DIFFS, graphDiffs);
    drawGraph(graphDiffs);
    // Обновляем метрики
    const avgPerMin = (graphDiffs.reduce((a, b) => a + b, 0) / graphDiffs.length).toFixed(1);
    const remainingTimeText = solvedDiff > 0 ? `~${Math.ceil(unlockRemaining / Math.abs(solvedDiff))} мин` : '∞';
    const nextThousand = Math.ceil(solvedToday / 1000) * 1000;
    const milestoneText = `${nextThousand - solvedToday}`;
    const data = {
        solvedToday,
        unlockRemaining,
        avgPerMin,
        remainingTimeText,
        milestoneText,
        nextTh: nextThousand
    };
    updateMetrics(data);
}
window.fetchAndUpdate = fetchAndUpdate; 
// @version      4.9.0
// @description  Progress tracker for ChessKing Tracker

function buildUIandStartUpdates() {
    window.createOverlay();
    fetchAndUpdate();
    setInterval(fetchAndUpdate, 60000);
}
window.buildUIandStartUpdates = buildUIandStartUpdates;

function fetchAndUpdate() {
    const getCourseStats = window.getCourseStats;
    const drawGraph = window.drawGraph;
    const updateMetrics = window.updateMetrics;
    const readGMNumber = window.readGMNumber;
    const writeGMNumber = window.writeGMNumber;
    const STORAGE = window.STORAGE;

    const stats = getCourseStats();
    if (!stats) return;
    const { solvedToday, unlockRemaining, totalTasks, totalSolved } = stats;

    // Получаем предыдущие значения из кеша
    let prevSolvedToday = Number(readGMNumber(STORAGE.KEYS.SOLVED_TODAY)) || 0;
    let currSolvedToday = Number(solvedToday) || 0;
    const solvedDiff = currSolvedToday - prevSolvedToday;

    // Обновляем кеш
    writeGMNumber(STORAGE.KEYS.SOLVED_TODAY, currSolvedToday);
    writeGMNumber(STORAGE.KEYS.UNLOCK_REMAINING, unlockRemaining);
    // Обновляем график
    let graphDiffs = readGMNumber(STORAGE.KEYS.GRAPH_DIFFS) || [];
    if (!Array.isArray(graphDiffs)) graphDiffs = [];
    if (!isNaN(solvedDiff)) {
        graphDiffs.push(solvedDiff);
        if (graphDiffs.length > 10) graphDiffs.shift();
        writeGMNumber(STORAGE.KEYS.GRAPH_DIFFS, graphDiffs);
    }
    drawGraph(graphDiffs);
    // Обновляем метрики
    const avgPerMin = (graphDiffs.length ? (graphDiffs.reduce((a, b) => a + b, 0) / graphDiffs.length) : 0).toFixed(1);
    const remainingTimeText = solvedDiff > 0 ? `~${Math.ceil(unlockRemaining / Math.abs(solvedDiff))} мин` : '∞';
    const nextThousand = Math.ceil(currSolvedToday / 1000) * 1000;
    const milestoneText = `${nextThousand - currSolvedToday}`;
    const remainingTasks = (typeof totalTasks === 'number' && typeof totalSolved === 'number') ? (totalTasks - totalSolved) : 0;
    const data = {
        solvedToday: currSolvedToday,
        unlockRemaining,
        avgPerMin,
        remainingTimeText,
        milestoneText,
        nextTh: nextThousand,
        remainingTasks
    };
    updateMetrics(data);
}
window.fetchAndUpdate = fetchAndUpdate; 
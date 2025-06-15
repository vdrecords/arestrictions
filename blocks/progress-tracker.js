// @version      4.9.0
// @description  Progress tracker for ChessKing Tracker

function buildUIandStartUpdates() {
    window.createOverlay();
    fetchAndUpdate();
    setInterval(fetchAndUpdate, 60000);
}
window.buildUIandStartUpdates = buildUIandStartUpdates;

let sessionGraphDiffs = [];

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

    let prevSolvedToday = Number(readGMNumber(STORAGE.KEYS.SOLVED_TODAY)) || 0;
    let currSolvedToday = Number(solvedToday) || 0;
    const solvedDiff = currSolvedToday - prevSolvedToday;

    writeGMNumber(STORAGE.KEYS.SOLVED_TODAY, currSolvedToday);
    writeGMNumber(STORAGE.KEYS.UNLOCK_REMAINING, unlockRemaining);

    // Работаем только с переменной сессии
    if (!isNaN(solvedDiff)) {
        sessionGraphDiffs.push(solvedDiff);
        if (sessionGraphDiffs.length > 10) sessionGraphDiffs.shift();
    }
    drawGraph(sessionGraphDiffs);

    const avgPerMin = (sessionGraphDiffs.length ? (sessionGraphDiffs.reduce((a, b) => a + b, 0) / sessionGraphDiffs.length) : 0).toFixed(1);
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
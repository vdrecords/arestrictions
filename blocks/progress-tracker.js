// @version      1.0.0
// @description  Progress tracker for ChessKing Tracker

import { SELECTORS, STORAGE, LOGGING } from '../config.js';
import { writeGMNumber, readGMNumber } from '../storage.js';
import { createOverlay, drawGraph, updateMetrics } from '../ui.js';
import { checkUnlockRemaining } from './unlock-checker.js';
import { getCourseStats } from '../api.js';

// ==== Функция: buildUIandStartUpdates ====
function buildUIandStartUpdates() {
    console.log(`${LOGGING.PREFIXES.PROGRESS} buildUIandStartUpdates: создаём UI и запускаем обновления`);

    // Создаём overlay
    createOverlay();

    // Запускаем обновления
    fetchAndUpdate();
    setInterval(fetchAndUpdate, 60000);
}
window.buildUIandStartUpdates = buildUIandStartUpdates;

// ==== Функция: fetchAndUpdate ====
function fetchAndUpdate() {
    console.log(`${LOGGING.PREFIXES.PROGRESS} fetchAndUpdate: обновляем данные`);

    // Получаем текущие значения через getCourseStats
    const stats = getCourseStats();
    if (!stats) {
        console.log(`${LOGGING.PREFIXES.PROGRESS} Нет данных для обновления`);
        return;
    }
    const { solvedToday, unlockRemaining, totalTasks } = stats;

    // Получаем предыдущие значения из кеша
    const prevSolvedToday = readGMNumber(STORAGE.KEYS.SOLVED_TODAY) || 0;
    const prevUnlockRemaining = readGMNumber(STORAGE.KEYS.UNLOCK_REMAINING) || 0;

    // Вычисляем разницу
    const solvedDiff = solvedToday - prevSolvedToday;
    const unlockDiff = unlockRemaining - prevUnlockRemaining;

    // Обновляем кеш
    writeGMNumber(STORAGE.KEYS.SOLVED_TODAY, solvedToday);
    writeGMNumber(STORAGE.KEYS.UNLOCK_REMAINING, unlockRemaining);

    // Обновляем график
    const graphDiffs = readGMNumber(STORAGE.KEYS.GRAPH_DIFFS) || [];
    graphDiffs.push(solvedDiff);
    if (graphDiffs.length > 10) {
        graphDiffs.shift();
    }
    writeGMNumber(STORAGE.KEYS.GRAPH_DIFFS, graphDiffs);
    drawGraph(graphDiffs);

    // Обновляем метрики
    const avgPerMin = (graphDiffs.reduce((a, b) => a + b, 0) / graphDiffs.length).toFixed(1);
    
    // Если все задачи решены, показываем "Разблокировано"
    const remainingTimeText = unlockRemaining === 0 ? 
        'Разблокировано' : 
        (unlockDiff < 0 ? 
            `~${Math.ceil(unlockRemaining / Math.abs(unlockDiff))} мин` : 
            '∞');

    // Вычисляем до следующей тысячи
    const nextThousand = totalTasks ? Math.ceil(solvedToday / 1000) * 1000 : 0;
    const milestoneText = unlockRemaining === 0 ? 
        'Все задачи решены' : 
        `${nextThousand - solvedToday}`;

    const data = {
        solvedToday,
        unlockRemaining,
        avgPerMin,
        remainingTimeText,
        remainingTasks: unlockRemaining,
        milestoneText,
        nextTh: nextThousand
    };

    updateMetrics(data);

    console.log(`${LOGGING.PREFIXES.PROGRESS} Данные обновлены:`, data);
}
window.fetchAndUpdate = fetchAndUpdate; 
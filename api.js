// @version      1.0.0
// @description  API and data utilities for ChessKing Tracker

import { URLS, SELECTORS, STORAGE, LOGGING } from './config.js';
import { writeGMNumber, readGMNumber } from './storage.js';

// ==== Функция: fetchCourseDataViaGM ====
export async function fetchCourseDataViaGM(forceFetch = false) {
    console.log(`${LOGGING.PREFIXES.API} fetchCourseDataViaGM: forceFetch =`, forceFetch);

    // Проверяем, есть ли кеш и не устарел ли он
    const cachedTimestamp = readGMNumber(STORAGE.KEYS.TIMESTAMP);
    const now = Date.now();
    const cacheAge = now - cachedTimestamp;
    const cacheValid = cacheAge < STORAGE.CACHE_TTL;

    if (!forceFetch && cacheValid) {
        console.log(`${LOGGING.PREFIXES.API} Используем кеш (возраст:`, Math.round(cacheAge / 1000), "сек)");
        return {
            totalSolved: readGMNumber(STORAGE.KEYS.TOTAL_SOLVED),
            solvedToday: readGMNumber(STORAGE.KEYS.SOLVED_TODAY),
            unlockRemaining: readGMNumber(STORAGE.KEYS.UNLOCK_REMAINING)
        };
    }

    // Если кеш устарел или forceFetch=true, делаем fetch
    console.log(`${LOGGING.PREFIXES.API} Делаем fetch (кеш устарел или forceFetch=true)`);
    try {
        const response = await fetch(URLS.API);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(`${LOGGING.PREFIXES.API} Получены данные:`, data);

        // Обновляем кеш
        writeGMNumber(STORAGE.KEYS.TOTAL_SOLVED, data.totalSolved);
        writeGMNumber(STORAGE.KEYS.SOLVED_TODAY, data.solvedToday);
        writeGMNumber(STORAGE.KEYS.UNLOCK_REMAINING, data.unlockRemaining);
        writeGMNumber(STORAGE.KEYS.TIMESTAMP, now);

        return {
            totalSolved: data.totalSolved,
            solvedToday: data.solvedToday,
            unlockRemaining: data.unlockRemaining
        };
    } catch (error) {
        console.error(`${LOGGING.PREFIXES.API} Ошибка при fetch:`, error);
        // В случае ошибки возвращаем кешированные данные, если они есть
        if (cachedTimestamp) {
            console.log(`${LOGGING.PREFIXES.API} Возвращаем устаревшие кешированные данные`);
            return {
                totalSolved: readGMNumber(STORAGE.KEYS.TOTAL_SOLVED),
                solvedToday: readGMNumber(STORAGE.KEYS.SOLVED_TODAY),
                unlockRemaining: readGMNumber(STORAGE.KEYS.UNLOCK_REMAINING)
            };
        }
        return null;
    }
}

// ==== Функция: getCourseStats ====
export function getCourseStats() {
    console.log(`${LOGGING.PREFIXES.API} getCourseStats: получаем статистику из DOM`);

    let totalSolved = 0;
    let solvedToday = 0;
    let unlockRemaining = 0;
    let totalTasks = 0;

    try {
        // Получаем totalSolved и totalTasks из DOM
        const solvedElem = document.querySelector(SELECTORS.TOTAL_TASKS);
        if (solvedElem) {
            const parts = solvedElem.innerText.split('/');
            if (parts[0] && parts[1]) {
                const solved = parseInt(parts[0].trim(), 10);
                const total = parseInt(parts[1].trim(), 10);
                if (!isNaN(solved)) totalSolved = solved;
                if (!isNaN(total)) totalTasks = total;
            }
        }

        // Получаем unlockRemaining из DOM
        const unlockElem = document.querySelector(SELECTORS.UNLOCK_REMAINING);
        if (unlockElem) {
            const t = parseInt(unlockElem.innerText.trim(), 10);
            if (!isNaN(t)) unlockRemaining = t;
        }

        // Вычисляем solvedToday
        const cachedTotal = readGMNumber(STORAGE.KEYS.TOTAL_SOLVED);
        if (cachedTotal > 0) {
            solvedToday = totalSolved - cachedTotal;
            if (solvedToday < 0) solvedToday = 0;
        }

        // Если все задачи решены, устанавливаем unlockRemaining в 0
        if (totalSolved === totalTasks && totalTasks > 0) {
            unlockRemaining = 0;
        }

        console.log(`${LOGGING.PREFIXES.API} Статистика: totalSolved=${totalSolved}, totalTasks=${totalTasks}, solvedToday=${solvedToday}, unlockRemaining=${unlockRemaining}`);
        return { totalSolved, totalTasks, solvedToday, unlockRemaining };
    } catch (error) {
        console.error(`${LOGGING.PREFIXES.API} Ошибка при получении статистики:`, error);
        return null;
    }
} 
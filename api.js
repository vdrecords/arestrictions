// @version      1.0.0
// @description  API and data utilities for ChessKing Tracker

import { URLS, SELECTORS } from './constants.js';
import { writeGMNumber, readGMNumber } from './storage.js';

// ==== Функция: fetchCourseDataViaGM ====
export async function fetchCourseDataViaGM(forceFetch = false) {
    console.log("[API] fetchCourseDataViaGM: forceFetch =", forceFetch);

    // Проверяем, есть ли кеш и не устарел ли он
    const cachedTimestamp = readGMNumber('ck_timestamp');
    const now = Date.now();
    const cacheAge = now - cachedTimestamp;
    const cacheValid = cacheAge < 60000; // 1 минута

    if (!forceFetch && cacheValid) {
        console.log("[API] Используем кеш (возраст:", Math.round(cacheAge / 1000), "сек)");
        return {
            totalSolved: readGMNumber('ck_total_solved'),
            solvedToday: readGMNumber('ck_solved_today'),
            unlockRemaining: readGMNumber('ck_unlock_remaining')
        };
    }

    // Если кеш устарел или forceFetch=true, делаем fetch
    console.log("[API] Делаем fetch (кеш устарел или forceFetch=true)");
    try {
        const response = await fetch(URLS.API);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("[API] Получены данные:", data);

        // Обновляем кеш
        writeGMNumber('ck_total_solved', data.totalSolved);
        writeGMNumber('ck_solved_today', data.solvedToday);
        writeGMNumber('ck_unlock_remaining', data.unlockRemaining);
        writeGMNumber('ck_timestamp', now);

        return {
            totalSolved: data.totalSolved,
            solvedToday: data.solvedToday,
            unlockRemaining: data.unlockRemaining
        };
    } catch (error) {
        console.error("[API] Ошибка при fetch:", error);
        return null;
    }
}

// ==== Функция: getCourseStats ====
export function getCourseStats() {
    console.log("[API] getCourseStats: получаем статистику из DOM");

    let totalSolved = 0;
    let solvedToday = 0;
    let unlockRemaining = 0;

    // Получаем totalSolved из DOM
    const solvedElem = document.querySelector(SELECTORS.SOLVED_STATS);
    if (solvedElem) {
        const parts = solvedElem.innerText.split('/');
        if (parts[0]) {
            const t = parseInt(parts[0].trim(), 10);
            if (!isNaN(t)) totalSolved = t;
        }
    }

    // Получаем unlockRemaining из DOM
    const unlockElem = document.querySelector(SELECTORS.UNLOCK_REMAINING);
    if (unlockElem) {
        const t = parseInt(unlockElem.innerText.trim(), 10);
        if (!isNaN(t)) unlockRemaining = t;
    }

    // Вычисляем solvedToday
    const cachedTotal = readGMNumber('ck_total_solved');
    if (cachedTotal > 0) {
        solvedToday = totalSolved - cachedTotal;
        if (solvedToday < 0) solvedToday = 0;
    }

    console.log(`[API] Статистика: totalSolved=${totalSolved}, solvedToday=${solvedToday}, unlockRemaining=${unlockRemaining}`);
    return { totalSolved, solvedToday, unlockRemaining };
} 
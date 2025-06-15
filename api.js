// @version      4.9.0
// @description  API and data utilities for ChessKing Tracker

function fetchCourseDataViaGM(forceFetch = false) {
    const STORAGE = window.STORAGE;
    const URLS = window.URLS;
    const readGMNumber = window.readGMNumber;
    const writeGMNumber = window.writeGMNumber;
    const cachedTimestamp = readGMNumber(STORAGE.KEYS.TIMESTAMP);
    const now = Date.now();
    const cacheAge = now - cachedTimestamp;
    const cacheValid = cacheAge < STORAGE.CACHE_TTL;

    if (!forceFetch && cacheValid) {
        return {
            totalSolved: readGMNumber(STORAGE.KEYS.TOTAL_SOLVED),
            solvedToday: readGMNumber(STORAGE.KEYS.SOLVED_TODAY),
            unlockRemaining: readGMNumber(STORAGE.KEYS.UNLOCK_REMAINING)
        };
    }
    try {
        return fetch(URLS.API)
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                return response.json();
            })
            .then(data => {
                writeGMNumber(STORAGE.KEYS.TOTAL_SOLVED, data.totalSolved);
                writeGMNumber(STORAGE.KEYS.SOLVED_TODAY, data.solvedToday);
                writeGMNumber(STORAGE.KEYS.UNLOCK_REMAINING, data.unlockRemaining);
                writeGMNumber(STORAGE.KEYS.TIMESTAMP, now);
                return {
                    totalSolved: data.totalSolved,
                    solvedToday: data.solvedToday,
                    unlockRemaining: data.unlockRemaining
                };
            })
            .catch(error => {
                if (cachedTimestamp) {
                    return {
                        totalSolved: readGMNumber(STORAGE.KEYS.TOTAL_SOLVED),
                        solvedToday: readGMNumber(STORAGE.KEYS.SOLVED_TODAY),
                        unlockRemaining: readGMNumber(STORAGE.KEYS.UNLOCK_REMAINING)
                    };
                }
                return null;
            });
    } catch (error) {
        return null;
    }
}
window.fetchCourseDataViaGM = fetchCourseDataViaGM;

function getCourseStats() {
    const SELECTORS = window.SELECTORS;
    const STORAGE = window.STORAGE;
    const readGMNumber = window.readGMNumber;
    const writeGMNumber = window.writeGMNumber;
    let totalSolved = 0;
    let solvedToday = 0;
    let unlockRemaining = 0;
    let totalTasks = 0;
    try {
        const solvedElem = document.querySelector(SELECTORS.TOTAL_TASKS);
        if (solvedElem) {
            const parts = solvedElem.innerText.split('/');
            if (parts[0] && parts[1]) {
                const solved = parseInt(parts[0].trim(), 10);
                const total = parseInt(parts[1].trim(), 10);
                if (!isNaN(solved)) totalSolved = solved;
                if (!isNaN(total)) {
                    totalTasks = total;
                    writeGMNumber(STORAGE.KEYS.TOTAL_TASKS, totalTasks);
                    console.log('[CK DEBUG] totalTasks записан в хранилище:', totalTasks);
                }
            }
        } else {
            // Всегда берем из хранилища, если не нашли на странице
            totalTasks = readGMNumber(STORAGE.KEYS.TOTAL_TASKS) || 0;
            totalSolved = readGMNumber(STORAGE.KEYS.TOTAL_SOLVED) || 0;
            console.log('[CK DEBUG] totalTasks из хранилища:', totalTasks);
            console.log('[CK DEBUG] totalSolved из хранилища:', totalSolved);
        }
        const unlockElem = document.querySelector(SELECTORS.UNLOCK_REMAINING);
        if (unlockElem) {
            const t = parseInt(unlockElem.innerText.trim(), 10);
            if (!isNaN(t)) unlockRemaining = t;
        }
        const cachedTotal = readGMNumber(STORAGE.KEYS.TOTAL_SOLVED);
        if (cachedTotal > 0) {
            solvedToday = totalSolved - cachedTotal;
            if (solvedToday < 0) solvedToday = 0;
        }
        if (totalSolved === totalTasks && totalTasks > 0) {
            unlockRemaining = 0;
        }
        return { totalSolved, totalTasks, solvedToday, unlockRemaining };
    } catch (error) {
        return null;
    }
}
window.getCourseStats = getCourseStats; 
// @version      1.0.0
// @description  Progress tracker block for ChessKing Tracker

import { URLS, UI } from '../constants.js';
import { fetchCourseDataViaGM } from '../api.js';
import { createOverlay, drawGraph, updateMetrics } from '../ui.js';

// ==== Функция: buildUIandStartUpdates ====
export function buildUIandStartUpdates() {
    console.log("[ProgressTracker] buildUIandStartUpdates: строим UI и запускаем fetchAndUpdate()");

    // Создаём overlay
    createOverlay();

    // Проверяем, находимся ли мы на странице с задачами
    const isTaskPage = window.location.href.includes(URLS.COURSE);

    function fetchAndUpdate() {
        console.log("[ProgressTracker][fetchAndUpdate] Запуск fetch + обновление UI");
        
        if (isTaskPage) {
            // На странице с задачами - обновляем реальные данные
            fetchCourseDataViaGM(true).then(data => {
                if (!data) {
                    console.log("[ProgressTracker][fetchAndUpdate] fetch вернул null");
                    return;
                }
                const { totalSolved, solvedToday, unlockRemaining } = data;

                // ==== Обновляем <title> ====
                const oldTitle = document.title.replace(/^\d+\s·\s/, '');
                document.title = `${unlockRemaining} · ${oldTitle}`;
                console.log(`[ProgressTracker][fetchAndUpdate] Обновлён title: "${document.title}"`);

                // ==== История totalSolved для графика ====
                let readings = [];
                try {
                    readings = JSON.parse(localStorage.getItem('ck_readings') || '[]');
                } catch {
                    readings = [];
                }
                readings.push({ time: new Date().toISOString(), solved: totalSolved });
                if (readings.length > 60) readings = readings.slice(-60);
                localStorage.setItem('ck_readings', JSON.stringify(readings));
                console.log(`[ProgressTracker][fetchAndUpdate] Добавили чтение: time=${readings.slice(-1)[0].time}, solved=${readings.slice(-1)[0].solved}`);

                // ==== Вычисляем diffs (интервал ≤ 90 сек) ====
                const diffs = [];
                for (let i = 1; i < readings.length; i++) {
                    const t0 = new Date(readings[i - 1].time).getTime();
                    const t1 = new Date(readings[i].time).getTime();
                    if (t1 - t0 <= 90000) {
                        diffs.push(readings[i].solved - readings[i - 1].solved);
                    }
                }
                console.log(`[ProgressTracker][fetchAndUpdate] diffs (последние 5): ${diffs.slice(-5)}`);
                const graphDiffs = diffs.length > 30 ? diffs.slice(-30) : diffs;

                // ==== Средняя скорость (медиана последних 10, без подряд 0) ====
                let lastTen = diffs.length > 10 ? diffs.slice(-10) : diffs;
                const filtered = [];
                for (let i = 0; i < lastTen.length; i++) {
                    if (lastTen[i] === 0 && i > 0 && lastTen[i - 1] === 0) continue;
                    filtered.push(lastTen[i]);
                }
                if (filtered.length === 0) filtered.push(...lastTen);

                let avgPerMin = 0;
                if (filtered.length) {
                    const sorted = [...filtered].sort((a, b) => a - b);
                    const mid = Math.floor(sorted.length / 2);
                    avgPerMin = (sorted.length % 2)
                        ? sorted[mid]
                        : (sorted[mid - 1] + sorted[mid]) / 2;
                    avgPerMin = Math.round(avgPerMin);
                }
                console.log(`[ProgressTracker][fetchAndUpdate] avgPerMin=${avgPerMin}`);

                // ==== Максимальная скорость (из положительных > avgPerMin) ====
                const positives = lastTen.filter(x => x > 0);
                const candidateMax = positives.filter(x => x > avgPerMin);
                let maxPerMin = 0;
                if (candidateMax.length) {
                    maxPerMin = Math.max(...candidateMax);
                } else if (positives.length) {
                    maxPerMin = Math.max(...positives);
                }
                console.log(`[ProgressTracker][fetchAndUpdate] maxPerMin=${maxPerMin}`);

                // ==== Общее число задач и оставшиеся задачи ====
                let totalCount = 0;
                const solvedElem = document.querySelector('span.course-overview__stats-item[title*="Решенное"] span');
                if (solvedElem) {
                    const parts = solvedElem.innerText.split('/');
                    if (parts[1]) {
                        const t = parseInt(parts[1].trim(), 10);
                        if (!isNaN(t)) totalCount = t;
                    }
                }
                const remainingTasks = totalCount - totalSolved;
                console.log(`[ProgressTracker][fetchAndUpdate] totalCount=${totalCount}, remainingTasks=${remainingTasks}`);

                let remainingTimeText = "нет данных";
                if (maxPerMin > 0) {
                    const minsLeft = remainingTasks / maxPerMin;
                    const h = Math.floor(minsLeft / 60);
                    const m = Math.round(minsLeft % 60);
                    remainingTimeText = `${h} ч ${m} мин`;
                }
                console.log(`[ProgressTracker][fetchAndUpdate] remainingTimeText="${remainingTimeText}"`);

                const nextTh = Math.ceil(totalSolved / 1000) * 1000;
                const toNext = nextTh - totalSolved;
                let milestoneText = "нет данных";
                if (maxPerMin > 0) {
                    const m2 = toNext / maxPerMin;
                    const h2 = Math.floor(m2 / 60);
                    const m3 = Math.round(m2 % 60);
                    milestoneText = `${h2} ч ${m3} мин`;
                }
                console.log(`[ProgressTracker][fetchAndUpdate] milestoneText="${milestoneText}"`);

                // Обновляем UI
                drawGraph(graphDiffs);
                updateMetrics({
                    solvedToday,
                    unlockRemaining,
                    avgPerMin,
                    remainingTimeText,
                    remainingTasks,
                    milestoneText,
                    nextTh
                });
                console.log("[ProgressTracker] UI обновлён");
            });
        } else {
            // На других страницах - показываем тестовые данные
            drawGraph([], true);
            updateMetrics(null, true);
        }
    }

    // Запускаем fetchAndUpdate сразу и затем по таймеру
    fetchAndUpdate();
    setInterval(fetchAndUpdate, UI.UPDATE_INTERVAL);
} 
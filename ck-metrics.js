// ==UserScript==
// @name         CK Metrics Module
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Метрики для ChessKing Tracker (модуль)
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    window.generateTestMetrics = function() {
        const solvedToday = Math.floor(Math.random() * 200 + 100);
        const unlockRemaining = Math.floor(Math.random() * 100 + 1);
        const avgPerMin = (Math.random() * 10).toFixed(1);
        const remainingTimeText = Math.random() > 0.5 ? '∞' : `~${Math.floor(Math.random() * 60)} мин`;
        const milestoneText = Math.floor(Math.random() * 1000);
        return { solvedToday, unlockRemaining, avgPerMin, remainingTimeText, milestoneText };
    };

    window.updateTestMetrics = function(data) {
        const metrics = document.getElementById('ck-metrics');
        if (metrics) {
            metrics.innerHTML = `
                <div>Решено задач сегодня: <strong>${data.solvedToday}</strong></div>
                <div>До разблокировки осталось решить: <strong>${data.unlockRemaining}</strong></div>
                <div>Средняя скорость: <strong>${data.avgPerMin}</strong> задач/мин</div>
                <div>Оставшееся время: <strong>${data.remainingTimeText}</strong></div>
                <div>Задач осталось: <strong>${data.unlockRemaining}</strong></div>
                <div>До следующей тысячи решённых задач осталось: <strong>${data.milestoneText}</strong></div>
            `;
            console.log('[CK TEST] updateTestMetrics: метрики обновлены', data);
        }
    };
})(); 
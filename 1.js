// ==UserScript==
// @name         Global Redirect & ChessKing Tracker & Message Control (GM-хранилище для кеша)
// @namespace    http://tampermonkey.net/
// @version      4.8.13
// @description  Тест: overlay, график (модуль), метрики, автообновление
// @author       vd
// @match        https://chessking.com/*
// @match        https://learn.chessking.com/*
// @match        https://lichess.org/*
// @grant        none
// @require      https://raw.githubusercontent.com/vdrecords/arestrictions/main/ck-graph.js
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';
    
    let graphDiffs = [];

    // Overlay
    function createOverlay() {
        console.log('[CK TEST] createOverlay: создаём overlay');
        let overlay = document.getElementById('ck-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'ck-overlay';
            overlay.style.position = 'fixed';
            overlay.style.top = '10px';
            overlay.style.right = '10px';
            overlay.style.background = 'rgba(255,255,255,0.9)';
            overlay.style.padding = '10px';
            overlay.style.borderRadius = '5px';
            overlay.style.boxShadow = '0 0 10px rgba(0,0,0,0.2)';
            overlay.style.zIndex = '9999';
            overlay.style.fontFamily = 'Arial, sans-serif';
            overlay.style.fontSize = '14px';
            overlay.style.color = '#333';
            overlay.innerHTML = '<strong>Тестовый график и метрики</strong><br/>';
            document.body.appendChild(overlay);
        }
        // Метрики
        let metrics = document.getElementById('ck-metrics');
        if (!metrics) {
            metrics = document.createElement('div');
            metrics.id = 'ck-metrics';
            metrics.style.marginTop = '10px';
            metrics.style.lineHeight = '1.5';
            overlay.appendChild(metrics);
        }
        return overlay;
    }

    // Метрики (тестовые данные)
    function updateMetrics(data) {
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
            console.log('[CK TEST] updateMetrics: метрики обновлены', data);
        }
    }

    // Генерация тестовых данных
    function generateTestData() {
        const solvedToday = Math.floor(Math.random() * 200 + 100);
        const unlockRemaining = Math.floor(Math.random() * 100 + 1);
        const avgPerMin = (Math.random() * 10).toFixed(1);
        const remainingTimeText = Math.random() > 0.5 ? '∞' : `~${Math.floor(Math.random() * 60)} мин`;
        const milestoneText = Math.floor(Math.random() * 1000);
        return { solvedToday, unlockRemaining, avgPerMin, remainingTimeText, milestoneText };
    }

    // Основная функция обновления
    function updateAll() {
        // Добавляем новое значение в график
        const diff = Math.floor(Math.random() * 20 + 1);
        graphDiffs.push(diff);
        if (graphDiffs.length > 10) graphDiffs.shift();
        window.drawTestGraph(graphDiffs);
        updateMetrics(generateTestData());
    }

    // Запуск теста
    console.log('[CK TEST] Старт теста: overlay, график (модуль), метрики, автообновление');
    createOverlay();
    updateAll();
    setInterval(updateAll, 10000); // каждые 10 секунд
})();





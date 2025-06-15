// ==UserScript==
// @name         Global Redirect & ChessKing Tracker & Message Control (GM-хранилище для кеша)
// @namespace    http://tampermonkey.net/
// @version      4.8.12
// @description  Тест: overlay, график, метрики, автообновление (без зависимостей)
// @author       vd
// @match        https://chessking.com/*
// @match        https://learn.chessking.com/*
// @match        https://lichess.org/*
// @grant        none
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

    // График
    function drawTestGraph() {
        const overlay = createOverlay();
        let canvas = document.getElementById('ck-graph');
        if (!canvas) {
            canvas = document.createElement('canvas');
            canvas.id = 'ck-graph';
            canvas.width = 300;
            canvas.height = 150;
            overlay.appendChild(canvas);
        }
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Ось X
        ctx.beginPath();
        ctx.moveTo(20, canvas.height - 20);
        ctx.lineTo(canvas.width - 20, canvas.height - 20);
        ctx.strokeStyle = '#ccc';
        ctx.stroke();
        // График
        if (graphDiffs.length) {
            const maxDiff = Math.max(...graphDiffs, 1);
            const step = graphDiffs.length > 1 ? (canvas.width - 40) / (graphDiffs.length - 1) : (canvas.width - 40);
            ctx.beginPath();
            for (let i = 0; i < graphDiffs.length; i++) {
                const x = 20 + i * step;
                const y = canvas.height - 20 - (graphDiffs[i] / maxDiff) * (canvas.height - 40);
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.strokeStyle = '#4CAF50';
            ctx.stroke();
            // Точки
            ctx.fillStyle = '#2196F3';
            for (let i = 0; i < graphDiffs.length; i++) {
                const x = 20 + i * step;
                const y = canvas.height - 20 - (graphDiffs[i] / maxDiff) * (canvas.height - 40);
                ctx.beginPath();
                ctx.arc(x, y, 3, 0, 2 * Math.PI);
                ctx.fill();
            }
        }
        ctx.font = '14px Arial';
        ctx.fillStyle = '#666';
        ctx.fillText('Тестовый график', 30, 30);
        console.log('[CK TEST] drawTestGraph: график нарисован', graphDiffs);
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
        drawTestGraph();
        updateMetrics(generateTestData());
    }

    // Запуск теста
    console.log('[CK TEST] Старт теста: overlay, график, метрики, автообновление');
    createOverlay();
    updateAll();
    setInterval(updateAll, 10000); // каждые 10 секунд
})();





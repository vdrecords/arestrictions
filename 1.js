// ==UserScript==
// @name         Global Redirect & ChessKing Tracker & Message Control (GM-хранилище для кеша)
// @namespace    http://tampermonkey.net/
// @version      4.8.11
// @description  Тест: overlay, график, метрики, логи (без зависимостей)
// @author       vd
// @match        https://chessking.com/*
// @match        https://learn.chessking.com/*
// @match        https://lichess.org/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';
    
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
        ctx.beginPath();
        ctx.moveTo(20, 75);
        ctx.lineTo(280, 75);
        ctx.strokeStyle = '#4CAF50';
        ctx.stroke();
        ctx.font = '14px Arial';
        ctx.fillText('Тестовый график', 30, 30);
        console.log('[CK TEST] drawTestGraph: график нарисован');
    }

    // Метрики (тестовые данные)
    function updateMetrics() {
        const metrics = document.getElementById('ck-metrics');
        if (metrics) {
            metrics.innerHTML = `
                <div>Решено задач сегодня: <strong>123</strong></div>
                <div>До разблокировки осталось решить: <strong>77</strong></div>
                <div>Средняя скорость: <strong>5.2</strong> задач/мин</div>
                <div>Оставшееся время: <strong>∞</strong></div>
                <div>Задач осталось: <strong>77</strong></div>
                <div>До следующей тысячи решённых задач осталось: <strong>877</strong></div>
            `;
            console.log('[CK TEST] updateMetrics: метрики обновлены');
        }
    }

    // Запуск теста
    console.log('[CK TEST] Старт теста: overlay, график, метрики');
    createOverlay();
    drawTestGraph();
    updateMetrics();
})();





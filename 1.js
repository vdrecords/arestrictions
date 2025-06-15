// ==UserScript==
// @name         Global Redirect & ChessKing Tracker & Message Control (GM-хранилище для кеша)
// @namespace    http://tampermonkey.net/
// @version      4.8.15
// @description  Тест: overlay, график (модуль), метрики (модуль), автообновление
// @author       vd
// @match        https://chessking.com/*
// @match        https://learn.chessking.com/*
// @match        https://lichess.org/*
// @grant        none
// @require      https://raw.githubusercontent.com/vdrecords/arestrictions/main/ck-graph.js
// @require      https://raw.githubusercontent.com/vdrecords/arestrictions/main/ck-metrics.js
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';
    
    let graphDiffs = [];

    // Overlay
    function createOverlay() {
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

    // Основная функция обновления
    function updateAll() {
        // Добавляем новое значение в график
        const diff = Math.floor(Math.random() * 20 + 1);
        graphDiffs.push(diff);
        if (graphDiffs.length > 10) graphDiffs.shift();
        window.drawTestGraph(graphDiffs);
        const data = window.generateTestMetrics();
        window.updateTestMetrics(data);
    }

    // Запуск теста
    console.log('[CK TEST] Старт теста: overlay, график (модуль), метрики (модуль), автообновление');
    createOverlay();
    updateAll();
    setInterval(updateAll, 10000); // каждые 10 секунд
})();





// ==UserScript==
// @name         Global Redirect & ChessKing Tracker & Message Control (GM-хранилище для кеша)
// @namespace    http://tampermonkey.net/
// @version      4.8.16
// @description  Тест: overlay (модуль), график (модуль), метрики (модуль), автообновление
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

    // Основная функция обновления
    function updateAll() {
        // Добавляем новое значение в график через модуль
        graphDiffs = window.addGraphDiff(graphDiffs);
        window.drawTestGraph(graphDiffs);
        const data = window.generateTestMetrics();
        window.updateTestMetrics(data);
    }

    // Запуск теста
    console.log('[CK TEST] Старт теста: overlay (модуль), график (модуль), метрики (модуль), автообновление');
    window.createOverlay();
    updateAll();
    setInterval(updateAll, 10000); // каждые 10 секунд
})();





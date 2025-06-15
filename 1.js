// ==UserScript==
// @name         Global Redirect & ChessKing Tracker & Message Control (GM-хранилище для кеша)
// @namespace    http://tampermonkey.net/
// @version      4.8.10
// @description  Тест: только график и логи
// @author       vd
// @match        https://chessking.com/*
// @match        https://learn.chessking.com/*
// @match        https://lichess.org/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';
    
    // Минимальный overlay и тестовый график
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
            overlay.innerHTML = '<strong>Тестовый график</strong><br/>';
            document.body.appendChild(overlay);
        }
        return overlay;
    }

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

    // Запуск теста
    console.log('[CK TEST] Старт теста: только overlay и график');
    drawTestGraph();
})();





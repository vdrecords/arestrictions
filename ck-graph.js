// ==UserScript==
// @name         CK Graph Module
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  График для ChessKing Tracker (модуль)
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    window.drawTestGraph = function(graphDiffs) {
        let canvas = document.getElementById('ck-graph');
        if (!canvas) {
            const overlay = document.getElementById('ck-overlay');
            canvas = document.createElement('canvas');
            canvas.id = 'ck-graph';
            canvas.width = 300;
            canvas.height = 150;
            overlay.appendChild(canvas);
        }
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.moveTo(20, canvas.height - 20);
        ctx.lineTo(canvas.width - 20, canvas.height - 20);
        ctx.strokeStyle = '#ccc';
        ctx.stroke();
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
    };
})(); 
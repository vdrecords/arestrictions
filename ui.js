// @version      1.0.0
// @description  UI utilities for ChessKing Tracker

import { UI } from './constants.js';

// ==== Функция: createOverlay ====
export function createOverlay() {
    console.log("[UI] createOverlay: создаём overlay");

    let overlay = document.getElementById(UI.OVERLAY_ID);
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = UI.OVERLAY_ID;
        overlay.style.position = 'fixed';
        overlay.style.top = '10px';
        overlay.style.right = '10px';
        overlay.style.backgroundColor = 'white';
        overlay.style.border = '1px solid #ccc';
        overlay.style.padding = '10px';
        overlay.style.zIndex = '9999';
        overlay.style.fontFamily = 'Arial, sans-serif';
        overlay.style.fontSize = '12px';
        overlay.style.color = '#000';
        overlay.innerHTML = '<strong>Прогресс задач&nbsp;(разница за минуту)</strong><br/>';

        const contentDiv = document.createElement('div');
        contentDiv.id = UI.CONTENT_ID;

        const canvas = document.createElement('canvas');
        canvas.id = UI.CANVAS_ID;
        canvas.width = UI.CANVAS_WIDTH;
        canvas.height = UI.CANVAS_HEIGHT;
        contentDiv.appendChild(canvas);

        const metricsDiv = document.createElement('div');
        metricsDiv.id = UI.METRICS_ID;
        metricsDiv.style.marginTop = '0px';
        contentDiv.appendChild(metricsDiv);

        overlay.appendChild(contentDiv);
        document.body.appendChild(overlay);

        const toggleBtn = document.createElement('button');
        toggleBtn.id = UI.TOGGLE_BTN_ID;
        toggleBtn.textContent = 'Свернуть';
        toggleBtn.style.position = 'absolute';
        toggleBtn.style.top = '2px';
        toggleBtn.style.right = '2px';
        toggleBtn.style.fontSize = '10px';
        toggleBtn.style.padding = '2px 5px';
        overlay.appendChild(toggleBtn);
        toggleBtn.addEventListener('click', () => {
            const cd = document.getElementById(UI.CONTENT_ID);
            if (cd.style.display === 'none') {
                cd.style.display = 'block';
                toggleBtn.textContent = 'Свернуть';
            } else {
                cd.style.display = 'none';
                toggleBtn.textContent = 'Развернуть';
            }
        });
        console.log("[UI] Overlay создан");
    }
    return overlay;
}

// ==== Функция: drawGraph ====
export function drawGraph(graphDiffs, isTestMode = false) {
    const canvas = document.getElementById(UI.CANVAS_ID);
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const margin = UI.GRAPH_MARGIN;
    const graphW = canvas.width - margin * 2;
    const graphH = canvas.height - margin * 2;

    // Горизонтальная ось
    ctx.beginPath();
    ctx.moveTo(margin, canvas.height - margin);
    ctx.lineTo(canvas.width - margin, canvas.height - margin);
    ctx.strokeStyle = '#000';
    ctx.stroke();

    if (isTestMode) {
        // Тестовая линия
        ctx.beginPath();
        ctx.moveTo(margin, canvas.height - margin - graphH/2);
        ctx.lineTo(canvas.width - margin, canvas.height - margin - graphH/2);
        ctx.strokeStyle = 'blue';
        ctx.stroke();

        ctx.font = "14px Arial";
        ctx.fillText("Тестовый график", margin, margin + 20);
        return;
    }

    if (graphDiffs.length) {
        const maxDiff = Math.max(...graphDiffs, 1);
        const step = graphDiffs.length > 1 ? graphW / (graphDiffs.length - 1) : graphW;
        const pts = [];
        for (let i = 0; i < graphDiffs.length; i++) {
            const x = margin + i * step;
            const y = canvas.height - margin - (graphDiffs[i] / maxDiff) * graphH;
            pts.push({ x, y, v: graphDiffs[i] });
        }
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length; i++) {
            ctx.lineTo(pts[i].x, pts[i].y);
        }
        ctx.strokeStyle = 'blue';
        ctx.stroke();

        ctx.font = "10px Arial";
        for (const p of pts) {
            ctx.fillStyle = 'red';
            ctx.beginPath();
            ctx.arc(p.x, p.y, 3, 0, 2 * Math.PI);
            ctx.fill();
            ctx.fillStyle = 'black';
            ctx.fillText(p.v, p.x - 5, p.y - 5);
        }
    } else {
        ctx.font = "14px Arial";
        ctx.fillText("Недостаточно данных", margin, margin + 20);
    }
}

// ==== Функция: updateMetrics ====
export function updateMetrics(data, isTestMode = false) {
    const metricsDiv = document.getElementById(UI.METRICS_ID);
    if (isTestMode) {
        metricsDiv.innerHTML = `
            <div>Решено задач сегодня: <strong>Тест</strong></div>
            <div>До разблокировки осталось решить: <strong>Тест</strong></div>
            <div>Средняя скорость: <strong>Тест</strong> задач/мин</div>
            <div>Оставшееся время: <strong>Тест</strong></div>
            <div>Задач осталось: <strong>Тест</strong></div>
            <div>До следующей тысячи решённых задач осталось: <strong>Тест</strong></div>
        `;
        return;
    }

    const { solvedToday, unlockRemaining, avgPerMin, remainingTimeText, remainingTasks, milestoneText, nextTh } = data;
    metricsDiv.innerHTML = `
        <div>Решено задач сегодня: <strong>${solvedToday}</strong></div>
        <div>До разблокировки осталось решить: <strong>${unlockRemaining}</strong></div>
        <div>Средняя скорость: <strong>${avgPerMin}</strong> задач/мин</div>
        <div>Оставшееся время: <strong>${remainingTimeText}</strong></div>
        <div>Задач осталось: <strong>${remainingTasks}</strong></div>
        <div>До ${nextTh} решённых задач осталось: <strong>${milestoneText}</strong></div>
    `;
} 
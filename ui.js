// @version      1.0.0
// @description  UI utilities for ChessKing Tracker

import { UI, LOGGING } from './config.js';

// ==== Функция: createOverlay ====
function createOverlay() {
    console.log(`${LOGGING.PREFIXES.UI} createOverlay: создаём overlay`);

    let overlay = document.getElementById(UI.OVERLAY.ID);
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = UI.OVERLAY.ID;
        Object.entries(UI.OVERLAY.STYLE).forEach(([key, value]) => {
            overlay.style[key.toLowerCase()] = value;
        });
        overlay.innerHTML = '<strong>Прогресс задач&nbsp;(разница за минуту)</strong><br/>';

        const contentDiv = document.createElement('div');
        contentDiv.id = UI.CONTENT.ID;

        const canvas = document.createElement('canvas');
        canvas.id = UI.CANVAS.ID;
        canvas.width = UI.CANVAS.WIDTH;
        canvas.height = UI.CANVAS.HEIGHT;
        contentDiv.appendChild(canvas);

        const metricsDiv = document.createElement('div');
        metricsDiv.id = UI.METRICS.ID;
        Object.entries(UI.METRICS.STYLE).forEach(([key, value]) => {
            metricsDiv.style[key.toLowerCase()] = value;
        });
        contentDiv.appendChild(metricsDiv);

        overlay.appendChild(contentDiv);
        document.body.appendChild(overlay);

        const toggleBtn = document.createElement('button');
        toggleBtn.id = UI.TOGGLE_BTN.ID;
        toggleBtn.textContent = UI.TOGGLE_BTN.TEXT.COLLAPSE;
        Object.entries(UI.TOGGLE_BTN.STYLE).forEach(([key, value]) => {
            toggleBtn.style[key.toLowerCase()] = value;
        });
        overlay.appendChild(toggleBtn);
        toggleBtn.addEventListener('click', () => {
            const cd = document.getElementById(UI.CONTENT.ID);
            if (cd.style.display === 'none') {
                cd.style.display = 'block';
                toggleBtn.textContent = UI.TOGGLE_BTN.TEXT.COLLAPSE;
            } else {
                cd.style.display = 'none';
                toggleBtn.textContent = UI.TOGGLE_BTN.TEXT.EXPAND;
            }
        });
        console.log(`${LOGGING.PREFIXES.UI} Overlay создан`);
    }
    return overlay;
}
window.createOverlay = createOverlay;

// ==== Функция: drawGraph ====
function drawGraph(graphDiffs, isTestMode = false) {
    const canvas = document.getElementById(UI.CANVAS.ID);
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const margin = UI.CANVAS.MARGIN;
    const graphW = canvas.width - margin * 2;
    const graphH = canvas.height - margin * 2;

    // Горизонтальная ось
    ctx.beginPath();
    ctx.moveTo(margin, canvas.height - margin);
    ctx.lineTo(canvas.width - margin, canvas.height - margin);
    ctx.strokeStyle = UI.CANVAS.COLORS.AXIS;
    ctx.stroke();

    if (isTestMode) {
        // Тестовая линия
        ctx.beginPath();
        ctx.moveTo(margin, canvas.height - margin - graphH/2);
        ctx.lineTo(canvas.width - margin, canvas.height - margin - graphH/2);
        ctx.strokeStyle = UI.CANVAS.COLORS.LINE;
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
        ctx.strokeStyle = UI.CANVAS.COLORS.LINE;
        ctx.stroke();

        ctx.font = "10px Arial";
        for (const p of pts) {
            ctx.fillStyle = UI.CANVAS.COLORS.POINT;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 3, 0, 2 * Math.PI);
            ctx.fill();
            ctx.fillStyle = UI.CANVAS.COLORS.TEXT;
            ctx.fillText(p.v, p.x - 5, p.y - 5);
        }
    } else {
        ctx.font = "14px Arial";
        ctx.fillText("Недостаточно данных", margin, margin + 20);
    }
}
window.drawGraph = drawGraph;

// ==== Функция: updateMetrics ====
function updateMetrics(data, isTestMode = false) {
    const metricsDiv = document.getElementById(UI.METRICS.ID);
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
window.updateMetrics = updateMetrics; 
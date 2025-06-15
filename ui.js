// @version      4.9.0
// @description  UI utilities for ChessKing Tracker

function createOverlay() {
    const UI = window.UI;
    let overlay = document.getElementById(UI.OVERLAY.ID);
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = UI.OVERLAY.ID;
        Object.entries(UI.OVERLAY.STYLE).forEach(([key, value]) => {
            overlay.style[key.toLowerCase()] = value;
        });
        overlay.innerHTML = '<strong>Прогресс задач&nbsp;(разница за минуту)</strong><br/>';
        document.body.appendChild(overlay);
    }
    let contentDiv = document.getElementById(UI.CONTENT.ID);
    if (!contentDiv) {
        contentDiv = document.createElement('div');
        contentDiv.id = UI.CONTENT.ID;
        overlay.appendChild(contentDiv);
    }
    let canvas = document.getElementById(UI.CANVAS.ID);
    if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = UI.CANVAS.ID;
        canvas.width = UI.CANVAS.WIDTH;
        canvas.height = UI.CANVAS.HEIGHT;
        contentDiv.appendChild(canvas);
    }
    let metricsDiv = document.getElementById(UI.METRICS.ID);
    if (!metricsDiv) {
        metricsDiv = document.createElement('div');
        metricsDiv.id = UI.METRICS.ID;
        Object.entries(UI.METRICS.STYLE).forEach(([key, value]) => {
            metricsDiv.style[key.toLowerCase()] = value;
        });
        contentDiv.appendChild(metricsDiv);
    }
    return overlay;
}
window.createOverlay = createOverlay;

function drawGraph(graphDiffs) {
    const UI = window.UI;
    const canvas = document.getElementById(UI.CANVAS.ID);
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const margin = UI.CANVAS.MARGIN;
    const graphW = canvas.width - margin * 2;
    const graphH = canvas.height - margin * 2;
    ctx.beginPath();
    ctx.moveTo(margin, canvas.height - margin);
    ctx.lineTo(canvas.width - margin, canvas.height - margin);
    ctx.strokeStyle = UI.CANVAS.COLORS.AXIS;
    ctx.stroke();
    if (graphDiffs.length) {
        const maxDiff = Math.max(...graphDiffs, 1);
        const step = graphDiffs.length > 1 ? graphW / (graphDiffs.length - 1) : graphW;
        ctx.beginPath();
        for (let i = 0; i < graphDiffs.length; i++) {
            const x = margin + i * step;
            const y = canvas.height - margin - (graphDiffs[i] / maxDiff) * graphH;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = UI.CANVAS.COLORS.LINE;
        ctx.stroke();
        ctx.fillStyle = UI.CANVAS.COLORS.POINT;
        for (let i = 0; i < graphDiffs.length; i++) {
            const x = margin + i * step;
            const y = canvas.height - margin - (graphDiffs[i] / maxDiff) * graphH;
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
    ctx.font = '14px Arial';
    ctx.fillStyle = UI.CANVAS.COLORS.TEXT;
    ctx.fillText('Прогресс задач', margin, margin + 20);
}
window.drawGraph = drawGraph;

function updateMetrics(data) {
    const UI = window.UI;
    const metricsDiv = document.getElementById(UI.METRICS.ID);
    metricsDiv.innerHTML = `
        <div>Решено задач сегодня: <strong>${data.solvedToday}</strong></div>
        <div>До разблокировки осталось решить: <strong>${data.unlockRemaining}</strong></div>
        <div>Средняя скорость: <strong>${data.avgPerMin}</strong> задач/мин</div>
        <div>Оставшееся время: <strong>${data.remainingTimeText}</strong></div>
        <div>Задач осталось: <strong>${data.remainingTasks}</strong></div>
        <div>До следующей тысячи решённых задач осталось: <strong>${data.milestoneText}</strong></div>
    `;
}
window.updateMetrics = updateMetrics; 
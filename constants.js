// @version      1.0.0
// @description  Constants for ChessKing Tracker

// ==== Ключи для GM-хранилища ====
window.keyCachedSolved = 'ck_solved_today';
window.keyCachedUnlock = 'ck_unlock_remaining';
window.keyCachedTotal = 'ck_total_solved';
window.keyCachedTimestamp = 'ck_timestamp';

// ==== URL-адреса ====
window.URLS = {
    COURSE: 'https://chessking.com/course/',
    API: 'https://chessking.com/api/v1/course/',
    LOGIN: 'https://chessking.com/login',
    MESSAGES: 'https://chessking.com/messages'
};

// ==== Селекторы ====
window.SELECTORS = {
    SOLVED_STATS: 'span.course-overview__stats-item[title*="Решенное"] span',
    UNLOCK_REMAINING: 'span.course-overview__stats-item[title*="До разблокировки"] span'
};

// ==== Константы для UI ====
window.UI = {
    OVERLAY_ID: 'ck-progress-overlay',
    CONTENT_ID: 'ck-progress-content',
    CANVAS_ID: 'ck-progress-canvas',
    METRICS_ID: 'ck-progress-metrics',
    TOGGLE_BTN_ID: 'ck-toggle-btn',
    CANVAS_WIDTH: 400,
    CANVAS_HEIGHT: 150,
    GRAPH_MARGIN: 30,
    UPDATE_INTERVAL: 60000
}; 
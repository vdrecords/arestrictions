// @version      1.0.0
// @description  Constants for ChessKing Tracker

import { STORAGE, URLS, SELECTORS, UI, GRAPH, MESSAGES, LOGGING } from './config.js';

export {
    STORAGE,
    URLS,
    SELECTORS,
    UI,
    GRAPH,
    MESSAGES,
    LOGGING
};

// ==== Ключи для GM-хранилища ====
export const keyCachedSolved = 'ck_solved_today';
export const keyCachedUnlock = 'ck_unlock_remaining';
export const keyCachedTotal = 'ck_total_solved';
export const keyCachedTimestamp = 'ck_timestamp';

// ==== URL-адреса ====
export const URLS = {
    COURSE: 'https://chessking.com/course/',
    API: 'https://chessking.com/api/v1/course/',
    LOGIN: 'https://chessking.com/login',
    MESSAGES: 'https://chessking.com/messages'
};

// ==== Селекторы ====
export const SELECTORS = {
    SOLVED_STATS: 'span.course-overview__stats-item[title*="Решенное"] span',
    UNLOCK_REMAINING: 'span.course-overview__stats-item[title*="До разблокировки"] span'
};

// ==== Константы для UI ====
export const UI = {
    OVERLAY_ID: 'ck-progress-overlay',
    CONTENT_ID: 'ck-progress-content',
    CANVAS_ID: 'ck-progress-canvas',
    METRICS_ID: 'ck-progress-metrics',
    TOGGLE_BTN_ID: 'ck-toggle-btn',
    CANVAS_WIDTH: 400,
    CANVAS_HEIGHT: 150,
    GRAPH_MARGIN: 30,
    UPDATE_INTERVAL: 60000 // 1 minute
}; 
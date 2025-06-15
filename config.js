// @version      4.9.0
// @description  ChessKing Tracker - улучшенный трекер прогресса для ChessKing
// @namespace    https://github.com/vdrecords/arestrictions
// @author       vd
// @match        https://chessking.com/course/*
// @match        https://chessking.com/test/*
// @match        https://lichess.org/*
// @connect      chessking.com
// @connect      lichess.org
// @grant        GM.getValue
// @grant        GM.setValue
// @grant        GM.deleteValue
// @grant        GM.xmlHttpRequest
// @run-at       document-end

// =================================
// === Блок 1: Настройки скрипта ===
// =================================
window.SCRIPT = {
    VERSION: '4.9.0',
    NAME: 'ChessKing Tracker',
    NAMESPACE: 'https://github.com/vdrecords/arestrictions',
    AUTHOR: 'vd',
    UPDATE_URL: 'https://raw.githubusercontent.com/vdrecords/arestrictions/main/1.js',
    DOWNLOAD_URL: 'https://github.com/vdrecords/arestrictions/raw/main/1.js'
};

// =================================
// === Блок 2: Настройки GM Storage ===
// =================================
window.STORAGE = {
    KEYS: {
        TOTAL_SOLVED: 'ck_total_solved',
        SOLVED_TODAY: 'ck_solved_today',
        UNLOCK_REMAINING: 'ck_unlock_remaining',
        TIMESTAMP: 'ck_timestamp',
        GRAPH_DIFFS: 'ck_graph_diffs',
        ACTIONS_COST: 'ck_actions_cost'
    },
    CACHE_TTL: 60000 // 1 минута в миллисекундах
};

// =================================
// === Блок 3: Настройки URL-адресов ===
// =================================
window.URLS = {
    COURSE: 'chessking.com/course/',
    LEARN: 'learn.chessking.com/learning/course/',
    API: 'chessking.com/api/v1/course/',
    LOGIN: 'chessking.com/login',
    MESSAGES: 'chessking.com/messages',
    LICHESS: 'lichess.org',
    GITHUB: {
        BASE: 'https://raw.githubusercontent.com/vdrecords/arestrictions/main/',
        MODULES: {
            CONSTANTS: 'constants.js',
            STORAGE: 'storage.js',
            API: 'api.js',
            UI: 'ui.js',
            BLOCKS: {
                UNLOCK_CHECKER: 'blocks/unlock-checker.js',
                PROGRESS_TRACKER: 'blocks/progress-tracker.js',
                MESSAGE_CONTROL: 'blocks/message-control.js',
                BERSERK_CONTROL: 'blocks/berserk-control.js',
                INIT: 'blocks/init.js'
            }
        }
    }
};

// =================================
// === Блок 4: Настройки селекторов ===
// =================================
window.SELECTORS = {
    SOLVED_STATS: '.solved-stats',
    SOLVED_TODAY: '.solved-today',
    UNLOCK_REMAINING: '.unlock-remaining',
    TOTAL_TASKS: 'span.course-overview__stats-item[title="Решенное и общее количество упражнений"] span',
    MESSAGE: '.message',
    BERSERK: {
        BUTTON: '.berserk-button',
        CONTAINER: '.berserk-container'
    }
};

// =================================
// === Блок 5: Настройки UI ===
// =================================
window.UI = {
    OVERLAY: {
        ID: 'ck-overlay',
        STYLE: {
            position: 'fixed',
            top: '10px',
            right: '10px',
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '10px',
            borderRadius: '5px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
            zIndex: '9999',
            fontFamily: 'Arial, sans-serif',
            fontSize: '14px',
            color: '#333'
        }
    },
    CONTENT: {
        ID: 'ck-content'
    },
    CANVAS: {
        ID: 'ck-graph',
        WIDTH: 300,
        HEIGHT: 150,
        MARGIN: 20,
        COLORS: {
            AXIS: '#ccc',
            LINE: '#4CAF50',
            POINT: '#2196F3',
            TEXT: '#666'
        }
    },
    METRICS: {
        ID: 'ck-metrics',
        STYLE: {
            marginTop: '10px',
            lineHeight: '1.5'
        }
    },
    TOGGLE_BTN: {
        ID: 'ck-toggle',
        TEXT: {
            COLLAPSE: '▼',
            EXPAND: '▶'
        },
        STYLE: {
            position: 'absolute',
            top: '5px',
            right: '5px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '12px',
            color: '#666'
        }
    }
};

// =================================
// === Блок 6: Настройки графика ===
// =================================
window.GRAPH = {
    MAX_POINTS: 10,
    UPDATE_INTERVAL: 60000 // 1 минута в миллисекундах
};

// =================================
// === Блок 7: Настройки сообщений ===
// =================================
window.MESSAGES = {
    FILTERS: [
        'Поздравляем',
        'Вы решили',
        'Новый рекорд',
        /^\+(\d+)\s*з\.?$/,
        /^(\d+)\s*з\.?$/
    ]
};

// =================================
// === Блок 8: Настройки берсерка ===
// =================================
window.BERSERK = {
    COST: {
        PER_ACTION: 10
    },
    UI: {
        INFO_SPAN: {
            CLASS: 'berserk-info',
            STYLE: {
                marginLeft: '5px',
                fontSize: '12px'
            }
        },
        BUTTON: {
            CLASS: 'berserk-ctrl',
            STYLE: {
                DISABLED: {
                    opacity: '0.5',
                    cursor: 'not-allowed'
                }
            }
        }
    }
}; 
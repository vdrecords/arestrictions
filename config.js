// @version      1.0.0
// @description  Configuration settings for ChessKing Tracker

// =================================
// === Блок 1: Настройки скрипта ===
// =================================
export const SCRIPT = {
    VERSION: '4.8.7',
    NAME: 'Global Redirect & ChessKing Tracker & Message Control',
    NAMESPACE: 'http://tampermonkey.net/',
    AUTHOR: 'vd',
    MATCH: 'https://chessking.com/*',
    RUN_AT: 'document-idle',
    UPDATE_URL: 'https://raw.githubusercontent.com/vd/arestrictions/main/1.js',
    DOWNLOAD_URL: 'https://raw.githubusercontent.com/vd/arestrictions/main/1.js'
};

// =================================
// === Блок 2: Настройки GM-хранилища ===
// =================================
export const STORAGE = {
    KEYS: {
        SOLVED_TODAY: 'ck_solved_today',
        UNLOCK_REMAINING: 'ck_unlock_remaining',
        TOTAL_SOLVED: 'ck_total_solved',
        TIMESTAMP: 'ck_timestamp',
        ACTIONS_COST: 'ck_actions_cost'
    },
    CACHE_TTL: 60000, // 1 минута
    READINGS_MAX_LENGTH: 60
};

// =================================
// === Блок 3: Настройки URL-адресов ===
// =================================
export const URLS = {
    COURSE: 'https://chessking.com/course/',
    API: 'https://chessking.com/api/v1/course/',
    LOGIN: 'https://chessking.com/login',
    MESSAGES: 'https://chessking.com/messages',
    LICHESS: 'lichess.org',
    GITHUB: {
        BASE: 'https://raw.githubusercontent.com/vd/arestrictions/main/',
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
export const SELECTORS = {
    SOLVED_STATS: 'span.course-overview__stats-item[title*="Решенное"] span',
    UNLOCK_REMAINING: 'span.course-overview__stats-item[title*="До разблокировки"] span',
    MESSAGES: '.message',
    BERSERK: {
        BUTTON: '.fbt.go-berserk',
        CONTAINER: '.rcontrols, .game__underboard__controls'
    }
};

// =================================
// === Блок 5: Настройки UI ===
// =================================
export const UI = {
    OVERLAY: {
        ID: 'ck-progress-overlay',
        STYLE: {
            POSITION: 'fixed',
            TOP: '10px',
            RIGHT: '10px',
            BACKGROUND_COLOR: 'white',
            BORDER: '1px solid #ccc',
            PADDING: '10px',
            Z_INDEX: '9999',
            FONT_FAMILY: 'Arial, sans-serif',
            FONT_SIZE: '12px',
            COLOR: '#000'
        }
    },
    CONTENT: {
        ID: 'ck-progress-content'
    },
    CANVAS: {
        ID: 'ck-progress-canvas',
        WIDTH: 400,
        HEIGHT: 150,
        MARGIN: 30,
        COLORS: {
            AXIS: '#000',
            LINE: 'blue',
            POINT: 'red',
            TEXT: 'black'
        }
    },
    METRICS: {
        ID: 'ck-progress-metrics',
        STYLE: {
            MARGIN_TOP: '0px'
        }
    },
    TOGGLE_BTN: {
        ID: 'ck-toggle-btn',
        STYLE: {
            POSITION: 'absolute',
            TOP: '2px',
            RIGHT: '2px',
            FONT_SIZE: '10px',
            PADDING: '2px 5px'
        },
        TEXT: {
            COLLAPSE: 'Свернуть',
            EXPAND: 'Развернуть'
        }
    },
    UPDATE_INTERVAL: 60000 // 1 минута
};

// =================================
// === Блок 6: Настройки графика ===
// =================================
export const GRAPH = {
    MAX_POINTS: 30,
    DIFF_INTERVAL: 90000, // 90 секунд
    MEDIAN_WINDOW: 10,
    SPEED: {
        MIN_INTERVAL: 90000, // 90 секунд
        FILTER_ZEROS: true
    }
};

// =================================
// === Блок 7: Настройки сообщений ===
// =================================
export const MESSAGES = {
    FILTER: {
        KEYWORDS: ['спам', 'реклама'],
        CASE_SENSITIVE: false
    },
    COST: {
        PER_MESSAGE: 50
    }
};

// =================================
// === Блок 8: Настройки берсерка ===
// =================================
export const BERSERK = {
    COST: {
        PER_ACTION: 10
    },
    UI: {
        INFO_SPAN: {
            CLASS: 'berserk-info-span',
            STYLE: {
                FONT_SIZE: '12px',
                MARGIN_LEFT: '10px',
                FONT_WEIGHT: 'bold'
            }
        },
        BUTTON: {
            CLASS: 'berserk-controlled',
            STYLE: {
                DISABLED: {
                    OPACITY: '0.4',
                    CURSOR: 'not-allowed'
                }
            }
        }
    }
};

// =================================
// === Блок 9: Настройки логирования ===
// =================================
export const LOGGING = {
    PREFIXES: {
        UNLOCK_CHECKER: '[UnlockChecker]',
        PROGRESS_TRACKER: '[ProgressTracker]',
        MESSAGE_CONTROL: '[MessageControl]',
        BERSERK_CONTROL: '[BerserkControl]',
        INIT: '[Init]',
        API: '[API]',
        STORAGE: '[Storage]',
        UI: '[UI]'
    },
    ENABLED: true
}; 
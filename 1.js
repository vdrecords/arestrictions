// @name         Global Redirect & ChessKing Tracker & Message Control (GM-хранилище для кеша)
// @namespace    http://tampermonkey.net/
// @version      4.8.6
// @description
// 1) Блок 1: Глобальная проверка «До разблокировки осталось решить».
// 2) Блок 2: Трекер прогресса ChessKing (с графиком и метриками).
// 3) Блок 3: Управление сообщениями (скрытие, удаление, фильтрация).
// @author       vd
// @match        https://chessking.com/*
// @grant        GM.getValue
// @grant        GM.setValue
// @grant        GM.deleteValue
// @grant        GM.xmlHttpRequest
// @connect      chessking.com
// @run-at       document-idle
// @updateURL    https://raw.githubusercontent.com/vd/arestrictions/main/1.js
// @downloadURL  https://raw.githubusercontent.com/vd/arestrictions/main/1.js
// @require      https://raw.githubusercontent.com/vd/arestrictions/main/config.js
// @require      https://raw.githubusercontent.com/vd/arestrictions/main/constants.js
// @require      https://raw.githubusercontent.com/vd/arestrictions/main/storage.js
// @require      https://raw.githubusercontent.com/vd/arestrictions/main/api.js
// @require      https://raw.githubusercontent.com/vd/arestrictions/main/ui.js
// @require      https://raw.githubusercontent.com/vd/arestrictions/main/blocks/unlock-checker.js
// @require      https://raw.githubusercontent.com/vd/arestrictions/main/blocks/progress-tracker.js
// @require      https://raw.githubusercontent.com/vd/arestrictions/main/blocks/message-control.js
// @require      https://raw.githubusercontent.com/vd/arestrictions/main/blocks/init.js

import { SCRIPT } from './config.js';
import { init } from './blocks/init.js';

// Запускаем инициализацию
init();





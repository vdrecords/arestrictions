// ==UserScript==
// @name         Global Redirect & ChessKing Tracker & Message Control (GM-хранилище для кеша)
// @namespace    http://tampermonkey.net/
// @version      4.8.10
// @description  1) Блок 1: Глобальная проверка «До разблокировки осталось решить».
// @description  2) Блок 2: Трекер прогресса ChessKing (с графиком и метриками).
// @description  3) Блок 3: Управление сообщениями (скрытие, удаление, фильтрация).
// @description  4) Блок 4: Контроль берсерка на Lichess.
// @author       vd
// @match        https://chessking.com/*
// @match        https://learn.chessking.com/*
// @match        https://lichess.org/*
// @grant        GM.getValue
// @grant        GM.setValue
// @grant        GM.deleteValue
// @grant        GM.xmlHttpRequest
// @connect      chessking.com
// @connect      lichess.org
// @run-at       document-idle
// @updateURL    https://raw.githubusercontent.com/vdrecords/arestrictions/main/1.js
// @downloadURL  https://raw.githubusercontent.com/vdrecords/arestrictions/main/1.js
// @require      https://raw.githubusercontent.com/vdrecords/arestrictions/main/config.js
// @require      https://raw.githubusercontent.com/vdrecords/arestrictions/main/constants.js
// @require      https://raw.githubusercontent.com/vdrecords/arestrictions/main/storage.js
// @require      https://raw.githubusercontent.com/vdrecords/arestrictions/main/api.js
// @require      https://raw.githubusercontent.com/vdrecords/arestrictions/main/ui.js
// @require      https://raw.githubusercontent.com/vdrecords/arestrictions/main/blocks/unlock-checker.js
// @require      https://raw.githubusercontent.com/vdrecords/arestrictions/main/blocks/progress-tracker.js
// @require      https://raw.githubusercontent.com/vdrecords/arestrictions/main/blocks/message-control.js
// @require      https://raw.githubusercontent.com/vdrecords/arestrictions/main/blocks/berserk-control.js
// @require      https://raw.githubusercontent.com/vdrecords/arestrictions/main/blocks/init.js
// ==/UserScript==

init();





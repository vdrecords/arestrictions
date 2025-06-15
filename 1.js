// ==UserScript==
// @name         ChessKing Tracker (GM-хранилище, график, метрики, сообщения, берсерк)
// @namespace    http://tampermonkey.net/
// @version      4.9.3
// @description  Полная версия ChessKing Tracker
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
// @require      https://raw.githubusercontent.com/vdrecords/arestrictions/main/storage.js
// @require      https://raw.githubusercontent.com/vdrecords/arestrictions/main/api.js
// @require      https://raw.githubusercontent.com/vdrecords/arestrictions/main/ui.js
// @require      https://raw.githubusercontent.com/vdrecords/arestrictions/main/blocks/unlock-checker.js
// @require      https://raw.githubusercontent.com/vdrecords/arestrictions/main/blocks/progress-tracker.js
// @require      https://raw.githubusercontent.com/vdrecords/arestrictions/main/blocks/message-control.js
// @require      https://raw.githubusercontent.com/vdrecords/arestrictions/main/blocks/berserk-control.js
// @require      https://raw.githubusercontent.com/vdrecords/arestrictions/main/blocks/init.js
// ==/UserScript==

window.init();





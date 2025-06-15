// ==UserScript==
// @name         Global Redirect & ChessKing Tracker & Message Control (GM-хранилище для кеша)
// @namespace    http://tampermonkey.net/
// @version      4.8
// @description
// 1) Блок 1: Глобальная проверка «До разблокировки осталось решить».
// 2) Блок 2: Мгновенные анимации ChessKing – переопределение jQuery.animate/fadeIn/fadeOut, авто-клик «Следующее задание».
// 3) Блок 3: Фильтр турниров Chess.com – скрыть нежелательные турниры по ключевым словам.
// 4) Блок 4: Hide Elements – универсальное скрытие элементов через GM_addStyle.
// 5) Блок 5: Hide Specific Tournaments and Sections – скрытие по классам/иконкам с MutationObserver.
// 6) Блок 6: Lichess – показывать только Blitz & Rapid через GM_addStyle.
// 7) Блок 7: URL-based Body Cleaner – заменяет содержимое body на «Страница заблокирована!».
// 8) Блок 8: Контроль отправки сообщений – по числу решённых задач.
// @include      *
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @grant        GM_getValue
// @grant        GM_setValue
// @run-at       document-start
// @updateURL    https://raw.githubusercontent.com/vd/arestrictions/main/1.js
// @downloadURL  https://raw.githubusercontent.com/vd/arestrictions/main/1.js
// @updateCheck  10
// ==/UserScript==

// ===========================================
// === БЛОК 7: URL-based Body Cleaner ===
// ===========================================
if (enableURLBlock) {
    (function() {
        const blocked = [
            "youtube.com",
            "music.youtube.com",
            "chrome.google.com/webstore",
            "chromewebstore.google.com",
            "addons.mozilla.org",
            "microsoftedge.microsoft.com/addons",
            "opera.com/extensions",
            "addons.opera.com",
            "yandex.ru/extensions"
        ];
        function isBlocked() {
            return blocked.some(site => location.hostname.includes(site));
        }
        function injectCSS() {
            const style = document.createElement('style');
            style.textContent = `
                html, body { visibility: hidden !important; }
                html::before {
                    content: 'Страница заблокирована!';
                    visibility: visible !important;
                    position: fixed;
                    top: 40%;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    color: red;
                    font-size: 2em;
                    text-align: center;
                    z-index: 999999;
                }
            `;
            document.documentElement.appendChild(style);
            console.log("[URLBlock] Контент заблокирован через GM_addStyle");
        }
        if (isBlocked()) {
            if (document.readyState === 'loading') {
                document.addEventListener("DOMContentLoaded", injectCSS);
            } else {
                injectCSS();
            }
        }
    })();
}

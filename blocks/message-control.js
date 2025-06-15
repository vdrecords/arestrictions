// @version      1.0.0
// @description  Message control for ChessKing Tracker

import { SELECTORS, MESSAGES, LOGGING } from '../config.js';

// ==== Функция: hideMessage ====
function hideMessage(message) {
    console.log(`${LOGGING.PREFIXES.MESSAGE} hideMessage: скрываем сообщение "${message.textContent}"`);

    // Проверяем, нужно ли скрывать сообщение
    const shouldHide = MESSAGES.FILTERS.some(filter => {
        if (typeof filter === 'string') {
            return message.textContent.includes(filter);
        }
        return filter.test(message.textContent);
    });

    if (shouldHide) {
        message.style.display = 'none';
        console.log(`${LOGGING.PREFIXES.MESSAGE} Сообщение скрыто`);
    }
}
window.hideMessage = hideMessage;

// ==== Функция: filterMessages ====
function filterMessages() {
    console.log(`${LOGGING.PREFIXES.MESSAGE} filterMessages: фильтруем сообщения`);

    // Находим все сообщения
    const messages = document.querySelectorAll(SELECTORS.MESSAGE);
    console.log(`${LOGGING.PREFIXES.MESSAGE} Найдено сообщений: ${messages.length}`);

    // Фильтруем сообщения
    messages.forEach(message => {
        hideMessage(message);
    });
}
window.filterMessages = filterMessages; 
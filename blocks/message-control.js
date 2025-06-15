// @version      1.0.0
// @description  Message control for ChessKing Tracker

import { SELECTORS, MESSAGES, LOGGING } from '../config.js';

// ==== Функция: hideMessage ====
export function hideMessage(message) {
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

// ==== Функция: deleteMessage ====
export function deleteMessage(message) {
    console.log(`${LOGGING.PREFIXES.MESSAGE} deleteMessage: удаляем сообщение "${message.textContent}"`);

    // Проверяем, нужно ли удалять сообщение
    const shouldDelete = MESSAGES.FILTERS.some(filter => {
        if (typeof filter === 'string') {
            return message.textContent.includes(filter);
        }
        return filter.test(message.textContent);
    });

    if (shouldDelete) {
        message.remove();
        console.log(`${LOGGING.PREFIXES.MESSAGE} Сообщение удалено`);
    }
}

// ==== Функция: filterMessages ====
export function filterMessages() {
    console.log(`${LOGGING.PREFIXES.MESSAGE} filterMessages: фильтруем сообщения`);

    // Находим все сообщения
    const messages = document.querySelectorAll(SELECTORS.MESSAGE);
    console.log(`${LOGGING.PREFIXES.MESSAGE} Найдено сообщений: ${messages.length}`);

    // Фильтруем сообщения
    messages.forEach(message => {
        hideMessage(message);
    });
} 
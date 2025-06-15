// @version      4.9.0
// @description  Message control for ChessKing Tracker

function hideMessage(message) {
    const MESSAGES = window.MESSAGES;
    const shouldHide = MESSAGES.FILTERS.some(filter => {
        if (typeof filter === 'string') {
            return message.textContent.includes(filter);
        }
        return filter.test(message.textContent);
    });
    if (shouldHide) {
        message.style.display = 'none';
    }
}
window.hideMessage = hideMessage;

function filterMessages() {
    const SELECTORS = window.SELECTORS;
    const messages = document.querySelectorAll(SELECTORS.MESSAGE);
    messages.forEach(window.hideMessage);
}
window.filterMessages = filterMessages; 
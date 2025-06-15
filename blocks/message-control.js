// @version      1.0.0
// @description  Message control block for ChessKing Tracker

// ==== Функция: hideMessages ====
export function hideMessages() {
    console.log("[MessageControl] hideMessages: скрываем сообщения");

    const messages = document.querySelectorAll('.message');
    messages.forEach(msg => {
        msg.style.display = 'none';
    });
    console.log(`[MessageControl] Скрыто сообщений: ${messages.length}`);
}

// ==== Функция: deleteMessages ====
export function deleteMessages() {
    console.log("[MessageControl] deleteMessages: удаляем сообщения");

    const messages = document.querySelectorAll('.message');
    messages.forEach(msg => {
        msg.remove();
    });
    console.log(`[MessageControl] Удалено сообщений: ${messages.length}`);
}

// ==== Функция: filterMessages ====
export function filterMessages() {
    console.log("[MessageControl] filterMessages: фильтруем сообщения");

    const messages = document.querySelectorAll('.message');
    messages.forEach(msg => {
        const text = msg.innerText.toLowerCase();
        if (text.includes('спам') || text.includes('реклама')) {
            msg.style.display = 'none';
        }
    });
    console.log(`[MessageControl] Отфильтровано сообщений: ${messages.length}`);
} 
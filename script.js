// Базовый JavaScript для интерактивности

document.addEventListener('DOMContentLoaded', function() {
    // Обработка кнопок
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent;
            
            // В реальном проекте здесь будет отправка данных на сервер
            // или открытие модального окна
            
            if (buttonText.includes('Заявка') || buttonText.includes('Заказать')) {
                // Открытие формы заявки
                alert('Открытие формы заявки. В реальном проекте здесь будет модальное окно.');
                
                // Пример: открыть модальное окно
                // openModal('order-form');
            }
        });
    });
    
    // Плавная прокрутка для якорных ссылок (если они появятся)
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Форматирование телефонов (опционально)
    const phoneElements = document.querySelectorAll('.phone');
    
    phoneElements.forEach(phone => {
        const phoneNumber = phone.textContent.trim();
        // Можно добавить форматирование, если нужно
    });
});

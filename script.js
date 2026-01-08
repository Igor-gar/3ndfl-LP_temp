document.addEventListener('DOMContentLoaded', function() {
    console.log('Страница загружена');
    
    // ===== КНОПКИ УСЛУГ =====
    const serviceButtons = document.querySelectorAll('.btn-service');
    const serviceTypeSelect = document.getElementById('service-type');
    const selectedServiceInput = document.getElementById('selected-service');
    
    serviceButtons.forEach(button => {
        button.addEventListener('click', function() {
            const service = this.getAttribute('data-service');
            
            if (selectedServiceInput) {
                selectedServiceInput.value = service;
            }
            
            if (serviceTypeSelect) {
                for (let i = 0; i < serviceTypeSelect.options.length; i++) {
                    if (serviceTypeSelect.options[i].value === service) {
                        serviceTypeSelect.selectedIndex = i;
                        break;
                    }
                }
            }
            
            // Прокрутка к форме
            const orderSection = document.getElementById('order-form');
            if (orderSection) {
                orderSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // ===== МОДАЛЬНОЕ ОКНО =====
    const consultModal = document.getElementById('consult-modal');
    const consultBtn = document.getElementById('consult-btn');
    const closeModalBtn = document.querySelector('.close-modal');
    
    // Открытие
    if (consultBtn && consultModal) {
        consultBtn.addEventListener('click', function() {
            consultModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Закрытие
    if (closeModalBtn && consultModal) {
        closeModalBtn.addEventListener('click', function() {
            consultModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    // Закрытие по клику вне окна
    if (consultModal) {
        consultModal.addEventListener('click', function(e) {
            if (e.target === consultModal) {
                consultModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // ===== ФОРМЫ =====
    const orderForm = document.getElementById('main-form');
    const successMessage = document.getElementById('success-message');
    const consultForm = document.getElementById('consult-form');
    
    // Форма заказа
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Валидация
            const name = document.getElementById('name');
            const phone = document.getElementById('phone');
            const email = document.getElementById('email');
            const agreement = document.getElementById('agreement');
            
            let valid = true;
            
            if (!name.value.trim()) {
                showError(name, 'Введите имя');
                valid = false;
            } else {
                clearError(name);
            }
            
            if (!phone.value.trim() || phone.value.replace(/\D/g, '').length < 11) {
                showError(phone, 'Введите телефон');
                valid = false;
            } else {
                clearError(phone);
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim() || !emailRegex.test(email.value)) {
                showError(email, 'Введите email');
                valid = false;
            } else {
                clearError(email);
            }
            
            if (!agreement.checked) {
                showError(agreement, 'Необходимо согласие');
                valid = false;
            } else {
                clearError(agreement);
            }
            
            if (!valid) return;
            
            // Показываем успех
            orderForm.style.display = 'none';
            if (successMessage) {
                successMessage.style.display = 'block';
                successMessage.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Форма консультации
    if (consultForm) {
        consultForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Валидация
            const inputs = consultForm.querySelectorAll('input[required]');
            let valid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    showError(input, 'Заполните поле');
                    valid = false;
                } else {
                    clearError(input);
                }
            });
            
            if (!valid) return;
            
            // Сообщение
            alert('Спасибо! Мы перезвоним вам в течение 15 минут.');
            
            // Закрываем модалку
            if (consultModal) {
                consultModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
            
            // Очищаем форму
            consultForm.reset();
        });
    }
    
    // ===== МАСКА ТЕЛЕФОНА =====
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    
    phoneInputs.forEach(input => {
        input.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            
            let formatted = '';
            if (value.length > 0) {
                formatted = '+7';
                if (value.length > 1) {
                    formatted += ' (' + value.substring(1, 4);
                }
                if (value.length >= 4) {
                    formatted += ') ' + value.substring(4, 7);
                }
                if (value.length >= 7) {
                    formatted += '-' + value.substring(7, 9);
                }
                if (value.length >= 9) {
                    formatted += '-' + value.substring(9, 11);
                }
            }
            
            this.value = formatted;
        });
    });
    
    // ===== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ =====
    function showError(element, message) {
        clearError(element);
        element.classList.add('error');
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = '#e74c3c';
        errorDiv.style.fontSize = '14px';
        errorDiv.style.marginTop = '8px';
        errorDiv.textContent = message;
        
        if (element.type === 'checkbox') {
            element.parentNode.parentNode.appendChild(errorDiv);
        } else {
            element.parentNode.appendChild(errorDiv);
        }
    }
    
    function clearError(element) {
        element.classList.remove('error');
        const errorMsg = element.parentNode.querySelector('.error-message');
        if (errorMsg) errorMsg.remove();
    }
});

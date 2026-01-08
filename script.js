document.addEventListener('DOMContentLoaded', function() {
    console.log('Страница загружена! Инициализация...');
    
    // ===== ОСНОВНЫЕ ЭЛЕМЕНТЫ =====
    const serviceButtons = document.querySelectorAll('.btn-service');
    const serviceTypeSelect = document.getElementById('service-type');
    const selectedServiceInput = document.getElementById('selected-service');
    const orderForm = document.getElementById('main-form');
    const successMessage = document.getElementById('success-message');
    const consultModal = document.getElementById('consult-modal');
    const consultForm = document.getElementById('consult-form');
    const consultBtn = document.getElementById('consult-btn');
    const closeModalBtn = document.querySelector('.close-modal');
    
    // ===== ПРОВЕРКА =====
    console.log('Элементы найдены:');
    console.log('Кнопки услуг:', serviceButtons.length);
    console.log('Форма заказа:', orderForm ? 'Да' : 'Нет');
    console.log('Модальное окно:', consultModal ? 'Да' : 'Нет');
    
    // ===== ОБРАБОТКА КНОПОК УСЛУГ =====
    serviceButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const service = this.getAttribute('data-service');
            console.log('Нажата кнопка услуги:', service);
            
            // Устанавливаем услугу в форму
            if (selectedServiceInput) {
                selectedServiceInput.value = service;
            }
            
            // Выбираем в селекте
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
                window.scrollTo({
                    top: orderSection.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Подсвечиваем форму
                orderSection.style.boxShadow = '0 0 0 5px rgba(52, 152, 219, 0.3)';
                setTimeout(() => {
                    orderSection.style.boxShadow = '';
                }, 2000);
            }
        });
    });
    
    // ===== МОДАЛЬНОЕ ОКНО КОНСУЛЬТАЦИИ =====
    // Открытие
    if (consultBtn && consultModal) {
        consultBtn.addEventListener('click', function() {
            console.log('Открытие модального окна');
            consultModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            // Анимация появления
            consultModal.style.opacity = '0';
            setTimeout(() => {
                consultModal.style.opacity = '1';
                consultModal.style.transition = 'opacity 0.3s';
            }, 10);
        });
    }
    
    // Закрытие по крестику
    if (closeModalBtn && consultModal) {
        closeModalBtn.addEventListener('click', function() {
            console.log('Закрытие модального окна');
            consultModal.style.opacity = '0';
            setTimeout(() => {
                consultModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 300);
        });
    }
    
    // Закрытие по клику вне окна
    if (consultModal) {
        consultModal.addEventListener('click', function(e) {
            if (e.target === consultModal) {
                console.log('Закрытие по клику вне окна');
                consultModal.style.opacity = '0';
                setTimeout(() => {
                    consultModal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }, 300);
            }
        });
    }
    
    // Закрытие по Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && consultModal && consultModal.style.display === 'flex') {
            console.log('Закрытие по Escape');
            consultModal.style.opacity = '0';
            setTimeout(() => {
                consultModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 300);
        }
    });
    
    // ===== ОБРАБОТКА ФОРМ =====
    // Форма заказа
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Отправка формы заказа');
            
            // Простая валидация
            const name = document.getElementById('name');
            const phone = document.getElementById('phone');
            const email = document.getElementById('email');
            const agreement = document.getElementById('agreement');
            
            let valid = true;
            
            // Валидация имени
            if (!name.value.trim()) {
                showError(name, 'Введите имя');
                valid = false;
            } else {
                clearError(name);
            }
            
            // Валидация телефона
            if (!phone.value.trim() || phone.value.replace(/\D/g, '').length < 11) {
                showError(phone, 'Введите корректный телефон');
                valid = false;
            } else {
                clearError(phone);
            }
            
            // Валидация email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim() || !emailRegex.test(email.value)) {
                showError(email, 'Введите корректный email');
                valid = false;
            } else {
                clearError(email);
            }
            
            // Валидация согласия
            if (!agreement.checked) {
                showError(agreement, 'Необходимо согласие');
                valid = false;
            } else {
                clearError(agreement);
            }
            
            if (!valid) {
                console.log('Форма не прошла валидацию');
                return;
            }
            
            // Имитация отправки
            console.log('Данные формы:', {
                name: name.value,
                phone: phone.value,
                email: email.value,
                service: serviceTypeSelect ? serviceTypeSelect.value : 'Не указано'
            });
            
            // Показываем успех
            orderForm.style.display = 'none';
            if (successMessage) {
                successMessage.style.display = 'block';
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            
            // Можно очистить форму
            // orderForm.reset();
        });
    }
    
    // Форма консультации
    if (consultForm) {
        consultForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Отправка формы консультации');
            
            // Простая валидация
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
            
            // Имитация отправки
            console.log('Консультация запрошена');
            alert('Спасибо! Мы перезвоним вам в течение 15 минут.');
            
            // Закрываем модалку
            if (consultModal) {
                consultModal.style.opacity = '0';
                setTimeout(() => {
                    consultModal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }, 300);
            }
            
            // Очищаем форму
            consultForm.reset();
        });
    }
    
    // ===== МАСКА ТЕЛЕФОНА =====
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = this.value.replace(/\D/g, '');
            
            // Форматирование
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
            
            // Проверка длины
            if (value.length === 11) {
                clearError(this);
            }
        });
        
        // При вставке
        input.addEventListener('paste', function(e) {
            e.preventDefault();
            const text = (e.clipboardData || window.clipboardData).getData('text');
            const numbers = text.replace(/\D/g, '');
            this.value = numbers;
            this.dispatchEvent(new Event('input'));
        });
    });
    
    // ===== ПЛАВНАЯ ПРОКРУТКА =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPos = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPos,
                    behavior: 'smooth'
                });
            }
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
        errorDiv.style.fontWeight = '600';
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
    
    // ===== ДОПОЛНИТЕЛЬНЫЕ СТИЛИ ДЛЯ ОШИБОК =====
    const errorStyles = document.createElement('style');
    errorStyles.textContent = `
        .error {
            border-color: #e74c3c !important;
            background-color: #fff8f8 !important;
        }
        
        .error:focus {
            box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.2) !important;
        }
        
        input.error, select.error, textarea.error {
            animation: shake 0.5s ease;
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(errorStyles);
    
    console.log('Инициализация завершена успешно!');
});

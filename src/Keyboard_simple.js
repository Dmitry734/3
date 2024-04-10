// Получаем кнопку и клавиатуру
const toggleKeyboardBtn = document.getElementById('toggleKeyboardBtn');
const keyboard = document.getElementById('keyboard');

// Создаем цифровую клавиатуру
const createKeyboard = () => {
    // Удаляем все кнопки клавиатуры (если они уже были созданы ранее)
    keyboard.innerHTML = '';

    // Создаем кнопки от 0 до 9
    for (let i = 0; i <= 9; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        //button.addEventListener('click', () => {
        // При клике на кнопку выводим ее текст в консоль (можно изменить на другое действие)
        //    console.log(button.textContent);
        //});
        keyboard.appendChild(button);
    }
};

// Обработчик события для кнопки "Toggle Keyboard"
//toggleKeyboardBtn.addEventListener('click', () => {
    // Переключаем видимость клавиатуры
  //  keyboard.style.display = keyboard.style.display === 'none' ? 'block' : 'none';

    // Если клавиатура отображается, создаем ее
    //if (keyboard.style.display === 'block') {
      //  createKeyboard();
    //}
//}
//);
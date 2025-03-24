// файл script.js
window.onload = function(){

    let a = ''
    let b = ''
    let expressionResult = ''
    let selectedOperation = null

    // окно вывода результата
    outputElement = document.getElementById("result")

    // список объектов кнопок циферблата (id которых начинается с btn_digit_)
    digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')

    function onDigitButtonClicked(digit) {
        if (!selectedOperation) {
            if ((digit != '.') || (digit == '.' && !a.includes(digit))) {
                a += digit
                outputElement.innerHTML = a  // Отображаем a
            }

        } else {
            if ((digit != '.') || (digit == '.' && !b.includes(digit))) {
                b += digit
                outputElement.innerHTML = b  // Отображаем b
            }

        }
    }

    // устанавка колбек-функций на кнопки циферблата по событию нажатия
    digitButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = button.innerHTML
            onDigitButtonClicked(digitValue)
        }
    });

    // установка колбек-функций для кнопок операций
    document.getElementById("btn_op_mult").onclick = function() {
        if (a === '') return
        selectedOperation = 'x'
    }
    document.getElementById("btn_op_plus").onclick = function() {
        if (a === '') return
        selectedOperation = '+'
    }
    document.getElementById("btn_op_minus").onclick = function() {
        if (a === '') return
        selectedOperation = '-'
    }
    document.getElementById("btn_op_div").onclick = function() {
        if (a === '') return
        selectedOperation = '/'
    }

    // кнопка процента
    document.getElementById("btn_op_percent").onclick = function() {
        if (a === '') return

        if (!selectedOperation) {
            a = (+a / 100).toString() // Если операция не выбрана, вычисляем процент от первого числа
            outputElement.innerHTML = a
        } else {
            b = (+a * +b / 100).toString() // Если операция выбрана, вычисляем процент от первого числа и применяем ко второму числу
            outputElement.innerHTML = b
            selectedOperation = null; // Сбрасываем операцию после вычисления процента
        }

        // selectedOperation = null // сброс операции, если нужно
    }

    // кнопка изменения знака
    document.getElementById("btn_op_sign").onclick = function() {
        if (a === '') return;

        if (!selectedOperation) {
            a = (-a).toString(); // Меняем знак первого числа
            outputElement.innerHTML = a;
        } else {
            if (b !== '') {
                b = (-b).toString(); // Меняем знак второго числа
                outputElement.innerHTML = b;
            }
        }
    };

    // Функция расчета распада урана
    function calculateUranium() {
        if (a === '' || b === '') return;

        const N0 = parseFloat(a); // Начальная масса урана
        const t = parseFloat(b);   // Время в годах
        const T_half = 703800000; // Период полураспада урана-235
        const lambda = Math.log(2) / T_half; // Константа распада

        const Nt = N0 * Math.exp(-lambda * t); // Формула распада

        expressionResult = Nt.toFixed(10); // Ограничиваем точность до 10 знаков после запятой
        outputElement.innerHTML = expressionResult;
        a = expressionResult; //  Присваиваем результат переменной a
        b = ''; // Очищаем b
        selectedOperation = null; // Сбрасываем selectedOperation
    }


    // Кнопка расчета распада урана
    document.getElementById("btn_op_uranium").onclick = function() {
        if (a === '') return
        selectedOperation = 'uranium';
    };


    // кнопка очищения
    document.getElementById("btn_op_clear").onclick = function() {
        a = ''
        b = ''
        selectedOperation = null
        expressionResult = ''
        outputElement.innerHTML = 0
    }

    // кнопка расчёта результата
    document.getElementById("btn_op_equal").onclick = function() {
        if (a === '' || b === '') return;


        // Стандартные вычисления ( +, -, *, / )
        switch(selectedOperation) {
            case 'x':
                expressionResult = (+a) * (+b)
                break;
            case '+':
                expressionResult = (+a) + (+b)
                break;
            case '-':
                expressionResult = (+a) - (+b)
                break;
            case '/':
                expressionResult = (+a) / (+b)
                break;
            case 'uranium':
                calculateUranium(); // Вызываем функцию расчёта урана
                break;

        expressionResult = Number(expressionResult).toString().replace(/\.0*$/, ''); // Преобразуем в число, затем в строку и убираем лишние нули
        a = expressionResult.toString()
        b = ''
        selectedOperation = null
        outputElement.innerHTML = a
        }
    }
};
const expressionInput = $('.display-expression');
const result = $('.display-result');
const logList = $('.log-list');
const TEN = 10, precision = 5, amountOfOperands = 2, lastItemIndex = -1, penultimateItemIndex = -2;
let expressionCalculated = false;

$('.clear').click(function () {
    expressionInput.text('0');
    result.text('');
});

function clearResult() {
    if (result.text() === 'ERROR') {
        expressionInput.text('0');
        result.text('');
    } else if (result.text()) {
        expressionInput.text(result.text());
        result.text('');
    }
    expressionCalculated = false;
}

$('.backspace').click(function () {
    clearResult();
    if (expressionInput.text().length === 1) {
        expressionInput.text('0');
    } else if (expressionInput.text().length > 1) {
        expressionInput.text(expressionInput.text().slice(0, lastItemIndex));
    }
});

$('.number').click(function () {
    clearResult();
    if (expressionInput.text() === '0') {
        expressionInput.text($(this).val());
    } else if (/[/*+-]0/.test(expressionInput.text().slice(penultimateItemIndex))) {
        expressionInput.text(expressionInput.text().slice(0, lastItemIndex) + $(this).val());
    } else {
        expressionInput.text(expressionInput.text() + $(this).val());
    }
});

$('.sign').click(function () {
    clearResult();
    if (expressionInput.text().split(/[/*+-]/).filter((num) => num !== '').length === amountOfOperands) {
        calculate();
        if (result.text() !== 'ERROR') {
            expressionInput.text(result.text() + $(this).val());
            result.text('');
        }
    } else if (/[/*+-]/.test(expressionInput.text().slice(lastItemIndex))) {
        expressionInput.text(expressionInput.text().slice(0, lastItemIndex) + $(this).val());
    } else {
        expressionInput.text(expressionInput.text() + $(this).val());
    }
});

function round(value, precision) {
    const multiplier = Math.pow(TEN, precision);
    return Math.round(value * multiplier) / multiplier;
}

function appendLogListItem(expression, result) {
    logList.prepend(`<li class="log-list-item">
        <span class="log-item-circle"></span>
        <span class="log-item-expression scroll">${expression}=${result}</span>
        <span class="log-item-delete">&#10006;</span>
      </li>`);
    if (expression.includes('48') || result.includes('48')) {
        $('.log-list li .log-item-expression').first().css('text-decoration', 'underline');
    }
    expressionCalculated = true;
}

function calculate() {
    if (/[/*+-]/.test(expressionInput.text().slice(lastItemIndex))) {
        expressionInput.text(expressionInput.text().slice(0, lastItemIndex));
    }
    const input = expressionInput.text().charAt(0) === '-' ? expressionInput.text().slice(1) : expressionInput.text();
    if (/[/*+-]/.test(input) && !expressionCalculated) {
        const sign = input.match(/[/*+-]/)[0];
        const numbers = input.split(/[/*+-]/).map(Number);
        let res = expressionInput.text().charAt(0) === '-' ? -numbers[0] : numbers[0];
        const num2 = numbers[1];
        let zeroDivisionError = false;
        switch (sign) {
            case '/':
                if (num2 === 0) {
                    zeroDivisionError = true;
                } else {
                    res /= num2;
                }
                break;
            case '*':
                res *= num2;
                break;
            case '+':
                res += num2;
                break;
            case '-':
                res -= num2;
                break;
            default:
                break;
        }
        if (zeroDivisionError) {
            result.text('ERROR').addClass('error');
        } else {
            if (result.hasClass('error')) {
                result.removeClass('error');
            }
            result.text(round(res, precision));
            appendLogListItem(expressionInput.text(), result.text());
        }
    }
}

$('.equals').click(function () {
    calculate();
});

logList.on('click', '.log-item-circle', function () {
    $(this).toggleClass('fill-circle');
});

logList.on('click', '.log-item-delete', function () {
    $(this).closest('.log-list-item').remove();
});

logList.scroll(function () {
    console.log(`Scroll Top: ${$(this).scrollTop()}`);
});

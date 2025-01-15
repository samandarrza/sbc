document.getElementById('turnover').addEventListener('input', updateCalculation);
document.getElementById('employees').addEventListener('input', updateCalculation);
document.getElementById('taxpayer').addEventListener('change', updateCalculation);
document.getElementById('vatpayer').addEventListener('change', updateCalculation);
document.getElementById('fixedassets').addEventListener('change', updateCalculation);


function updateCalculation() {
    var turnover = parseInt(document.getElementById('turnover').value) || 0;
    var employees = parseInt(document.getElementById('employees').value) || 0;
    var serviceType = document.getElementById('service-type');
    var taxpayer = document.getElementById('taxpayer');
    var vatPayer = document.getElementById('vatpayer').value;
    var fixedAssets = document.getElementById('fixedassets').value;


    if (turnover > 3000000) {
        turnover = 3000000;
        document.getElementById('turnover').value = turnover;
    }

    if (employees > 50) {
        employees = 50;
        document.getElementById('employees').value = employees;
    }

    if (turnover > 200000 || employees > 10) {
        serviceType.value = 'small';
        taxpayer.querySelector('option[value="simplified"]').disabled = true;

        if (taxpayer.value === 'simplified') {
            taxpayer.value = 'profit';
        }
    } else {
        serviceType.value = 'micro';
        taxpayer.querySelector('option[value="simplified"]').disabled = false;
    }

    calculateResult(turnover, serviceType.value, taxpayer.value, employees, vatPayer, fixedAssets);
}

function calculateResult(turnover, serviceType, taxpayer, employees, vatPayer, fixedAssets) {
    var result = 0;

    if (serviceType === 'micro') {
        result += 50;
        result += Math.max(110, Math.floor(turnover / 10000) * 10);
    }

    if (serviceType === 'small') {
        result += 100;
        result += Math.max(155, Math.floor(turnover / 18000) * 10);
    }

    result += Math.max(20, employees * 5);

    if (taxpayer === 'simplified') {
        result += 65;
    } else if (taxpayer === 'profit' || taxpayer === 'income') {
        result += 85;
    }

    if (vatPayer === 'yes') {
        result += Math.round(85 + turnover / 10000);
    }
    if (fixedAssets === 'yes') {
        result += Math.round(85 + turnover / 10000);
    }

    document.getElementById('result').innerText = 'Ödəniləcək məbləğ: ' + result + ' AZN';
}
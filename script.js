// Event listener əlavə edirik ki, hər dəfə dövriyyə və işçi sayı dəyişdikdə, hesablamalar yenilənsin.
document.getElementById('turnover').addEventListener('input', updateCalculation);
document.getElementById('employees').addEventListener('input', updateCalculation);
document.getElementById('taxpayer').addEventListener('change', updateCalculation);
document.getElementById('vatpayer').addEventListener('change', updateCalculation);

function updateCalculation() {
    var turnover = parseInt(document.getElementById('turnover').value) || 0;
    var employees = parseInt(document.getElementById('employees').value) || 0;
    var serviceType = document.getElementById('service-type');
    var taxpayer = document.getElementById('taxpayer');
    var vatPayer = document.getElementById('vatpayer').value;

    // Dövriyyəni 10.000.000 ilə məhdudlaşdırırıq
    if (turnover > 10000000) {
        turnover = 10000000;
        document.getElementById('turnover').value = turnover; // İstifadəçiyə 10.000.000 göstəririk
    }

    // İşçi sayını 1000 ilə məhdudlaşdırırıq
    if (employees > 1000) {
        employees = 1000;
        document.getElementById('employees').value = employees; // İstifadəçiyə 1000 göstəririk
    }

    // Dövriyyə və xidmət növünü seçmə
    if (turnover > 3000000) {
        serviceType.value = 'medium';  // Orta Sahibkarlıq seçilir
        taxpayer.value = 'profit'; // Mənfəət vergisi seçilir
    } else if (turnover > 200000) {
        serviceType.value = 'small';   // Kiçik Sahibkarlıq seçilir
        taxpayer.value = 'profit'; // Mənfəət vergisi seçilir
    } else {
        serviceType.value = 'micro';   // Mikro Sahibkarlıq seçilir
    }

    // İşçi sayına görə Sadələşdirilmiş vergi seçiminin deaktiv edilməsi
    if (turnover > 200000 || employees > 10) {
        taxpayer.querySelector('option[value="simplified"]').disabled = true; // Sadələşdirilmiş vergi deaktiv edilir
        
        // Sadələşdirilmiş vergi deaktiv olunduqda, Mənfəət vergisi avtomatik seçilir
        if (taxpayer.value === 'simplified') {
            taxpayer.value = 'profit'; // Mənfəət vergisi seçilir
        }

        // Gəlir vergisini aktiv edirik
        taxpayer.querySelector('option[value="income"]').disabled = false; // Gəlir vergisi aktiv edilir
    } else {
        taxpayer.querySelector('option[value="simplified"]').disabled = false; // Sadələşdirilmiş vergi aktiv edilir
        taxpayer.querySelector('option[value="income"]').disabled = false; // Gəlir vergisi aktiv edilir
    }

    // Hesablama funksiyasını çağırırıq
    calculateResult(turnover, serviceType.value, taxpayer.value, employees, vatPayer);
}

function calculateResult(turnover, serviceType, taxpayer, employees, vatPayer) {
    var result = 0;

    // Mikro Sahibkarlıq üçün hesablama
    if (serviceType === 'micro') {
        result += 50;
        result += Math.max(100, Math.floor(turnover / 12000) * 10); // Mikro sahibkarlıq dövriyyəsinə görə
    }

    // Kiçik Sahibkarlıq üçün hesablama
    if (serviceType === 'small') {
        result += 75;
        result += Math.max(200, Math.floor(turnover / 36000) * 10); // Kiçik sahibkarlıq dövriyyəsinə görə
    }

    // Orta Sahibkarlıq üçün hesablama
    if (serviceType === 'medium') {
        result += 100;
        result += Math.max(850, Math.floor(turnover / 50000) * 10); // Orta sahibkarlıq dövriyyəsinə görə
    }

    // İşçi sayına görə əlavə məbləğ
    result += Math.max(20, employees * 5); // Minimum 20AZN

    // Mükəlləfiyyət seçimi
    if (taxpayer === 'simplified') {
        result += 65;
    } else if (taxpayer === 'profit' || taxpayer === 'income') {
        result += 85;
    }

    // ƏDV ödəyicisi seçimi
    if (vatPayer === 'yes') {
        result += 85 + turnover / 10000;
    }

    // Hesablama nəticəsini göstər
    document.getElementById('result').innerText = 'Ödəniləcək məbləğ: ' + result + ' AZN';
}

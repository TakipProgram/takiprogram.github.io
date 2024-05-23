const API_URL = 'http://localhost:3000'; // Sunucu URL'si

document.getElementById('branch-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Formun varsayılan gönderimini engelle

    // Form değerlerini al
    const branch = {
        productName: document.getElementById('productName').value,
        branchName: document.getElementById('branchName').value,
        contact: document.getElementById('contact').value,
        location: document.getElementById('location').value,
        salesWeight: parseFloat(document.getElementById('salesWeight').value),
        totalAmount: parseFloat(document.getElementById('totalAmount').value),
        receivedAmount: parseFloat(document.getElementById('receivedAmount').value),
        remainingAmount: totalAmount - receivedAmount,
        date: new Date().toLocaleString('tr-TR'),
        iconClass: 'icon green'
    };

    // Veritabanına ekle
    fetch(`${API_URL}/branches`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(branch)
    }).then(response => response.text()).then(() => {
        addBranchToTable(branch);
        this.reset();
    }).catch(error => {
        console.error("Error adding document: ", error);
    });
});

function loadData() {
    fetch(`${API_URL}/branches`).then(response => response.json()).then(data => {
        data.forEach(branch => addBranchToTable(branch));
    }).catch(error => {
        console.error("Error loading data: ", error);
    });
}

function addBranchToTable(branch) {
    const tableBody = document.querySelector('#branch-table tbody');
    const row = document.createElement('tr');
    row.classList.add('branch-row');

    row.innerHTML = `
        <td><span class="${branch.iconClass}"></span></td>
        <td>${branch.productName}</td>
        <td>${branch.branchName}</td>
        <td>${branch.contact}</td>
        <td>${branch.location}</td>
        <td>${branch.salesWeight}</td>
        <td>${branch.totalAmount}</td>
        <td>${branch.receivedAmount}</td>
        <td>${branch.remainingAmount}</td>
        <td>${branch.date}</td>
        <td>
            <button class="action-btn" onclick="makePartialSale(this)">Ara Satış</button>
            <button class="action-btn" onclick="makePartialPayment(this)">Ara Ödeme</button>
            <button class="action-btn" onclick="editBranch(this)">Düzenle</button>
            <button class="action-btn" onclick="deleteBranch(this)">Sil</button>
        </td>
    `;

    tableBody.appendChild(row);
}

// Sayfa yüklendiğinde verileri yükle
window.onload = loadData;

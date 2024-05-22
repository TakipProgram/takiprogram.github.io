document.getElementById('branch-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Formun varsayılan gönderimini engelle

    // Form değerlerini al
    const productName = document.getElementById('productName').value;
    const branchName = document.getElementById('branchName').value;
    const contact = document.getElementById('contact').value;
    const location = document.getElementById('location').value;
    const salesWeight = parseFloat(document.getElementById('salesWeight').value);
    const totalAmount = parseFloat(document.getElementById('totalAmount').value);
    const receivedAmount = parseFloat(document.getElementById('receivedAmount').value);
    const remainingAmount = totalAmount - receivedAmount;
    const date = new Date().toLocaleString('tr-TR');
    const iconClass = 'icon green';

    // Yeni şube nesnesi oluştur
    const branch = {
        productName,
        branchName,
        contact,
        location,
        salesWeight,
        totalAmount,
        receivedAmount,
        remainingAmount,
        date,
        iconClass,
        lastSaleDate: new Date()
    };

    // Şubeyi tabloya ekle
    addBranchToTable(branch);
    saveData(); // Verileri kaydet
    this.reset(); // Formu sıfırla
});

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

function makePartialSale(button) {
    const row = button.parentElement.parentElement;
    const salesWeight = parseFloat(prompt("Satış miktarını girin (KG):"));
    const totalAmount = parseFloat(row.cells[6].textContent);
    const receivedAmount = parseFloat(row.cells[7].textContent) + (salesWeight * (totalAmount / parseFloat(row.cells[5].textContent)));
    const remainingAmount = totalAmount - receivedAmount;

    row.cells[5].textContent = parseFloat(row.cells[5].textContent) - salesWeight;
    row.cells[7].textContent = receivedAmount;
    row.cells[8].textContent = remainingAmount;

    updateDate(row);
    updateIcon(row, remainingAmount > 0 ? 'red' : 'green');
    saveData();
}

function makePartialPayment(button) {
    const row = button.parentElement.parentElement;
    const paymentAmount = parseFloat(prompt("Ödeme miktarını girin (TL):"));
    const receivedAmount = parseFloat(row.cells[7].textContent) + paymentAmount;
    const remainingAmount = parseFloat(row.cells[8].textContent) - paymentAmount;

    row.cells[7].textContent = receivedAmount;
    row.cells[8].textContent = remainingAmount;

    updateDate(row);
    updateIcon(row, remainingAmount > 0 ? 'red' : 'green');
    saveData();
}

function editBranch(button) {
    const row = button.parentElement.parentElement;
    const newProductName = prompt("Yeni Ürün Adı:", row.cells[1].textContent);
    const newBranchName = prompt("Yeni Şube Adı:", row.cells[2].textContent);
    const newContact = prompt("Yeni İletişim:", row.cells[3].textContent);
    const newLocation = prompt("Yeni Konum:", row.cells[4].textContent);
    const newSalesWeight = parseFloat(prompt("Yeni Satış (KG):", row.cells[5].textContent));
    const newTotalAmount = parseFloat(prompt("Yeni Tutar (TL):", row.cells[6].textContent));
    const newReceivedAmount = parseFloat(prompt("Yeni Alınan Tutar (TL):", row.cells[7].textContent));
    const newRemainingAmount = newTotalAmount - newReceivedAmount;

    row.cells[1].textContent = newProductName;
    row.cells[2].textContent = newBranchName;
    row.cells[3].textContent = newContact;
    row.cells[4].textContent = newLocation;
    row.cells[5].textContent = newSalesWeight;
    row.cells[6].textContent = newTotalAmount;
    row.cells[7].textContent = newReceivedAmount;
    row.cells[8].textContent = newRemainingAmount;

    updateDate(row);
    updateIcon(row, newRemainingAmount > 0 ? 'red' : 'green');
    saveData();
}

function deleteBranch(button) {
    const row = button.parentElement.parentElement;
    row.remove();
    saveData();
}

function updateDate(row) {
    const dateCell = row.cells[9];
    const newDate = new Date().toLocaleString('tr-TR');
    dateCell.textContent = newDate;
}

function updateIcon(row, color) {
    const icon = row.cells[0].querySelector('.icon');
    icon.className = `icon ${color}`;
}

function saveData() {
    const tableBody = document.querySelector('#branch-table tbody');
    const rows = Array.from(tableBody.rows);
    const data = rows.map(row => {
        return {
            productName: row.cells[1].textContent,
            branchName: row.cells[2].textContent,
            contact: row.cells[3].textContent,
            location: row.cells[4].textContent,
            salesWeight: parseFloat(row.cells[5].textContent),
            totalAmount: parseFloat(row.cells[6].textContent),
            receivedAmount: parseFloat(row.cells[7].textContent),
            remainingAmount: parseFloat(row.cells[8].textContent),
            date: row.cells[9].textContent,
            iconClass: row.cells[0].querySelector('.icon').className
        };
    });

    localStorage.setItem('branchData', JSON.stringify(data));
}

function loadData() {
    const data = JSON.parse(localStorage.getItem('branchData')) || [];
    data.forEach(branch => {
        addBranchToTable(branch);
    });
}

// Load data when the page is loaded
window.onload = loadData;

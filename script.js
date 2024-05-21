document.getElementById('branch-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const productName = document.getElementById('productName').value;
    const branchName = document.getElementById('branchName').value;
    const contact = document.getElementById('contact').value;
    const location = document.getElementById('location').value;
    const salesWeight = parseFloat(document.getElementById('salesWeight').value);
    const unitPrice = parseFloat(document.getElementById('unitPrice').value);
    const totalAmount = salesWeight * unitPrice;
    const receivedAmount = parseFloat(document.getElementById('receivedAmount').value);
    const remainingAmount = totalAmount - receivedAmount;
    const date = new Date().toLocaleString('tr-TR');
    const iconClass = 'icon green';

    const branch = {
        productName,
        branchName,
        contact,
        location,
        salesWeight,
        unitPrice,
        totalAmount,
        receivedAmount,
        remainingAmount,
        date,
        iconClass,
        lastSaleDate: new Date()
    };

    addBranchToTable(branch);
    saveData();
    takeScreenshot();
    this.reset();
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
        <td>${branch.unitPrice}</td>
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
    animateRow(row);
}

// Diğer fonksiyonları uygun şekilde güncelleyin...

window.onload = loadData;

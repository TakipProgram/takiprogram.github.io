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
    saveData(branch); // Verileri kaydet
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
    saveData(rowToBranch(row)); // Verileri kaydet
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
    saveData(rowToBranch(row)); // Verileri kaydet
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
    row.cells[2].Maalesef, GitHub Pages doğrudan sunucu taraflı veri işleme veya veri saklama işlevselliği sunmadığından, yerel dosya sistemine veri yazmak ve bu verileri diğer kullanıcılara sunmak mümkün değildir. Ancak, GitHub Pages'de barındırılan statik bir site için, herkese açık bir veritabanı kullanarak (örneğin Firebase veya Google Sheets API) veri saklama ve paylaşma işlemlerini gerçekleştirebilirsiniz. Bu sayede veriler tüm kullanıcılarda senkronize olur ve herkes verileri görebilir.

**Firebase Firestore ile Örnek Çözüm:**

1. **Firebase Firestore kullanarak bir proje oluşturun.**

2. **Firebase SDK'yı projeye dahil edin.**

**firebase.js:**
```javascript
// Firebase yapılandırması
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Firebase başlatma
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

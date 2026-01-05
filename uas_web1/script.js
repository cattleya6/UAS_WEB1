// JavaScript untuk logika
const sections = ['login', 'beranda', 'profil', 'transaksi'];
let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

function showSection(section) {
    sections.forEach(s => {
        document.getElementById(s + '-section').classList.add('hidden');
    });
    document.getElementById(section + '-section').classList.remove('hidden');
    if (section === 'beranda') {
        updateStats();
        loadBookCollection();
    }
    if (section === 'transaksi') {
        if (!isLoggedIn) {
            alert('Anda harus login sebagai admin untuk mengakses Transaksi.');
            showSection('login');
            return;
        }
        updateTables();
        updateMemberDropdowns();
    }
}

function checkLogin() {
    if (isLoggedIn) {
        // Mode Admin: Tampilkan nav admin dan kontrol admin
        document.getElementById('login-nav').classList.add('hidden');
        document.getElementById('transaksi-nav').classList.remove('hidden');
        document.getElementById('logout-nav').classList.remove('hidden');
        document.getElementById('admin-controls').classList.remove('hidden');
        showSection('beranda');
    } else {
        // Mode User: Tampilkan nav user
        document.getElementById('login-nav').classList.remove('hidden');
        document.getElementById('transaksi-nav').classList.add('hidden');
        document.getElementById('logout-nav').classList.add('hidden');
        document.getElementById('admin-controls').classList.add('hidden');
        showSection('beranda');
    }
}

// Login form
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username === 'admin' && password === 'cattleya9') {
        isLoggedIn = true;
        localStorage.setItem('isLoggedIn', 'true');
        document.getElementById('login-message').textContent = 'Login berhasil!';
        setTimeout(() => checkLogin(), 1000);
    } else {
        document.getElementById('login-message').textContent = 'Username atau password salah!';
    }
});

// Logout
document.getElementById('logout-link').addEventListener('click', function(e) {
    e.preventDefault();
    isLoggedIn = false;
    localStorage.removeItem('isLoggedIn');
    checkLogin();
});

// Navigasi
window.addEventListener('hashchange', function() {
    const hash = window.location.hash.substring(1);
    if (sections.includes(hash)) {
        showSection(hash);
    } else {
        showSection('beranda'); // Default ke beranda
    }
});

// Fungsi untuk update statistik di beranda
function updateStats() {
    const memberData = JSON.parse(localStorage.getItem('member')) || [];
    const peminjamanData = JSON.parse(localStorage.getItem('peminjaman')) || [];
    const pengembalianData = JSON.parse(localStorage.getItem('pengembalian')) || [];

    document.getElementById('total-member').textContent = memberData.length;
    document.getElementById('total-peminjaman').textContent = peminjamanData.length;
    document.getElementById('total-pengembalian').textContent = pengembalianData.length;
}

// Fungsi untuk load koleksi buku
function loadBookCollection() {
    const bookCards = document.getElementById('book-cards');
    bookCards.innerHTML = '';
    bookCollection.forEach(book => {
        const card = document.createElement('div');
        card.className = 'book-card';
        card.innerHTML = `
            <img src="${book.image}" alt="${book.title}">
            <h4>${book.title}</h4>
            <p>Oleh: ${book.author}</p>
        `;
        bookCards.appendChild(card);
    });
}

// Ganti background (Admin)
function changeBg(type, value) {
    if (type === 'color') {
        document.body.style.backgroundColor = value;
        document.body.style.backgroundImage = 'none';
    } else if (type === 'image') {
        document.body.style.backgroundImage = `url(${value})`;
        document.body.style.backgroundSize = 'cover';
    }
}

// Data sementara (array)
        let members = [];
        let peminjaman = [];
        let pengembalian = [];

        // Fungsi toggle form
        function toggleForm(type) {
            const forms = document.querySelectorAll('.form-section');
            forms.forEach(form => form.classList.remove('active'));
            document.getElementById(type + '-form').classList.add('active');
        }

        // Fungsi update tabel
        function updateTable(tableId, data, columns) {
            const tbody = document.querySelector(`#${tableId} tbody`);
            tbody.innerHTML = '';
            data.forEach(item => {
                const row = document.createElement('tr');
                columns.forEach(col => {
                    const cell = document.createElement('td');
                    cell.textContent = item[col];
                    row.appendChild(cell);
                });
                tbody.appendChild(row);
            });
        }

        // Fungsi tambah member
        function addMember(event) {
            event.preventDefault();
            const id = document.getElementById('member-id').value;
            const name = document.getElementById('member-name').value;
            const email = document.getElementById('member-email').value;
            members.push({ id, name, email });
            updateTable('member-table', members, ['id', 'name', 'email']);
            event.target.reset();
        }

        // Fungsi tambah peminjaman
        function addPeminjaman(event) {
            event.preventDefault();
            const memberId = document.getElementById('peminjaman-member-id').value;
            const judul = document.getElementById('peminjaman-judul').value;
            const tanggal = document.getElementById('peminjaman-tanggal').value;
            peminjaman.push({ memberId, judul, tanggal });
            updateTable('peminjaman-table', peminjaman, ['memberId', 'judul', 'tanggal']);
            event.target.reset();
        }

        // Fungsi tambah pengembalian
        function addPengembalian(event) {
            event.preventDefault();
            const memberId = document.getElementById('pengembalian-member-id').value;
            const judul = document.getElementById('pengembalian-judul').value;
            const tanggal = document.getElementById('pengembalian-tanggal').value;
            pengembalian.push({ memberId, judul, tanggal });
            updateTable('pengembalian-table', pengembalian, ['memberId', 'judul', 'tanggal']);
            event.target.reset();
        }

// Inisialisasi
checkLogin();
// Ambil data lama di localStorage, kalau kosong buat array baru (Null Safety)
let dataMentah = localStorage.getItem("daftarPendaftar");
let daftarPendaftar = dataMentah ? JSON.parse(dataMentah) : [];

const checkbox = document.getElementById('checkSetuju');
const tombol = document.getElementById('tombolSubmit');
const form = document.getElementById('formPendaftaran');

const inputNama = document.getElementById('inputNama');
const inputEmail = document.getElementById('inputEmail');
const errorNama = document.getElementById('error-nama');
const errorEmail = document.getElementById('error-email');

// Check kondisi checkbox. Jika dicentang → tombol submit aktif, dan sebaliknya
checkbox.addEventListener('change', function() {

    if (checkbox.checked) {
        tombol.disabled = false;
    } else {
        tombol.disabled = true;
    }

});

// Form pendaftaran (input, validasi, & submit)
form.addEventListener('submit', function(event) {
    event.preventDefault();

    errorNama.innerText = "";
    errorEmail.innerText = "";
    inputNama.style.borderColor = ""; 
    inputEmail.style.borderColor = "";

    tombol.style.backgroundColor = "";
    tombol.style.color = "";
    tombol.style.borderColor = "";

    let isNamaValid = true;
    let isEmailValid = true;

    if (inputNama.value.trim() === "") {

        errorNama.innerText = "Nama tidak boleh kosong!";
        console.log("Namanya mohon diisi yaa maniezz 😹");
        inputNama.style.borderColor = "red"; 
        isNamaValid = false;

    } else if (inputNama.value.trim().length < 3) {

        errorNama.innerText = "Nama minimal harus 3 karakter!";
        console.log("Nama minimal harus 3 karakter yaa maniezz 😹");
        inputNama.style.borderColor = "red";
        isNamaValid = false;

    }

    if (inputEmail.value.trim() === "") {

        errorEmail.textContent = "Email tidak boleh kosong!";
        console.log("Email enggak boleh kosong yaa maniezz 😹");
        inputEmail.style.borderColor = "red";
        isEmailValid = false;

    } else if (!inputEmail.value.includes('@')) {

        errorEmail.textContent = "Email wajib mengandung karakter '@'!";
        console.log("Emailnya mohon pakai '@' yaa maniezz 😹");
        inputEmail.style.borderColor = "red";
        isEmailValid = false;

    }

    if (!isNamaValid || !isEmailValid) {

        tombol.style.backgroundColor = "#d93025";
        tombol.style.color = "#ffffff";
        tombol.style.borderColor = "#d93025";
        return;

    }

    console.log("Pendaftaran berhasil dikirim! Selamat ya maniezz ><");

    const namaPendaftar = inputNama.value.trim();
    const emailPendaftar = inputEmail.value.trim();
    const kelas = document.getElementById('kelas').value;
    const jurusan = document.getElementById('jurusan').value;

    const idYangSedangDiedit = document.getElementById('editId').value;

    if (idYangSedangDiedit === "") {

        // CREATE - Tambah peserta baru jika ID kosong
        const pesertaBaru = {

            id: "ID_" + Date.now(),
            nama: namaPendaftar,
            email: emailPendaftar,
            kelas: kelas,
            jurusan: jurusan,
            status: "pending"

        };

        daftarPendaftar.push(pesertaBaru);

    } else {

        // UPDATE: Perbarui data peserta lama jika ID-nya ada
        daftarPendaftar = daftarPendaftar.map(function(peserta) {
            if (peserta.id === idYangSedangDiedit) {
                return {

                    id: peserta.id,
                    nama: namaPendaftar,
                    email: emailPendaftar,
                    kelas: kelas,
                    jurusan: jurusan,
                    status: document.getElementById('inputStatus').value

                };

            }

            return peserta; // Biarkan data peserta lain tetap utuh

        });

    }

    // Simpan perubahan terbaru ke localStorage
    localStorage.setItem("daftarPendaftar", JSON.stringify(daftarPendaftar));

    // Bersihkan formulir agar kosong seperti semula
    form.reset();
    document.getElementById('editId').value = "";
    document.getElementById('statusGroup').style.display = "none";
    
    // Kembalikan tombol ke tampilan awal
    tombol.disabled = true;
    tombol.innerText = "Daftar Sekarang";
    tombol.style.backgroundColor = "";
    tombol.style.color = "";
    tombol.style.borderColor = "";

    window.history.replaceState({}, document.title, window.location.pathname);

});

// HOVER
tombol.addEventListener('mouseenter', function() {
    
    // DISABLED
    if (tombol.disabled) {
        return; 
    }
    
    // Kalau tombol aktif, cek warnanya kayak biasa
    if (tombol.style.backgroundColor === "rgb(217, 48, 37)" || tombol.style.backgroundColor === "#d93025") {
        // KALAU MERAH (ERROR)
        tombol.style.boxShadow = "0 0 15px rgba(217, 48, 37, 0.6)";
        tombol.style.borderColor = "#d93025";

    } else {

        // KALAU NORMAL (HITAM)
        tombol.style.boxShadow = "0 0 15px rgba(0, 102, 204, 0.5)";
        tombol.style.borderColor = "#0066cc";
    }

});


// UNHOVER (cursor keluar dari tombol)
tombol.addEventListener('mouseleave', function() {

    // Delete shadow 
    tombol.style.boxShadow = "";
    
    // Kembalikan border sesuai warna dasarnya
    if (tombol.style.backgroundColor === "rgb(217, 48, 37)" || tombol.style.backgroundColor === "#d93025") {
        tombol.style.borderColor = "#d93025";

    } else {

        tombol.style.borderColor = "#222222"; // Warna border default
    }

});


const urlParams = new URLSearchParams(window.location.search);
const currentEditId = urlParams.get('editId');

const editIdInput = document.getElementById('editId');
const statusGroup = document.getElementById('statusGroup');
const inputStatus = document.getElementById('inputStatus');

// Kalau di alamat URL terdeteksi ada ID pendaftar yang dikirim
if (currentEditId) {

    // Cari data peserta yang cocok di dalam array daftarPendaftar
    const dataKetemu = daftarPendaftar.find(function(peserta) {

        return peserta.id === currentEditId;

    });

    if (dataKetemu) {
        
        editIdInput.value = dataKetemu.id;
        inputNama.value = dataKetemu.nama;
        inputEmail.value = dataKetemu.email;
        document.getElementById('kelas').value = dataKetemu.kelas;
        document.getElementById('jurusan').value = dataKetemu.jurusan;

        statusGroup.style.display = 'block';
        inputStatus.value = dataKetemu.status;

        checkbox.checked = true;
        tombol.disabled = false;
        tombol.innerText = "Simpan Perubahan";
        tombol.style.backgroundColor = "#326bd6";
        tombol.style.borderColor = "#326bd6";

    }
}
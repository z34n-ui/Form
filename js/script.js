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

    console.log("Pendaftaran berhasil dikirim! Semangat ya maniezz ><");
    
    const namaPendaftar = inputNama.value;
    const emailPendaftar = inputEmail.value;
    const kelas = document.getElementById('kelas').value;
    const jurusan = document.getElementById('jurusan').value;

    form.reset();
    tombol.disabled = true;

    document.getElementById('hasil').innerHTML = `
        <div style="margin-top: 20px; padding: 15px; background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb; border-radius: 20px;">
            <h3>🎉 Pendaftaran Berhasil!</h3>
            <p><strong>Nama:</strong> ${namaPendaftar}</p>
            <p><strong>Email:</strong> ${emailPendaftar}</p>
            <p><strong>Kelas:</strong> ${kelas}</p>
            <p><strong>Jurusan:</strong> ${jurusan}</p>
        </div>
    `;

});

// HOVER
tombol.addEventListener('mouseenter', function() {
    
    // DISABLED
    if (tombol.disabled) {
        return; 
    }
    
    // Jika tombol aktif, cek warnanya kayak biasa
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
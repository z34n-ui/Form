let dataMentah = localStorage.getItem('daftarPendaftar');
let daftarPendaftar = dataMentah ? JSON.parse(dataMentah) : [];

const tabelPeserta = document.getElementById('tabelPeserta');

function renderTable() { 
    tabelPeserta.innerHTML = '';

    daftarPendaftar.forEach(function(peserta) {

        const baris = document.createElement('tr');

        baris.innerHTML = `

            <td>${peserta.nama}</td>
            <td>${peserta.email}</td>
            <td>${peserta.jurusan}</td>
            <td>${peserta.kelas}</td>
            <td><span class="status-badge">${peserta.status}</span></td>
            
            <td>
                <div class="action-group">
                    <button type="button" class="btn-edit" onclick="editDataPeserta('${peserta.id}')">Edit</button>
                    <button type="button" class="btn-hapus" onclick="hapusDataPeserta('${peserta.id}')">Hapus</button>
                </div>
            </td>

        `;

        tabelPeserta.appendChild(baris);

    });

}

// Logika Hapus Peserta (Delete)
window.hapusDataPeserta = function(idTarget) {

    let konfirmasi = confirm("Hapus data peserta ini?");
    
    if (konfirmasi) {

        daftarPendaftar = daftarPendaftar.filter(function(peserta) {

            return peserta.id !== idTarget;

        });
        
        localStorage.setItem("daftarPendaftar", JSON.stringify(daftarPendaftar));

        renderTable();

        console.log("Data berhasil dihapus!");

    }

};

// Logika Edit Peserta (Update)
window.editDataPeserta = function(idTarget) {

    // Arahkan browser keluar dari folder pages untuk membuka index.html sambil membawa ID di URL
    window.location.href = "../index.html?editId=" + idTarget;

};

renderTable();
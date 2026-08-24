// ===============================
// ELEMEN DOM
// ===============================

const form = document.querySelector("#formpendaftaran");

const inputNama = document.querySelector("#nama");
const inputEmail = document.querySelector("#email");
const inputEvent = document.querySelector("#event");

const jumlahKarakter = document.querySelector("#jumlahkarakter");
const pesanEnter = document.querySelector("#enter");
const informasiForm = document.querySelector("#informasiform");

const resetButton = document.querySelector("#resetbtn");
const hapusSemuaButton = document.querySelector("#hapussemua");

const daftarPeserta = document.querySelector("#partisiper");

const totalPeserta = document.querySelector(".tkskananblok1 h1");


// ===============================
// DATA PESERTA
// ===============================

let pesertaList = [];


// ===============================
// JUMLAH KARAKTER
// ===============================

inputNama.addEventListener("input", function () {

    const jumlah = inputNama.value.length;

    jumlahKarakter.textContent =
        "Jumlah karakter: " + jumlah;

});


// ===============================
// EVENT KEYDOWN
// ===============================

inputNama.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        pesanEnter.textContent =
            "Tombol Enter ditekan!";

    } else {

        pesanEnter.textContent = "";

    }

});


// ===============================
// SUBMIT FORM
// ===============================

form.addEventListener("submit", function (event) {

    // Mencegah halaman reload
    event.preventDefault();


    // Ambil nilai input
    const nama = inputNama.value.trim();
    const email = inputEmail.value.trim();
    const eventNama = inputEvent.value.trim();


    // ===============================
    // VALIDASI
    // ===============================

    if (nama === "" || email === "" || eventNama === "") {

        informasiForm.textContent =
            "⚠️ Nama, email, dan event wajib diisi!";

        informasiForm.className =
            "informasiform error";

        return;
    }


    // ===============================
    // SIMPAN DATA
    // ===============================

    const peserta = {
        nama: nama,
        email: email,
        event: eventNama
    };


    pesertaList.push(peserta);


    // ===============================
    // TAMPILKAN DATA
    // ===============================

    renderPeserta();


    // ===============================
    // NOTIFIKASI
    // ===============================

    informasiForm.textContent =
        "✅ Peserta berhasil didaftarkan!";

    informasiForm.className =
        "informasiform success";


    // ===============================
    // RESET INPUT
    // ===============================

    inputNama.value = "";
    inputEmail.value = "";
    inputEvent.value = "";

    jumlahKarakter.textContent =
        "Jumlah karakter: 0";

    pesanEnter.textContent = "";

    inputNama.focus();

});


// ===============================
// RENDER PESERTA
// ===============================

function renderPeserta() {

    daftarPeserta.innerHTML = "";


    // Kalau belum ada peserta
    if (pesertaList.length === 0) {

        daftarPeserta.innerHTML =
            '<p class="tulisankosong">Belum ada peserta.</p>';

        totalPeserta.textContent = "0";

        return;
    }


    // Buat daftar peserta
    pesertaList.forEach(function (peserta, index) {

        // Card peserta
        const card = document.createElement("div");

        card.className = "peserta";


        // Informasi peserta
        const informasi = document.createElement("div");

        informasi.className = "informasi-peserta";


        const nama = document.createElement("p");

        nama.innerHTML =
            "<strong>Nama</strong> : " + peserta.nama;


        const email = document.createElement("p");

        email.innerHTML =
            "<strong>Email</strong> : " + peserta.email;


        const event = document.createElement("p");

        event.innerHTML =
            "<strong>Event</strong> : " + peserta.event;


        // Tombol hapus
        const tombolHapus = document.createElement("button");

        tombolHapus.textContent = "Hapus";

        tombolHapus.className = "btn-hapus";


        // Event tombol hapus
        tombolHapus.addEventListener("click", function () {

            pesertaList.splice(index, 1);

            renderPeserta();

        });


        // Masukkan informasi
        informasi.appendChild(nama);
        informasi.appendChild(email);
        informasi.appendChild(event);


        // Masukkan semuanya ke card
        card.appendChild(informasi);
        card.appendChild(tombolHapus);


        // Masukkan card ke daftar
        daftarPeserta.appendChild(card);

    });


    // Update jumlah peserta
    totalPeserta.textContent =
        pesertaList.length;

}


// ===============================
// RESET FORM
// ===============================

resetButton.addEventListener("click", function () {

    inputNama.value = "";
    inputEmail.value = "";
    inputEvent.value = "";

    jumlahKarakter.textContent =
        "Jumlah karakter: 0";

    pesanEnter.textContent = "";

    informasiForm.textContent = "";

    informasiForm.className =
        "informasiform";

    inputNama.focus();

});


// ===============================
// HAPUS SEMUA PESERTA
// ===============================

hapusSemuaButton.addEventListener("click", function () {

    if (pesertaList.length === 0) {

        return;

    }


    const yakin = confirm(
        "Apakah semua peserta ingin dihapus?"
    );


    if (yakin) {

        pesertaList = [];

        renderPeserta();

        informasiForm.textContent =
            "Semua peserta berhasil dihapus.";

        informasiForm.className =
            "informasiform success";

    }

});


// ===============================
// TAMPILAN AWAL
// ===============================

renderPeserta();
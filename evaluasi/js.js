

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


let pesertaList = [];


inputNama.addEventListener("input", function () {
    const jumlah = inputNama.value.length;
    jumlahKarakter.textContent =
        "Jumlah karakter: " + jumlah;
});


inputNama.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        pesanEnter.textContent =
            "Tombol Enter ditekan!";
    } else {
        pesanEnter.textContent = "";

    }
});


form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nama = inputNama.value.trim();
    const email = inputEmail.value.trim();
    const eventNama = inputEvent.value.trim();


    if (nama === "" || email === "" || eventNama === "") {

        informasiForm.textContent =
            "⚠️ Nama, email, dan event wajib diisi!";
        informasiForm.className =
            "informasiform error";
        return;
    }

    const peserta = {
        nama: nama,
        email: email,
        event: eventNama
    };

    pesertaList.push(peserta);

    renderPeserta();

    informasiForm.textContent =
        "✅ Peserta berhasil didaftarkan!";
    informasiForm.className =
        "informasiform success";

    inputNama.value = "";
    inputEmail.value = "";
    inputEvent.value = "";

    jumlahKarakter.textContent =
        "Jumlah karakter: 0";

    pesanEnter.textContent = "";

    inputNama.focus();

});

function renderPeserta() {
    daftarPeserta.innerHTML = "";

    // Kalau belum ada peserta
    if (pesertaList.length === 0) {

        daftarPeserta.innerHTML =
            '<p class="tulisankosong">Belum ada peserta.</p>';

        totalPeserta.textContent = "0";

        return;
    }

    pesertaList.forEach(function (peserta, index) {

        const card = document.createElement("div");
        card.className = "peserta";

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

        const tombolHapus = document.createElement("button");
        tombolHapus.textContent = "Hapus";
        tombolHapus.className = "btn-hapus";

        tombolHapus.addEventListener("click", function () {
            pesertaList.splice(index, 1);
            renderPeserta();
        });

        informasi.appendChild(nama);
        informasi.appendChild(email);
        informasi.appendChild(event);
        card.appendChild(informasi);
        card.appendChild(tombolHapus);
        daftarPeserta.appendChild(card);

    });

    totalPeserta.textContent =
        pesertaList.length;
}

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

renderPeserta();
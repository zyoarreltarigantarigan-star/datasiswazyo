import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";

const nama = document.getElementById("nama");
const kelas = document.getElementById("kelas");
const nilai = document.getElementById("nilai");

window.tambahData = async function () {
  try {
    await addDoc(collection(db, "Siswa"), {
      nama: nama.value,
      kelas: kelas.value,
      nilai: Number(nilai.value),
    });

    alert("Data berhasil disimpan");

    nama.value = "";
    kelas.value = "";
    nilai.value = "";

    await tampilkanData();
  } catch (error) {
    console.error("Gagal menyimpan data:", error);

    alert("Gagal menyimpan data: " + error.message);
  }
};

async function tampilkanData() {
  const daftar = document.getElementById("daftarSiswa");

  daftar.innerHTML = "";

  const data = await getDocs(collection(db, "Siswa"));

  data.forEach((doc) => {
    const siswa = doc.data();

    daftar.innerHTML += `
            <div>
                <p>Nama: ${siswa.nama}</p>
                <p>Kelas: ${siswa.kelas}</p>
                <p>Nilai: ${siswa.nilai}</p>
            </div>
        `;
  });
}

tampilkanData();

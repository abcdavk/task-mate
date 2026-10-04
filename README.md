# Task Mate

Task Mate adalah aplikasi daftar tugas untuk membantu mengatur pekerjaan kuliah berdasarkan tanggal, status, dan mata kuliah. Tugas disimpan dalam vault agar daftar untuk setiap kebutuhan tetap terpisah.

## Pembuat

| Nama   | GitHub                                       |
| ------ | -------------------------------------------- |
| Farell | [@frevszz](https://github.com/frevszz)       |
| Alizah | [@aliali8230](https://github.com/aliali8230) |
| Davie  | [@abcdavk](https://github.com/abcdavk)       |

## Dokumentasi

Task Mate dibuat menggunakan React dan Vite. Data vault, tugas, dan mata kuliah disimpan di `localStorage` browser. Setiap vault memiliki daftar tugas dan mata kuliah tersendiri.

## Struktur File

```text
task-mate/
├── public/                  # Aset publik, seperti ikon aplikasi
├── src/
│   ├── assets/              # Aset yang digunakan di dalam aplikasi
│   ├── components/
│   │   └── ui/              # Form, daftar tugas, filter, dialog, dan vault
│   ├── styles/              # Stylesheet untuk daftar tugas
│   ├── utils/               # Utilitas tanggal, penyimpanan tugas, dan vault
│   ├── App.css              # Gaya utama aplikasi
│   ├── App.jsx              # Komponen utama dan integrasi fitur
│   ├── index.css            # Gaya global
│   └── main.jsx             # Entry point React
├── index.html               # HTML utama Vite
├── package.json             # Dependensi dan perintah npm
└── vite.config.js           # Konfigurasi Vite
```

### Fitur

- Membuat, mengganti nama, dan berpindah antar-vault.
- Menambahkan tugas dengan judul, tanggal, catatan, dan kategori mata kuliah.
- Mengedit, menandai selesai/belum selesai, dan menghapus tugas.
- Mencari tugas berdasarkan judul serta memfilter tugas berdasarkan status.
- Menampilkan jumlah seluruh tugas, tugas yang belum selesai, dan tugas yang selesai.
- Menambah dan mengelola pilihan mata kuliah pada vault.
- Menyimpan data secara lokal di browser tanpa perlu akun.

### Checklist Fitur Wajib

| Selesai | No. | Fitur           | Keterangan                                                                                                                   |
| ------- | --: | --------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| [x]     |  01 | Tambah tugas    | Judul dan tanggal wajib diisi serta catatan opsional; mata kuliah belum diwajibkan seperti pada spesifikasi.                 |
| [x]     |  02 | Daftar tugas    | Menampilkan detail dan status tugas, serta petunjuk saat daftar kosong atau tidak ada hasil yang sesuai.                     |
| [x]     |  03 | Edit dan hapus  | Detail tugas dapat diedit dan perubahan dapat dibatalkan; penghapusan meminta konfirmasi.                                    |
| [x]     |  04 | Status tugas    | Status tugas dapat diubah antara belum selesai dan selesai.                                                                  |
| [x]     |  05 | Cari dan filter | Pencarian judul tidak membedakan huruf besar/kecil; filter tersedia untuk semua, belum selesai, dan selesai.                 |
| [x]     |  06 | Ringkasan       | Menampilkan jumlah total tugas, tugas belum selesai, dan tugas selesai.                                                      |
| [x]     |  07 | Simpan otomatis | Perubahan tersimpan di `localStorage` dan tersedia kembali setelah halaman dimuat ulang di browser yang sama.                |
| [x]     |  08 | Responsif       | Aturan layout mobile dan desktop tersedia; tampilan tanpa scroll horizontal pada lebar 360 px dan 1280 px masih perlu diuji. |

## Cara Menjalankan

Pastikan [Git](https://git-scm.com/), [Node.js](https://nodejs.org/), dan npm telah terpasang. Clone repository dan masuk ke direktori proyek:

```bash
git clone https://github.com/abcdavk/task-mate.git
cd task-mate
```

Instal dependensi, lalu jalankan server pengembangan:

```bash
npm install
npm run dev
```

Buka alamat lokal yang ditampilkan Vite di terminal (biasanya `http://localhost:5173`).

Perintah lain yang tersedia:

```bash
npm run build    # Membuat build produksi di direktori dist
npm run preview  # Menjalankan pratinjau build produksi
npm run lint     # Memeriksa kode dengan Oxlint
```

## Kontribusi

| Kontributor | Bagian                             |
| ----------- | ---------------------------------- |
| Farell      | Form tugas                         |
| Alizah      | Daftar tugas                       |
| Davie       | Integrasi aplikasi dan fitur vault |

## Keterbatasan

- Data hanya tersimpan di `localStorage` browser dan perangkat yang digunakan. Data tidak tersinkronisasi ke akun atau perangkat lain.
- Menghapus data situs/browser dapat menghapus vault, tugas, dan mata kuliah yang tersimpan.
- Aplikasi belum menyediakan backend, autentikasi, atau fitur ekspor dan pencadangan data.

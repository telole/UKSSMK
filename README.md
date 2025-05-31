# Sistem UKS (Unit Kesehatan Sekolah)

## Deskripsi Proyek

Sistem UKS (Unit Kesehatan Sekolah) adalah aplikasi berbasis web untuk memudahkan manajemen kesehatan di sekolah. Aplikasi ini mendukung dua peran utama, **Siswa** dan **Petugas UKS**, dengan kontrol akses berbasis peran (RBAC) untuk membedakan hak akses antara siswa dan petugas. Fitur utama dari sistem ini mencakup pencatatan kunjungan UKS, manajemen obat, konsultasi online, artikel kesehatan, laporan darurat, serta dashboard statistik untuk memantau kesehatan sekolah.

## Fitur

- **Registrasi dan Login**: Sistem memungkinkan siswa dan petugas UKS untuk melakukan registrasi dan login dengan kontrol akses berdasarkan peran.
- **Pencatatan Kunjungan UKS**: Siswa dapat menginput keluhan kesehatan, dan petugas memberikan diagnosa serta tindakan yang dicatat dengan tanggal dan waktu kunjungan.
- **Manajemen Obat**: Petugas dapat mengelola stok obat dan mencatat penggunaan obat terkait kunjungan.
- **Artikel Kesehatan**: Petugas dapat membuat dan mengelola artikel edukasi kesehatan yang dapat dibaca oleh siswa.
- **Konsultasi Online**: Siswa dapat mengajukan pertanyaan kesehatan kepada petugas yang dapat memberikan jawaban melalui sistem.
- **Laporan Darurat**: Siswa dan petugas dapat melaporkan kejadian darurat kesehatan, dan petugas dapat menindaklanjutinya.
- **Dashboard Statistik**: Visualisasi grafik untuk statistik kunjungan, penggunaan obat, dan laporan darurat kesehatan di sekolah.

## Instalasi

### Prasyarat

- Node.js (versi terbaru)
- Database (MySQL atau MongoDB)
  
### Langkah-Langkah Instalasi

1. Clone repositori ini:

    ```bash
    git clone https://github.com/username/repository-name.git
    cd repository-name
    ```

2. Install dependensi dengan npm:

    ```bash
    npm install
    ```

3. Konfigurasi database pada file konfigurasi sesuai dengan kebutuhan proyek.

4. Jalankan server:

    ```bash
    npm start
    ```

5. Akses aplikasi melalui `http://localhost:3000` di browser.


## Teknologi yang Digunakan

- **Frontend**: Vue.js
- **Backend**: Laravel
- **Database**: MySQL / MongoDB
- **Authentication**: BearerToken
- **UI**: Bootstrap 5

## Role-Based Access Control (RBAC)

Aplikasi ini memiliki dua peran utama:

- **Siswa**: Akses untuk menginput keluhan, membaca artikel kesehatan, bertanya di konsultasi online, dan melaporkan kejadian darurat.
- **Petugas UKS**: Akses lebih luas untuk manajemen artikel, pencatatan kunjungan UKS, manajemen obat, serta menanggapi konsultasi online dan laporan darurat.

## Kontribusi

1. Fork repositori ini.
2. Buat branch baru (`git checkout -b fitur-baru`).
3. Lakukan perubahan dan commit (`git commit -am 'Menambahkan fitur baru'`).
4. Push ke branch baru (`git push origin fitur-baru`).
5. Buat Pull Request ke branch `main`.

## Lisensi

Distribusi kode ini dilisensikan di bawah **MIT License** - lihat file [LICENSE](LICENSE) untuk detail lebih lanjut.

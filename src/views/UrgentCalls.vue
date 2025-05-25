<template>
      <div class="container py-4">
        <div class="row mb-4">
            <div class="col-12">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="dashboard-siswa.html">Dashboard</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Laporan Darurat</li>
                    </ol>
                </nav>
                <div class="d-flex justify-content-between align-items-center">
                    <h2 class="mb-0">Laporan Darurat</h2>
                    <a href="#laporDarurat" class="btn btn-danger" data-bs-toggle="modal">
                        <i class="bi bi-exclamation-triangle-fill me-1"></i>Lapor Darurat Sekarang
                    </a>
                </div>
                <p class="text-muted">Laporkan kejadian darurat kesehatan di lingkungan sekolah</p>
            </div>
        </div>

        <!-- Alert Info -->
        <div class="alert alert-info alert-dismissible fade show mb-4" role="alert">
            <div class="d-flex align-items-center">
                <i class="bi bi-info-circle-fill me-2 fs-4"></i>
                <div>
                    <strong>Informasi Penting!</strong> Fitur ini hanya untuk keadaan darurat kesehatan yang membutuhkan penanganan segera. Untuk konsultasi biasa, silakan gunakan fitur Konsultasi.
                </div>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>

        <!-- Tabs -->
        <ul class="nav nav-tabs mb-4">
            <li class="nav-item">
                <a class="nav-link active" href="#riwayat" data-bs-toggle="tab">Riwayat Laporan</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#panduan" data-bs-toggle="tab">Panduan Darurat</a>
            </li>
        </ul>

        <div class="tab-content">
            <!-- Riwayat Laporan Tab -->
            <div class="tab-pane fade show active" id="riwayat">
                <div class="card shadow-sm">
                    <div class="card-body">
                        <div class="row mb-3">
                            <div class="col-md-6">
                                <div class="input-group">
                                    <input type="text" class="form-control" placeholder="Cari laporan...">
                                    <button class="btn btn-outline-secondary" type="button">
                                        <i class="bi bi-search"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="col-md-6 mt-3 mt-md-0">
                                <div class="d-flex justify-content-md-end">
                                    <select class="form-select w-auto">
                                        <option selected>Semua Status</option>
                                        <option>Dilaporkan</option>
                                        <option>Ditangani</option>
                                        <option>Selesai</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="table-responsive">
                            <table class="table table-hover align-middle">
                                <thead class="table-light">
                                    <tr>
                                        <th>Tanggal</th>
                                        <th>Jenis Kejadian</th>
                                        <th>Lokasi</th>
                                        <th>Status</th>
                                        <th>Tindakan</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>15 Nov 2023<br><small class="text-muted">10:15</small></td>
                                        <td>Siswa pingsan saat upacara</td>
                                        <td>Lapangan Upacara</td>
                                        <td><span class="badge bg-success">Selesai</span></td>
                                        <td>Dibawa ke UKS, diberikan pertolongan pertama dan istirahat</td>
                                        <td>
                                            <a href="#" class="btn btn-sm btn-outline-primary">Detail</a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>8 Nov 2023<br><small class="text-muted">13:45</small></td>
                                        <td>Cedera saat pelajaran olahraga</td>
                                        <td>Lapangan Basket</td>
                                        <td><span class="badge bg-success">Selesai</span></td>
                                        <td>Pertolongan pertama untuk keseleo pergelangan kaki, kompres es</td>
                                        <td>
                                            <a href="#" class="btn btn-sm btn-outline-primary">Detail</a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>25 Okt 2023<br><small class="text-muted">09:30</small></td>
                                        <td>Reaksi alergi makanan</td>
                                        <td>Kantin Sekolah</td>
                                        <td><span class="badge bg-success">Selesai</span></td>
                                        <td>Pemberian obat anti alergi, pemantauan kondisi</td>
                                        <td>
                                            <a href="#" class="btn btn-sm btn-outline-primary">Detail</a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <nav aria-label="Page navigation" class="mt-4">
                            <ul class="pagination justify-content-center">
                                <li class="page-item disabled">
                                    <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Previous</a>
                                </li>
                                <li class="page-item active"><a class="page-link" href="#">1</a></li>
                                <li class="page-item"><a class="page-link" href="#">2</a></li>
                                <li class="page-item">
                                    <a class="page-link" href="#">Next</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
            <Urgent/>
        </div>
      </div>
      <CreateLaporan/>
</template>
<script setup>
import CreateLaporan from '../components/Tabs/Create-Laporan.vue';
import Urgent from '../components/Tabs/Urgent.vue';

</script>
<style lang="">
    
</style>
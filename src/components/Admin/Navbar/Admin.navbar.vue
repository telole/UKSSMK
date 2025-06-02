<template>
   <nav class="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
        <div class="container">
            <a class="navbar-brand" href="#">
                <i class="bi bi-hospital me-2"></i>Sistem UKS
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <a class="nav-link active" href="/admin-dashboard">
                            <i class="bi bi-speedometer2 me-1"></i>Dashboard
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/admin-kunjungan">
                            <i class="bi bi-clipboard-plus me-1"></i>Kunjungan UKS
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/obat">
                            <i class="bi bi-capsule me-1"></i>Manajemen Obat
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/admin-artikel">
                            <i class="bi bi-journal-text me-1"></i>Artikel Kesehatan
                        </a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                            <i class="bi bi-chat-dots me-1"></i>Komunikasi
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="admin-konsultasi">Konsultasi</a></li>
                            <li><a class="dropdown-item" href="Urgent-Callls">Laporan Darurat</a></li>
                        </ul>
                    </li>
                    <!-- <li class="nav-item">
                        <a class="nav-link" href="statistik-petugas.html">
                            <i class="bi bi-bar-chart me-1"></i>Statistik
                        </a>
                    </li> -->
                </ul>
                <div class="dropdown">
                    <a class="btn btn-light dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                        <i class="bi bi-person-circle me-1"></i>{{name}}
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" @click="Logout()"><i class="bi bi-box-arrow-right me-2"></i>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</template>
<script setup>
function Logout() {
    localStorage.removeItem('name');
    localStorage.removeItem('token')
    window.location.href = '/'
    alert('Anda Telah Logout')
}

const name = localStorage.getItem('name');


</script>
<style scoped>
.dropdown:hover .dropdown-menu {
    display: block;
}

.dropdown-menu {
    transition: all 0.2s ease;
}


    
</style>
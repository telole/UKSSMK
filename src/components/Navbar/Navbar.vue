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
                        <a class="nav-link active" href="dashboard-siswa.html">
                            <i class="bi bi-speedometer2 me-1"></i>Dashboard
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="kunjungan-siswa.html">
                            <i class="bi bi-clipboard-plus me-1"></i>Kunjungan UKS
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="artikel-siswa.html">
                            <i class="bi bi-journal-text me-1"></i>Artikel Kesehatan
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="konsultasi-siswa.html">
                            <i class="bi bi-chat-dots me-1"></i>Konsultasi
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="darurat-siswa.html">
                            <i class="bi bi-exclamation-triangle me-1"></i>Lapor Darurat
                        </a>
                    </li>
                </ul>
                <div class="dropdown">
                    <a class="btn btn-light dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                        <i class="bi bi-person-circle me-1"></i>Budi Santoso
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li><a class="dropdown-item" href="profil-siswa.html"><i class="bi bi-person me-2"></i>Profil</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="login.html"><i class="bi bi-box-arrow-right me-2"></i>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
 </template>
 <script setup>

 </script>
 <style lang="">
    
 </style>   
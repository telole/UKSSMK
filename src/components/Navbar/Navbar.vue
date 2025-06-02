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
                        <router-link to="/dashboard" class="nav-link" active-class="active" exact>
                        <i class="bi bi-speedometer2 me-1"></i> Dashboard
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/kunjungan" class="nav-link" active-class="active" exact>
                        <i class="bi bi-clipboard-plus me-1"></i> Kunjungan UKS
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/Artikel" class="nav-link" active-class="active" exact>
                            <i class="bi bi-journal-text me-1"></i> Artikel Kesehatan
                        </router-link>
                    </li>
                    <li class="nav-item">
                         <router-link to="/Konsultasi" class="nav-link" active-class="active" exact>
                            <i class="bi bi-chat-dots me-1"></i> Konsultasi
                         </router-link>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/laporan">
                            <i class="bi bi-exclamation-triangle me-1"></i> Lapor Darurat
                        </a>
                    </li>
                </ul>
                <div class="dropdown">
                    <a class="btn btn-light dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                        <i class="bi bi-person-circle me-1"></i> {{name}}
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end" >
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="login.html" @click.prevent="Logout"><i class="bi bi-box-arrow-right me-2"></i>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
 </template>
 <script setup>
import router from '../../router';

//  Hanya mengambil nama Dari LocalStorage yg telah disimpan di Menu Login
 const name = localStorage.getItem('name');
 console.log(name);

 function Logout() {
    localStorage.removeItem('name');
    localStorage.removeItem('token')
    alert('logout Berhasil')
    router.push('/')
 }

 </script>
 <style scoped>
    .dropdown:hover .dropdown-menu {
    display: block;
}

.dropdown-menu {
    transition: all 0.2s ease;
}
 </style>   
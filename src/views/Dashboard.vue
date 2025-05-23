  <template>
    <Navbar/>

    <div class="container my-4">
      <WelcomeCard/>
      <div class="row g-3 mb-4">
       <KunjunganUksCard/>
       <ArtikelCard/>
       <KonsultCard/>
       <UrgentCallsCard/>

      </div>

      <!-- Recent Activities -->
      <div class="row mb-4">
        <div class="col-lg-8">
          <div class="card shadow-sm">
            <div class="card-header">
              <h5 class="mb-0">Aktivitas Terbaru</h5>
            </div>
            <div class="card-body">
              <div class="list-group list-group-flush">
                <div class="list-group-item">
                  <div class="d-flex justify-content-between">
                    <h6 class="mb-1">Kunjungan UKS</h6>
                    <small>2 jam lalu</small>
                  </div>
                  <p class="mb-1">Mengeluh sakit kepala dan diperiksa oleh petugas.</p>
                  <small class="text-muted">Status: Selesai</small>
                </div>
                <div class="list-group-item">
                  <div class="d-flex justify-content-between">
                    <h6 class="mb-1">Artikel: Pentingnya Sarapan</h6>
                    <small>1 hari lalu</small>
                  </div>
                  <p class="mb-1">Membaca artikel tentang pentingnya sarapan sebelum sekolah.</p>
                  <small class="text-muted">Kategori: Edukasi</small>
                </div>
                <div class="list-group-item">
                  <div class="d-flex justify-content-between">
                    <h6 class="mb-1">Artikel: Pentingnya Sarapan</h6>
                    <small>1 hari lalu</small>
                  </div>
                  <p class="mb-1">Membaca artikel tentang pentingnya sarapan sebelum sekolah.</p>
                  <small class="text-muted">Kategori: Edukasi</small>
                </div>
                <div class="list-group-item">
                  <div class="d-flex justify-content-between">
                    <h6 class="mb-1">Artikel: Pentingnya Sarapan</h6>
                    <small>1 hari lalu</small>
                  </div>
                  <p class="mb-1">Membaca artikel tentang pentingnya sarapan sebelum sekolah.</p>
                  <small class="text-muted">Kategori: Edukasi</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Artikel Terbaru -->
        <div class="col-lg-4 mt-4 mt-lg-0">
          <div class="card shadow-sm">
            <div class="card-header">
              <h5 class="mb-0">Artikel Terbaru</h5>
            </div>
            <div class="card-body">
              <div class="list-group list-group-flush">
                <a href="#" class="list-group-item list-group-item-action">
                  <div class="d-flex justify-content-between">
                    <h6 class="mb-1">Tips Menjaga Kesehatan</h6>
                    <small>Hari ini</small>
                  </div>
                  <small class="text-muted">Kategori: Tips</small>
                </a>
                <a href="#" class="list-group-item list-group-item-action">
                  <div class="d-flex justify-content-between">
                    <h6 class="mb-1">Olahraga Ringan di Rumah</h6>
                    <small>3 hari lalu</small>
                  </div>
                  <small class="text-muted">Kategori: Gaya Hidup</small>
                </a>
                <a href="#" class="list-group-item list-group-item-action">
                  <div class="d-flex justify-content-between">
                    <h6 class="mb-1">Olahraga Ringan di Rumah</h6>
                    <small>3 hari lalu</small>
                  </div>
                  <small class="text-muted">Kategori: Gaya Hidup</small>
                </a>
                <a href="#" class="list-group-item list-group-item-action">
                  <div class="d-flex justify-content-between">
                    <h6 class="mb-1">Olahraga Ringan di Rumah</h6>
                    <small>3 hari lalu</small>
                  </div>
                  <small class="text-muted">Kategori: Gaya Hidup</small>
                </a>
                <a href="#" class="list-group-item list-group-item-action">
                  <div class="d-flex justify-content-between">
                    <h6 class="mb-1">Olahraga Ringan di Rumah</h6>
                    <small>3 hari lalu</small>
                  </div>
                  <small class="text-muted">Kategori: Gaya Hidup</small>
                </a>
              </div>
              <div class="text-center mt-3">
                <a href="artikel-siswa.html" class="btn btn-outline-primary btn-sm">Lihat Semua Artikel</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>

  </template>

  <script setup>
  import Footer from '../components/Footer/Footer.vue';
  import Navbar from '../components/Navbar/Navbar.vue';
  import WelcomeCard from '../components/Cards/Welcome.Card.vue';
  import KunjunganUksCard from '../components/Cards/KunjunganUks.card.vue';
  import ArtikelCard from '../components/Cards/ArtikelCard.vue';
  import KonsultCard from '../components/Cards/Konsult.card.vue';
  import UrgentCallsCard from '../components/Cards/UrgentCallsCard.vue';
  
  
  
  

  </script>

  <style scoped>
  .card-title {
    font-weight: 600;
  }
  </style>

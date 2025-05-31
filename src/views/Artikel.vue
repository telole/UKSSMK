<template>
  <Navbar />
  <div class="container py-4">
    <!-- Breadcrumb -->
    <div class="row mb-4">
      <div class="col-12">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="dashboard-siswa.html">Dashboard</a></li>
            <li class="breadcrumb-item active" aria-current="page">Artikel Kesehatan</li>
          </ol>
        </nav>
        <h2 class="mb-0">Artikel Kesehatan</h2>
        <p class="text-muted">Baca artikel edukasi kesehatan terbaru dari petugas UKS</p>
      </div>
    </div>

    <div class="row mb-4">
      <div class="col-md-8">
        <div class="input-group">
          <input v-model="searchQuery" type="text" class="form-control" placeholder="Cari artikel..." />
          <button class="btn btn-outline-secondary" type="button">
            <i class="bi bi-search"></i>
          </button>
        </div>
      </div>
      <div class="col-md-4 mt-3 mt-md-0">
        <select v-model="selectedCategory" class="form-select">
          <option value="">Semua Kategori</option>
          <option>Kesehatan Umum</option>
          <option>Gizi & Nutrisi</option>
          <option>Kebersihan Diri</option>
          <option>Kesehatan Mental</option>
          <option>Olahraga</option>
        </select>
      </div>
    </div>

    <div v-if="featuredArtikel" class="card mb-4 shadow-sm">
      <div class="row g-0">
        <div class="col-md-4">
          <img :src="`http://localhost:8000/storage/${featuredArtikel.gambar}`" class="img-fluid rounded-start h-100 object-fit-cover" />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <span class="badge bg-primary">Artikel Pilihan</span>
              <small class="text-muted">{{ formatDate(featuredArtikel.created_at) }}</small>
            </div>
            <h3 class="card-title">{{ featuredArtikel.judul }}</h3>
            <p class="card-text">{{ featuredArtikel.deskripsi }}</p>
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <span class="badge bg-light text-dark">{{ featuredArtikel.kategori }}</span>
                <small class="text-muted ms-2">Oleh: {{ featuredArtikel.creator.name }}</small>
              </div>
                <a :href="`/artikel/${featuredArtikel.id}`" class="btn btn-primary">Baca Selengkapnya</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-4">
      <div v-for="artikel in paginatedArticles" :key="artikel.id" class="col">
        <div class="card h-100 shadow-sm">
          <img :src="`http://localhost:8000/storage/${artikel.gambar}`" class="card-img-top" />
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <span class="badge bg-light text-dark">{{ artikel.kategori }}</span>
              <small class="text-muted">{{ formatDate(artikel.created_at) }}</small>
            </div>
            <h5 class="card-title">{{ artikel.judul }}</h5>
            <p class="card-text">{{ artikel.deskripsi }}</p>
          </div>
          <div class="card-footer bg-white border-top-0">
            <div class="d-flex justify-content-between align-items-center">
              <small class="text-muted">Oleh: {{ artikel.creator.name }}</small>
              <a :href="'/artikel/' + artikel.id" class="btn btn-sm btn-outline-primary">Baca</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <nav v-if="totalPages > 1" aria-label="Page navigation">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button class="page-link" @click="currentPage--" :disabled="currentPage === 1">Previous</button>
        </li>
        <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: currentPage === page }">
          <button class="page-link" @click="currentPage = page">{{ page }}</button>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <button class="page-link" @click="currentPage++" :disabled="currentPage === totalPages">Next</button>
        </li>
      </ul>
    </nav>
  </div>
  <Footer />
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import Navbar from '../components/Navbar/Navbar.vue'
import Footer from '../components/Footer/Footer.vue'
import { links } from '../configs/hooks'

const artikel = ref([])
const featuredArtikel = ref(null)
const searchQuery = ref('')
const selectedCategory = ref('')
const currentPage = ref(1)
const itemsPerPage = 3

onMounted(() => {
  links.get('artikel').then((res) => {
    const allArticles = res.data
    featuredArtikel.value = allArticles.length ? allArticles[0] : null
    artikel.value = allArticles.slice(1)
  }).catch((err) => {
    console.error('Error fetching artikel:', err)
  })
})

const filteredArticles = computed(() => {
  return artikel.value.filter((item) => {
    const matchesSearch = item.judul.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = selectedCategory.value === '' || item.kategori === selectedCategory.value
    return matchesSearch && matchesCategory
  })
})

const totalPages = computed(() => Math.ceil(filteredArticles.value.length / itemsPerPage))
const paginatedArticles = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredArticles.value.slice(start, start + itemsPerPage)
})

function formatDate(dateStr) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(dateStr).toLocaleDateString('id-ID', options)
}
</script>

<style scoped>
.object-fit-cover {
  object-fit: cover;
}
</style>

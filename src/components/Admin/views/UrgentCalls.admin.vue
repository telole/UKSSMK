<template>
  <AdminNavbar />
  <div class="container py-4">
    <div class="row mb-4">
      <div class="col-12">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/dashboard-admin">Dashboard</a></li>
            <li class="breadcrumb-item active" aria-current="page">Laporan Darurat</li>
          </ol>
        </nav>
        <div class="d-flex justify-content-between align-items-center">
          <h2 class="mb-0">Laporan Darurat</h2>
        </div>
        <p class="text-muted">Pantau laporan darurat dari siswa</p>
      </div>
    </div>

    <!-- Filter -->
    <div class="card shadow-sm mb-4">
      <div class="card-body">
        <div class="row g-3">
          <div class="col-md-4">
            <select class="form-select" v-model="filters.kelas">
              <option value="">Semua Kelas</option>
              <option value="XI TJKT 1">XI TJKT 1</option>
              <option value="XI TJKT 2">XI TJKT 2</option>
              <option value="XI TJKT 3">XI TJKT 3</option>
            </select>
          </div>
          <div class="col-md-4">
            <input
              type="text"
              class="form-control"
              v-model="filters.search"
              placeholder="Cari nama siswa..."
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Cards -->
    <div class="row g-4">
      <div class="col-md-6 col-lg-4" v-for="lapor in paginatedReports" :key="lapor.id">
        <div
          class="card shadow-sm h-100"
          :class="{
            'border-danger': lapor.status === 'belum ditindak',
            'border-success': lapor.status === 'Selesai'
          }"
        >
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <h5
                class="mb-0"
                :class="{
                  'text-danger': lapor.status === 'belum ditindak',
                  'text-success': lapor.status === 'Selesai'
                }"
              >
                <i class="bi bi-exclamation-triangle me-2"></i>Laporan Darurat
              </h5>
              <small class="text-muted">{{ formatDate(lapor.created_at) }}</small>
            </div>
            <div>
              <p class="mb-1"><strong>Nama:</strong> {{ lapor.pelapor.name }}</p>
              <p class="mb-1"><strong>Kelas:</strong> {{ lapor.pelapor.kelas }}</p>
              <p class="mb-1"><strong>Lokasi:</strong> {{ lapor.lokasi }}</p>
              <p><strong>Status:</strong> {{ lapor.status }}</p>
            </div>
            <div class="text-end">
              <button
                v-if="lapor.status === 'belum ditindak'"
                class="btn btn-danger btn-sm"
                @click="selesaikanLaporan(lapor.id)"
              >
                <i class="bi bi-check-circle me-1"></i>Selesaikan
              </button>
              <button
                v-else
                class="btn btn-outline-success btn-sm"
                @click="lihatDetail(lapor)"
              >
                <i class="bi bi-eye me-1"></i>Lihat Detail
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="filteredReports.length === 0" class="col-12 text-center">
        <p class="text-muted">Tidak ada laporan ditemukan</p>
      </div>
    </div>

    <!-- Pagination -->
    <nav aria-label="Page navigation" class="mt-4">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button class="page-link" @click="goToPage(currentPage - 1)">Previous</button>
        </li>
        <li 
          class="page-item" 
          v-for="page in visiblePages" 
          :key="page" 
          :class="{ active: currentPage === page }"
        >
          <button class="page-link" @click="goToPage(page)">{{ page }}</button>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <button class="page-link" @click="goToPage(currentPage + 1)">Next</button>
        </li>
      </ul>
    </nav>
  </div>
  <Footer />
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { links } from '../../../configs/hooks'
import AdminNavbar from '../Navbar/Admin.navbar.vue'
import Footer from '../../Footer/Footer.vue'
import router from '../../../router'

const reports = ref([])
const filters = ref({
  kelas: '',
  search: ''
})

const currentPage = ref(1)
const perPage = 6

onMounted(() => {
  links.get('laporan_darurat').then((res) => {
    reports.value = res.data
  })
})

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const filteredReports = computed(() => {
  return reports.value.filter(item => {
    const kelasMatch = !filters.value.kelas || item.pelapor.kelas === filters.value.kelas
    const searchMatch = !filters.value.search || item.pelapor.name.toLowerCase().includes(filters.value.search.toLowerCase())
    return kelasMatch && searchMatch
  })
})

const paginatedReports = computed(() => {
  const start = (currentPage.value - 1) * perPage
  const end = start + perPage
  return filteredReports.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredReports.value.length / perPage)
})

const visiblePages = computed(() => {
  const pages = []
  for (let i = 1; i <= totalPages.value; i++) {
    pages.push(i)
  }
  return pages
})

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

function lihatDetail(lapor) {
  router.push(`/detail-Calls/${lapor.id}`)
}

function selesaikanLaporan(id) {
  if (!confirm('Yakin laporan sudah selesai?')) return

  links.put(`laporan_darurat/${id}`, { status: 'Selesai' })
    .then(() => {
      const target = reports.value.find(r => r.id === id)
      if (target) target.status = 'Selesai'
    })
    .catch(err => {
      console.error('Gagal menyelesaikan laporan:', err)
      alert('Gagal menyelesaikan laporan. Silakan coba lagi.')
    })
}
</script>

<style scoped>
.card-body p {
  font-size: 0.95rem;
}
</style>

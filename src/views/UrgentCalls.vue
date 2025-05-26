<template>
  <Navbar/>
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

    <div class="alert alert-info alert-dismissible fade show mb-4" role="alert">
      <div class="d-flex align-items-center">
        <i class="bi bi-info-circle-fill me-2 fs-4"></i>
        <div>
          <strong>Informasi Penting!</strong> Fitur ini hanya untuk keadaan darurat kesehatan yang membutuhkan penanganan segera. Untuk konsultasi biasa, silakan gunakan fitur Konsultasi.
        </div>
      </div>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>

    <ul class="nav nav-tabs mb-4">
      <li class="nav-item">
        <a class="nav-link active" href="#riwayat" data-bs-toggle="tab">Riwayat Laporan</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#panduan" data-bs-toggle="tab">Panduan Darurat</a>
      </li>
    </ul>

    <div class="tab-content">
      <div class="tab-pane fade show active" id="riwayat">
        <div class="card shadow-sm">
          <div class="card-body">
            <div class="row mb-3">
              <div class="col-md-6">
                <div class="input-group">
                  <input 
                    type="text" 
                    class="form-control" 
                    placeholder="Cari laporan..." 
                    v-model="searchQuery"
                    @keyup.enter="applySearch"
                  />
                  <button 
                    class="btn btn-outline-secondary" 
                    type="button"
                    @click="applySearch"
                  >
                    <i class="bi bi-search"></i>
                  </button>
                </div>
              </div>
              <!-- <div class="col-md-6 mt-3 mt-md-0">
                <div class="d-flex justify-content-md-end">
                  <select 
                    class="form-select w-auto" 
                    v-model="statusFilter"
                    @change="applyFilters"
                  >
                    <option value="all">Semua Status</option>
                    <option value="Dilaporkan">Dilaporkan</option>
                    <option value="Ditangani">Ditangani</option>
                    <option value="Selesai">Selesai</option>
                  </select>
                </div>
              </div> -->
            </div>

            <div class="table-responsive">
              <table class="table table-hover align-middle">
                <thead class="table-light">
                  <tr>
                    <th @click="sortBy('waktu_kejadian')">
                      Tanggal
                      <i class="bi ms-1" :class="sortIcon('waktu_kejadian')"></i>
                    </th>
                    <th @click="sortBy('deskripsi')">
                      Jenis Kejadian
                      <i class="bi ms-1" :class="sortIcon('deskripsi')"></i>
                    </th>
                    <th @click="sortBy('lokasi')">
                      Lokasi
                      <i class="bi ms-1" :class="sortIcon('lokasi')"></i>
                    </th>
                    <th @click="sortBy('status')">
                      Status
                      <i class="bi ms-1" :class="sortIcon('status')"></i>
                    </th>
                    <th>Pelapor</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in paginatedData" :key="item.id">
                    <td>
                      {{ formatDate(item.waktu_kejadian) }}<br />
                      <small class="text-muted">{{ formatTime(item.waktu_kejadian) }}</small>
                    </td>
                    <td>{{ item.deskripsi }}</td>
                    <td>{{ item.lokasi }}</td>
                    <td>
                      <span :class="statusClass(item.status)">
                        {{ item.status }}
                      </span>
                    </td>
                    <td>{{ item.pelapor?.name || '-' }}</td>
                    <td>
                      <button 
                        class="btn btn-sm btn-outline-primary"
                        @click="viewDetail(item)"
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                  <tr v-if="filteredData.length === 0">
                    <td colspan="6" class="text-center">Tidak ada laporan yang sesuai dengan kriteria pencarian.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Pagination -->
            <nav aria-label="Page navigation" class="mt-4">
              <ul class="pagination justify-content-center">
                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                  <button 
                    class="page-link" 
                    @click="changePage(currentPage - 1)"
                    :disabled="currentPage === 1"
                  >
                    Previous
                  </button>
                </li>
                <li
                  class="page-item"
                  v-for="page in visiblePages"
                  :key="page"
                  :class="{ active: currentPage === page }"
                >
                  <button class="page-link" @click="changePage(page)">
                    {{ page }}
                  </button>
                </li>
                <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                  <button 
                    class="page-link" 
                    @click="changePage(currentPage + 1)"
                    :disabled="currentPage === totalPages"
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <Urgent />
    </div>
  </div>

  <CreateLaporan />
  <Footer/>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import CreateLaporan from '../components/Tabs/Create-Laporan.vue'
import Urgent from '../components/Tabs/Urgent.vue'
import { links } from '../configs/hooks'
import Footer from '../components/Footer/Footer.vue'
import Navbar from '../components/Navbar/Navbar.vue'

const urgent = ref([])
const currentPage = ref(1)
const itemsPerPage = 5
const searchQuery = ref('')
const statusFilter = ref('all')
const sortField = ref('waktu_kejadian')
const sortDirection = ref('desc')

onMounted(() => {
  fetchEmergencyReports()
})

async function fetchEmergencyReports() {
  try {
    const response = await links.get('laporan_darurat')
    urgent.value = response.data
  } catch (err) {
    console.error('Gagal ambil data:', err)
  }
}

const filteredData = computed(() => {
  let result = urgent.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(item => 
      item.deskripsi.toLowerCase().includes(query) ||
      item.lokasi.toLowerCase().includes(query) ||
      (item.pelapor?.name && item.pelapor.name.toLowerCase().includes(query)) ||
      item.status.toLowerCase().includes(query)
    )
  }

  if (statusFilter.value !== 'all') {
    result = result.filter(item => item.status === statusFilter.value)
  }

  result.sort((a, b) => {
    const fieldA = a[sortField.value]?.toString().toLowerCase() || ''
    const fieldB = b[sortField.value]?.toString().toLowerCase() || ''
    
    if (fieldA < fieldB) return sortDirection.value === 'asc' ? -1 : 1
    if (fieldA > fieldB) return sortDirection.value === 'asc' ? 1 : -1
    return 0
  })

  return result
})

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredData.value.slice(start, start + itemsPerPage)
})

const totalPages = computed(() => {
  return Math.ceil(filteredData.value.length / itemsPerPage)
})

const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 5
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
  let end = Math.min(totalPages.value, start + maxVisible - 1)
  
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1)
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

function changePage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

function applySearch() {
  currentPage.value = 1
}

function applyFilters() {
  currentPage.value = 1
}

function sortBy(field) {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortField.value = field
    sortDirection.value = 'asc'
  }
  currentPage.value = 1
}

function sortIcon(field) {
  if (sortField.value !== field) return 'bi-arrow-down-up'
  return sortDirection.value === 'asc' ? 'bi-arrow-up' : 'bi-arrow-down'
}

function formatDate(datetime) {
  if (!datetime) return '-'
  const date = new Date(datetime)
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function formatTime(datetime) {
  if (!datetime) return '-'
  const date = new Date(datetime)
  return date.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

function statusClass(status) {
  if (!status) return 'badge bg-secondary'
  
  switch (status.toLowerCase()) {
    case 'selesai':
      return 'badge bg-success'
    case 'ditangani':
      return 'badge bg-warning'
    case 'dilaporkan':
      return 'badge bg-danger'
    default:
      return 'badge bg-secondary'
  }
}

function viewDetail(item) {
  console.log('View detail:', item)
}
</script>

<style scoped>
.table th {
  cursor: pointer;
  user-select: none;
  position: relative;
}

.table th:hover {
  background-color: #f8f9fa;
}

.bi {
  font-size: 0.8rem;
  opacity: 0.7;
}

.page-item button {
  min-width: 40px;
  text-align: center;
}

.alert {
  border-left: 4px solid #0d6efd;
}
</style>
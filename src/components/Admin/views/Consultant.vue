<template>
  <div class="container py-4">
    <!-- Breadcrumb dan header -->
    <div class="row mb-4">
      <div class="col-12">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="dashboard-admin.html">Dashboard</a></li>
            <li class="breadcrumb-item active" aria-current="page">Konsultasi</li>
          </ol>
        </nav>
        <div class="d-flex justify-content-between align-items-center">
          <h2 class="mb-0">Daftar Konsultasi</h2>
          <button class="btn btn-outline-primary" @click="exportData">
            <i class="bi bi-download me-1"></i>Export Data
          </button>
        </div>
        <p class="text-muted">Kelola konsultasi kesehatan siswa</p>
      </div>
    </div>

    <div class="row mb-4 g-3">
      <div class="col-md-3" v-for="stat in computedStats" :key="stat.label">
        <div :class="`card border-${stat.color} shadow-sm`">
          <div class="card-body text-center">
            <i :class="`bi bi-${stat.icon} text-${stat.color}`" style="font-size: 2rem;"></i>
            <h3 :class="`mt-2 mb-0 text-${stat.color}`">{{ stat.value }}</h3>
            <p class="text-muted mb-0">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filter -->
    <div class="card shadow-sm mb-4">
      <div class="card-body">
        <div class="row g-3">
          <div class="col-md-4">
            <select class="form-select" v-model="filters.status">
              <option value="">Semua Status</option>
              <option value="belum">Belum Dijawab</option>
              <option value="sudah">Sudah Dijawab</option>
            </select>
          </div>
          <div class="col-md-4">
            <select class="form-select" v-model="filters.kelas">
              <option value="">Semua Kelas</option>
              <option value="XI TJKT 1">XI TJKT 1</option>
              <option value="XI TJKT 2">XI TJKT 2</option>
              <option value="XI TJKT @">XI TJKT 3</option>
            </select>
          </div>
          <div class="col-md-4">
            <div class="input-group">
              <input type="text" class="form-control" placeholder="Cari nama siswa..." v-model="filters.search" />
              <button class="btn btn-outline-secondary" @click="applyFilters">
                <i class="bi bi-search"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabel konsultasi -->
    <div class="card shadow-sm">
      <div class="card-header bg-white">
        <h5 class="mb-0">Daftar Konsultasi</h5>
      </div>
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover mb-0">
            <thead class="table-light">
              <tr>
                <th>ID</th>
                <th>Siswa</th>
                <th>Pertanyaan</th>
                <th>Status</th>
                <th>Tanggal</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in filteredConsultations" :key="item.id">
                <td><strong>#{{ item.id }}</strong></td>
                <td>
                  <div>
                    <div class="fw-bold">{{ item.consultation.name }}</div>
                    <small class="text-muted">{{ item.consultation.kelas }} - {{ item.consultation.nis }}</small>
                  </div>
                </td>
                <td>
                  <div :title="item.pertanyaan">{{ truncateText(item.pertanyaan) }}</div>
                </td>
                <td>
                  <span class="badge" :class="item.jawaban ? 'bg-success' : 'bg-warning'">
                    {{ item.jawaban ? 'Sudah Dijawab' : 'Belum Dijawab' }}
                  </span>
                </td>
                <td>{{ formatDate(item.created_at) }}</td>
                <td>
                  <button v-if="item.jawaban" class="btn btn-outline-primary btn-sm" @click="lihatDetail(item)">
                    <i class="bi bi-eye me-1"></i>Lihat
                  </button>
                  <button v-else class="btn btn-primary btn-sm" @click="jawabKonsultasi(item)">
                    <i class="bi bi-reply me-1"></i>Jawab
                  </button>
                </td>
              </tr>
              <tr v-if="filteredConsultations.length === 0">
                <td colspan="6" class="text-center">Data tidak ditemukan</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal jawab/detail bisa ditambahkan di sini -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { links } from '../../../configs/hooks'

const consultationData = ref([])

onMounted(() => {
  links.get('konsultasi').then((res) => {
    consultationData.value = res.data
  })
})

const filters = ref({
  status: '',
  kelas: '',
  search: '',
})

const filteredConsultations = computed(() => {
  return consultationData.value.filter((item) => {
    const statusMatch =
      !filters.value.status ||
      (filters.value.status === 'belum' && !item.jawaban) ||
      (filters.value.status === 'sudah' && item.jawaban)

    const kelasMatch =
      !filters.value.kelas || item.consultation.kelas === filters.value.kelas

    const searchMatch =
      !filters.value.search ||
      item.consultation.name.toLowerCase().includes(filters.value.search.toLowerCase())

    return statusMatch && kelasMatch && searchMatch
  })
})

const computedStats = computed(() => {
  const belum = consultationData.value.filter(c => !c.jawaban).length
  const sudah = consultationData.value.filter(c => c.jawaban).length
  return [
    { label: "Belum Dijawab", value: belum, color: "warning", icon: "envelope" },
    { label: "Sudah Dijawab", value: sudah, color: "success", icon: "envelope-open" },
    { label: "Total Konsultasi", value: consultationData.value.length, color: "primary", icon: "chat-left-text" },
    { label: "Siswa Aktif", value: 75, color: "info", icon: "people" }, // Static / bisa diambil dari API
  ]
})

const showJawabModal = ref(false)
const showDetailModal = ref(false)
const currentConsultation = ref(null)
const jawabanText = ref('')

function truncateText(text, maxLength = 60) {
  if (!text) return ''
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function applyFilters() {
}

function lihatDetail(item) {
  currentConsultation.value = item
  showDetailModal.value = true
}

function jawabKonsultasi(item) {
  currentConsultation.value = item
  jawabanText.value = ''
  showJawabModal.value = true
}

function simpanJawaban() {
  if (!jawabanText.value.trim()) {
    alert("Jawaban tidak boleh kosong!")
    return
  }

  const index = consultationData.value.findIndex(c => c.id === currentConsultation.value.id)
  if (index !== -1) {
    consultationData.value[index].jawaban = jawabanText.value.trim()
  }
  
  showJawabModal.value = false
  jawabanText.value = ''
  currentConsultation.value = null
}

function exportData() {
  alert("Fitur export data belum diimplementasikan")
}
</script>

<style scoped>
</style>

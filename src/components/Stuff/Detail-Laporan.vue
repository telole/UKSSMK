<template>
  <div>
    <Navbar />
    <div class="container py-4">
      <div class="row mb-4">
        <div class="col-12">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/">Dashboard</router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">Detail Laporan Darurat</li>
            </ol>
          </nav>
          <div class="d-flex justify-content-between align-items-center">
            <h2 class="mb-0">Detail Laporan Darurat</h2>
            <button class="btn btn-outline-secondary" @click="$router.go(-1)">
              <i class="bi bi-arrow-left me-1"></i>Kembali
            </button>
          </div>
        </div>
      </div>

      <div class="card shadow-sm mb-4">
        <div class="card-header bg-white">
          <h5 class="mb-0">Informasi Kejadian</h5>
        </div>
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-start mb-3">
            <div>
              <p class="mb-1"><strong>ID Laporan:</strong> #{{ report.id }}</p>
              <p class="mb-1"><strong>Lokasi:</strong> {{ report.lokasi }}</p>
              <p class="mb-1"><strong>Waktu Kejadian:</strong> {{ formatDateTime(report.waktu_kejadian) }}</p>
              <p class="mb-1"><strong>Dilaporkan:</strong> {{ formatDateTime(report.created_at) }}</p>
            </div>
            <span class="badge" :class="statusBadgeClass">{{ formattedStatus }}</span>
          </div>

          <div class="mb-3">
            <p class="mb-2"><strong>Deskripsi:</strong></p>
            <div class="p-3 bg-light rounded">
              {{ report.deskripsi }}
            </div>
          </div>

          <!-- <div v-if="report.status !== 'selesai'" class="d-flex gap-2">
            <button class="btn btn-success" @click="updateStatus('diproses')">
              <i class="bi bi-check-circle me-1"></i>Proses
            </button>
            <button class="btn btn-danger" @click="updateStatus('ditolak')">
              <i class="bi bi-x-circle me-1"></i>Tolak
            </button>
          </div> -->
        </div>
      </div>

      <div class="card shadow-sm mb-4">
        <div class="card-header bg-white">
          <h5 class="mb-0">Informasi Pelapor</h5>
        </div>
        <div class="card-body">
          <p><strong>Nama:</strong> {{ report.pelapor.name }}</p>
          <p><strong>NIS:</strong> {{ report.pelapor.nis }}</p>
          <p><strong>Kelas:</strong> {{ report.pelapor.kelas }}</p>
          <p><strong>Email:</strong>
            <a :href="`mailto:${report.pelapor.email}`">{{ report.pelapor.email }}</a>
          </p>
          <p><strong>Terdaftar:</strong> {{ formatDate(report.pelapor.created_at) }}</p>
        </div>
      </div>

      <div class="card shadow-sm">
        <div class="card-header bg-white">
          <h5 class="mb-0">Riwayat Status</h5>
        </div>
        <div class="card-body">
          <ul class="timeline ps-3">
            <li>
              <p class="mb-1"><strong>Laporan Dibuat:</strong> {{ formatDateTime(report.created_at) }}</p>
            </li>
            <li v-if="report.status !== 'dilaporkan'">
              <p class="mb-1"><strong>Laporan {{ formattedStatus }}:</strong> {{ formatDateTime(report.updated_at) }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { Modal } from 'bootstrap'
import Footer from '../Footer/Footer.vue'
import Navbar from '../Navbar/Navbar.vue'
import { links } from '../../configs/hooks'

const route = useRoute()
const router = useRouter()
const reportId = route.params.id

const report = ref({ id: null, pelapor: {} })
const newStatus = ref('')
const rejectionReason = ref('')
const isUpdating = ref(false)
let statusModal = null

onMounted(() => {
    links.get(`/laporan_darurat/${reportId}`).then((Res) => {
        report.value = Res.data
        console.log(report)
    }).catch((err) => {
        console.log('err', err)
    })
})

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })
}

const formatDateTime = (dateStr) => {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('id-ID', {
    day: '2-digit', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  })
}

const updateStatus = (status) => {
  newStatus.value = status
  rejectionReason.value = ''
  statusModal = new Modal(document.getElementById('statusModal'))
  statusModal.show()
}


const formattedStatus = computed(() => {
  const map = {
    selesai: 'Selesai'
  }
  return map[report.value.status] || report.value.status
})

const newStatusLabel = computed(() => {
  const map = { diproses: 'Diproses', ditolak: 'Ditolak' }
  return map[newStatus.value] || ''
})

const statusBadgeClass = computed(() => {
  const map = {
    selesai: 'bg-success'
  }
  return map[report.value.status] || 'bg-light text-dark'
})

const statusHistoryClass = computed(() => {
  const map = {
    diproses: 'bg-warning',
    ditolak: 'bg-danger',
    selesai: 'bg-success'
  }
  return map[report.value.status] || 'bg-secondary'
})

const statusHistoryIcon = computed(() => {
  const map = {
    diproses: 'bi-clock-history',
    ditolak: 'bi-x-circle',
    selesai: 'bi-check-circle'
  }
  return map[report.value.status] || 'bi-info-circle'
})

// onMounted(() => {
//   fetchReport()
// })
</script>

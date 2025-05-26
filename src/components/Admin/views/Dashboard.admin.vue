<template>
  <AdminNavbar />
  <div class="container py-4">
    <WelcomeCard />

    <div class="row mb-4 g-3">
      <VisitCard />
      <usedPillsCardVue />
      <ConsultationResponse />
      <UrgentCallsCard />
    </div>

    <div class="row mb-4">
      <div class="col-lg-8">
        <div class="card shadow-sm mb-4">
          <div class="card-header bg-white d-flex justify-content-between align-items-center">
            <h5 class="mb-0">Statistik Kunjungan</h5>
            <div class="btn-group btn-group-sm">
              <button type="button" class="btn btn-outline-primary active">Mingguan</button>
              <!-- <button type="button" class="btn btn-outline-primary">Bulan</button>
              <button type="button" class="btn btn-outline-primary">Tahun</button> -->
            </div>
          </div>
          <div class="card-body">
            <canvas id="visitChart" height="250"></canvas>
          </div>
        </div>
        <VisitDashboardNew />
      </div>

      <div class="col-lg-4 mt-4 mt-lg-0">
        <PillsStock />

        <!-- <div class="card shadow-sm mb-4">
          <div class="card-header bg-white">
            <h5 class="mb-0">Distribusi Keluhan</h5>
          </div>
          <div class="card-body">
            <canvas id="complaintsChart" height="220"></canvas>
          </div>
        </div> -->

        <div class="card shadow-sm">
          <div class="card-header bg-white">
            <h5 class="mb-0">Konsultasi Terbaru</h5>
          </div>
          <div class="card-body">
            <div class="list-group list-group-flush">
              <a href="#" class="list-group-item list-group-item-action px-0" v-for="(item, index) in recentConsultations" :key="index">
                <div class="d-flex w-100 justify-content-between">
                  <h6 class="mb-1">{{ item.pertanyaan }}</h6>
                  <small class="text-danger">Baru</small>
                </div>
                <p class="mb-1 text-truncate">{{ item.jawaban || "-" }}</p>
                <small class="text-muted">Dari: {{ item.consultation.name }}</small>
              </a>
            </div>
            <div class="text-center mt-3">
              <a href="konsultasi-petugas.html" class="btn btn-sm btn-outline-primary">Lihat Semua Konsultasi</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Chart from 'chart.js/auto'
import VisitCard from '../card-Dashboard/Visit.card.vue';
import usedPillsCardVue from '../card-Dashboard/used-Pills.card.vue';
import ConsultationResponse from '../card-Dashboard/Consultation.Response.vue';
import UrgentCallsCard from '../card-Dashboard/UrgentCalls.card.vue';
import VisitDashboardNew from '../stuff/visit-Dashboard.new.vue';
import AdminNavbar from '../Navbar/Admin.navbar.vue';
import WelcomeCard from '../card-Dashboard/Welcome.card.vue';
import PillsStock from '../card-Dashboard/Pills.Stock.vue';
import { links } from '../../../configs/hooks';

const visitData = ref([])
const recentConsultations = ref([])


const fetchRecentConsultations = async () => {
  try {
    const response = await links.get('konsultasi');
    recentConsultations.value = response.data
      .filter(item => item.jawaban === null) 
      .slice(-5) 
      .reverse();
  } catch (error) {
    console.error('Gagal mengambil data konsultasi:', error);
  }
};

const fetchVisits = async () => {
  try {
    const response = await links.get('kunjungan-uks')
    visitData.value = response.data
    renderVisitChart()
  } catch (error) {
    console.error('Gagal mengambil data kunjungan:', error)
  }
}

const renderVisitChart = () => {
  const grouped = Array(7).fill(0)
  visitData.value.forEach(item => {
    const dayIndex = new Date(item.tanggal).getDay()
    grouped[dayIndex === 0 ? 6 : dayIndex - 1] += 1 
  })

  const ctx = document.getElementById('visitChart')?.getContext('2d')
  if (!ctx) return

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
      datasets: [{
        label: 'Jumlah Kunjungan',
        data: grouped,
        backgroundColor: 'rgba(13, 110, 253, 0.1)',
        borderColor: 'rgba(13, 110, 253, 1)',
        borderWidth: 2,
        tension: 0.3,
        fill: true        
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            drawBorder: false
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      }
    }
  })
}

const renderComplaintsChart = () => {
  const complaintsCtx = document.getElementById('complaintsChart')?.getContext('2d')
  if (!complaintsCtx) return

  new Chart(complaintsCtx, {
    type: 'doughnut',
    data: {
      labels: ['Sakit Kepala', 'Demam', 'Nyeri Perut', 'Luka Ringan', 'Lainnya'],
      datasets: [{
        data: [25, 20, 15, 30, 10],
        backgroundColor: [
          'rgba(13, 110, 253, 0.7)',
          'rgba(220, 53, 69, 0.7)',
          'rgba(255, 193, 7, 0.7)',
          'rgba(25, 135, 84, 0.7)',
          'rgba(108, 117, 125, 0.7)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            boxWidth: 12,
            padding: 15
          }
        }
      }
    }
  })
}

onMounted(() => {
  fetchVisits();
  renderComplaintsChart();
  fetchRecentConsultations(); 
});

</script>

<style scoped>
.card-body canvas {
  width: 100% !important;
  height: auto !important;
}
</style>

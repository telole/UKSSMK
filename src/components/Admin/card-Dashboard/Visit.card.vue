<template>
  <div class="col-md-6 col-lg-3">
    <div class="card h-100 border-primary shadow-sm">
      <div class="card-body">
        <div class="d-flex align-items-center">
          <div class="flex-shrink-0 bg-primary bg-opacity-10 p-3 rounded">
            <i class="bi bi-clipboard-plus text-primary" style="font-size: 1.5rem;"></i>
          </div>
          <div class="ms-3">
            <h6 class="card-title text-muted mb-0">Kunjungan Hari Ini</h6>
            <h2 class="mt-2 mb-0">{{ kunjunganHariIni }}</h2>
          </div>
        </div>
        <div class="mt-3 d-flex justify-content-between align-items-center">
          <span class="text-success"><i class="bi bi-arrow-up"></i> 12%</span>
          <a href="kunjungan-petugas.html" class="text-decoration-none">Detail</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { links } from '../../../configs/hooks';

const kunjunganHariIni = ref(0)

onMounted(async () => {
  try {
    const response = await links.get('kunjungan-uks');
    const data = response.data

    const today = new Date().toISOString().slice(0, 10)

    const filtered = data.filter(item => item.tanggal === today)

    kunjunganHariIni.value = filtered.length
  } catch (error) {
    console.error('Gagal mengambil data:', error)
  }
})
</script>

<style scoped>
/* Tambahkan style jika dibutuhkan */
</style>

<template>
  <div class="col-md-6 col-lg-3">
    <div class="card h-100 border-danger shadow-sm">
      <div class="card-body">
        <div class="d-flex align-items-center">
          <div class="flex-shrink-0  bg-danger bg-opacity-10 p-3 rounded">
            <i class="bi bi-exclamation-triangle text-danger" style="font-size: 1.5rem;"></i>
          </div>
          <div class="ms-3">
            <h6 class="card-title text-muted mb-0">Laporan Darurat Hari Ini</h6>
            <h2 class="mt-2 mb-0">{{ laporanHariIni }}</h2>
          </div>
        </div>
        <div class="mt-3 d-flex justify-content-between align-items-center">
          <span class="text-danger"><i class="bi bi-arrow-up"></i> 100%</span>
          <a href="darurat-petugas.html" class="text-decoration-none">Detail</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { links } from '../../../configs/hooks'

const laporanHariIni = ref(0)

onMounted(() => {
  links.get('laporan_darurat').then((res) => {
    const today = new Date()
    const todayStr = today.toISOString().slice(0, 10)

    const dataHariIni = res.data.filter(laporan => {
      const tgl = laporan.waktu_kejadian.slice(0, 10)
      return tgl === todayStr
    })

    console.log(dataHariIni)
    laporanHariIni.value = dataHariIni.length
  })
})
</script>

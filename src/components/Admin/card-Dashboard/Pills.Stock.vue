<template>
  <div class="card shadow-sm mb-4">
    <div class="card-header bg-white">
      <h5 class="mb-0">Stok Obat Menipis</h5>
    </div>
    <div class="card-body">
      <div v-if="loading" class="text-center py-3">Memuat data...</div>
      <div v-else>
        <div v-if="stokMenipis.length" class="list-group list-group-flush">
          <div
            v-for="obat in stokMenipis"
            :key="obat.id"
            class="list-group-item px-0"
          >
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <h6 class="mb-1">{{ obat.nama_obat }}</h6>
                <small class="text-muted">{{ obat.deskripsi }}</small>
              </div>
              <span class="badge" :class="getBadgeClass(obat.stok)">
                {{ obat.stok }} tersisa
              </span>
            </div>
            <div class="progress mt-2" style="height: 5px;">
              <div
                class="progress-bar"
                :class="getBadgeClass(obat.stok)"
                :style="{ width: getStokPercent(obat.stok) + '%' }"
              ></div>
            </div>
          </div>
        </div>
        <div v-else class="text-center text-muted py-3">
          Tidak ada obat dengan stok menipis.
        </div>
      </div>
      <div class="text-center mt-3">
        <a href="obat-petugas.html" class="btn btn-sm btn-outline-primary">Kelola Obat</a>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import { links } from '../../../configs/hooks'

const dataObat = ref([])
const loading = ref(true)  // tambah loading indikator

onMounted(async () => {
  try {
    const res = await links.get('obat')  // fetch semua obat
    dataObat.value = res.data
  } catch (error) {
    console.error('Gagal fetch data obat:', error)
  } finally {
    loading.value = false
  }
})

// Filter obat dengan stok kurang dari 20
const stokMenipis = computed(() =>
  dataObat.value.filter(obat => obat.stok < 20)
)

const getStokPercent = stok => {
  const maxStok = 300
  return Math.min(100, Math.floor((stok / maxStok) * 100))
}

const getBadgeClass = (stok) => {
  switch (true) {
    case stok <= 5:
      return 'bg-danger'     // merah
    case stok > 5 && stok < 10:
      return 'bg-warning'    // kuning
    case stok >= 10 && stok < 20:
      return 'bg-info'       // biru 
    default:
      return 'bg-secondary'  // abu-abu
  }
}
</script>


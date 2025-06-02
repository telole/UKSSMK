<template>
  <div class="col-md-6 col-lg-3">
    <div class="card h-100 border-success shadow-sm">
      <div class="card-body">
        <div class="d-flex align-items-center">
          <div class="flex-shrink-0 bg-success bg-opacity-10 p-3 rounded">
            <i class="bi bi-capsule text-success" style="font-size: 1.5rem;"></i>
          </div>
          <div class="ms-3">
            <h6 class="card-title text-muted mb-0">Stock Seluruh Obat</h6>
            <h2 class="mt-2 mb-0">{{ totalStock }}</h2>
          </div>
        </div>
        <div class="mt-3 d-flex justify-content-between align-items-center">
          <span class="text-danger"><i class="bi bi-arrow-down"></i> 5%</span>
          <RouterLink to="/obat" class="text-decoration-none">Detail</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { links } from '../../../configs/hooks'

const totalStock = ref(0)

const fetchObat = async () => {
  try {
    const response = await links.get('obat') 
    const data = response.data
    totalStock.value = data.reduce((acc, item) => acc + item.stok, 0)
  } catch (error) {
    console.error('Gagal memuat data obat:', error)
  }
}

onMounted(() => {
  fetchObat()
})
</script>

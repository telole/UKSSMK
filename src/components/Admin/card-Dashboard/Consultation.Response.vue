<template>
    <div class="col-md-6 col-lg-3">
        <div class="card h-100 border-info shadow-sm">
            <div class="card-body">
                <div class="d-flex align-items-center">
                    <div class="flex-shrink-0 bg-opacity-10 p-3 rounded">
                        <i class="bi bi-chat-dots text-info" style="font-size: 1.5rem;"></i>
                    </div>
                    <div class="ms-3">
                        <h6 class="card-title text-muted mb-0">Konsultasi Baru</h6>
                        <h2 class="mt-2 mb-0">{{ jumlahKonsultasiBaru }}</h2>
                    </div>
                </div>
                <div class="mt-3 d-flex justify-content-between align-items-center">
                    <span class="text-success"><i class="bi bi-arrow-up"></i> 20%</span>
                    <a href="konsultasi-petugas.html" class="text-decoration-none">Detail</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { links } from '../../../configs/hooks'

const konsultasi = ref([])

const jumlahKonsultasiBaru = computed(() => {
    return konsultasi.value.filter(k => k.jawaban === null).length
})

onMounted(() => {
    links.get('konsultasi').then((res) => {konsultasi.value = res.data}).catch((err) => {console.log(err)})
})

// onMounted(async () => {
//     try {
//         const response =  links.get('konsultasi')
//         if (!response.ok) {
//             throw new Error('Gagal mengambil data')
//         }
//         const data = await response.json()
//         konsultasi.value = data
//     } catch (error) {
//         console.error('Terjadi kesalahan saat fetch:', error)
//     }
// })
</script>

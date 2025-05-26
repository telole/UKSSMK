<template lang="">
    <div class="row mb-4">
            <div class="col-12">
                <div class="card bg-primary text-white">
                    <div class="card-body p-4">
                        <div class="d-flex align-items-center">
                            <div>
                                <h2 class="mb-1">Selamat Datang, {{name}}!</h2>
                                <p class="mb-0">Anda memiliki {{kunjunganHariIni}}  kunjungan yang perlu ditangani dan {{konsultasiBelumDijawab}} konsultasi yang belum dijawab.</p>
                            </div>
                            <div class="ms-auto d-none d-md-block">
                                <i class="bi bi-clipboard-pulse" style="font-size: 4rem;"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { links } from '../../../configs/hooks'

const kunjunganHariIni = ref(0)
const konsultasiBelumDijawab = ref(0)

const name = localStorage.getItem('name')

onMounted(async () => {
  try {
    const responseKunjungan = await links.get('kunjungan-uks')
    const dataKunjungan = responseKunjungan.data

    const today = new Date().toISOString().slice(0, 10)
    const filteredKunjungan = dataKunjungan.filter(item => item.tanggal === today)
    kunjunganHariIni.value = filteredKunjungan.length

    const responseKonsultasi = await links.get('konsultasi')
    const dataKonsultasi = responseKonsultasi.data

    const belumDijawab = dataKonsultasi.filter(item => item.jawaban === null)
    konsultasiBelumDijawab.value = belumDijawab.length

  } catch (error) {
    console.error('Gagal mengambil data:', error)
  }
})
</script>

<style lang="">
    
</style>
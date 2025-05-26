<template>
  <div class="modal fade" id="laporDarurat" tabindex="-1" aria-labelledby="laporDaruratLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header bg-danger text-white">
          <h5 class="modal-title" id="laporDaruratLabel">
            <i class="bi bi-exclamation-triangle-fill me-2"></i>Laporan Darurat
          </h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="kirimLaporan">
            <div class="mb-3">
              <label for="lokasiKejadian" class="form-label">Lokasi Kejadian <span class="text-danger">*</span></label>
              <input v-model="lokasi" type="text" class="form-control" id="lokasiKejadian" placeholder="Contoh: Lapangan Basket, Lab TJKT" required>
            </div>

            <div class="mb-3">
              <label for="deskripsiKejadian" class="form-label">Deskripsi Kejadian <span class="text-danger">*</span></label>
              <textarea v-model="deskripsi" class="form-control" id="deskripsiKejadian" rows="3" placeholder="Jelaskan apa yang terjadi secara detail" required></textarea>
            </div>

            <div class="mb-3">
              <label for="waktuKejadian" class="form-label">Waktu Kejadian <span class="text-danger">*</span></label>
              <input v-model="waktu_kejadian" type="date" class="form-control" id="waktuKejadian" required>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
          <button type="button" class="btn btn-danger" @click="kirimLaporan">
            <i class="bi bi-send-fill me-1"></i>Kirim Laporan Darurat
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { links } from '../../configs/hooks'

const lokasi = ref('')
const deskripsi = ref('')
const waktu_kejadian = ref('')

const kirimLaporan = async () => {
  try {
    const payload = {
      lokasi: lokasi.value,
      deskripsi: deskripsi.value,
      waktu_kejadian: waktu_kejadian.value
    }
    console.log('Mengirim:', payload)
    const response = await links.post('laporan_darurat', payload)
    console.log('Response:', response.data)

    alert('Laporan berhasil dikirim!')
  } catch (error) {
    console.error('Gagal mengirim laporan:', error)
    alert('Terjadi kesalahan saat mengirim laporan.')
  }
}
</script>

<style scoped>
/* Tambahkan style jika diperlukan */
</style>

<template>
  <Navbar/>
  <div class="d-flex justify-content-center align-items-center min-vh-100 bg-light">
    <div class="card shadow-sm w-100" style="max-width: 600px;">
      <div class="card-header bg-white">
        <h5 class="mb-0">Detail Kunjungan</h5>
      </div>
      <div class="card-body">
        <div v-if="kunjungan">
          <p><strong>Nama:</strong> {{ kunjungan.people.name }}</p>
          <p><strong>Kelas:</strong> {{ kunjungan.people.kelas }}</p>
          <p><strong>Keluhan:</strong> {{ kunjungan.keluhan }}</p>
          <p><strong>Tanggal:</strong> {{ formatTanggalJam(kunjungan.tanggal, kunjungan.jam) }}</p>

          <div class="mb-3">
            <label for="keterangan" class="form-label">Keterangan Petugas</label>
            <textarea
              id="keterangan"
              class="form-control"
              v-model="keterangan"
              rows="4"
              placeholder="Masukkan keterangan penanganan..."
            ></textarea>
          </div>

          <button @click="updateKeterangan" class="btn btn-primary">
            Simpan Keterangan
          </button>
        </div>
        <div v-else>
          <p>Loading...</p>
        </div>
      </div>
    </div>
  </div>
  <Footer/>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { links } from '../../../configs/hooks'
import Navbar from '../../Navbar/Navbar.vue'
import Footer from '../../Footer/Footer.vue'

const route = useRoute()
const router = useRouter()
const kunjungan = ref(null)
const keterangan = ref('')

const fetchDetail = async () => {
  try {
    const response = await links.get(`kunjungan/${route.params.id}`)
    kunjungan.value = response.data.data
    keterangan.value = response.data.keterangan || ''
  } catch (err) {
    console.error('Gagal mengambil data kunjungan:', err)
  }
}

const updateKeterangan = async () => {
  try {
    await links.put(`kunjungan/${route.params.id}`, {
      keterangan: keterangan.value,
    })
    alert('Keterangan berhasil diperbarui.')
    router.push('/admin-dashboard') 
  } catch (err) {
    console.error('Gagal memperbarui keterangan:', err)
    alert('Terjadi kesalahan saat menyimpan.')
  }
}

const formatTanggalJam = (tanggal, jam) => {
  const today = new Date()
  const dateObj = new Date(`${tanggal}T${jam}`)
  if (
    dateObj.getDate() === today.getDate() &&
    dateObj.getMonth() === today.getMonth() &&
    dateObj.getFullYear() === today.getFullYear()
  ) {
    return `Hari ini, ${jam.slice(0, 5)}`
  }
  return dateObj.toLocaleDateString('id-ID') + ', ' + jam.slice(0, 5)
}

onMounted(fetchDetail)
</script>

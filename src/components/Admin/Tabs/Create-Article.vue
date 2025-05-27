<template>
  <div class="tab-pane fade" id="buat">
    <div class="card shadow-sm">
      <div class="card-header bg-white">
        <h5 class="mb-0">Form Artikel Baru</h5>
      </div>
      <div class="card-body">
        <form @submit="simpanArtikel">
          <div class="mb-3">
            <label for="judul" class="form-label">Judul Artikel <span class="text-danger">*</span></label>
            <input
              type="text"
              class="form-control"
              id="judul"
              v-model="judul"
              placeholder="Masukkan judul artikel"
              required
            />
          </div>

          <div class="row mb-3">
            <div class="col-md-6">
              <label for="kategori" class="form-label">Kategori <span class="text-danger">*</span></label>
              <select class="form-select" id="kategori" v-model="kategori" required>
                <option value="" disabled>Pilih kategori</option>
                <option>Kesehatan Umum</option>
                <option>Gizi & Nutrisi</option>
                <option>Kebersihan Diri</option>
                <option>Kesehatan Mental</option>
                <option>Olahraga</option>
                <option>Lainnya</option>
              </select>
            </div>
            <div class="col-md-6">
              <label for="gambar" class="form-label">Gambar Utama</label>
              <input class="form-control" type="file" id="gambar" @change="handleFileChange" />
              <div class="form-text">Format: JPG, PNG. Maks: 2MB</div>
            </div>
          </div>

          <div class="mb-3">
            <label for="konten" class="form-label">Konten Artikel <span class="text-danger">*</span></label>
            <textarea
              class="form-control"
              id="konten"
              rows="10"
              v-model="isi"
              placeholder="Tulis konten artikel di sini..."
              required
            ></textarea>
          </div>

          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <button type="reset" class="btn btn-outline-secondary" @click="resetForm">Reset</button>
            <button type="submit" class="btn btn-primary">Simpan Artikel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { links } from '../../../configs/hooks'

const judul = ref('')
const kategori = ref('')
const isi = ref('')
const gambar = ref(null)

function handleFileChange(event) {
  gambar.value = event.target.files[0]
}

function resetForm() {
  judul.value = ''
  kategori.value = ''
  isi.value = ''
  gambar.value = null
  document.getElementById('gambar').value = ''
}

async function simpanArtikel(e) {
  e.preventDefault()

  if (!judul.value || !kategori.value || !isi.value) {
    alert('Harap isi semua kolom yang wajib diisi.')
    return
  }

  const formData = new FormData()
  formData.append('judul', judul.value)
  formData.append('kategori', kategori.value) 
  formData.append('isi', isi.value) 
  if (gambar.value) {
    formData.append('gambar', gambar.value)
  }

  try {
    await links.post('artikel', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
    alert('Artikel berhasil disimpan.')
    resetForm()
  } catch (error) {
    console.error(error)
    alert('Gagal menyimpan artikel. Periksa kembali data yang dimasukkan.')
  }
  
console.log([...formData.entries()])
}



</script>

<style scoped>
/* Tambahkan gaya jika perlu */
</style>

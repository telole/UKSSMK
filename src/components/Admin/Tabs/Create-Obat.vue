<template>
  <div id="tambah">
    <div class="card shadow-sm">
      <div class="card-header bg-white">
        <h5 class="mb-0">Form Tambah Obat Baru</h5>
      </div>
      <div class="card-body">
        <form @submit.prevent="simpanObat">
          <div class="mb-3">
            <label for="namaObat" class="form-label">Nama Obat <span class="text-danger">*</span></label>
            <input v-model="form.nama_obat" type="text" class="form-control" id="namaObat" placeholder="Masukkan nama obat" required>
          </div>

          <div class="mb-3">
            <label for="kategori" class="form-label">Kategori <span class="text-danger">*</span></label>
            <select v-model="form.satuan" class="form-select" id="kategori" required>
              <option value="" disabled selected>Pilih kategori</option>
              <option>ml</option>
              <option>tablet</option>
              <option>sachet</option>
              <option>pcs</option>
              <option>kapsul</option>
            </select>
          </div>

          <div class="mb-3">
            <label for="deskripsi" class="form-label">Deskripsi <span class="text-danger">*</span></label>
            <textarea v-model="form.deskripsi" class="form-control" id="deskripsi" rows="3" placeholder="Masukkan deskripsi obat" required></textarea>
          </div>

          <div class="mb-3">
            <label for="stokAwal" class="form-label">Stok Awal <span class="text-danger">*</span></label>
            <input v-model.number="form.stok" type="number" class="form-control" id="stokAwal" min="0" required>
          </div>

          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <button type="reset" class="btn btn-outline-secondary" @click="resetForm">Reset</button>
            <button type="submit" class="btn btn-primary">Simpan Obat</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { links } from '../../../configs/hooks'

const form = reactive({
  nama_obat: '',
  satuan: '',
  deskripsi: '',
  stok: 0
})

async function simpanObat() {
  try {
    const response = await links.post('obat', form)

    if (response.status !== 201) throw new Error('Gagal menyimpan data', Error)

    alert('Obat berhasil disimpan!')
    resetForm()
  } catch (err) {
    console.error(err)
    alert('Terjadi kesalahan saat menyimpan obat.')
  }
}

function resetForm() {
  form.nama_obat = ''
  form.satuan = ''
  form.deskripsi = ''
  form.stok = 0
}
</script>

<template>
   <div class="modal fade" :class="{ show: modalEdit, 'd-block': modalEdit }" tabindex="-1" v-if="modalEdit">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Edit Obat</h5>
          <button type="button" class="btn-close" @click="modalEdit = false"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label class="form-label">Nama Obat</label>
            <input v-model="obatDipilih.nama_obat" class="form-control" />
          </div>
          <div class="mb-3">
            <label class="form-label">Deskripsi</label>
            <textarea v-model="obatDipilih.deskripsi" class="form-control"></textarea>
          </div>
          <div class="mb-3">
            <label class="form-label">Satuan</label>
            <input v-model="obatDipilih.satuan" class="form-control" />
          </div>
          <div class="mb-3">
            <label class="form-label">Stok</label>
            <input type="number" v-model="obatDipilih.stok" class="form-control" />
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="modalEdit = false">Tutup</button>
          <button type="button" class="btn btn-primary" @click="simpanPerubahan">Simpan</button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal-backdrop fade" :class="{ show: modalEdit }" v-if="modalEdit"></div>
</template>

<script setup>

</script>

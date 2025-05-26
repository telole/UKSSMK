<template>
  <div class="modal" v-if="show">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5>Tambah Stok</h5>
          <button class="btn-close" @click="$emit('close')"></button>
        </div>
        <div class="modal-body">
          <input type="number" v-model="stokTambah" class="form-control" />
        </div>
        <div class="modal-footer">
          <button class="btn btn-success" @click="tambahStok">Tambah</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  show: Boolean,
  obat: Object
})

const emit = defineEmits(['close', 'stokUpdated'])
const stokTambah = ref(0)

function tambahStok() {
  const updated = {
    ...props.obat,
    stok: parseInt(props.obat.stok) + parseInt(stokTambah.value)
  }
  emit('stokUpdated', updated)
  emit('close')
}
</script>

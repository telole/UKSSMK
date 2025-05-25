<template>
  <form @submit="handleSubmit">
    <div class="mb-3">
      <label class="form-label">Tanggal</label>
      <input type="date" v-model="tanggal" class="form-control" required />
    </div>

    <div class="mb-3">
      <label class="form-label">Jam</label>
      <input type="time" v-model="jam" class="form-control" required />
    </div>

    <div class="mb-3">
      <label class="form-label">Keluhan</label>
      <textarea v-model="keluhan" class="form-control" rows="3" required></textarea>
    </div>

    <div class="mb-3">
      <label class="form-label">Diagnosa</label>
      <input type="text" v-model="diagnosa" class="form-control" required />
    </div>

    <div class="mb-3">
      <label class="form-label">Tindakan</label>
      <input type="text" v-model="tindakan" class="form-control" required />
    </div>

    <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
    <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>

    <button type="submit" class="btn btn-primary">Kirim Kunjungan</button>
  </form>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { links } from '../../configs/hooks';

const tanggal = ref('');
const jam = ref('');
const keluhan = ref('');
const diagnosa = ref('');
const tindakan = ref('');

const errorMessage = ref('');
const successMessage = ref('');

onMounted(() => {
  const now = new Date();
  tanggal.value = now.toISOString().slice(0, 10);
  jam.value = now.toTimeString().slice(0, 5);
});

const handleSubmit = async (e) => {
  e.preventDefault();
  errorMessage.value = '';
  successMessage.value = '';

  try {
    const payload = {
      tanggal: tanggal.value,
      jam: jam.value,
      keluhan: keluhan.value,
      diagnosa: diagnosa.value,
      tindakan: tindakan.value,
    };
    const response = await links.post('kunjungan', payload);
    successMessage.value = response.data.message || 'Berhasil mengirim data!';
    keluhan.value = '';
    diagnosa.value = '';
    tindakan.value = '';
  } catch (error) {
    if (error.response && error.response.data.errors) {
      errorMessage.value = Object.values(error.response.data.errors).flat().join(' ');
    } else {
      errorMessage.value = 'Gagal mengirim data.';
    }
  }
};
</script>

<template>
  <div class="card shadow-sm">
    <div class="card-header bg-white">
      <h5 class="mb-0">Form Konsultasi Baru</h5>
    </div>
    <div class="card-body">
      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label for="pertanyaan" class="form-label">Pertanyaan <span class="text-danger">*</span></label>
          <textarea 
            class="form-control" 
            id="pertanyaan" 
            rows="5" 
            v-model="form.pertanyaan"
            placeholder="Jelaskan pertanyaan atau masalah kesehatan Anda secara detail" 
            required
          ></textarea>
          <div class="form-text">Berikan informasi selengkap mungkin agar petugas UKS dapat memberikan jawaban yang tepat.</div>
        </div>

        <div class="mb-3 form-check">
          <input 
            type="checkbox" 
            class="form-check-input" 
            id="privasi" 
            v-model="form.agree"
            required
          >
          <label class="form-check-label" for="privasi">Saya setuju bahwa informasi ini akan dibagikan kepada petugas UKS untuk keperluan konsultasi</label>
        </div>

        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
          <button type="reset" class="btn btn-outline-secondary" @click="resetForm">Reset</button>
          <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
            {{ isSubmitting ? 'Mengirim...' : 'Kirim Konsultasi' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { links } from '../../configs/hooks';

const emit = defineEmits(['consultation-submitted']);

const form = ref({
  pertanyaan: '',
  agree: false
});

const isSubmitting = ref(false);

const resetForm = () => {
  form.value = {
    pertanyaan: '',
    agree: false
  };
};

const submitForm = async () => {
  if (!form.value.agree) {
    alert('Anda harus menyetujui persyaratan privasi');
    return;
  }

  try {
    isSubmitting.value = true;
    
    const payload = {
      pertanyaan: form.value.pertanyaan
    };
    
    const response = await links.post('konsultasi', payload);
    
    // Emit event with the new consultation data
    emit('consultation-submitted', {
      ...response.data,
      jawaban: null, // New consultations won't have answers yet
      created_at: new Date().toISOString()
    });
    
    resetForm();
  } catch (error) {
    console.error('Error submitting form:', error);
    alert('Gagal mengirim konsultasi. Silakan coba lagi.');
  } finally {
    isSubmitting.value = false;
  }
};
</script>
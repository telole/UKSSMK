<template>
    <Navbar/>
  <div class="container mt-4">
    <div v-if="loading" class="text-center my-5">
      <div class="spinner-border text-primary" role="status"></div>
      <p class="mt-2">Memuat data...</p>
    </div>

    <div v-else-if="kunjungan" class="card shadow-sm">
      <div class="card-header bg-primary text-white">
        <h5 class="mb-0">Detail Kunjungan</h5>
      </div>
      <div class="card-body">
        <div class="row mb-2">
          <div class="col-sm-4 fw-bold">Nama Siswa</div>
          <div class="col-sm-8">{{ kunjungan.people.name }}</div>
        </div>
        <div class="row mb-2">
          <div class="col-sm-4 fw-bold">NIS</div>
          <div class="col-sm-8">{{ kunjungan.people.nis }}</div>
        </div>
        <div class="row mb-2">
          <div class="col-sm-4 fw-bold">Kelas</div>
          <div class="col-sm-8">{{ kunjungan.people.kelas }}</div>
        </div>
        <div class="row mb-2">
          <div class="col-sm-4 fw-bold">Tanggal</div>
          <div class="col-sm-8">{{ kunjungan.tanggal }}</div>
        </div>
        <div class="row mb-2">
          <div class="col-sm-4 fw-bold">Jam</div>
          <div class="col-sm-8">{{ kunjungan.jam }}</div>
        </div>
        <div class="row mb-2">
          <div class="col-sm-4 fw-bold">Keluhan</div>
          <div class="col-sm-8">{{ kunjungan.keluhan }}</div>
        </div>
        <div class="row mb-2">
          <div class="col-sm-4 fw-bold">Diagnosa</div>
          <div class="col-sm-8">{{ kunjungan.diagnosa }}</div>
        </div>
        <div class="row mb-2">
          <div class="col-sm-4 fw-bold">Tindakan</div>
          <div class="col-sm-8">{{ kunjungan.tindakan }}</div>
        </div>
        <div class="row mb-2">
          <div class="col-sm-4 fw-bold">Petugas</div>
          <div class="col-sm-8">
            <span v-if="kunjungan.petugas">{{ kunjungan.petugas.name }}</span>
            <span v-else class="text-muted fst-italic">Belum ditangani</span>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="alert alert-danger text-center mt-4">
      Data kunjungan tidak ditemukan.
    </div>
  </div>
  <Footer/>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { links } from '../../configs/hooks';
import Navbar from '../Navbar/Navbar.vue';
import Footer from '../Footer/Footer.vue';


const route = useRoute();
const kunjungan = ref(null);
const loading = ref(true);

onMounted(async () => {
  try {
    const response = await links.get(`kunjungan/${route.params.id}`);
    kunjungan.value = response.data.data;
  } catch (error) {
    console.error('Gagal fetch data:', error);
    kunjungan.value = null;
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.card-header {
  font-size: 1.2rem;
}
</style>

<template>
  <div>
    <AdminNavbar />
    <div class="container py-4">
      <div class="row mb-4">
        <div class="col-12">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/konsultasi">Konsultasi Online</router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">Detail Konsultasi</li>
            </ol>
          </nav>
          <div class="d-flex justify-content-between align-items-center">
            <h2 class="mb-0">Detail Konsultasi</h2>
            <router-link to="/admin-konsultasi" class="btn btn-outline-secondary">
              <i class="bi bi-arrow-left me-1"></i>Kembali
            </router-link>
          </div>
        </div>
      </div>

      <div class="card shadow-sm mb-4">
        <div class="card-header bg-white">
          <h5 class="mb-0">Pertanyaan</h5>
        </div>
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-start mb-3">
            <div>
              <h6 class="text-muted mb-1">Diajukan oleh:</h6>
              <p class="mb-1">
                <strong>{{ consultationData.consultation.name }}</strong> ({{ consultationData.consultation.nis }})
              </p>
              <p class="mb-1 small text-muted">
                Kelas {{ consultationData.consultation.kelas }}
              </p>
            </div>
            <span class="badge" :class="{
              'bg-danger': !consultationData.jawaban,
              'bg-success': consultationData.jawaban
            }">
              {{ consultationData.jawaban ? 'Terjawab' : 'Menunggu Jawaban' }}
            </span>
          </div>

          <div class="mb-4">
            <p class="mb-2"><strong>Pertanyaan:</strong></p>
            <div class="p-3 bg-light rounded">
              {{ consultationData.pertanyaan }}
            </div>
          </div>

          <small class="text-muted">
            <i class="bi bi-clock me-1"></i>
            Diajukan pada: {{ formatDate(consultationData.created_at) }}
          </small>
        </div>
      </div>

      <div v-if="consultationData.jawaban" class="card shadow-sm">
        <div class="card-header bg-white">
          <h5 class="mb-0">Jawaban dari Petugas UKS</h5>
        </div>
        <div class="card-body">
          <div class="mb-4">
            <div class="p-3 bg-light rounded">
              {{ consultationData.jawaban }}
            </div>
          </div>

          <div class="d-flex justify-content-between align-items-center">
            <!-- <small class="text-muted">
              <i class="bi bi-clock me-1"></i>
              Dijawab pada: {{ formatDate(consultationData.updated_at) }}
            </small> -->
            
            <button 
              v-if="!consultationData.jawaban"
              class="btn btn-sm btn-primary"
              @click="markAsAnswered"
            >
              Tandai Sudah Dijawab
            </button>
          </div>
        </div>
      </div>

      <div v-else class="card shadow-sm">
        <div class="card-body text-center py-4">
          <i class="bi bi-hourglass-split text-muted fs-1 mb-3"></i>
          <h5>Menunggu Jawaban</h5>
          <p class="text-muted">Pertanyaan Anda sedang dalam proses peninjauan oleh petugas UKS</p>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import AdminNavbar from '../Navbar/Admin.navbar.vue';
import Footer from '../../Footer/Footer.vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { links } from '../../../configs/hooks';

const route = useRoute();
const consultationData = ref({
  id: null,
  user_id: null,
  pertanyaan: '',
  jawaban: null,
  created_at: null,
  updated_at: null,
  consultation: {
    id: null,
    name: '',
    email: '',
    role: '',
    nis: '',
    kelas: '',
    created_at: null,
    updated_at: null
  }
});

const isLoading = ref(true);

const formatDate = (dateString) => {
  if (!dateString) return '';
  const options = { 
    day: '2-digit', 
    month: 'long', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleDateString('id-ID', options);
};

const fetchConsultationDetail = async () => {
  try {
    const response = await links.get(`konsultasi/${route.params.id}`);
    consultationData.value = response.data;
  } catch (error) {
    console.error('Error fetching consultation detail:', error);
  } finally {
    isLoading.value = false;
  }
};

const markAsAnswered = async () => {
  try {
    const response = await links.put(`konsultasi/${route.params.id}`, {
      jawaban: "Pertanyaan telah ditinjau"
    });
    consultationData.value.jawaban = response.data.jawaban;
    consultationData.value.updated_at = new Date().toISOString();
  } catch (error) {
    console.error('Error marking as answered:', error);
  }
};

onMounted(() => {
  fetchConsultationDetail();
});
</script>

<style scoped>
.bg-light {
  background-color: #f8f9fa !important;
}
.card {
  border-radius: 0.5rem;
}
.card-header {
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  padding: 1rem 1.25rem;
}
.badge {
  font-size: 0.875rem;
  padding: 0.35em 0.65em;
}
</style>
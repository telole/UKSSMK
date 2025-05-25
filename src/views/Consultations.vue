<template>
  <Navbar />
  <div class="container py-4">
    <div class="row mb-4">
      <div class="col-12">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="dashboard-siswa.html">Dashboard</a></li>
            <li class="breadcrumb-item active" aria-current="page">Konsultasi Online</li>
          </ol>
        </nav>
        <div class="d-flex justify-content-between align-items-center">
          <h2 class="mb-0">Konsultasi Online</h2>
          <a href="konsultasi-baru.html" class="btn btn-primary">
            <i class="bi bi-plus-circle me-1"></i>Konsultasi Baru
          </a>
        </div>
        <p class="text-muted">Ajukan pertanyaan kesehatan kepada petugas UKS</p>
      </div>
    </div>

    <ul class="nav nav-tabs mb-4">
      <li class="nav-item">
        <a class="nav-link active" href="#riwayat" data-bs-toggle="tab">Riwayat Konsultasi</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#baru" data-bs-toggle="tab">Konsultasi Baru</a>
      </li>
    </ul>

    <div class="tab-content">
      <div class="tab-pane fade show active" id="riwayat">
        <div class="card shadow-sm">
          <div class="card-body">
            <div class="row mb-3">
              <div class="col-md-6">
                <div class="input-group">
                  <input 
                    type="text" 
                    class="form-control" 
                    placeholder="Cari konsultasi..."
                    v-model="searchQuery"
                  >
                  <button class="btn btn-outline-secondary" type="button">
                    <i class="bi bi-search"></i>
                  </button>
                </div>
              </div>
              <div class="col-md-6 mt-3 mt-md-0">
                <div class="d-flex justify-content-md-end">
                  <select class="form-select w-auto" v-model="statusFilter">
                    <option value="semua">Semua Status</option>
                    <option value="menunggu">Menunggu Jawaban</option>
                    <option value="terjawab">Terjawab</option>
                  </select>
                </div>
              </div>
            </div>

            <div v-if="isLoading" class="text-center py-4">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>

            <div v-else-if="filteredConsultations.length === 0" class="text-center py-4">
              <p>Tidak ada data konsultasi</p>
            </div>

            <div v-else class="list-group">
              <div 
                v-for="item in paginatedConsultations" 
                :key="item.id"
                class="list-group-item list-group-item-action p-3"
              >
                <div class="d-flex w-100 justify-content-between align-items-center">
                  <h5 class="mb-1">Konsultasi #{{ item.id }}</h5>
                  <span
                    class="badge"
                    :class="{
                      'bg-danger': !item.jawaban,
                      'bg-success': item.jawaban
                    }"
                  >
                    {{ item.jawaban ? 'Terjawab' : 'Menunggu Jawaban' }}
                  </span>
                </div>
                <p class="mb-1">{{ item.pertanyaan }}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <small class="text-muted">
                    Diajukan pada: {{ formatDate(item.created_at) }}
                    <span v-if="item.jawaban"> • Dijawab pada: {{ formatDate(item.created_at) }}</span>
                  </small>
                  <a :href="`konsultasi/${item.id}`" class="btn btn-sm btn-outline-primary">Lihat Detail</a>
                </div>
              </div>
            </div>

            <nav v-if="filteredConsultations.length > 0" aria-label="Page navigation" class="mt-4">
              <ul class="pagination justify-content-center">
                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                  <a class="page-link" href="#" @click.prevent="prevPage">Previous</a>
                </li>
                
                <li 
                  v-for="page in totalPages" 
                  :key="page"
                  class="page-item" 
                  :class="{ active: currentPage === page }"
                >
                  <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
                </li>
                
                <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                  <a class="page-link" href="#" @click.prevent="nextPage">Next</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
       <div class="tab-pane fade" id="baru">
            <div class="card shadow-sm">
                <div class="card-body">
                    <CreateKonsultasi />
                </div>
             </div>
        </div>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import Footer from '../components/Footer/Footer.vue';
import Navbar from '../components/Navbar/Navbar.vue';
import CreateKonsultasi from '../components/Tabs/Create-Konsultasi.vue';
import { links } from '../configs/hooks';

const consultations = ref([]);
const isLoading = ref(true);
const currentPage = ref(1);
const perPage = 5;
const searchQuery = ref('');
const statusFilter = ref('semua');

const formatDate = (dateString) => {
  if (!dateString) return '';
  const options = { 
    day: '2-digit', 
    month: 'short', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleDateString('id-ID', options);
};

const filteredConsultations = computed(() => {
  let result = consultations.value;
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(item => 
      item.pertanyaan.toLowerCase().includes(query) || 
      (item.jawaban && item.jawaban.toLowerCase().includes(query))
    );
  }
  
  if (statusFilter.value !== 'semua') {
    if (statusFilter.value === 'menunggu') {
      result = result.filter(item => !item.jawaban);
    } else if (statusFilter.value === 'terjawab') {
      result = result.filter(item => item.jawaban);
    }
  }
  
  return result;
});

const paginatedConsultations = computed(() => {
  const start = (currentPage.value - 1) * perPage;
  return filteredConsultations.value.slice(start, start + perPage);
});

const totalPages = computed(() => {
  return Math.ceil(filteredConsultations.value.length / perPage);
});

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

onMounted(() => {
  links.get('konsultasi')
    .then((response) => {
      consultations.value = response.data;
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    })
    .finally(() => {
      isLoading.value = false;
    });
});
</script>
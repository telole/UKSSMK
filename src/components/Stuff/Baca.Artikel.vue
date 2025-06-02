<template>
    <Navbar/>
  <div class="container py-4" v-if="artikel">
    <nav aria-label="breadcrumb" class="mb-4">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="/dashboard">Dashboard</a></li>
        <li class="breadcrumb-item"><a href="/artikel">Artikel Kesehatan</a></li>
        <li class="breadcrumb-item active" aria-current="page">{{ artikel.judul }}</li>
      </ol>
    </nav>

    <div class="row">
      <div class="col-lg-8">
        <div class="card shadow-sm mb-4">
          <img class="card-img-top" :src="`http://localhost:8000/storage/${artikel.gambar}`" :alt="artikel.judul" />
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-3">
              <div>
                <span class="badge bg-primary me-2">Kesehatan Sekolah</span>
                <span class="badge bg-success">Edukasi</span>
              </div>
              <div class="text-end">
                <button class="btn btn-outline-primary btn-sm me-1">
                  <i class="bi bi-bookmark"></i>
                </button>
                <button class="btn btn-outline-secondary btn-sm">
                  <i class="bi bi-share"></i>
                </button>
              </div>
            </div>

            <h1 class="card-title mb-3">{{ artikel.judul }}</h1>

            <div class="d-flex align-items-center text-muted mb-4">
              <!-- <img :src="`http://localhost:8000/storage/${artikel.gambar}`" alt="Avatar" class=" me-2" /> -->
              <div class="me-3">
                <small class="d-block">Ditulis oleh: <strong>{{ artikel.creator?.name }}</strong></small>
                <small>{{ artikel.creator?.kelas }}</small>
              </div>
              
              <div class="me-3">
                <small><i class="bi bi-calendar3 me-1"></i>{{ formatTanggal(artikel.created_at) }}</small>
              </div>
            </div>
          </div>
        </div>

        <div class="card shadow-sm mb-4">
          <div class="card-body">
            <div class="article-content" v-html="formatIsi(artikel.isi)"></div>
          </div>
        </div>
      </div>

      <div class="col-lg-4">
        <div class="card shadow-sm mb-4">
          <div class="card-header">
            <h6 class="mb-0">Informasi Artikel</h6>
          </div>
          <div class="card-body">
            <div class="row mb-2">
              <div class="col-5"><strong>Kategori:</strong></div>
              <div class="col-7">{{ artikel.kategori || 'Umum' }}</div>
            </div>
            <div class="row mb-2">
              <div class="col-5"><strong>Penulis:</strong></div>
              <div class="col-7">{{ artikel.creator?.name }}</div>
            </div>
            <div class="row mb-2">
              <div class="col-5"><strong>Kelas:</strong></div>
              <div class="col-7">{{ artikel.creator?.kelas }}</div>
            </div>
            <div class="row mb-2">
              <div class="col-5"><strong>Tanggal:</strong></div>
              <div class="col-7">{{ formatTanggal(artikel.created_at) }}</div>
            </div>
            <div class="row">
              <div class="col-5"><strong>Email:</strong></div>
              <div class="col-7">{{ artikel.creator?.email }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer/>
</template>

<script setup>

import { ref, onMounted } from 'vue'
import { links } from '../../configs/hooks'
import { useRoute } from 'vue-router'
import Footer from '../Footer/Footer.vue'
import Navbar from '../Navbar/Navbar.vue'

const artikel = ref({})
const route = useRoute()

onMounted(() => {
  links(`artikel/${route.params.id}`)
    .then((res) => {
      artikel.value = res.data
    })
    .catch((err) => {
      console.error('Gagal mengambil data artikel:', err)
    })
})

const formatTanggal = (tanggal) => {
  return new Date(tanggal).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

const formatIsi = (text) => {
  if (!text) return ''
  return text.replace(/\n/g, '<br><br>')
}

const getImageUrl = (path) => `/storage/${path}`
</script>

<style scoped>
.article-content {
  font-size: 1rem;
  line-height: 1.7;
}
</style>

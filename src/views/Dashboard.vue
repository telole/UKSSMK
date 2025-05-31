<template>
  <Navbar />

  <div class="container my-4">
    <WelcomeCard />

    <div class="row g-3 mb-4">
      <KunjunganUksCard />
      <ArtikelCard />
      <KonsultCard />
      <UrgentCallsCard />
    </div>

    <div class="row mb-4">
      <div class="col-lg-8">
        <div class="card shadow-sm">
          <div class="card-header">
            <h5 class="mb-0">Aktivitas Terbaru</h5>
          </div>
          <div class="card-body">
            <div class="list-group list-group-flush">
              <div class="list-group-item" v-if="data.length > 0">
                <div class="d-flex justify-content-between">
                  <h6 class="mb-1">Kunjungan UKS</h6>
                  <small>{{ timeAgo(data[0].created_at) }}</small>
                </div>
                <p class="mb-1">{{ data[0].keluhan ?? 'null' }}</p>
                <small class="text-muted">Diagnosa :{{ data[0].diagnosa ?? 'null' }}</small>
              </div>

              <div class="list-group-item ">
                <div class="d-flex w-100 justify-content-between">
                  <h6 class="mb-1">Konsultasi</h6>
                  <small class="text-muted">{{ consul[0]?.created_at ? timeAgo(consul[0].created_at) : '-' }}</small>
                </div>
                <p class="mb-1">Pertanyaan tentang {{ consul[0]?.pertanyaan ?? '-' }}</p>
                <small class="text-muted">Jawaban : {{ consul[0]?.jawaban ?? '-' }}</small>
              </div>

              <div class="list-group-item">
                <div class="d-flex justify-content-between">
                  <h6 class="mb-1">Artikel</h6>
                  <small>{{ artikel[0]?.created_at ? timeAgo(artikel[0].created_at) : '-' }}</small>
                </div>
                <p class="mb-1">{{ artikel[0]?.judul ?? '-' }}</p>
                <small class="text-muted">isi : {{ artikel[0]?.isi ?? '-' }}</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-4 mt-4 mt-lg-0">
        <div class="card shadow-sm">
          <div class="card-header">
            <h5 class="mb-0">Artikel Terbaru</h5>
          </div>
          <div class="card-body">
            <div class="list-group list-group-flush">
              <a
                href="#"
                class="list-group-item list-group-item-action"
                v-for="(item, idx) in artikelTerbaru"
                :key="idx"
              >
                <div class="d-flex justify-content-between">
                  <h6 class="mb-1">{{ item.judul ?? '-' }}</h6>
                  <small>{{ item.created_at ? timeAgo(item.created_at) : '-' }}</small>
                </div>
                <small class="text-muted">Isi : {{ item.isi ?? '-' }}</small>
              </a>
            </div>
            <div class="text-center mt-3">
              <a href="/artikel" class="btn btn-outline-primary btn-sm">Lihat Semua Artikel</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Footer />
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { links } from '../configs/hooks';

import Navbar from '../components/Navbar/Navbar.vue';
import Footer from '../components/Footer/Footer.vue';
import WelcomeCard from '../components/Cards/Welcome.Card.vue';
import KunjunganUksCard from '../components/Cards/KunjunganUks.card.vue';
import ArtikelCard from '../components/Cards/ArtikelCard.vue';
import KonsultCard from '../components/Cards/Konsult.card.vue';
import UrgentCallsCard from '../components/Cards/UrgentCallsCard.vue';

const data = ref([]);
const consul = ref([]);
const artikel = ref([]);

const artikelTerbaru = computed(() => {
  return artikel.value
    .slice()
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5);
});

onMounted(() => {
  Promise.all([
    links.get('konsultasi'),
    links.get('kunjungan-uks'),
    links.get('artikel'),
  ])
    .then(([resKonsultasi, resKunjungan, resArtikel]) => {
      consul.value = resKonsultasi.data;
      artikel.value = resArtikel.data;
      const sorted = resKunjungan.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      data.value = sorted.slice(0, 1);
    })
    .catch((err) => {
      console.error('Error fetching data:', err);
    });
});

function timeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.floor((now - date) / 1000);

  if (diff < 60) return `${diff} detik lalu`;
  if (diff < 3600) return `${Math.floor(diff / 60)} menit lalu`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`;
  return `${Math.floor(diff / 86400)} hari lalu`;
}
</script>

<style scoped>
.card-title {
  font-weight: 600;
}
</style>

<template>
  <div class="tab-pane fade" id="panduan">
    <div class="card shadow-sm">
      <div class="card-header bg-white">
        <h5 class="mb-0">Panduan Penanganan Darurat</h5>
      </div>
      <div class="card-body">
        <div class="dropdown mb-3" v-for="(item, index) in panduan" :key="index">
          <button
            class="btn btn-outline-primary dropdown-toggle w-100 text-start"
            type="button"
            :id="'dropdown-' + index"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {{ item.judul }}
          </button>
          <div class="dropdown-menu p-3 w-100" :aria-labelledby="'dropdown-' + index">
            <ol class="mb-0">
              <li v-for="(langkah, i) in item.langkah" :key="i">{{ langkah }}</li>
            </ol>
          </div>
        </div>

        <div class="alert alert-warning mt-4">
          <div class="d-flex">
            <i class="bi bi-exclamation-triangle-fill me-2 fs-4"></i>
            <div>
              <strong>Penting!</strong> Panduan ini hanya untuk pertolongan pertama. Selalu laporkan kejadian darurat ke petugas UKS atau guru terdekat sesegera mungkin.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const panduan = [
  {
    judul: "Pingsan",
    langkah: [
      "Baringkan korban di tempat yang datar dengan kaki sedikit ditinggikan",
      "Longgarkan pakaian yang ketat, terutama di sekitar leher",
      "Pastikan korban mendapat udara segar",
      "Jangan memberikan makanan atau minuman apapun",
      "Jika korban tidak sadar dalam 1-2 menit, segera laporkan ke petugas UKS",
    ],
  },
  {
    judul: "Luka dan Pendarahan",
    langkah: [
      "Cuci tangan Anda sebelum menangani luka",
      "Bersihkan luka dengan air bersih atau antiseptik",
      "Untuk pendarahan, tekan luka dengan kain bersih atau kasa steril",
      "Jika pendarahan tidak berhenti dalam 5-10 menit, segera laporkan ke petugas UKS",
      "Jangan mengoleskan obat sembarangan pada luka terbuka",
    ],
  },
  {
    judul: "Cedera Otot dan Sendi",
    langkah: [
      "Istirahatkan bagian tubuh yang cedera",
      "Kompres dengan es selama 15-20 menit",
      "Balut dengan perban elastis (jangan terlalu ketat)",
      "Tinggikan bagian yang cedera",
      "Jika rasa sakit sangat parah atau ada deformitas, segera laporkan ke petugas UKS",
    ],
  },
  {
    judul: "Reaksi Alergi",
    langkah: [
      "Identifikasi dan jauhkan pemicu alergi jika memungkinkan",
      "Perhatikan gejala seperti ruam, gatal, bengkak, atau kesulitan bernapas",
      "Jika korban memiliki riwayat alergi dan membawa obat alergi, bantu memberikannya",
      "Jika terjadi pembengkakan pada wajah, bibir, atau kesulitan bernapas, ini adalah keadaan darurat - segera laporkan ke petugas UKS",
      "Jangan biarkan korban sendirian",
    ],
  },
  {
    judul: "Kejang",
    langkah: [
      "Jaga korban agar tidak terluka - singkirkan benda berbahaya di sekitarnya",
      "Jangan memasukkan apapun ke dalam mulut korban",
      "Jangan menahan gerakan korban",
      "Longgarkan pakaian yang ketat, terutama di sekitar leher",
      "Setelah kejang berhenti, posisikan korban miring ke salah satu sisi",
      "Segera laporkan ke petugas UKS",
    ],
  },
];
</script>

<style scoped>
.dropdown-menu {
  display: none;
  transition: all 0.3s ease;
}
.dropdown.show .dropdown-menu {
  display: block;
}
</style>

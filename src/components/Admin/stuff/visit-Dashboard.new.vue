<template>
  <div class="card shadow-sm">
    <div class="card-header bg-white">
      <h5 class="mb-0">Kunjungan Terbaru</h5>
    </div>
    <div class="card-body p-0">
      <div class="table-responsive">
        <table class="table table-hover mb-0">
          <thead class="table-light">
            <tr>
              <th>Nama Siswa</th>
              <th>Kelas</th>
              <th>Keluhan</th>
              <th>Tanggal</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="kunjungan in kunjunganTerbatas" :key="kunjungan.id">
              <td>{{ kunjungan.people.name }}</td>
              <td>{{ kunjungan.people.kelas }}</td>
              <td>{{ kunjungan.keluhan }}</td>
              <td>{{ formatTanggalJam(kunjungan.tanggal, kunjungan.jam) }}</td>
              <td>
                <span
                  :class="[
                    'badge',
                    kunjungan.petugas_id ? 'bg-success' : 'bg-warning',
                  ]"
                >
                  {{ kunjungan.petugas_id ? 'Selesai' : 'Menunggu' }}
                </span>
              </td>
              <td>
                <router-link
                    :to="kunjungan.petugas_id ? `/kunjungan/${kunjungan.id}` : `/details/${kunjungan.id}`"
                    class="btn btn-sm"
                    :class="kunjungan.petugas_id ? 'btn-outline-secondary' : 'btn-primary'"
                    >
                    {{ kunjungan.petugas_id ? 'Detail' : 'Tangani' }}
                 </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="card-footer bg-white text-center">
      <a href="kunjungan-petugas.html" class="btn btn-sm btn-outline-primary"
        >Lihat Semua Kunjungan</a
      >
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { links } from "../../../configs/hooks";

const kunjungan = ref([]);

// const fetchKunjungan = async () => {
//   try {
//     const res = await links.get("kunjungan");
//     const data = await res.json();
//     kunjungan.value = data;
//   } catch (error) {
//     console.error("Error fetch kunjungan:", error);
//   }
// };

onMounted(() => {
    links.get('kunjungan-uks').then((Res) => {kunjungan.value = Res.data})
})

const kunjunganTerbatas = computed(() => {
  return kunjungan.value
    .slice()
    .sort((a, b) => {
      const dateA = new Date(a.tanggal + "T" + a.jam);
      const dateB = new Date(b.tanggal + "T" + b.jam);
      return dateB - dateA;
    })
    .slice(0, 3);
});

const formatTanggalJam = (tanggal, jam) => {
  const today = new Date();
  const dateObj = new Date(tanggal + "T" + jam);
  if (
    dateObj.getDate() === today.getDate() &&
    dateObj.getMonth() === today.getMonth() &&
    dateObj.getFullYear() === today.getFullYear()
  ) {
    return `Hari ini, ${jam.slice(0, 5)}`;
  }
  return dateObj.toLocaleDateString("id-ID") + ", " + jam.slice(0, 5);
};

// onMounted(() => {
//   fetchKunjungan();
// });
</script>

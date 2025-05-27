<template>
  <AdminNavbar />

  <div class="container py-4">
    <div class="row mb-4">
      <div class="col-12">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="dashboard-petugas.html">Dashboard</a></li>
            <li class="breadcrumb-item active" aria-current="page">Artikel Kesehatan</li>
          </ol>
        </nav>
        <div class="d-flex justify-content-between align-items-center">
          <h2 class="mb-0">Manajemen Artikel Kesehatan</h2>
          <a href="artikel-buat.html" class="btn btn-primary">
            <i class="bi bi-plus-circle me-1"></i>Buat Artikel Baru
          </a>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <ul class="nav nav-tabs mb-4">
      <li class="nav-item">
        <a class="nav-link active" href="#daftar" data-bs-toggle="tab">Daftar Artikel</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#buat" data-bs-toggle="tab">Buat Artikel</a>
      </li>
    </ul>

    <div class="tab-content">
      <div class="tab-pane fade show active" id="daftar">
        <div class="card shadow-sm">
          <div class="card-body">
            <div class="row mb-3">
              <div class="col-md-6">
                <div class="input-group">
                  <input v-model="searchQuery" type="text" class="form-control" placeholder="Cari artikel..." @input="filterArtikel" />
                  <button class="btn btn-outline-secondary" type="button" @click="filterArtikel">
                    <i class="bi bi-search"></i>
                  </button>
                </div>
              </div>
              <div class="col-md-6 mt-3 mt-md-0">
                <div class="d-flex justify-content-md-end">
                  <select v-model="filterKategori" class="form-select w-auto me-2" @change="filterArtikel">
                    <option value="">Semua Kategori</option>
                    <option value="mental">Kesehatan Mental</option>
                    <option value="gizi">Gizi & Nutrisi</option>
                    <option value="kebersihan">Kebersihan Diri</option>
                    <option value="health">Kesehatan Umum</option>
                    <option value="olahraga">Olahraga</option>
                  </select>
                  <!-- <select v-model="filterStatus" class="form-select w-auto" @change="filterArtikel">
                    <option value="">Semua Status</option>
                    <option value="published">Diterbitkan</option>
                    <option value="draft">Draft</option>
                  </select> -->
                </div>
              </div>
            </div>

            <div class="table-responsive">
              <table class="table table-hover align-middle">
                <thead class="table-light">
                  <tr>
                    <th>Judul</th>
                    <th>Kategori</th>
                    <th>Penulis</th>
                    <th>Tanggal</th>
                    <th>Dibaca</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in paginatedArtikel" :key="item.id">
                    <td>
                      <a href="#" class="text-decoration-none fw-medium">{{ item.judul }}</a>
                    </td>
                    <td>{{ formatKategori(item.kategori) }}</td>
                    <td>{{ item.creator?.name || 'Anonim' }}</td>
                    <td>{{ formatTanggal(item.created_at) }}</td>
                    <!-- <td>
                      <span
                        :class="['badge', item.status === 'draft' ? 'bg-secondary' : 'bg-success']"
                      >
                        {{ item.status === 'draft' ? 'Draft' : 'Diterbitkan' }}
                      </span>
                    </td> -->
                    <td>{{ item.dibaca || 0 }}</td>
                    <td>
                      <div class="btn-group btn-group-sm">
                        <a href="#" class="btn btn-outline-primary" @click.prevent="openEditModal(item)">Edit</a>
                        <a href="#" class="btn btn-outline-danger" @click="hapusArtikel(item.id)">Hapus</a>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="paginatedArtikel.length === 0">
                    <td colspan="7" class="text-center">Tidak ada data artikel</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <nav aria-label="Page navigation" class="mt-4">
              <ul class="pagination justify-content-center">
                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                  <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">Previous</a>
                </li>
                <li
                  class="page-item"
                  v-for="page in totalPages"
                  :key="page"
                  :class="{ active: currentPage === page }"
                >
                  <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
                </li>
                <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                  <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">Next</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <CreateArticle/>
    </div>
  </div>

  <Footer />

<div class="modal fade" id="editArtikelModal" tabindex="-1" aria-labelledby="editArtikelModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="editArtikelModalLabel">Edit Artikel</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="submitEdit">
          <div class="mb-3">
            <label for="judulEdit" class="form-label">Judul</label>
            <input v-model="formEdit.judul" type="text" class="form-control" id="judulEdit" required>
          </div>
          <div class="mb-3">
            <label for="isiEdit" class="form-label">Isi Artikel</label>
            <textarea v-model="formEdit.isi" class="form-control" id="isiEdit" rows="6" required></textarea>
          </div>
          <div class="text-end">
            <button type="submit" class="btn btn-primary">Simpan Perubahan</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import Footer from '../../Footer/Footer.vue';
import AdminNavbar from '../Navbar/Admin.navbar.vue';
import { links } from '../../../configs/hooks';
import CreateArticle from '../Tabs/Create-Article.vue';

const artikel = ref([]);
const filteredArtikel = ref([]);

const searchQuery = ref('');
const filterKategori = ref('');
const filterStatus = ref('');

const currentPage = ref(1);
const itemsPerPage = 5;

const formEdit = ref({
  judul: '',
  isi: ''
});
const selectedId = ref(null);


onMounted(() => {
  links
    .get('artikel')
    .then((res) => {
      artikel.value = res.data.map((item) => ({
        ...item,
        dibaca: Math.floor(Math.random() * 200),
      }));
      filteredArtikel.value = artikel.value;
    })
    .catch((err) => {
      console.log('err fetch data :', err);
    });
});

const formatKategori = (kat) => {
  const map = {
    mental: 'Kesehatan Mental',
    health: 'Kesehatan Umum',
    olahraga: 'Olahraga',
    gizi: 'Gizi & Nutrisi',
    kebersihan: 'Kebersihan Diri',
  };
  return map[kat] || kat;
};

function openEditModal(artikel) {
  formEdit.value.judul = artikel.judul;
  formEdit.value.isi = artikel.isi;
  selectedId.value = artikel.id;

  const modal = new bootstrap.Modal(document.getElementById('editArtikelModal'));
  modal.show();
}


const formatTanggal = (tgl) => {
  const date = new Date(tgl);
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

function submitEdit() {
  if (!selectedId.value) return;

  links
    .put(`artikel/${selectedId.value}`, {
      judul: formEdit.value.judul,
      isi: formEdit.value.isi
    })
    .then(() => {
      const index = artikel.value.findIndex(a => a.id === selectedId.value);
      if (index !== -1) {
        artikel.value[index].judul = formEdit.value.judul;
        artikel.value[index].isi = formEdit.value.isi;
      }

      filterArtikel();
      alert('Artikel berhasil diperbarui.');
      const modal = bootstrap.Modal.getInstance(document.getElementById('editArtikelModal'));
      modal.hide();
    })
    .catch(err => {
      console.error('Gagal memperbarui artikel:', err);
      alert('Gagal memperbarui artikel.');
    });
}


function filterArtikel() {
  let temp = artikel.value;

  if (searchQuery.value.trim() !== '') {
    const search = searchQuery.value.toLowerCase();
    temp = temp.filter(
      (a) =>
        a.judul.toLowerCase().includes(search) ||
        (a.creator?.name.toLowerCase().includes(search) ?? false)
    );
  }

  if (filterKategori.value) {
    temp = temp.filter((a) => a.kategori === filterKategori.value);
  }

  if (filterStatus.value) {
    temp = temp.filter((a) => a.status === filterStatus.value);
  }

  filteredArtikel.value = temp;
  currentPage.value = 1; 
}

const totalPages = computed(() =>
  Math.ceil(filteredArtikel.value.length / itemsPerPage)
);

const paginatedArtikel = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredArtikel.value.slice(start, start + itemsPerPage);
});

function changePage(page) {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
}

function hapusArtikel(id) {
  if (!confirm('Apakah Anda yakin ingin menghapus artikel ini?')) return;

  links
    .delete(`artikel/${id}`)
    .then(() => {
      artikel.value = artikel.value.filter((a) => a.id !== id);
      filterArtikel(); 
      alert('Artikel berhasil dihapus.');
    })
    .catch((err) => {
      console.error('Gagal menghapus artikel:', err);
      alert('Gagal menghapus artikel.');
    });
}

</script>

<style scoped>
/* Optional styling jika perlu */
</style>

<template>
  <AdminNavbar />

  <div class="container py-4">
    <div class="row mb-4">
      <div class="col-12">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><router-link to="/dashboard-petugas">Dashboard</router-link></li>
            <li class="breadcrumb-item active" aria-current="page">Manajemen Obat</li>
          </ol>
        </nav>
        <div class="d-flex justify-content-between align-items-center">
          <h2 class="mb-0">Manajemen Obat</h2>
          <div>
            <button class="btn btn-primary me-2" @click="activeTab = 'tambah'">
              <i class="bi bi-plus-circle me-1"></i>Tambah Obat
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="menipisCount > 0" class="alert alert-warning alert-dismissible fade show" role="alert">
      <i class="bi bi-exclamation-triangle-fill me-2"></i>
      <strong>Perhatian!</strong> Terdapat {{ menipisCount }} jenis obat dengan stok menipis.
      Segera lakukan pengadaan.
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>

    <ul class="nav nav-tabs mb-4">
      <li class="nav-item">
        <button 
          class="nav-link" 
          :class="{ active: activeTab === 'daftar' }"
          @click="activeTab = 'daftar'"
        >
          Daftar Obat
        </button>
      </li>
      <li class="nav-item">
        <button 
          class="nav-link" 
          :class="{ active: activeTab === 'tambah' }"
          @click="activeTab = 'tambah'"
        >
          Tambah Obat
        </button>
      </li>
    </ul>

    <!-- Daftar Obat Tab -->
    <div v-if="activeTab === 'daftar'" class="card shadow-sm">
      <div class="card-body">
        <div class="row mb-3">
          <div class="col-md-6">
            <div class="input-group">
              <input 
                v-model="searchQuery" 
                type="text" 
                class="form-control" 
                placeholder="Cari obat..."
                @keyup.enter="applyFilters"
              >
              <button class="btn btn-outline-secondary" type="button" @click="applyFilters">
                <i class="bi bi-search"></i>
              </button>
            </div>
          </div>
          <div class="col-md-6 mt-3 mt-md-0">
            <div class="d-flex justify-content-md-end">
              <select class="form-select w-auto" v-model="stokFilter" @change="applyFilters">
                <option value="all">Semua Status</option>
                <option value="tersedia">Stok Tersedia</option>
                <option value="menipis">Stok Menipis</option>
                <option value="habis">Stok Habis</option>
              </select>
            </div>
          </div>
        </div>

        <div class="table-responsive">
          <table class="table table-hover align-middle">
            <thead class="table-light">
              <tr>
                <th>Nama Obat</th>
                <th>Deskripsi</th>
                <th>Satuan</th>
                <th>Stok</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="loading">
                <td colspan="6" class="text-center py-4">
                  <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </td>
              </tr>
              <tr v-else-if="filteredObat.length === 0">
                <td colspan="6" class="text-center py-4">Tidak ada data obat</td>
              </tr>
              <tr v-for="obat in paginatedObat" :key="obat.id">
                <td>{{ obat.nama_obat }}</td>
                <td>{{ obat.deskripsi }}</td>
                <td>{{ obat.satuan }}</td>
                <td>
                  <div class="d-flex align-items-center">
                    <span class="me-2">{{ obat.stok }}</span>
                    <div class="progress flex-grow-1" style="height: 6px;">
                      <div class="progress-bar"
                        :class="getStatus(obat.stok).class"
                        :style="{ width: getStatus(obat.stok).percent + '%' }"></div>
                    </div>
                  </div>
                </td>
                <td>
                  <span class="badge" :class="getStatus(obat.stok).class">
                    {{ getStatus(obat.stok).label }}
                  </span>
                </td>
                <td>
                  <div class="btn-group btn-group-sm">
                    <button class="btn btn-warning" @click="bukaEdit(obat)">
                      <i class="bi bi-pencil-square"></i>
                    </button>
                    <button class="btn btn-success" @click="bukaTambahStok(obat)">
                      <i class="bi bi-plus-circle"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <nav aria-label="Page navigation" class="mt-4">
          <ul class="pagination justify-content-center">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <button class="page-link" @click="goToPage(currentPage - 1)">Previous</button>
            </li>
            <li 
              class="page-item" 
              v-for="page in visiblePages" 
              :key="page" 
              :class="{ active: currentPage === page }"
            >
              <button class="page-link" @click="goToPage(page)">{{ page }}</button>
            </li>
            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
              <button class="page-link" @click="goToPage(currentPage + 1)">Next</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <!-- Tambah Obat Tab -->
    <div v-if="activeTab === 'tambah'">
      <CreateObat @success="handleObatBaru" @cancel="activeTab = 'daftar'" />
    </div>

    <!-- Edit Modal -->
    <div class="modal fade" :class="{ show: modalEdit, 'd-block': modalEdit }" tabindex="-1" v-if="modalEdit">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Obat</h5>
            <button type="button" class="btn-close" @click="modalEdit = false"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label">Nama Obat</label>
                <input v-model="obatDipilih.nama_obat" class="form-control" />
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label">Satuan</label>
                <input v-model="obatDipilih.satuan" class="form-control" />
              </div>
              <div class="col-12 mb-3">
                <label class="form-label">Deskripsi</label>
                <textarea v-model="obatDipilih.deskripsi" class="form-control" rows="3"></textarea>
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label">Stok</label>
                <input 
                  type="number" 
                  v-model.number="obatDipilih.stok" 
                  class="form-control" 
                  min="0"
                />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="modalEdit = false">Tutup</button>
            <button type="button" class="btn btn-primary" @click="simpanPerubahan">
              <span v-if="saving" class="spinner-border spinner-border-sm"></span>
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade" :class="{ show: modalEdit }" v-if="modalEdit"></div>

    <!-- Tambah Stok Modal -->
    <div class="modal fade" :class="{ show: modalStok, 'd-block': modalStok }" tabindex="-1" v-if="modalStok">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Tambah Stok {{ obatDipilih.nama_obat }}</h5>
            <button type="button" class="btn-close" @click="modalStok = false"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">Jumlah yang Ditambahkan</label>
              <input 
                type="number" 
                v-model.number="jumlahTambah" 
                class="form-control" 
                min="1" 
                @keyup.enter="tambahStok"
              />
            </div>
            <div class="alert alert-info">
              Stok saat ini: {{ obatDipilih.stok }} {{ obatDipilih.satuan }}
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="modalStok = false">Batal</button>
            <button type="button" class="btn btn-primary" @click="tambahStok">
              <span v-if="addingStock" class="spinner-border spinner-border-sm"></span>
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade" :class="{ show: modalStok }" v-if="modalStok"></div>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Footer from '../../Footer/Footer.vue'
import AdminNavbar from '../Navbar/Admin.navbar.vue'
import CreateObat from '../Tabs/Create-Obat.vue'
import { links } from '../../../configs/hooks'

const router = useRouter()
const daftarObat = ref([])
const currentPage = ref(1)
const perPage = 10
const searchQuery = ref('')
const stokFilter = ref('all')
const jumlahTambah = ref(0)
const modalEdit = ref(false)
const modalStok = ref(false)
const obatDipilih = ref({})
const activeTab = ref('daftar')
const loading = ref(false)
const saving = ref(false)
const addingStock = ref(false)
const maxVisiblePages = 5

const ambilObat = async () => {
  try {
    loading.value = true
    const response = await links.get('obat')
    daftarObat.value = response.data
  } catch (error) {
    console.error('Gagal mengambil data:', error)
    alert('Gagal memuat data obat')
  } finally {
    loading.value = false
  }
}

const bukaEdit = (obat) => {
  obatDipilih.value = { ...obat }
  modalEdit.value = true
}

const simpanPerubahan = async () => {
  try {
    saving.value = true
    await links.put(`obat/${obatDipilih.value.id}`, obatDipilih.value)
    await ambilObat()
    modalEdit.value = false
  } catch (error) {
    console.error('Gagal menyimpan perubahan:', error)
    alert('Gagal menyimpan perubahan')
  } finally {
    saving.value = false
  }
}

const bukaTambahStok = (obat) => {
  obatDipilih.value = { ...obat }
  jumlahTambah.value = 0
  modalStok.value = true
}

const tambahStok = async () => {
  if (!jumlahTambah.value || jumlahTambah.value <= 0) {
    alert('Jumlah harus lebih dari 0')
    return
  }

  try {
    addingStock.value = true
    const updatedStok = obatDipilih.value.stok + jumlahTambah.value
    await links.put(`obat/${obatDipilih.value.id}`, { stok: updatedStok })
    await ambilObat()
    modalStok.value = false
  } catch (error) {
    console.error('Gagal menambah stok:', error)
    alert('Gagal menambah stok')
  } finally {
    addingStock.value = false
  }
}

const handleObatBaru = (newObat) => {
  daftarObat.value.unshift(newObat)
  activeTab.value = 'daftar'
}

const applyFilters = () => {
  currentPage.value = 1
}

const getStatus = (stok) => {
  if (stok === 0) return { label: 'Habis', class: 'bg-danger', percent: 0 }
  if (stok <= 5) return { label: 'Menipis', class: 'bg-warning', percent: Math.min(stok * 20, 100) }
  return { label: 'Tersedia', class: 'bg-success', percent: Math.min(stok * 10, 100) }
}

const filteredObat = computed(() => {
  return daftarObat.value.filter(obat => {
    const searchMatch = obat.nama_obat.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                        (obat.deskripsi && obat.deskripsi.toLowerCase().includes(searchQuery.value.toLowerCase()))
    let stokMatch = true
    if (stokFilter.value === 'tersedia') {
      stokMatch = obat.stok > 5
    } else if (stokFilter.value === 'menipis') {
      stokMatch = obat.stok > 0 && obat.stok <= 5
    } else if (stokFilter.value === 'habis') {
      stokMatch = obat.stok === 0
    }
    return searchMatch && stokMatch
  })
})


const totalPages = computed(() => Math.ceil(filteredObat.value.length / perPage))

const paginatedObat = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return filteredObat.value.slice(start, start + perPage)
})

const visiblePages = computed(() => {
  const pages = []
  let start = Math.max(1, currentPage.value - Math.floor(maxVisiblePages / 2))
  let end = Math.min(totalPages.value, start + maxVisiblePages - 1)
  
  if (end - start + 1 < maxVisiblePages) {
    start = Math.max(1, end - maxVisiblePages + 1)
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const menipisCount = computed(() => 
  daftarObat.value.filter(obat => obat.stok > 0 && obat.stok <= 5).length
)

onMounted(() => {
  ambilObat()
})
</script>

<style scoped>
.nav-link {
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 0.25rem 0.25rem 0 0;
  padding: 0.5rem 1rem;
}

.nav-link.active {
  background-color: #fff;
  border-color: #dee2e6 #dee2e6 #fff;
  color: #0d6efd;
  font-weight: 500;
}

.modal-backdrop {
  z-index: 1040;
}

.modal {
  z-index: 1050;
}

.progress {
  min-width: 100px;
}

.page-item button {
  min-width: 40px;
  text-align: center;
}
</style>
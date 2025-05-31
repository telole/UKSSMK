    <template>
    <Navbar />
    <div class="container py-4">
        <div class="mb-4">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/Dashboard">Dashboard</a></li>
            <li class="breadcrumb-item active">Kunjungan UKS</li>
            </ol>
        </nav>
        <div class="d-flex justify-content-between align-items-center">
            <h2 class="mb-0">Kunjungan UKS</h2>
            <a href="kunjungan-baru.html" class="btn btn-primary">
            <i class="bi bi-plus-circle me-1"></i>Kunjungan Baru
            </a>
        </div>
        </div>

        <ul class="nav nav-tabs mb-4">
        <li class="nav-item">
            <a class="nav-link active" data-bs-toggle="tab" href="#riwayat">Riwayat Kunjungan</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" data-bs-toggle="tab" href="#baru">Buat Kunjungan Baru</a>
        </li>
        </ul>

        <div class="tab-content">
        <div class="tab-pane fade show active" id="riwayat">
            <div class="card shadow-sm">
            <div class="card-body">
                <div class="row mb-3">
                <div class="col-md-6">
                    <div class="input-group">
                    <input type="text" class="form-control" placeholder="Cari kunjungan..." v-model="search" />
                    <button class="btn btn-outline-secondary"><i class="bi bi-search"></i></button>
                    </div>
                </div>
                </div>
                <div class="table-responsive">
                <table class="table table-hover align-middle">
                    <thead class="table-light">
                    <tr>
                        <th>Tanggal</th>
                        <th>Keluhan</th>
                        <th>Diagnosa</th>
                        <th>Tindakan</th>
                        <th>Aksi</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="kunjungan in paginatedData" :key="kunjungan.id">
                        <td>
                        {{ formatTanggal(kunjungan.tanggal) }}<br />
                        <small class="text-muted">{{ kunjungan.jam }}</small>
                        </td>
                        <td>{{ kunjungan.keluhan }}</td>
                        <td>{{ kunjungan.diagnosa }}</td>
                        <td>{{ kunjungan.tindakan }}</td>
                        <td><router-link :to="`/kunjungan/${kunjungan.id}`" class="btn btn-sm btn-outline-primary">Detail</router-link></td>
                    </tr>
                    <tr v-if="paginatedData.length === 0">
                        <td colspan="6" class="text-center">Tidak ada data ditemukan.</td>
                    </tr>
                    </tbody>
                </table>
                </div>
                <nav class="mt-4" v-if="totalPages > 1">
                <ul class="pagination justify-content-center">
                    <li class="page-item" :class="{ disabled: currentPage === 1 }">
                    <button class="page-link" @click="prevPage" :disabled="currentPage === 1">Previous</button>
                    </li>

                    <li
                    class="page-item"
                    v-for="page in totalPages"
                    :key="page"
                    :class="{ active: currentPage === page }"
                    >
                    <button class="page-link" @click="goToPage(page)">{{ page }}</button>
                    </li>

                    <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                    <button class="page-link" @click="nextPage" :disabled="currentPage === totalPages">Next</button>
                    </li>
                </ul>
                </nav>
            </div>
            </div>
        </div>
        <div class="tab-pane fade" id="baru">
            <div class="card shadow-sm">
                <div class="card-body">
                    <CreateKunjungan />
                </div>
             </div>
        </div>
        </div>
    </div>
    <Footer />
    </template>

    <script setup>
    import { onMounted, ref, computed, watch } from 'vue';
    import Footer from '../components/Footer/Footer.vue';
    import Navbar from '../components/Navbar/Navbar.vue';
    import { links } from '../configs/hooks';
    import CreateKunjungan from '../components/Tabs/Create-Kunjungan.vue';

    const data = ref([]);
    const search = ref("");

    const currentPage = ref(1);
    const itemsPerPage = 5;
    

    const tanggalSekarang = new Date().toISOString().slice(0, 16);

    onMounted(() => {
    links
        .get('kunjungan-uks')
        .then((res) => {
        data.value = res.data;
        console.log('Data:', data.value);
        })
        .catch((err) => {
        console.error('Error:', err);
        });
    });

    function formatTanggal(tanggal) {
    const date = new Date(tanggal);
    return date.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
    }

    const filteredData = computed(() => {
    if (!search.value) return data.value;
    return data.value.filter((item) =>
        item.keluhan.toLowerCase().includes(search.value.toLowerCase()) ||
        item.diagnosa.toLowerCase().includes(search.value.toLowerCase()) ||
        item.tindakan.toLowerCase().includes(search.value.toLowerCase())
    );
    });

    const totalPages = computed(() => {
    return Math.ceil(filteredData.value.length / itemsPerPage);
    });

    const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredData.value.slice(start, end);
    });

    watch(search, () => {
    currentPage.value = 1;
    });

    function goToPage(page) {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
    }
    }

    function prevPage() {
    if (currentPage.value > 1) currentPage.value--;
    }

    function nextPage() {
    if (currentPage.value < totalPages.value) currentPage.value++;
    }
    </script>

    <style scoped>
    .table-hover tbody tr:hover {
    background-color: #f2f2f2;
    }
    </style>

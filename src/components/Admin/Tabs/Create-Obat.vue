<template>
     <div class="" id="tambah">
                <div class="card shadow-sm">
                    <div class="card-header bg-white">
                        <h5 class="mb-0">Form Tambah Obat Baru</h5>
                    </div>
                    <div class="card-body">
                        <form>
                            <div class="row mb-3">
                                <div class="col-md-6">
                                    <label for="namaObat" class="form-label">Nama Obat <span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" id="namaObat" placeholder="Masukkan nama obat" required>
                                </div>
                                <div class="col-md-6">
                                    <label for="kategori" class="form-label">Kategori <span class="text-danger">*</span></label>
                                    <select class="form-select" id="kategori" required>
                                        <option value="" selected>Pilih kategori</option>
                                        <option>Analgesik</option>
                                        <option>Antipiretik</option>
                                        <option>Antiseptik</option>
                                        <option>Perban & Plester</option>
                                        <option>Obat Lambung</option>
                                        <option>Lainnya</option>
                                    </select>
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="deskripsi" class="form-label">Deskripsi <span class="text-danger">*</span></label>
                                <textarea class="form-control" id="deskripsi" rows="3" placeholder="Masukkan deskripsi obat" required></textarea>
                            </div>

                            <div class="row mb-3">
                                <div class="col-md-4">
                                    <label for="satuan" class="form-label">Satuan <span class="text-danger">*</span></label>
                                    <select class="form-select" id="satuan" required>
                                        <option value="" selected>Pilih satuan</option>
                                        <option>Tablet</option>
                                        <option>Kapsul</option>
                                        <option>Botol</option>
                                        <option>Ampul</option>
                                        <option>Tube</option>
                                        <option>Sachet</option>
                                        <option>Roll</option>
                                        <option>Kotak</option>
                                        <option>Bungkus</option>
                                        <option>Lainnya</option>
                                    </select>
                                </div>
                                <div class="col-md-4">
                                    <label for="stokAwal" class="form-label">Stok Awal <span class="text-danger">*</span></label>
                                    <input type="number" class="form-control" id="stokAwal" min="0" value="0" required>
                                </div>
                                <div class="col-md-4">
                                    <label for="stokMinimum" class="form-label">Stok Minimum <span class="text-danger">*</span></label>
                                    <input type="number" class="form-control" id="stokMinimum" min="0" value="5" required>
                                    <div class="form-text">Batas minimum stok sebelum peringatan</div>
                                </div>
                            </div>

                            <div class="row mb-3">
                                <div class="col-md-6">
                                    <label for="tanggalKadaluarsa" class="form-label">Tanggal Kadaluarsa</label>
                                    <input type="date" class="form-control" id="tanggalKadaluarsa">
                                </div>
                                <div class="col-md-6">
                                    <label for="lokasi" class="form-label">Lokasi Penyimpanan</label>
                                    <input type="text" class="form-control" id="lokasi" placeholder="Contoh: Lemari 1, Rak 2">
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="catatan" class="form-label">Catatan Tambahan</label>
                                <textarea class="form-control" id="catatan" rows="2" placeholder="Catatan tambahan tentang obat (opsional)"></textarea>
                            </div>

                            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                <button type="reset" class="btn btn-outline-secondary">Reset</button>
                                <button type="submit" class="btn btn-primary">Simpan Obat</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        
</template>
<script>
export default {
    
}
</script>
<style lang="">
    
</style>
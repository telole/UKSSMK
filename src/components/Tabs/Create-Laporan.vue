<template lang="">
    <div class="modal fade" id="laporDarurat" tabindex="-1" aria-labelledby="laporDaruratLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header bg-danger text-white">
                    <h5 class="modal-title" id="laporDaruratLabel">
                        <i class="bi bi-exclamation-triangle-fill me-2"></i>Laporan Darurat
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label for="jenisKejadian" class="form-label">Jenis Kejadian <span class="text-danger">*</span></label>
                            <select class="form-select" id="jenisKejadian" required>
                                <option value="" selected>Pilih jenis kejadian</option>
                                <option>Pingsan</option>
                                <option>Cedera (Luka/Memar)</option>
                                <option>Keseleo/Patah Tulang</option>
                                <option>Reaksi Alergi</option>
                                <option>Kejang</option>
                                <option>Sesak Napas</option>
                                <option>Keracunan</option>
                                <option>Lainnya</option>
                            </select>
                        </div>

                        <div class="row mb-3">
                            <div class="col-md-6">
                                <label for="lokasiKejadian" class="form-label">Lokasi Kejadian <span class="text-danger">*</span></label>
                                <input type="text" class="form-control" id="lokasiKejadian" placeholder="Contoh: Lapangan Basket, Kelas XI IPA 2" required>
                            </div>
                            <div class="col-md-6">
                                <label for="waktuKejadian" class="form-label">Waktu Kejadian <span class="text-danger">*</span></label>
                                <input type="datetime-local" class="form-control" id="waktuKejadian" value="2023-11-20T10:30" required>
                            </div>
                        </div>

                        <div class="mb-3">
                            <label for="deskripsiKejadian" class="form-label">Deskripsi Kejadian <span class="text-danger">*</span></label>
                            <textarea class="form-control" id="deskripsiKejadian" rows="3" placeholder="Jelaskan apa yang terjadi secara detail" required></textarea>
                        </div>

                        <div class="mb-3">
                            <label for="korban" class="form-label">Informasi Korban <span class="text-danger">*</span></label>
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <input type="text" class="form-control" placeholder="Nama korban" required>
                                </div>
                                <div class="col-md-6">
                                    <input type="text" class="form-control" placeholder="Kelas korban" required>
                                </div>
                            </div>
                        </div>

                        <div class="mb-3">
                            <label for="kondisiKorban" class="form-label">Kondisi Korban <span class="text-danger">*</span></label>
                            <textarea class="form-control" id="kondisiKorban" rows="2" placeholder="Jelaskan kondisi korban saat ini" required></textarea>
                        </div>

                        <div class="mb-3">
                            <label for="tindakanAwal" class="form-label">Tindakan Awal yang Sudah Dilakukan</label>
                            <textarea class="form-control" id="tindakanAwal" rows="2" placeholder="Jika sudah dilakukan pertolongan pertama, jelaskan di sini"></textarea>
                        </div>

                        <div class="mb-3">
                            <label for="fotoKejadian" class="form-label">Foto Kejadian (Opsional)</label>
                            <input class="form-control" type="file" id="fotoKejadian">
                            <div class="form-text">Format: JPG, PNG. Maks: 2MB</div>
                        </div>

                        <div class="mb-3">
                            <label for="kontakPelapor" class="form-label">Kontak Pelapor <span class="text-danger">*</span></label>
                            <input type="text" class="form-control" id="kontakPelapor" placeholder="Nomor HP yang bisa dihubungi" required>
                        </div>

                        <div class="mb-3 form-check">
                            <input type="checkbox" class="form-check-input" id="konfirmasi" required>
                            <label class="form-check-label" for="konfirmasi">Saya menyatakan bahwa informasi yang diberikan adalah benar</label>
                        </div>
                    </form>
               </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                    <button type="button" class="btn btn-danger">
                        <i class="bi bi-send-fill me-1"></i>Kirim Laporan Darurat
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>

</script>
<style lang="">
    
</style>
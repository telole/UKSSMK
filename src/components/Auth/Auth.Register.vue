<template>
  <div class="container">
    <div class="row justify-content-center my-5">
      <div class="col-md-8 col-lg-6">
        <div class="card shadow">
          <div class="card-body p-4">
            <div class="text-center mb-4">
              <i class="bi bi-hospital text-primary" style="font-size: 3rem;"></i>
              <h2 class="mt-2">Registrasi Akun</h2>
              <p class="text-muted">Daftar untuk mengakses Sistem UKS</p>
            </div>
            <form @submit.prevent="register">
              <div class="mb-3">
                <label for="fullName" class="form-label">Nama Lengkap</label>
                <input v-model="data.name" type="text" class="form-control" id="fullName" placeholder="Masukkan nama lengkap" required>
              </div>

              <div class="row mb-3">
                <!-- <div class="col-md-6 mb-3 mb-md-0">
                  <label for="username" class="form-label">Username</label>
                  <input v-model="data.username" type="text" class="form-control" id="username" placeholder="Masukkan username" required>
                </div> -->
                <div class="col-md-6">
                  <label for="email" class="form-label">Email</label>
                  <input v-model="data.email" type="email" class="form-control" id="email" placeholder="Masukkan email" required>
                </div>
                <div class="col-md-6 mb-3">
                    <label for="kelas" class="form-label">Kelas</label>
                    <input v-model="data.kelas" type="text" class="form-control" id="kelas" placeholder="Contoh: XI IPA 2">
                  </div>
              </div>

              <div class="row mb-3">
                <div class="col-md-6 mb-3 mb-md-0">
                  <label for="password" class="form-label">Password</label>
                  <input v-model="data.password" type="password" class="form-control" id="password" placeholder="Masukkan password" required>
                </div>
                 <div class="col-md-6 mb-3">
                    <label for="nis" class="form-label">NIS</label>
                    <input v-model="data.nis" type="text" class="form-control" id="nis" placeholder="Nomor Induk Siswa">
                  </div>
                <!-- <div class="col-md-6">
                  <label for="confirmPassword" class="form-label">Konfirmasi Password</label>
                  <input v-model="data.password_confirmation" type="password" class="form-control" id="confirmPassword" placeholder="Konfirmasi password" required>
                </div> -->
                
              </div>

              <!-- <div class="mb-3">
                <div class="row">
                  
                 
                </div>
              </div> -->

              <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="agreeTerms" required>
                <label class="form-check-label" for="agreeTerms">Saya menyetujui syarat dan ketentuan</label>
              </div>

              <div v-if="Object.keys(errors).length > 0" class="alert alert-danger">
                <ul class="mb-0">
                  <li v-for="(messages, field) in errors" :key="field">{{ messages[0] }}</li>
                </ul>
              </div>

              <div class="d-flex justify-content-center mt-3">
                <button type="submit" class="btn btn-primary px-5">Daftar</button>
              </div>
            </form>

            <div class="text-center mt-3">
              <p>Sudah punya akun? <a href="/" class="text-decoration-none">Login disini</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { links } from '../../configs/hooks'

const data = ref({
  name: '',
  email: '',
  password: '',
  nis: '',
  kelas: ''
})

const errors = ref({})

const register = async () => {
  try {
    errors.value = {}
    const res = await links.post('register', data.value)
    localStorage.setItem('name', res.data.data.name)
    // localStorage.setItem('email', res.data.email)
    // localStorage.setItem('nis', res.data.nis)
    // localStorage.setItem('kelas', res.data.kelas)
    // localStorage.setItem('role', res.data.role)
    localStorage.setItem('token', res.data.token)

    alert('Registrasi berhasil!')
    window.location.href = '/dashboard'
  } catch (err) {
    if (err.response && err.response.status === 422) {
      errors.value = err.response.data.errors
    } else {
      alert('Terjadi kesalahan server.')
    }
  }
}


</script>

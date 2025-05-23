<template>
  <div class="bg-light min-vh-100 d-flex align-items-center">
    <div class="container">
      <div class="row justify-content-center mt-5">
        <div class="col-md-6 col-lg-4">
          <div class="card shadow">
            <div class="card-body p-4">
              <div class="text-center mb-4">
                <i class="bi bi-hospital text-primary" style="font-size: 3rem;"></i>
                <h2 class="mt-2">Sistem UKS</h2>
                <p class="text-muted">Silakan login untuk melanjutkan</p>
              </div>

              <form @submit.prevent="login">
                <div class="mb-3">
                  <label for="username" class="form-label">Email</label>
                  <div class="input-group">
                    <span class="input-group-text"><i class="bi bi-person"></i></span>
                    <input type="text" class="form-control" v-model="email" id="username" placeholder="Masukkan username" required>
                  </div>
                </div>

                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <div class="input-group">
                    <span class="input-group-text"><i class="bi bi-lock"></i></span>
                    <input type="password" class="form-control" v-model="password" id="password" placeholder="Masukkan password" required>
                  </div>
                </div>

                <div class="d-flex justify-content-center">
                  <button type="submit" class="btn btn-primary px-4">Login</button>
                </div>
              </form>

              <div class="text-center mt-3">
                <p>Belum punya akun? <a href="register.html" class="text-decoration-none">Daftar disini</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import { links } from '../configs/hooks';


const email = ref();
const password = ref();

const login = async () => {
  try {
    const response = await links.post('login', {
      password : password.value,
      email : email.value
    });
     const token = localStorage.setItem('token', response.data.token);
    console.log('Token Saved', token);
    window.location.href = '/dashboard'
  } catch (error) {
    alert('Login gagal')
    console.log(error) 
  }
}

// TODO: Fetch data from Laravel API using axios here
</script>

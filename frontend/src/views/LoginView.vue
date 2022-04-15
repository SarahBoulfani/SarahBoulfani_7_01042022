<template>
  <div>
    <!-- nav -->
    <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
      <div class="container-fluid">
        <div class="logo">
          <router-link to="#" class="navbar-brand" href="#"
            ><img
              class="me-3"
              src="../assets/icon-left-font-monochrome-white.png"
              alt="Logo Groupomania"
          /></router-link>
        </div>
        <div>
          <ul class="navbar-nav me-auto mb-2 mb-md-0">
            <li class="nav-item">
              <router-link to="/LoginView" class="nav-link active" href="#"
                >Connexion</router-link
              >
            </li>
            <li class="nav-item">
              <router-link to="/" class="nav-link active" href="#"
                >Inscription</router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <!-- form -->
    <form @submit.prevent="login" class="form-signin">
      <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
      <!-- Si il ya une erreur -->
          <ErrorMsg v-if="error" :error="error"/>
      <div class="form-floating">
        <input
          type="email"
          class="form-control"
          id="floatingInput"
          v-model="email"
          required
        />
        <label for="floatingInput">Email address</label>
      </div>

      <div class="form-floating">
        <input
          type="password"
          class="form-control"
          id="floatingPassword"
          v-model="password"
          required
        />
        <label for="floatingPassword">Password</label>
      </div>

      <button class="w-100 btn btn-lg btn-primary" type="submit">
        Connexion
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import ErrorMsg from '../components/ErrorMsg';

export default {
  name: "LoginView",
  components:{
    ErrorMsg
  },

  data() {
    return {
      email: "",
      password: "",
      error:''
    };
  },
  methods: {
    login() {
      axios
        .post("http://localhost:3000/api/user/login", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          console.log(response);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userId", response.data.userId);

          //redirection vers la page profil
          this.$router.push("/ProfilView");
        })

        .catch((error) => {
          console.log(error);
          this.error='Email et/ou mot de passe incorrect(s)'
        });
    },
  },
};
</script>


<style>
</style>

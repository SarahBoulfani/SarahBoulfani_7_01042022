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
    <form @submit.prevent="signup" class="form-signin">
      <h1 class="h3 mb-3 fw-normal">Inscrivez-vous</h1>
      

      <div class="form-floating">
        <input
          type="text"
          class="form-control"
          id="floatingInput-firstname"
          v-model="firstname"
          required
        />
        <label for="floatingInput-firstname">First Name</label>
      </div>

      <div class="form-floating">
        <input
          type="text"
          class="form-control"
          id="floatingInput-lastname"
          v-model="lastname"
          required
        />
        <label for="floatingInput-lastname">Last Name</label>
      </div>

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
        Inscription
      </button>
    </form>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "SignupView",
  
  data() {
    return {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
     
    };
  },
  methods: {
    signup() {
      axios
        .post("http://localhost:3000/api/user/signup", {
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          console.log(response);
          //redirection vers la page d'accueil
          this.$router.push("/ProfilView");
          alert("Votre inscription est validé");
        })
        .catch((error) => {
          console.log(error);
         
        });
    },
  },
};
</script>


<style>
</style>

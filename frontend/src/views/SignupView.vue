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
            <!-- Si il ya une erreur -->
          <ErrorMsg v-if="error" :error="error"/>
      <div class="form-floating">
        <input
          type="text"
          class="form-control"
          id="floatingInput-firstname"
          v-model="firstname"
          required
        />
        <label for="floatingInput-firstname">Prénom</label>
      </div>

      <div class="form-floating">
        <input
          type="text"
          class="form-control"
          id="floatingInput-lastname"
          v-model="lastname"
          required
        />
        <label for="floatingInput-lastname">Nom</label>
      </div>

      <div class="form-floating">
        <input
          type="email"
          class="form-control"
          id="floatingInput"
          v-model="email"
          required
        />
        <label for="floatingInput">Email</label>
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

      <button
        class="w-100 btn btn-lg btn-primary"
        type="submit"
      >
        Inscription
      </button>
    </form>
  </div>
</template>
<script>
import axios from "axios";
import ErrorMsg from '../components/ErrorMsg';

export default {
  
  name: "SignupView",
  components:{
      ErrorMsg
  },

  data() {
    return {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      error: "",
      userRegex: /^[a-zA-Zàâäéèêëïîôöùûüÿç-]+$/,
      emailRegex: /^[a-zA-Z0-9._-]+[@]{1}[a-zA-Z0-9._-]+[.]{1}[a-z]{2,10}$/,
      passwordRegex: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,50}$/,
    };
  },
  methods: { 
    signup() {
      //Validation du formulaire 
      if (!this.userRegex.test(this.firstname)) {
        return (this.error = 'Prénom non valide');
        } else if (!this.userRegex.test(this.lastname)) {
        return (this.error = 'Nom non valide');
        } else if (!this.emailRegex.test(this.email)) {
        return (this.error = 'Email non valide');
        } else if (!this.passwordRegex.test(this.password)) {
        return (this.error = 'Votre mot de passe doit contenir au moins 6 caractères, dont un chiffre, une minuscule et une majuscule');
        }
        //Inscription
      axios
        .post("http://localhost:3000/api/user/signup", {
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          console.log(response);
          //redirection vers la page Login
          this.$router.push("/LoginView");
          alert("Votre inscription est validé");
        })
        .catch((error) => {
          console.log(error);
           this.error='Cette adresse email est déjà utilisée'
        });
    },
  },
};
</script>


<style>
</style>

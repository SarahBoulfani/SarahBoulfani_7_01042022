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
    <main>
    <!-- description -->
    <div class="text-center">
      <h1 class="description-title">Bienvenue sur votre réseau social d'entreprise </h1>
    </div>
    <!-- form -->
    <form @submit.prevent="signup" class="form-signin">
      <h2 class=" text-center h4 mb-3 fw-normal">Inscrivez-vous</h2>
      <!-- error back -->
      <ErrorMsg v-if="e" :e="e" />
           <!-- First name -->
      <div class="form-floating">
        <input
          type="text"
          class="form-control"
          id="floatingInput-firstname"
          v-model="firstname"
        />
        <label for="floatingInput-firstname">Prénom</label>
      </div>
      <!-- error message -->
      <p class="text-danger" v-if="error">{{ error.firstname }}</p>
          <!-- Last name -->
      <div class="form-floating">
        <input
          type="text"
          class="form-control"
          id="floatingInput-lastname"
          v-model="lastname"
        />
        <label for="floatingInput-lastname">Nom</label>
      </div>
      <!-- error message -->
      <p class="text-danger" v-if="error">{{ error.lastname }}</p>
         <!-- Email-->
      <div class="form-floating">
        <input
          type="email"
          class="form-control"
          id="floatingInput"
          v-model="email"
        />
        <label for="floatingInput">Email</label>
      </div>
      <!-- error message -->
      <p class="text-danger" v-if="error">{{ error.email }}</p>
         <!-- Password -->
      <div class="form-floating">
        <input
          type="password"
          class="form-control"
          id="floatingPassword"
          v-model="password"
        />
        <label for="floatingPassword">Password</label>
      </div>
      <!-- error message -->
      <p class="text-danger" v-if="error">{{ error.password }}</p>
         <!-- Bouton inscription -->
      <button class="w-100 btn btn-lg btn-primary" type="submit" aria-label="Inscription">
        Inscription
      </button>
      <p class="mt-2 text-center">Vous avez déjà un compte <router-link class="nav-link" to="/LoginView"> Connectez-vous </router-link></p>
    </form>
    </main>
  </div>
</template>
<script>
import axios from "axios";
import ErrorMsg from "../components/ErrorMsg";

export default {
  name: "SignupView",
  components: {
    ErrorMsg
  },

  data() {
    return {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      error: "",
      e: "",
      userRegex: /^[a-zA-Zàâäéèêëïîôöùûüÿç-]+$/,
      emailRegex: /^[a-zA-Z0-9._-]+[@]{1}[a-zA-Z0-9._-]+[.]{1}[a-z]{2,10}$/,
      passwordRegex: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,50}$/,
    };
  },
  methods: {
    signup() {
      if (
        this.userRegex.test(this.firstname) &&
        this.userRegex.test(this.lastname) &&
        this.emailRegex.test(this.email) &&
        this.passwordRegex.test(this.password)
      ) {
        axios
          .post("http://localhost:3000/api/user/signup", {
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
            password: this.password,
          })
          .then(() => {
           // console.log(response);
            //redirection vers la page Login
            this.$router.push("/LoginView");
            alert("Votre inscription est validé");
          })
          .catch((e) => {
           
            if(e.response.status === 400){
              this.e = "cet adresse email est déja utilisée!";
            }else{
              this.e = e.response.data;
            }
          });
      }
      this.error = [];
      //firstname
      if (!this.userRegex.test(this.firstname)) {
        this.error.firstname = "Prénom non valide, que les caractères minuscules et majuscules sont autorisés.";
      }
      //lastname
      if (!this.userRegex.test(this.lastname)) {
        this.error.lastname = "Nom non valide, que les caractères minuscules et majuscules sont autorisés.";
      }
      //email
      if (!this.emailRegex.test(this.email)) {
        this.error.email = "L'email que vous avez entré est non valide. Veuillez vérifier votre email et essayer à nouveau.";
      }
      //password
      if (!this.passwordRegex.test(this.password)) {
        this.error.password =
          "Votre mot de passe doit contenir au moins 6 caractères, dont un chiffre, une minuscule et une majuscule.";
      }
      //console.log("errors", this.error);
    
    },
  },
};
</script>


<style>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input{
  margin-bottom: 20px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.description-title{
  font-size: 22px !important;
 font-weight: 600 !important;
}
</style>

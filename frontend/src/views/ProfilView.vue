<template>
  <div>
    <NavBar />
    <main>
      <div class="container-xl px-4 mt-4">
        <div class="row">
          <div class="col-xl-4">            
            <!-- Card photo de profil-->
            <div class="card mb-4 mb-xl-0">
              <div class="card-header">Hi, {{ firstname }} {{ lastname }}</div>
              <div class="card-body text-center">
                <!-- Photo de profil-->
                <img
                  class="img-account-profile rounded-circle mb-2"
                  :src="image"
                  alt="Photo de profil"
                />
                <!--Block photo de profil-->
                <!--  Rôle -->
                <p class="text-danger role" v-if="isAdmin == true">
                  Rôle: Modérateur
                </p>
                <div class="formFile">
                  <input
                    class="form-control"
                    id="formFile"
                    type="file"
                    @change="selectFile"
                  />
                  <label class="label-post btn-form p-2" for="formFile"
                    ><i class="fas fa-camera"> Changer votre photo</i></label
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-8">

            <!-- Détails card-->
            <div class="card mb-4">
              <div class="card-header">Modifier vos informations</div>
              <div class="card-body">
                <form>
                  <!-- Form -->
                  <!-- Ajout date d'inscription -->
                  <p class="date">
                    Membre depuis le : {{ humanFriendlyDate(createdAt) }}
                  </p>
                  <div class="gx-3 mb-3">
                    <!-- Form (first name)-->
                    <div class="col-md-6">
                      <label class="small mb-1" for="inputFirstName"
                        >First name</label
                      >
                      <input
                        class="form-control"
                        id="inputFirstName"
                        type="text"
                        :placeholder="firstname"
                        v-model="newFirstname"
                      />
                      <!-- error message -->
                      <p class="text-danger small" v-if="error">
                        {{ error.newFirstname }}
                      </p>
                    </div>
                    <!-- Form (last name)-->
                    <div class="col-md-6">
                      <label class="small mb-1" for="inputLastName"
                        >Last name</label
                      >
                      <input
                        class="form-control"
                        id="inputLastName"
                        type="text"
                        :placeholder="lastname"
                        v-model="newLastname"
                      />
                      <!-- error message -->
                      <p class="text-danger small" v-if="error">
                        {{ error.newLastname }}
                      </p>
                    </div>
                  </div>
                  <div class="col-xl-4">
                    <!-- Bouton modif user-->
                    <button
                      aria-label="Modifier vos informations"
                      @click="modifyUser()"
                      class="btn-form btn btn-primary"
                      type="submit"
                    >
                      Enregistrer
                    </button>
                    <!-- bouton delete profil-->
                    <button
                      @click="deleteUser()"
                      class="btn btn-danger"
                      aria-label="Supprimer votre compte"
                    >
                      Supprimer mon compte
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <!-- footer -->
    <FooterView class="footer-profil footer-login" />
  </div>
</template>
<script>
import axios from "axios";
import NavBar from "../components/NavBar.vue";
import FooterView from "../components/FooterView.vue";
import dayjs from "dayjs";
import localizedDate from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedDate);
require("dayjs/locale/fr");

export default {
  name: "ProfilView",
  components: {
    NavBar,
    FooterView,
  },
  data() {
    return {
      firstname: "",
      lastname: "",
      image: "",
      userId: localStorage.getItem("userId"),
      newFirstname: "",
      newLastname: "",
      isAdmin: "",
      createdAt: "",
      error: "",
      userRegex: /^[a-zA-Zàâäéèêëïîôöùûüÿç-]+$/,
    };
  },

  mounted() {
    const id = localStorage.getItem("userId");
    axios
      .get(`http://localhost:3000/api/user/${id}`)
      .then((response) => {
        //console.log(response);
        this.firstname = response.data.firstname;
        this.lastname = response.data.lastname;
        this.image = response.data.image;
        this.createdAt = response.data.createdAt;
        this.isAdmin = response.data.isAdmin;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    //Télécharger l'image
    selectFile(event) {
      console.log(event);
      const id = localStorage.getItem("userId");
      this.image = event.target.files[0];
      const formData = new FormData();
      formData.append("image", this.image);

      axios
        .put(`http://localhost:3000/api/user/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          //console.log(response);
          this.image = response.data.image;
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //Modifier les informations du user
    modifyUser() {
      if (
        this.userRegex.test(this.newFirstname) &&
        this.userRegex.test(this.newLastname)
      ) {
        const id = localStorage.getItem("userId");
        const formData = new FormData();
        formData.append("firstname", this.newFirstname);
        formData.append("lastname", this.newLastname);

        axios
          .put(`http://localhost:3000/api/user/${id}`, formData, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((response) => {
            //console.log(response);
            this.newFirstname = response.data.firstname;
            this.newLastname = response.data.lastname;
            window.location.reload();
          })
          .catch((error) => {
            console.log(error);
          });
      }
      this.error = [];
      //firstname
      if (!this.userRegex.test(this.newFirstname)) {
        this.error.newFirstname =
          "Prénom non valide";
      }
      //lastname
      if (!this.userRegex.test(this.newLastname)) {
        this.error.newLastname =
          "Nom non valide";
      }
    },

    //Supprimer le compte
    deleteUser() {
      if (confirm("Voulez vous vraiment supprimer votre compte") == true) {
        const id = localStorage.getItem("userId");

        axios
          .delete(`http://localhost:3000/api/user/${id}`, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then(() => {
            //console.log(response);
            localStorage.clear();
            alert("Votre compte a été supprimer");
            this.$router.push("/");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    //Gestion date d'inscription
    humanFriendlyDate(timestamp) {
      return dayjs(timestamp).locale("fr").format("LLLL");
    },
  },
};
</script>

<style lang="scss" >
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");

body {
  font-family: "Poppins", sans-serif;
  background-color: #e0e8ec;
}
.img-account-profile {
  height: 10rem;
}
.rounded-circle {
  border-radius: 50% !important;
}
.card {
  border-radius: 30px;
  box-shadow: 0 0.15rem 1.75rem 0 rgb(33 40 50 / 15%);
}
.card .card-header {
  font-weight: 500;
}
.card-header:first-child {
  border-radius: 0.35rem 0.35rem 0 0;
}
.card-header {
  border-top-right-radius: 30px !important;
  border-top-left-radius: 30px !important;
  padding: 1rem 1.35rem;
  margin-bottom: 0;
  background-color: rgba(33, 40, 50, 0.03);
  border-bottom: 1px solid rgba(33, 40, 50, 0.125);
}
.form-control,
.dataTable-input {
  display: block;
  width: 100%;
  padding: 0.875rem 1.125rem;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1;
  color: #69707a;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #c5ccd6;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0.35rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.btn-form {
  margin: 7px;
  border-radius: 30px;
  cursor: pointer;
}
.role {
  font-weight: 800;
  margin: 15px;
}
.date {
  font-weight: 800;
}
.btn {
  border-radius: 30px;
}
.footer-profil {
  @media screen and (max-width: 1200px) {
    display: none;
  }
}

</style>
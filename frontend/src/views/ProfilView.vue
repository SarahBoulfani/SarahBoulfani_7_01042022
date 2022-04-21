<template>
  <div>
    <NavBar />
    <div class="container-xl px-4 mt-4">
      <div class="row">
        <div class="col-xl-4">
          <!-- Profile picture card-->
          <div class="card mb-4 mb-xl-0">
            <div class="card-header">Hi, {{ firstname }} {{ lastname }}</div>
            <div class="card-body text-center">
              <!-- Profile picture image-->
              <img
                class="img-account-profile rounded-circle mb-2"
                :src="image"
                alt="Photo de profil"
              />
              <!-- Profile picture help block-->

              <div class="formFile">
               
                <input
                  class="form-control"
                  id="formFile"
                  type="file"
                  @change="selectFile"
                />
                 <label class="label-post" for="formFile"
                  ><i class="fas fa-camera"> Changer votre photo</i></label
                >
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-8">
          <!-- Account details card-->
          <div class="card mb-4">
            <div class="card-header">Modifier vos informations</div>
            <div class="card-body">
              <form>
                <!-- Form Row-->
                <div class="gx-3 mb-3">
                  <!-- Form Group (first name)-->
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
                  </div>
                  <!-- Form Group (last name)-->
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
                  </div>
                </div>
                <div class="col-xl-4">
                  <!-- Save changes button-->
                  <button
                    @click="modifyUser()"
                    class="btn-form btn btn-primary"
                    type="submit"
                  >
                    Enregistrer
                  </button>
                  <!-- Profile delete-->
                  <button @click="deleteUser()" class="btn btn-danger">
                    Supprimer mon compte
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import NavBar from "../components/NavBar.vue";
export default {
  name: "ProfilView",
  components: {
    NavBar,
  },
  data() {
    return {
      firstname: "",
      lastname: "",
      image: "",
      userId: localStorage.getItem("userId"),
      newFirstname: "",
      newLastname: "",
    };
  },

  mounted() {
    const id = localStorage.getItem("userId");
    axios
      .get(`http://localhost:3000/api/user/${id}`)
      .then((response) => {
        console.log(response);
        this.firstname = response.data.firstname;
        this.lastname = response.data.lastname;
        this.image = response.data.image;
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

     axios.put(`http://localhost:3000/api/user/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response);
          this.image = response.data.image;
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //modifier les informations du user
    modifyUser() {
       const id = localStorage.getItem("userId");
      const formData = new FormData();
      formData.append("firstname", this.newFirstname);
       formData.append("lastname", this.newLastname);

     axios.put(`http://localhost:3000/api/user/${id}`, formData, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response);
          this.newFirstname = response.data.firstname;
          this.newLastname = response.data.lastname;
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
     
    },
    //Supprimer le compte
    deleteUser(){
      //TO DO ajouter une confirmation avant suppression
    const id = localStorage.getItem("userId");
    
     axios.delete(`http://localhost:3000/api/user/${id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response);
          localStorage.clear();
          alert("Votre compte a été supprimer");
          this.$router.push('/')
          
        })
        .catch((error) => {
          console.log(error);
        });
     
     
    }
  },
};
</script>

<style >
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");
* {
  margin: 0;
  padding: 0;
}

body {
  font-family: "Poppins", sans-serif;
  background-color:#eae9e7;
   /* background-image: url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpUhXdCNmsP00fvCtI_TvYa_NrXedilm2oyw&usqp=CAU");
   background-size: cover; */
}
.img-account-profile {
  height: 10rem;
}
.rounded-circle {
  border-radius: 50% !important;
}
.card {
  box-shadow: 0 0.15rem 1.75rem 0 rgb(33 40 50 / 15%);
}
.card .card-header {
  font-weight: 500;
}
.card-header:first-child {
  border-radius: 0.35rem 0.35rem 0 0;
}
.card-header {
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
}
</style>
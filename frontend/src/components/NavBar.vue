<template>
<header>
  <nav class="navbar navbar-expand-md mb-4">
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
            <router-link to="/AccueilView" class="nav-link active" href="#"
              ><img class="img-profil" src="../assets/home-page.jpg" alt="icon page d'accueil"></router-link
            >
          </li>
           <li class="nav-item">
            <router-link to="/ProfilView" class="nav-link active" href="#"
              ><img class="img-profil" :src="image"  /></router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              @click="logout"
              to="/LoginView"
              class="nav-link active"
              href="#"
              ><img
            class="img-deconnect"
            src="../assets/deconnexion.png"
            alt="Déconnexion"
        /></router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
  </header>
</template>


<script>
import axios from 'axios';
export default {
  name: "NavBar",
  data() {
    return {
      image:""
    }
  },
  mounted() {
     const id = localStorage.getItem('userId')
    axios.get(`http://localhost:3000/api/user/${id}`)
    .then((response) =>{
     console.log(response);
      
       this.image = response.data.image 
    })
     .catch((error ) => {
      console.log(error);
    });
  },
  methods: {
    logout() {
      localStorage.clear();
    },
  },
};
</script>

<style lang="scss">
.navbar{
  background: #14213d !important;
}
.logo {
  img {
    object-fit: cover;
    width: 200px;
    height: 60px;
  }
}
.img-profil{
  height: 30px;
  object-fit: cover;
  border-radius: 50%;
}
.img-deconnect{
  height: 29px;
   border-radius: 50%;
  
}
.container-fluid{
   @media screen and (max-width: 767px) {
   display: flex;
   flex-direction: column !important;
   align-items: center;
  }
}
.navbar-nav {
   @media screen and (max-width: 767px) {
   display: flex;
   flex-direction: row !important;
   margin: 5px;

  }
  li{
  @media screen and (max-width: 770px) {
   align-items: center;
   margin: 5px;

  }
   
  }
}

</style>



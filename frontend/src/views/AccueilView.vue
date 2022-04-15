<template>
  <main>
    <NavBar/>
  <div class="container py-4">
           
    <div class="p-5 mb-4 bg-light rounded-3 back">
      <div class="container-fluid py-5">
            <h3 v-if="user">Hi, {{user.firstname}} {{ user.lastname}}</h3>
             <h3 v-if="!user">Vous n'êtes pas connecté !</h3>
        <h1 class="display-6 fw-bold">Groupomania</h1>
        <p class="col-md-8 fs-4">Using a series of utilities, you can create this jumbotron, just like the one in previous versions of Bootstrap. Check out the examples below for how you can remix and restyle it to your liking.</p>
        
        <button class="btn btn-primary btn-lg btn-home" type="button"><router-link to="/" >Inscription </router-link></button>
       
      </div>
    </div>
 
  </div>
</main>
    
</template>



<script>
import NavBar from '../components/NavBar.vue'
import axios from 'axios'

export default {
  name : 'AccueilView',
   components: {
    NavBar
    },

  data() {
    return {
      user: null
    }
  },
 
  created() {
    const id = localStorage.getItem('userId')
    axios.get(`http://localhost:3000/api/user/${id}`)
    .then((response) =>{
     console.log(response);
     this.user = response.data;
    })
     .catch((error ) => {
      console.log(error);
    });
    
  },
   
   
}
</script>


<style lang="scss"> 
.back{
  background: #e5e5e5 !important;
}
a{
  text-decoration: none;
  color: white;
}
.btn-home{
   background: #fca311 !important;
   border: none;
}
</style>


<template>

   <form @submit.prevent="signup" class="form-signin" >
    <h1 class="h3 mb-3 fw-normal">Inscrivez-vous</h1>

    <div class="form-floating">
      <input type="text" class="form-control" id="floatingInput-firstname" v-model="firstname" required>
      <label for="floatingInput-firstname">First Name</label>
    </div>
     
     <div class="form-floating">
      <input type="text" class="form-control" id="floatingInput-lastname" v-model="lastname" required>
      <label for="floatingInput-lastname">Last Name</label>
    </div>

    <div class="form-floating">
      <input type="email" class="form-control" id="floatingInput" v-model="email" required>
      <label for="floatingInput">Email address</label>
    </div>


    <div class="form-floating">
      <input type="password" class="form-control" id="floatingPassword" v-model="password" required>
      <label for="floatingPassword">Password</label>
    </div>

    <button class="w-100 btn btn-lg btn-primary" type="submit">Inscription</button>
    
  </form>
  


</template>
<script>
import axios from 'axios';
export default {
  name : 'SignupView',
  data() {
    return {
      firstname:'',
      lastname:'',
      email:'',
      password:'',
    }
  },
  methods: {
    signup(){
      axios.post('http://localhost:3000/api/user/signup', {
        firstname: this.firstname,
        lastname: this.lastname,
        email:this.email,
        password:this.password
      })
      .then(response =>{console.log(response)
      //redirection vers la page d'accueil
      this.$router.push('/LoginView')
      })
      .catch(error=>{console.log(error)})
    }
  },
 
}
</script>


<style> 
</style>

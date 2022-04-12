<template>
     <form @submit.prevent="login" class="form-signin">
    
    <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

    <div class="form-floating">
      <input type="email" class="form-control" id="floatingInput" v-model="email" required>
      <label for="floatingInput">Email address</label>
    </div>

    <div class="form-floating">
      <input type="password" class="form-control" id="floatingPassword" v-model="password" required>
      <label for="floatingPassword">Password</label>
    </div>

    <button class="w-100 btn btn-lg btn-primary" type="submit">Connexion</button>
    
  </form>
</template>

<script>
import axios from'axios';


export default {
  name : 'LoginView',

  data() {
    return {
      email:'',
      password:'',
    }
  },
  methods: {
    login(){
      axios.post('http://localhost:3000/api/user/login',{
          email:this.email,
          password:this.password
      })
      .then(response =>{console.log(response)
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId);
      //redirection vers la page d'accueil
      this.$router.push('/')
      })
      
      .catch(error=>{console.log(error)})

    }
  },
 
}
</script>


<style> 
</style>

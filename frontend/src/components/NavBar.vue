<template>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
  <div class="container-fluid">
    <router-link to="/" class="navbar-brand" href="#">Accueil</router-link>

    <div >
      <ul class="navbar-nav me-auto mb-2 mb-md-0">
        <li class="nav-item">
          <router-link to="/SignupView" class="nav-link active" href="#">Inscription</router-link>
        </li>  
         <li class="nav-item">
          <router-link to="/LoginView" class="nav-link active" href="#">Connexion</router-link>
        </li> 
      </ul>
    
    </div>
  </div>
</nav>
</template>


<script>
export default {
   name:'NavBar',
}
</script>

<style scoped>

</style>

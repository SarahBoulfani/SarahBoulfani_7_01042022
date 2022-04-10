<template>
   <form>
    <h1 class="h3 mb-3 fw-normal">Inscrivez-vous</h1>

    <div class="form-floating">
      <input type="firstname" class="form-control" id="floatingInput" placeholder="FirstName">
      <label for="floatingInput">FirstName</label>
    </div>
     
     <div class="form-floating">
      <input type="lastname" class="form-control" id="floatingInput" placeholder="LastName">
      <label for="floatingInput">LastName</label>
    </div>

    <div class="form-floating">
      <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
      <label for="floatingInput">Email address</label>
    </div>


    <div class="form-floating">
      <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
      <label for="floatingPassword">Password</label>
    </div>

    <button class="w-100 btn btn-lg btn-primary" type="submit">Inscription</button>
    
  </form>
  

</template>
<script>
export default {
  name : 'SignupView',
 
}
</script>


<style> 
</style>

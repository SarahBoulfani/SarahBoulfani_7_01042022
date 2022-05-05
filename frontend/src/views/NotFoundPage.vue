<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="error-template">
          <h1>Oops!</h1>
          <h2>404 Not Found</h2>
          <div class="error-details">
            Sorry, an error has occured, Requested page not found!
            <router-link to ="/LoginView">Back To Home</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: "NotFoundPage"
};
</script>
<style lang="scss" >
.error-template {
  padding: 40px 15px;
  text-align: center;
}
</style>
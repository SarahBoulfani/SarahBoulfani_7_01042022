<template>
  <footer class="footer text-center text-white">
    <p class="text-center copyright p-4">
      {{ copyright }} | All Rights Reserved | Powered with 💕
    </p>
  </footer>
</template>
<script>
export default {
  name: "FooterView",
  data() {
    return {
      Name: "Groupomania",
    };
  },

  computed: {
    copyright() {
      const currentYear = new Date().getFullYear();

      return `Copyright : ${this.Name} ©${currentYear}`;
    },
  },
};
</script>
<style lang="scss" >
.footer {
  background: #14213d !important;
  font-size: 15px;
  width: 100%;
   @media screen and (max-width: 770px)  {
    display: none;
  } 
  p {
    margin-bottom: 0 !important;
  }
}
</style>
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
.footer .copyright {
  background: #14213d !important;
  margin-top: 60px;
  font-size: 15px;
  //and (max-width: 1440px)
    @media screen and (min-width: 500px)  {
      //margin-top: 140px;

  }
}
.copyright {
  width: 100%;
  margin: 0px !important;
}
</style>
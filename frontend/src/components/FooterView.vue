<template>
  <footer class="footer text-center text-white">
    <p class="text-center p-3">
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
  width: 100%;
  position: absolute;
}
</style>
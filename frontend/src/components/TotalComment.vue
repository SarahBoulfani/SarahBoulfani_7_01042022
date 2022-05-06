<template>
  <!-- Afficher le nombre de commentaire -->
  <div>
    <div v-if="totalComments === 0"></div>
    <div v-else class="comment">
      <img
        src="../assets/comment.png"
        class="img-deconnect"
        alt="Image commentaire"
      />
      {{ getTotalComment(postId) }} {{ totalComments }}
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "TotalComment",
  props: {
    postId: Number,
  },
  data() {
    return {
      totalComments: [],
    };
  },
  mounted() {},
  methods: {
    //nbr comment

    getTotalComment(postId) {
      axios
        .get(`http://localhost:3000/api/comment/${postId}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response);
          this.totalComments = response.data.length;

          console.log(this.totalComments);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style lang="scss">
.comment {
  max-width: 50px;
  margin-left: 30px;
  font-weight: 900;
}
</style>>


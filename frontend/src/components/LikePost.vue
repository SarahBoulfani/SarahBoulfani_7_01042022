<template>
  <div>
    <button v-if="!liked" class="like">
      <i class="far fa-heart" @click="createLike(postId)"></i>
      {{ likes.length }}
    </button>
    <button v-else class="like">
      <i class="fas fa-heart text-danger" @click="deleteLike(postId)"></i>
      {{ likes.length }}
    </button>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "LikePost",
  props: {
    postId: Number,
  },
  data() {
    return {
      userId: localStorage.getItem("userId"),
      liked: null,
      likes: [],
      like: "",
    };
  },
  mounted() {
    this.getLike(this.postId);
  },
  methods: {
    /* toggleLike() {
      this.liked = !this.liked;
      this.liked ? this.likesCount++ : this.likesCount--;
    }, */

    //Ajout d'un like

    createLike() {
      const postId = this.post;
      axios
        .post(
          `http://localhost:3000/api/post/${postId}/like`,
          {
            like: true,
            userId: this.userId,
            postId: this.postId,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          this.likes.push(response);
          //console.log(this.likes);
          this.getLike(postId);
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
      this.liked = true;
    },
    //disliker un post
    deleteLike(postId) {
      console.log(this.likes);
      axios
        .delete(
          `http://localhost:3000/api/post/${postId}/dislike`,
          {
            like: false,
            userId: this.userId,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          console.log(response);
          //this.likes.push(response.data);
          this.likes = this.likes.filter((like) => like.userId != this.userId);
          // this.likes.push(response.data);
          //this.getLike(postId)
          //console.log(this.likes);
          this.liked = false;
          //window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    //Récupérer les likes
    getLike(postId) {
      axios
        .get(`http://localhost:3000/api/post/${postId}/likes`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response);
          const datalike = response.data;
          datalike.forEach((like) => {
            like.userId == this.userId
              ? (this.liked = true)
              : (this.like = false);
          });

          this.likes = datalike;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style lang="scss">
.like {
  font-size: 26px;
  font-weight: 500;
  padding: 0 !important;
  margin: 0 15px 0 25px;
  border-color: transparent;
  font-size: 17px;
  cursor: pointer;
  background-color: white;
}
</style>
<template>
  <div>
    <button v-if="!liked" class="like" aria-label="Ajouter un like">
      <i class="far fa-heart" @click="createLike(postId)"></i>
      {{ likes.length }}
    </button>
    <button v-else class="like" aria-label="Supprimer un like">
      <i class="fas fa-heart heart text-danger" @click="deleteLike(postId)"></i>
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
    };
  },
  mounted() {
    this.getLike(this.postId);
  },
  methods: {
    //Ajout d'un like
    createLike(postId) {
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
          //window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
      this.liked = true;
    },

    //disliker un post
    deleteLike(postId) {
      // console.log(this.likes, this.userId);
      axios
        .post(
          `http://localhost:3000/api/post/${postId}/like`,
          {
            like: false,
            userId: this.userId,
            postId: this.postId,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then(() => {
          //console.log(response);
          this.likes = this.likes.filter((like) => like.userId != this.userId);
          // console.log(this.likes);
          this.liked = false;
          // window.location.reload();
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
          // console.log(response);
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

.heart:hover {
  animation: heart-animation 0.5s ease-in-out;
}

@keyframes heart-animation {
  0% {
    transform: scale(1);
  }
  30% {
    transform: scale(1.2);
  }
  50% {
    transform: scale(1.5);
  }
  70% {
    transform: scale(1.8);
  }
  80% {
    transform: scale(1.5);
  }
  90% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
}
</style>
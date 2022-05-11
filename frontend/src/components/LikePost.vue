<template>
  <div>
    <button v-if="!liked" class="like">
      <i class="far fa-heart" @click="toggleLike()"></i> {{ likesCount }}
    </button>
    <button v-else class="like">
      <i class="fas fa-heart text-danger" @click="toggleLike()"></i>
      {{ likesCount }}
    </button>
  </div>
</template>
<script>
export default {
  name: "LikePost",
  data() {
    return {
      liked: false,
      likesCount: 0,
    };
  },
  methods: {
    toggleLike() {
      this.liked = !this.liked;
      this.liked ? this.likesCount++ : this.likesCount--;
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
  font-size: 21px;
  cursor: pointer;
  background-color: white;
}
</style>
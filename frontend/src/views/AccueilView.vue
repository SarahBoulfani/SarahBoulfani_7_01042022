<template>
  <main>
    <NavBar />

    <div class="card-width container">
      <div class="px-4 mt-5">
        <!-- User info-->
        <div class="card mb-4">
          <div class="card-header">
            <img
              :src="image"
              alt="Photo de profil"
              class="avatar rounded-circle"
            />Hi, {{ firstname }}
          </div>
          <div class="card-body">
            <form>
              <div>
                <!-- Publication-->
                <textarea
                  class="form-control"
                  placeholder="Quoi de neuf ?"
                  v-model="content"
                >
                </textarea>

                <!-- Upload image-->
                <div class="d-flex">
                  <div class="formFile">
                    <input
                      id="formFile"
                      accept="image/*"
                      type="file"
                      @change="uploadFile"
                    />
                    <label class="label-post" for="formFile"
                      ><i class="fas fa-camera"> Image</i></label
                    >
                  </div>

                  <div class="col-xl-4">
                    <!-- Bouton publier-->
                    <button
                      class="btn btn-post btn-primary m-2"
                      @click="createPost()"
                    >
                      Publier
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- post -->

      <div class="px-4 mt-5" v-for="post in posts" :key="post.id">
        <div class="col-md">
          <div class="box box-widget">
            <div class="box-header with-border">
              <div class="user-block">
                <!-- Image user-->
                <img
                  class="rounded-circle"
                  :src="post.User.image"
                  alt="User Image"
                />
                <!-- Info user  -->
                <span class="username"
                  >{{ post.User.firstname }} {{ post.User.lastname }}</span
                >
                <span class="description">Shared publicly - 7:30 PM Today</span>
              </div>
              <div class="box-tools">
                <!-- Bouton modification -->
                <button
                  type="button"
                  class="btn btn-box-tool"
                  data-widget="remove"
                >
                  <i class="fa fa-refresh" aria-hidden="true"></i>
                </button>
                <!-- bouton suppression post -->
                <button v-if="post.userId == userId || userId ==='1'"
                  type="button"
                  class="btn btn-box-tool"
                  data-widget="remove"
                  @click="deletePost(post.id)"
                >
                  <i class="fa fa-times"></i>
                </button>
              </div>
            </div>
            <!-- Contenu post -->
            <p class="content">
              {{ post.content }}
            </p>
            <div class="box-body text-center" style="display: block">
              <!-- Image post -->
              <img class="img-responsive img-post pad" :src="post.imageUrl" />

              <hr />
            </div>
            <!-- Commentaire -->
            <div
              v-for="comment in comments"
              :key="comment.id"
              style="display: block"
            >
              <div v-if="comment.postId === post.id">
                <div class="box-footer box-comments">
                  <div class="box-comment">
                    <img
                      class="rounded-circle img-sm"
                      :src="comment.User.image"
                      alt="User Image"
                    />
                    <div class="comment-text">
                      <span class="username">
                        {{ comment.User.firstname }} {{ comment.User.lastname }}
                        <span class="text-muted pull-right"
                          >8:03 PM Today
                          <!-- bouton suppression commentaire -->
                          <button v-if="comment.userId == userId || userId ==='1'"
                            type="button"
                            class="btn btn-box-tool"
                            data-widget="remove"
                            @click="deleteComment(comment.id)"
                          >
                            <i class="fa fa-times"></i></button
                        ></span>
                      </span>
                      {{ comment.textComment }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- ajouter un commentaire -->
            <div class="box-footer" style="display: block">
              <img
                class="img-responsive rounded-circle img-sm"
                :src="image"
                alt="Alt Text"
              />
              <div class="img-push">
                <div class="input-group">
                  <!-- Contenu commentaire -->
                  <input
                    v-model="comment"
                    type="text"
                    class="form-control"
                    placeholder="Ajouter un commentaire..."
                    aria-label="Input comment"
                  />
                  <!-- bouton commentaire -->
                  <button
                    class="input-group-text"
                    @click="createComment(post.id)"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-chat"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>



<script>
import NavBar from "../components/NavBar.vue";
import axios from "axios";

export default {
  name: "AccueilView",
  components: {
    NavBar,
  },

  data() {
    return {
      firstname: "",
      lastname: "",
      image: "",
      imageUrl: "",
      file: "",
      content: "",
      user: {},
      userId: localStorage.getItem("userId"),
      postId: "",
      post: {},
      posts: [],
      comment: "",
      comments: [],
    };
  },

  mounted() {
    //Affichage info user + post
    const id = localStorage.getItem("userId");
    axios
      .get(`http://localhost:3000/api/user/${id}`)
      .then((response) => {
        this.firstname = response.data.firstname;
        this.lastname = response.data.lastname;
        this.image = response.data.image;
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("http://localhost:3000/api/post/", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response);
        this.posts = response.data.post;
      })
      .catch((error) => {
        console.log(error);
      });

    this.getComment();
  },
  methods: {
    //Téléchargement d'image
    uploadFile(event) {
      this.file = event.target.files[0];
    },
    //Création post
    createPost() {
      const fd = new FormData();
      fd.append("userId", this.userId);
      fd.append("content", this.content);
      fd.append("imageUrl", this.file);
      axios
        .post("http://localhost:3000/api/post", fd, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //Récupérer les commentaires
    getComment() {
      axios
        .get(`http://localhost:3000/api/comment/`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.comments = response.data.comment;
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //Ajouter un commentaire
    createComment(id) {
      if (this.comment != "") {
        axios
          .post(
            "http://localhost:3000/api/comment",
            {
              userId: this.userId,
              textComment: this.comment,
              postId: id,
            },
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          )
          .then((response) => {
            console.log(response);
            this.getComment();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    //Supprimer un post
    deletePost(id) {
      axios
        .delete(`http://localhost:3000/api/post/${id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response);
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //Supprimer un commentaire
    //Supprimer un post
    deleteComment(id) {
      axios
        .delete(`http://localhost:3000/api/comment/${id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response);
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>


<style lang="scss">
.avatar {
  width: 30px;
  margin-right: 5px;
}
.formFile {
  margin: 10px 0 10px 0;
}
.card-width {
  @media screen and (min-width: 770px) {
    width: 50%;
  }
}
input[type="file"] {
  display: none;
}
.label-post {
  margin: 0px !important;
  font-size: 17px;
  padding: 6px;
  border-radius: 5px;
  background: rgb(214, 210, 211);
}
.btn-post {
  margin: 10px !important;
}
//style post
.box-widget {
  border: none;
  position: relative;
}
.box {
  position: relative;
  border-radius: 3px;
  background: #ffffff;
  border-top: 3px solid #d2d6de;
  margin-bottom: 20px;
  width: 100%;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.box-header.with-border {
  border-bottom: 1px solid #f4f4f4;
}
.box-header {
  color: #444;
  display: block;
  padding: 10px;
  position: relative;
}
.user-block img {
  width: 40px;
  height: 40px;
  float: left;
}
.user-block .username {
  font-size: 16px;
  font-weight: 600;
}
.user-block .description {
  color: #999;
  font-size: 13px;
}
.user-block .username,
.user-block .description,
.user-block .comment {
  display: block;
  margin-left: 50px;
}
.box-header > .box-tools {
  position: absolute;
  right: 10px;
  top: 5px;
}
.btn-box-tool {
  padding: 5px;
  font-size: 12px;
  background: transparent;
  color: #97a0b3;
}
.box-body {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
  padding: 10px;
}
.pad {
  padding: 10px;
}
.box .btn-default {
  background-color: #f4f4f4;
  color: #444;
  border-color: #ddd;
}
.box-comments {
  background: #e6e4e4 !important;
}
.box-footer {
  border-radius: 20px;
  border-top-right-radius: 0;
  padding: 10px;
  margin: 15px;
  background-color: #fff;
}
.box-comments .box-comment:first-of-type {
  padding-top: 0;
}
.box-comments .box-comment {
  padding: 8px 0;
}
.img-sm,
.box-comments .box-comment img,
.user-block.user-block-sm img {
  width: 30px !important;
  height: 30px !important;
}
.img-sm,
.img-md,
.img-lg,
.box-comments .box-comment img,
.user-block.user-block-sm img {
  float: left;
}
.box-comments .comment-text {
  margin-left: 40px;
  color: #555;
}
.box-comments .username {
  color: #444;
  display: block;
  font-weight: 600;
}
.box-comments .text-muted {
  font-weight: 400;
  font-size: 12px;
}
.img-sm + .img-push {
  margin-left: 40px;
}
.box .form-control {
  border-radius: 0;
  box-shadow: none;
  border-color: #d2d6de;
}
.img-post {
  max-width: 100%;
}
.content {
  margin: 10px;
}
</style>


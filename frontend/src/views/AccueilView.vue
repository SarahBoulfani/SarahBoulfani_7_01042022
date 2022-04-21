<template>
  <main>
    <NavBar />

    <div class="card-width container">
      <div class="px-4 mt-5">
        <!-- Account details card-->
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
                <!-- publication-->
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
                    <!-- Save changes button-->
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
                <!-- IMAGE USER -->
                <img
                  class="img-circle"
                  :src="post.User.image"
                  alt="User Image"
                />
                <!-- info user  -->
                <span class="username">{{post.User.firstname}} {{post.User.lastname}}</span>
                <span class="description">Shared publicly - 7:30 PM Today</span>
              </div>
              <div class="box-tools">
                <!-- bouton suppression post -->
                <button
                  type="button"
                  class="btn btn-box-tool"
                  data-widget="remove"
                >
                  <i class="fa fa-times"></i>
                </button>
              </div>
            </div>
            <!-- content -->
            <p class="content">
             {{post.content}}
            </p>
            <div class="box-body text-center" style="display: block">
              <!-- imagepost -->
              <img
                class="img-responsive img-post pad"
                :src="post.imageUrl"
               
              />

              <hr />
            </div>
            <div class="box-footer box-comments" style="display: block">
              <div class="box-comment">
                <img
                  class="img-circle img-sm"
                  src="https://bootdey.com/img/Content/avatar/avatar2.png"
                  alt="User Image"
                />
                <div class="comment-text">
                  <span class="username">
                    Maria Gonzales
                    <span class="text-muted pull-right">8:03 PM Today</span>
                  </span>
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                </div>
              </div>

              <div class="box-comment">
                <img
                  class="img-circle img-sm"
                  src="https://bootdey.com/img/Content/avatar/avatar3.png"
                  alt="User Image"
                />
                <div class="comment-text">
                  <span class="username">
                    Luna Stark
                    <span class="text-muted pull-right">8:03 PM Today</span>
                  </span>
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                </div>
              </div>
            </div>
            <div class="box-footer" style="display: block">
              <form action="#" method="post">
                <img
                  class="img-responsive img-circle img-sm"
                  src="https://bootdey.com/img/Content/avatar/avatar1.png"
                  alt="Alt Text"
                />
                <div class="img-push">
                  <input
                    type="text"
                    class="form-control input-sm"
                    placeholder="Press enter to post comment"
                  />
                </div>
              </form>
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
      imageUrl:"",
      file:"",
      content: "",
      user: {},
      userId: localStorage.getItem("userId"),
      post: {},
      posts: [],
    };
  },

  mounted() {
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
        console.log(response)
        this.posts = response.data.post;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    uploadFile(event) {
      
      this.file = event.target.files[0];
    },
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
  background: #f7f7f7 !important;
}
.box-footer {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
  border-top: 1px solid #f4f4f4;
  padding: 10px;
  background-color: #fff;
}
.box-comments .box-comment:first-of-type {
  padding-top: 0;
}
.box-comments .box-comment {
  padding: 8px 0;
  border-bottom: 1px solid #eee;
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


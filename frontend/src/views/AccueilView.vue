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
              <!-- TODO image à enlevé-->
              <div><img 
                class="img-account-profile mb-2"
                :src="image"
                alt="Photo de profil"
              />

              
                <!-- Form publication-->
                <textarea
                  class="form-control"
                  placeholder="Quoi de neuf ?"
                  v-model="content"
                ></textarea>
               
                <!-- Upload image-->
                <div class="d-flex">
                  <div class="formFile">
                    <input id="formFile" accept="image/*" type="file" @change="uploadFile" />
                    <label class="label-post" for="formFile"
                      ><i class="fas fa-camera"> Image</i></label
                    >
                  </div>

                  <div class="col-xl-4">
                    <!-- Save changes button-->
                    <button class="btn btn-post btn-primary m-2" @click="createPost">Publier</button>
                  </div>
                </div>
              </div>
            </form>
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
     firstname:"",
     lastname:"",
     image:"",
     content:"",
     user:{},
     userId: localStorage.getItem("userId"),
     post:{},
     posts:[],
    };
  },

 mounted () {
     const id = localStorage.getItem('userId')
     axios.get(`http://localhost:3000/api/user/${id}`)
     .then((response) => {
       this.firstname = response.data.firstname
       this.lastname = response.data.lastname
       this.image = response.data.image    
  })
      .catch((error ) => {
        console.log(error);
     })
     axios
      .get('http://localhost:3000/api/post/',{
          headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then((response) => {
       this.posts = response.data.post;
    })
      .catch((error) => {
      console.log(error)
    });
 }, 
  methods: {
   aploadFile(event){
     console.log(event)
     this.image = event.target.files[0];
   },
    createPost () {
        const fd = new FormData();
        fd.append('userId', this.userId);
        fd.append('content', this.content);
        fd.append('image', this.image);
        axios.post('http://localhost:3000/api/post', fd, {
          headers: {
           Authorization: 'Bearer ' + localStorage.getItem('token')
         }
        })
      .then(() => {
          window.location.reload();
      })
      .catch((error) => {
          console.log(error)
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
   @media screen and ( min-width: 770px ) {
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
.btn-post{
  margin: 10px !important;
 
}

</style>


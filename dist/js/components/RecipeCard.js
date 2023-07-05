app.component("recipe-card", {
    props: {
        cardType: {
            type: String,
            default: "standard card"
        },
        id: {
            type: Number,
            default: 0
        },
        name:{
            type: String,
            default: ""
        },
        image:{
            type: String,
            default: ""
        },
        description:{
            type: String,
            default: "Esta descripción es muy larga para hacer la prueba"
        },
        category:{
            type: String,
            default: ""
        },
        likes: {
            type:Number,
            default: 0
        },
        liked: {
            type: Boolean,
            default: false
        },
        saved: {
            type: Boolean,
            default: false
        }
        //level
        //occasion
    },
    data() {
        return {
            isLiked: this.liked,
            isSaved: this.saved,
            likes_number: this.likes,
        }
    },
    methods: {
        onClickLike() {
            if (this.isLiked) {
                this.likes_number--;
                this.isLiked = false;
            } else {
                this.likes_number++;
                this.isLiked = true;
            }
        },
        onClickSave() {
            if (this.isSaved) {
                this.isSaved = false;
            } else {
                this.isSaved = true;
            }
        }
    },
    template:
        /*html*/
        `<div v-if="cardType == 'standard card'" class="card rounded-5 shadow-lg">
            <div class="card-img-container">
              <a :href="'receta.html?id=' + id">
                <img v-bind:src="image" class="rounded-top-5" alt="Imagen de la receta">
              </a>
            </div>
            <div class="card-body">
              <h4 class="card-subtitle mb-2 text-muted">{{category}}</h4>
              <div class="card-header bg-white">
                <h3 class="card-title">{{name}}</h3>
                <p class="card-text">{{description}}</p>
              </div>
              <div>
                <div class="likes-number">
                  <p>{{likes_number}}</p>
                </div>
                <div class="card-footer d-flex justify-content-between p-4 pt-3 pb-2 bg-white">
                  <button type="button" class="card-btn-green" v-bind:class="{ 'active': isLiked }" title="Like" v-on:click="onClickLike()">
                    <i class="fas fa-heart"></i>
                  </button>
                  <button type="button" class="card-btn-green justify-content-center" v-bind:class="{ 'active': isSaved }" title="Save" v-on:click="onClickSave()">
                    <i class="fas fa-bookmark"></i>
                  </button>
                </div>
              </div>
            </div>
        </div>
        
        <div v-else-if="cardType === 'slider card'" class="swiper-slide tranding-slide">
            <div class="tranding-slide-content">
                <a :href="'receta.html?id=' + id" class="text-white">
                    <div class="tranding-slide-img">
                        <img v-bind:src="image" alt="Imagen de la receta">
                        <div class="gradient"></div>
                    </div>
                    <div class="tranding-slide-content-bottom">
                        <h2 class="food-name">
                            {{name}}
                        </h2>
                        <h3 class="food-rating">
                            {{category}}
                        </h3>
                    </div>
                </a>
                <div class="slider-buttons">
                    <div class="d-grid">
                        <button type="button" class="card-btn-green mb-4" v-bind:class="{ 'active': isSaved }" v-on:click="onClickSave()" title="Guardar receta">
                            <i class="fas fa-bookmark"></i>
                        </button>
                        <button type="button" class="card-btn-green mb-2" v-bind:class="{ 'active': isLiked }" v-on:click="onClickLike()" title="Like">
                            <i class="fas fa-heart"></i>
                        </button>
                        <p class="text-center text-light">{{likes_number}}</p>
                    </div>
                </div>
            </div>
        </div>`
    ,
});
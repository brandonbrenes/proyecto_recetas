app.component('swiper-slider', {data() {
        return {
            top10:[1,2,3,4,5,6,7,8,9,10]
        }
    },
    beforeMount() {
        top10=[],
        axios({
            method: 'get',
            url: "http://primer-proyecto.test/api/recipes/top10"
        })
        .then(
            (response) => {
                for (let numero = 0; numero < 10; numero++) {
                    let recipe = response.data[numero];
                    this.top10[numero]={
                        id: recipe.id,
                        name: recipe.name,
                        image: "http://localhost/primer-proyecto/public/storage/imgs/" + recipe.image,
                        description: recipe.description,
                        category: recipe.category,
                        likes: recipe.likes
                    };
                }
            }
        )
        .catch(
            error => console.log(error)
        )
    }
    ,
    mounted: function () {
        new Swiper('.tranding-slider', {
            loop: true,
            speed: 1700,
            autoplay: {
                delay: 3500,
                disableOnInteraction:false
            },
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            loop: true,
            slidesPerView: 'auto',
            coverflowEffect: {
                rotate: 0,
                stretch: 0,
                depth: 90,
                modifier: 2.5
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            init: true
            // ,
            // on: {
            //   slideChange: (swiper) => {
            //     console.log(swiper);
            //   }
            // }
        });
    },
    template:
        /*html */
        `<section id="tranding">
            <h2 class="text-center text-light">Recetas más votadas</h2>
            <div class="mt-lg-5 container-fluid bg-wine pb-4">
                <div class="swiper tranding-slider">
                    <div class="swiper-wrapper">
                    
                    <recipe-card v-for="recipe in top10" :id="recipe.id" :name="recipe.name" :image="recipe.image" :category="recipe.category" :likes="recipe.likes" cardType="slider card"></recipe-card>

                        <!-- Fin tarjeta slider--> 
                    </div>
                    <div class="tranding-slider-control">
                        <div class="swiper-button-prev slider-arrow">
                           <!-- <ion-icon name="arrow-back-outline"></ion-icon> -->
                            <i class="text-black fa-solid fa-arrow-left"></i>
                        </div>
                        <div class="swiper-button-next slider-arrow">
                        <i class="text-black fa-solid fa-arrow-right"></i>
                            <!-- <ion-icon name="arrow-forward-outline"></ion-icon> -->
                        </div>
                        <div class="swiper-pagination"></div>

                    </div>
                </div>
            </div>
        </section>
    `,
});
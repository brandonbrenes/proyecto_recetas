app.component('swiper-slider', {

    data() {
        return {
            recetasMasVotadas: ["52851", "53011", "52955", "52948", "52952", "52981", "52924", "52804", "53019", "52939"]
        }
    },
    mounted: function () {
        console.log(this.recetasMasVotadas);
        new Swiper('.tranding-slider', {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            loop: true,
            slidesPerView: 'auto',
            coverflowEffect: {
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 2.5,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }
        });
    },
    template:
        /*html*/
        `<section id="tranding">
            <h2 class="text-center text-light">Recetas más votadas</h2>
            <div class="mt-lg-5 container-fluid bg-wine pb-4">
                <div class="swiper tranding-slider">
                    <div class="swiper-wrapper">
                    
                    <recipe-card v-for="recipeId in recetasMasVotadas" class="swiper-slide tranding-slide" v-bind:id="recipeId"></recipe-card>
                    <!--  <div v-for="recipeId in recetasMasVotadas" :key="recipeId">
                        
                    </div>
                        <recipe-card v-for="num in 10" class="swiper-slide tranding-slide"></recipe-card>
                        
                        <div v-for="num in 10" class="swiper-slide tranding-slide">
                            <div class="tranding-slide-img">
                                <img src="images/tranding-food-1.png" alt="Tranding">
                            </div>
                            <div class="tranding-slide-content">
                                <div class="tranding-slide-content-bottom">
                                    <h2 class="food-name">
                                        Special Pizza
                                    </h2>
                                    <h3 class="food-rating">
                                        <span>Comida rápida</span>
                                    </h3>
                                </div>
                            </div>
                        </div>
                        -->
                    </div>
                    <div class="tranding-slider-control">
                        <div class="swiper-button-prev slider-arrow">
                            <ion-icon name="arrow-back-outline"></ion-icon>
                        </div>
                        <div class="swiper-button-next slider-arrow">
                            <ion-icon name="arrow-forward-outline"></ion-icon>
                        </div>
                        <div class="swiper-pagination"></div>
                    </div>
                </div>
            </div>
        </section>
    `,
});
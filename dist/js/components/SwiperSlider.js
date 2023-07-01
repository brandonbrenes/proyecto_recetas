app.component('swiper-slider', {
    data() {
        return {
            idRecetasMasVotadas: ["52851", "53011", "52955", "52948", "52952", "52981", "52924", "52804", "53019", "52939"]
        }
    },
    mounted: function () {
        new Swiper('.tranding-slider', {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            loop: true,
            slidesPerView: 'auto',
            coverflowEffect: {
                rotate: 0,
                stretch: 0,
                depth: 90,
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
    }
    ,
    template:
        /*html */
        `<section id="tranding">
            <h2 class="text-center text-light">Recetas más votadas</h2>
            <div class="mt-lg-5 container-fluid bg-wine pb-4">
                <div class="swiper tranding-slider">
                    <div class="swiper-wrapper">
                    
                        <recipe-card v-for="recipeId in idRecetasMasVotadas" :key="recipeId" v-bind:id="recipeId" cardType="slider card"></recipe-card>
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
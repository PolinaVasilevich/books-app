<template>
  <div>
    <div
      :style="{
        backgroundImage: `url(http://subsolardesigns.com/leona/wp-content/uploads/2019/04/hero_image2_clear.jpg)`,
        width: '100%',
        height: '600px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }"
    ></div>
    <!-- <div class="card">
      <Carousel
        :value="books"
        :numVisible="3"
        :numScroll="1"
        :responsiveOptions="responsiveOptions"
        class="custom-carousel"
        :circular="true"
        :autoplayInterval="3000"
      >
        <template #item="slotProps">
          <div class="product-item">
            <div class="product-item-content">
              <div class="p-mb-3">
                <img
                  :src="slotProps.data.img"
                  :alt="slotProps.data.name"
                  class="product-image"
                  style="
                    width: 100%;
                    height: 250px;
                    object-fit: cover;
                    object-position: center;
                  "
                />
              </div>
              <div>
                <h4 class="p-mb-1">{{ slotProps.data.name }}</h4>
              </div>
            </div>
          </div>
        </template>
      </Carousel>
    </div> -->
    <all-books-page />
  </div>
</template>

<script>
import AllBooksPage from "./AllBooksPage.vue";
import dataStore from "@/mixins/dataStore.js";
export default {
  mixins: [dataStore],
  components: { AllBooksPage },

  created() {
    this.getBooks();
    this.getUsers();
    this.getAuthors();
  },
};
</script>

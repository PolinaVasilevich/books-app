<template>
  <div class="book-page">
    <Toast />

    <div v-if="!user.isAdmin" class="mkdf-has-bg-image" data-height="300">
      <div class="mkdf-title-wrapper" style="height: 300px">
        <div class="mkdf-title-inner" style="height: inherit">
          <div class="mkdf-grid"></div>
        </div>
      </div>
    </div>
    <div>
      <div class="book-page__content">
        <div class="book-page__content__img-container">
          <img
            :src="currentBook.img"
            :alt="currentBook.title"
            class="book-page__content__img"
          />
        </div>
        <div class="book-page__content__info">
          <p class="book-page__content__info__author">
            BY
            {{
              currentBook.author?.first_name +
              " " +
              currentBook.author?.last_name
            }}
          </p>
          <h2 class="book-page__content__info__title">
            {{ currentBook.title }}
          </h2>
          <div style="display: flex">
            <Rating
              :modelValue="currentBook.rating"
              :cancel="false"
              :readonly="true"
              v-if="currentBook.rating"
              class="book-page__content__info__text"
              style="margin-top: 10px"
            />
          </div>

          <div class="woocommerce-product-details__short-description">
            <p>
              {{ currentBook.description }}
            </p>
          </div>

          <!-- <div v-if="!currentBook.count">
            <p
              style="
                color: #000;
                font-family: 'Josefin Sans', sans-serif;
                font-size: 12px;
                text-transform: uppercase;
                font-weight: 400;
                margin: 41px 0 0 0;
                display: inline-block;
                background-color: transparent;
                border: 2px solid #efe6d5;
                text-align: center;
                line-height: 2.857em;
                letter-spacing: 0.35em;
                padding: 9px 27px 5px 32px;
              "
            >
              {{ currentBook?.count }} IN STOCK
            </p>
          </div> -->
          <!-- <div v-if="libraries.length && !isReserved">
            <Dropdown
              v-model="selectedLibrary"
              :options="libraries"
              optionLabel="name"
              placeholder="Select a library"
              style="width: 70%"
              :disabled="isDisabled"
            />
          </div>

          <Button
            v-if="!libraries.length && !isReserved"
            :label="'out of stock'.toUpperCase()"
            class="p-button-warning"
            @click="onReserveBook(currentBook, user)"
            :disabled="!libraries.length || isReserved"
            icon="pi pi-book"
            style="margin: 50px 0"
          />

          <Button
            v-if="
              isLoggedIn && !user.isAdmin && libraries.length && !isReserved
            "
            :label="'Reserve book'.toUpperCase()"
            class="p-button-warning"
            @click="onReserveBook(currentBook, user)"
            :disabled="
              !libraries.length || isReserved || isDisabled || !selectedLibrary
            "
            icon="pi pi-book"
            style="margin: 30px 0"
          />

          <Button
            v-if="isLoggedIn && !user.isAdmin && isReserved"
            :label="'You reserved this book'.toUpperCase()"
            class="p-button-warning"
            :disabled="!libraries.length || isReserved"
            icon="pi pi-book"
            style="margin: 50px 0"
          /> -->

          <div>
            <p class="book-page__content__info__text" style="font-size: 1.2rem">
              Genre:
              <router-link
                style="text-decoration: none"
                :to="{
                  name: 'books',
                  params: { bookGenre: currentBook.genre?.name },
                }"
                >{{ currentBook.genre?.name }}</router-link
              >
            </p>

            <!-- <p class="book-page__content__info__text" v-if="selectedLibrary">
              Count:
              {{ selectedLibrary?.book_count }}
            </p> -->
          </div>

          <Button
            v-if="!libraries.length && !isReserved"
            :label="'out of stock'.toUpperCase()"
            class="p-button-warning"
            :disabled="!libraries.length || isReserved"
            icon="pi pi-book"
            style="margin: 20px 0"
          />

          <!-- <Button
            v-if="
              isLoggedIn && !user.isAdmin && libraries.length && !isReserved
            "
            :label="'Reserve book'.toUpperCase()"
            class="p-button-warning"
            @click="onReserveBook(currentBook, user)"
            :disabled="
              !libraries.length || isReserved || isDisabled || !selectedLibrary
            "
            icon="pi pi-book"
            style="margin: 20px 0"
          /> -->

          <div
            v-if="libraries.length && !isReserved"
            style="margin-top: 10px"
            class="select-library"
          >
            <Dropdown
              v-model="selectedLibrary"
              :options="libraries"
              optionLabel="name"
              placeholder="Select a library"
              style="width: 70%"
              :disabled="isDisabled"
            />
          </div>

          <Button
            v-if="
              isLoggedIn && !user.isAdmin && libraries.length && !isReserved
            "
            :label="'Reserve book'.toUpperCase()"
            class="p-button-warning select-library-button"
            :disabled="!libraries.length || isReserved || isDisabled"
            style="margin: 20px 0"
            ref="scrollToMapButton"
            icon="pi pi-book"
            @click="scrollToMap"
          />

          <Button
            v-if="
              isLoggedIn && !user.isAdmin && libraries.length && !isReserved
            "
            :label="'Reserve book'.toUpperCase()"
            class="p-button-warning select-library"
            :disabled="!libraries.length || isReserved || isDisabled"
            style="margin: 20px 0"
            icon="pi pi-book"
            @click="confirmReserveBook(library)"
          />

          <Button
            v-if="isLoggedIn && !user.isAdmin && isReserved"
            :label="'You reserved this book'.toUpperCase()"
            class="p-button-warning"
            :disabled="!libraries.length || isReserved"
            icon="pi pi-book"
            style="margin: 20px 0"
          />

          <map-loader
            style="margin-left: -12.5%"
            class="select-library"
            :mapOptions="searchedLibraries"
            :currentPoint="currentPoint"
            @changeCurrentPoint="setSelectedLibrary"
            :currentLibraryID="selectedLibrary?._id"
          />

          <div class="reviews">
            <Button
              :label="
                !isUserReview
                  ? 'ADD REVIEW'
                  : 'You have already left a review'.toUpperCase()
              "
              :icon="!isUserReview ? 'pi pi-user-edit' : ''"
              class="p-button-raised p-button-secondary p-button-text"
              @click="openModal"
              v-if="isLoggedIn && user.username !== 'admin'"
              style="margin-bottom: 37px"
              :disabled="isUserReview"
            />
            <review-list
              :items="reviewsBook"
              :currentUser="user"
              typeForm="update"
              :bookTitle="currentBook?.title"
              @deleteReview="confirmDelete($event)"
            />
            <confirm-dialog
              text="delete this review"
              :displayConfirmDialog="displayConfirmDialog"
              @hideConfirmDialog="displayConfirmDialog = false"
              @action="onDeleteReview"
            />

            <confirm-dialog
              text="reserve this book"
              :displayConfirmDialog="displayConfirmReserveDialog"
              @hideConfirmDialog="displayConfirmReserveDialog = false"
              @action="onReserveBook"
            />

            <Dialog
              v-model:visible="displayModal"
              :style="{ width: '450px' }"
              header="Add review"
              :modal="true"
              class="p-fluid"
            >
              <div class="p-field">
                <label for="name">Text</label>
                <Textarea
                  v-model="data.text"
                  :autoResize="true"
                  rows="5"
                  required
                />
                <div>
                  <span>Your rating: </span
                  ><Rating v-model="data.rating" :readonly="false" />
                </div>
              </div>

              <template #footer>
                <Button
                  label="Save"
                  icon="pi pi-check"
                  class="p-button-text"
                  @click.prevent="onSave"
                />
              </template>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
    <h2
      class="select-library-title"
      ref="map"
      style="
        margin: 30px 0 30px;
        padding-left: 10%;
        font-size: 2rem;
        font-weight: bold;
      "
    >
      Select a library
    </h2>
    <div class="book__map-wrapper">
      <map-loader
        :mapOptions="searchedLibraries"
        :currentPoint="currentPoint"
        @changeCurrentPoint="setSelectedLibrary"
        :currentLibraryID="selectedLibrary?._id"
      />

      <div class="book__libraries-block libraries-block">
        <div class="libraries-block__libraries">
          <div class="libraries-block__header">
            <div class="libraries-block__search-input">
              <span
                class="p-input-icon-left"
                style="display: inline-block; width: 100%"
              >
                <i class="pi pi-search" />
                <InputText
                  placeholder="Search..."
                  v-model="searchQuery"
                  style="width: 100%"
                  class="app-text"
                />
              </span>
            </div>
          </div>

          <div class="libraries-block__libraries-list libraries-list">
            <div class="libraries-list__content custom-scroll">
              <div class="libraries-list__items">
                <div
                  class="libraries-list__item libraries-item"
                  :class="{
                    'libraries-item--selected':
                      library._id === selectedLibrary?._id,
                  }"
                  v-for="(library, i) in searchedLibraries"
                  :key="library.name"
                  :id="library._id"
                  :ref="
                    (el) => {
                      if (el) listRefs[i] = el;
                    }
                  "
                >
                  <Button
                    class="
                      p-button-text
                      libraries-item__button
                      item-button__title
                    "
                    :label="library.name"
                    @click="setSelectedLibrary(library)"
                  />
                  <div class="libraries-item__content">
                    <div class="libraries-item__text item-text">
                      <i class="pi pi-book item-text__icon"> </i>
                      <span>Count: {{ library.book_count }}</span>
                    </div>

                    <Button
                      class="
                        p-button-text
                        libraries-item__button
                        item-button__address
                      "
                      :label="library.address"
                      icon="pi pi-map-marker"
                      @click="setSelectedLibrary(library)"
                    />

                    <Button
                      v-if="
                        isLoggedIn &&
                        !user.isAdmin &&
                        libraries.length &&
                        !isReserved
                      "
                      :label="'Reserve book'.toUpperCase()"
                      class="p-button-warning"
                      @click="confirmReserveBook(library)"
                      :disabled="!libraries.length || isReserved || isDisabled"
                      style="margin: 10px"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed, watchEffect } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import useLibraries from "@/hooks/Libraries/useLibraries";
import useSearchedLibraries from "@/hooks/Libraries/useSearchedLibraries";
import useReservedBooks from "@/hooks/ReservedBooks/useReservedBooks";
import useGeolocation from "@/hooks/useGeolocation";
import useMessage from "@/hooks/useMessage";
import useDialog from "@/hooks/useDialog";

import API from "../utils/api";
import MapLoader from "@/components/MapLoader";
import adminFormMixin from "@/mixins/adminFormMixin.js";
import toggle from "@/mixins/toggle.js";

import ReviewList from "@/components/Reviews/ReviewList";
import ConfirmDialog from "@/components/UI/ConfirmDialog";

export default {
  components: { ReviewList, ConfirmDialog, MapLoader },
  mixins: [toggle, adminFormMixin],

  setup() {
    const map = ref(null);

    const store = useStore();
    const route = useRoute();

    const reviewsBook = ref([]);
    const selectedLibrary = ref(null);
    const activePointMap = ref(null);
    const review = ref(null);
    const currentBook = ref({});
    const editDataFormID = ref(null);
    const isReserved = ref(false);
    const isDisabled = ref(false);
    const isUserReview = ref(false);
    const displayConfirmDialog = ref(false);
    const displayConfirmReserveDialog = ref(false);
    const displayModal = ref(false);

    const listRefs = ref([]);
    const selectedElem = ref(null);
    const data = ref({
      text: "",
      rating: 0,
    });

    const {
      response: libraries,
      loading,
      errorMessage,
      responseMessage,
      getLibrariesByBook,
    } = useLibraries();

    const { searchQuery, searchedLibraries } = useSearchedLibraries(libraries);

    const {
      error: errorMessageReserveBook,
      responseMessage: responseMessageReserveBook,
      reserveBook,
    } = useReservedBooks();

    const { submitted, displayDialog, hideDialog, showDialog } = useDialog();
    const { showErrorMessage, showSuccessfulMessage } = useMessage();

    const { currentPoint, setCurrentPoint } = useGeolocation();

    const user = computed(() => store.getters["login/user"]);
    const isLoggedIn = computed(() => store.getters["login/isLoggedIn"]);

    const books = computed(() => store.getters["books/books"]);
    const reviews = computed(() => store.getters["books/reviews"]);
    const userReservedBooks = computed(
      () => store.getters["books/userReservedBooks"]
    );

    const getBooks = async () => await store.dispatch("books/getBooks");
    const getReviews = async () => await store.dispatch("books/getReviews");
    const getUserReservedBooks = async () =>
      await store.dispatch("books/getUserReservedBooks", user.value._id);

    const getCurrentBook = () => {
      const book = books.value.find((book) => book._id === route.params.id);

      if (book) {
        currentBook.value = book;
      }
    };

    const getReviewsBook = async () => {
      try {
        const response = await API.get(`books/reviewsBook/${route.params.id}`);
        reviewsBook.value = response.data;
      } catch (error) {
        console.log(error);
      }
    };

    const checkReserveBook = (bookID, userID) => {
      try {
        const books = userReservedBooks.value.filter((item) => {
          return (
            item.book._id === bookID &&
            item.user._id === userID &&
            item.details.filter(
              (detail) => detail.isActual && detail.status === "Reserved"
            )
          );
        });

        isReserved.value = !!books.length;
      } catch (error) {
        console.log(error);
      }
    };

    const getUserReviewBook = async () => {
      try {
        if (user.value._id) {
          const userReviews = await API.get(
            `books/userreviewsbook/${route.params.id}&${user.value._id}`
          );
          isUserReview.value = !!userReviews.data.length;
        }
      } catch (error) {
        console.log(error);
      }
    };

    const onReserveBook = async () => {
      if (currentBook.value.count) {
        await reserveBook({
          book: currentBook.value,
          user: user.value,
          libraryID: selectedLibrary.value._id,
        });

        isDisabled.value = true;
        displayConfirmReserveDialog.value = false;

        getBooks();
        getUserReservedBooks();
        getLibrariesByBook(route.params.id);

        if (errorMessageReserveBook.value) {
          showErrorMessage(errorMessageReserveBook.value);
        } else {
          showSuccessfulMessage(responseMessageReserveBook);
        }
      }
    };

    const confirmReserveBook = (library) => {
      displayConfirmReserveDialog.value = true;
      selectedLibrary.value = { ...library };
    };

    const saveReview = async () => {
      try {
        await API.post("books/review", {
          ...data.value,
          book: currentBook.value,
          user: user.value,
        });
        getBooks();
        getReviewsBook();
        isUserReview.value = true;

        showSuccessfulMessage("Your review added");
      } catch (error) {
        console.log(error);
        showErrorMessage(error.response.data.message);
        getBooks();
        getReviewsBook();
      }
    };

    const onSave = () => {
      saveReview();
      resetForm();
      displayModal.value = false;
    };

    const resetForm = () => {
      data.value.text = "";
      data.value.rating = 0;
    };

    const confirmDelete = (reviewID) => {
      displayConfirmDialog.value = true;
      review.value = reviewID;
    };

    const onDeleteReview = async () => {
      displayConfirmDialog.value = false;

      try {
        await API.delete(`/books/deletereview/${review.value}`);
        getReviewsBook();
        showSuccessfulMessage(`Review with id ${review.value} deleted`);
      } catch (error) {
        console.log(error);
        showErrorMessage(error.response.data.message);
        getReviewsBook();
      }
    };

    const setSelectedLibrary = (library) => {
      setCurrentPoint(library.options.position);
      selectedLibrary.value = { ...library };

      /////
      // listRefs.value.forEach((item) => {
      //   if (item.id === library._id) {
      //     selectedElem.value = item;
      //   }
      // });

      // if (selectedElem.value) {
      //   selectedElem.value.scrollIntoView({
      //     block: "start",
      //     behavior: "smooth",
      //   });
      // }

      ////
    };

    const scrollToMap = () => {
      map.value.scrollIntoView();
    };

    watchEffect(() => {
      setCurrentPoint(selectedLibrary.value?.options.position);
    });

    onMounted(async () => {
      getBooks();
      getReviews();
      getUserReservedBooks();

      getLibrariesByBook(route.params.id);
      getCurrentBook();
      checkReserveBook(currentBook.value._id, user.value?._id);
      getUserReviewBook();
      getReviewsBook();
    });

    return {
      books,
      reviews,
      userReservedBooks,
      libraries,
      isLoggedIn,
      user,
      selectedLibrary,
      activePointMap,
      isReserved,
      isDisabled,
      isUserReview,
      editDataFormID,
      displayConfirmDialog,
      review,
      reviewsBook,
      currentBook,
      data,
      onReserveBook,
      confirmDelete,
      onDeleteReview,
      saveReview,
      onSave,
      displayModal,
      currentPoint,
      setSelectedLibrary,
      listRefs,
      map,
      scrollToMap,
      displayConfirmReserveDialog,
      confirmReserveBook,
      searchQuery,
      searchedLibraries,
    };
  },
};
</script>

<style lang="scss">
.custom-scroll::-webkit-scrollbar {
  width: 12px;
}

.custom-scroll::-webkit-scrollbar-thumb {
  background: #919191;
  border: 2px solid #fff;
  border-radius: 6px;
  min-height: 30px;
}

.custom-scroll::-webkit-scrollbar-track {
  background: #fff;
}

.select-library {
  display: none !important;
}

.book__map-wrapper {
  margin-top: 30px;
  // height: 700px;
  position: relative;

  .book__libraries-block {
    left: 8px;
    position: absolute;
    top: 8px;

    .libraries-block__search-input {
      padding: 10px;
    }

    .libraries-block__libraries {
      background-color: #fff;
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      height: 660px;
      margin-right: 8px;
      width: 360px;

      .libraries-list {
        display: flex;
        overflow: hidden;

        .libraries-item {
          margin: 10px;
          align-items: flex-start;
          border-radius: 4px;
          // padding: 5px;
          transition: 0.2s ease;
        }

        .libraries-item--selected {
          background-color: #dde7ff;
        }

        .libraries-list__content {
          width: 100%;
          overflow-y: auto;

          .libraries-item__button {
            border: none !important;
            outline: none !important;
            box-shadow: none !important;
          }

          .item-button__title {
            .p-button-label {
              font-size: 1.2rem;
              font-weight: bold;
            }
          }

          .item-button__address:hover {
            .p-button-label,
            .p-button-icon {
              color: #d32f2f;
            }
          }

          .libraries-item__button:hover {
            background: none;
          }

          .libraries-item__content {
            margin-bottom: 14px;
            width: 100%;

            .libraries-item__text {
              display: flex;
              justify-content: flex-start;
              // align-items: center;
              overflow: hidden;
              padding-left: 16px;
              position: relative;
              text-align: left;

              .item-text__icon {
                margin-right: 0.5rem;
              }
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 756px) {
  .select-library {
    display: block !important;
  }

  .book__map-wrapper,
  .select-library-title,
  .select-library-button {
    display: none !important;
  }
}
</style>

<template>
  <div class="books-page">
    <Toast />
    <div class="books-page__admin-button-container">
      <Button
        v-if="user.isAdmin"
        label="New book"
        icon="pi pi-plus"
        class="books-page__admin-button p-button-success p-mr-2"
        @click="openModal"
      />
    </div>

    <modal-form
      modal-title="Create new record"
      :displayModal="displayModal"
      @close="closeModal"
    >
      <template v-slot:modal-content>
        <admin-books-form
          typeForm="create"
          v-model:title="data.title"
          v-model:author="data.author"
          v-model:genre="data.genre"
          v-model:img="data.img"
          v-model:count="data.count"
          v-model:authors="authors"
          v-model:genres="genres"
          :dataForm="data"
          path="books/book"
          :callback="this.getBooks"
          @resetForm="resetForm"
          @closeModal="closeModal"
          @showMessage="showMessage"
          @showErrorMessage="showErrorMessage"
        />
      </template>
    </modal-form>
    <DataView
      :value="searchedBooks"
      :layout="layout"
      :paginator="true"
      :rows="rows"
    >
      <template #header>
        <div class="p-grid p-nogutter">
          <div class="books-page__buttons-container">
            <Button
              label="All"
              class="p-button p-button-text search-button button-genre"
              @click="searchGenreQuery = 'all'"
              :class="{ 'active-search-button': searchGenreQuery === 'all' }"
            />

            <Button
              label="Most popular"
              class="p-button p-button-text search-button button-genre"
              @click="searchGenreQuery = 'popular'"
              :class="{
                'active-search-button': searchGenreQuery === 'popular',
              }"
            />

            <Button
              v-for="genre in genres"
              :key="genre.name"
              :label="genre.name"
              class="p-button p-button-text search-button button-genre"
              @click="searchGenreQuery = genre.name"
              :class="{
                'active-search-button': searchGenreQuery === genre.name,
              }"
            />
          </div>

          <div style="width: 100%; margin-right: 0.5rem; margin-top: 1rem">
            <span class="p-input-icon-left" style="width: 100%">
              <i class="pi pi-search" />
              <InputText
                placeholder="Search..."
                v-model="searchQuery"
                style="
                  width: 100%;
                  font-family: 'Cormorant Garamond', sans-serif;
                "
              />
            </span>
          </div>

          <div class="books-page__buttons-sort-container">
            <!-- <Dropdown
              v-model="selectedSort"
              :options="sortOptions"
              optionLabel="label"
              optionValue="value"
              placeholder="Sort By..."
              style="text-align: left"
            /> -->

            <DataViewLayoutOptions v-model="layout" />
          </div>
        </div>
      </template>

      <template #list="slotProps">
        <div class="p-col-12">
          <div class="product-list-item">
            <router-link
              :to="
                !this.user.isAdmin
                  ? { name: 'book', params: { id: slotProps.data._id } }
                  : {
                      name: 'adminBookPage',
                      params: { id: slotProps.data._id },
                    }
              "
              ><img
                :src="slotProps.data.img"
                :alt="slotProps.data.title"
                width="800"
                height="1104"
                class="
                  attachment-woocommerce_single
                  size-woocommerce_single
                  wp-post-image
                "
                loading="lazy"
                sizes="(max-width: 800px) 100vw, 800px"
              />
            </router-link>

            <div class="product-list-detail">
              <div class="product-description books-page__description-author">
                {{
                  slotProps.data.author.first_name +
                  " " +
                  slotProps.data.author.last_name
                }}
              </div>
              <div class="books-page__description-title">
                {{ slotProps.data.title }}
              </div>

              <Rating
                :modelValue="slotProps.data.rating"
                :readonly="true"
                :cancel="false"
                v-if="slotProps.data.rating"
              ></Rating>
            </div>
            <div class="product-list-action">
              <div>
                <Button
                  v-if="user.isAdmin"
                  icon="pi pi-times"
                  class="p-button-rounded p-button-danger p-button-text"
                  @click="confirmDelete(slotProps.data)"
                />
              </div>
              <span
                class="product-badge"
                :class="[
                  `status-${getCountStatus(
                    slotProps.data.count
                  ).toLowerCase()}`,
                ]"
                >{{ getCountStatus(slotProps.data.count) }}</span
              >
            </div>
          </div>
        </div>
      </template>

      <template #grid="slotProps">
        <div
          class="p-col-12 p-md-4"
          style="display: flex; padding: 0 !important"
        >
          <div class="product-grid-item card">
            <div class="product-grid-item-top">
              <div>
                <Button
                  v-if="user.isAdmin"
                  icon="pi pi-times"
                  class="p-button-rounded p-button-danger p-button-text"
                  @click="confirmDelete(slotProps.data)"
                />
              </div>
              <span
                class="product-badge"
                :class="[
                  `status-${getCountStatus(
                    slotProps.data.count
                  ).toLowerCase()}`,
                ]"
                >{{ getCountStatus(slotProps.data.count) }}</span
              >
            </div>
            <div class="product-grid-item-content">
              <router-link
                :to="
                  !this.user.isAdmin
                    ? { name: 'book', params: { id: slotProps.data._id } }
                    : {
                        name: 'adminBookPage',
                        params: { id: slotProps.data._id },
                      }
                "
                ><img :src="slotProps.data.img" :alt="slotProps.data.title" />
              </router-link>
              <div class="product-description books-page__description-author">
                {{
                  slotProps.data.author.first_name +
                  " " +
                  slotProps.data.author.last_name
                }}
              </div>
              <div class="product-description books-page__description-title">
                {{ slotProps.data.title }}
              </div>
              <Rating
                :modelValue="slotProps.data.rating"
                :readonly="true"
                :cancel="false"
                v-if="slotProps.data.rating"
              ></Rating>
            </div>
          </div>
        </div>
      </template>
    </DataView>

    <confirm-dialog
      text="delete this book"
      :displayConfirmDialog="displayConfirmDialog"
      @hideConfirmDialog="displayConfirmDialog = false"
      @action="onDeleteBook"
    />
  </div>
</template>

<script>
import API from "@/utils/api";

import adminFormMixin from "@/mixins/adminFormMixin";
import dataStore from "@/mixins/dataStore.js";
import toggle from "@/mixins/toggle.js";

import ModalForm from "@/components/UI/ModalForm";
import AdminBooksForm from "@/components/Admin/Forms/AdminBooksForm";
import ConfirmDialog from "@/components/UI/ConfirmDialog";

export default {
  components: {
    ModalForm,
    AdminBooksForm,
    ConfirmDialog,
  },
  mixins: [adminFormMixin, toggle, dataStore],
  props: {
    bookGenre: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      layout: "grid",
      displayConfirmDialog: false,
      mostPopularBooks: [],
      book: "",
      rows: 9,
      data: {
        title: "",
        author: "",
        genre: "",
        img: "",
        count: 0,
      },
      isSort: false,
      isSortUp: false,
      sortKey: null,
      sortOrder: null,
      selectedSort: null,
      typeDataSort: "",
      sortOptions: [
        { label: "Sort By Title", value: "title" },
        { label: "Sort By Rating", value: "rating" },
      ],
      searchQuery: "",
      searchGenreQuery: "all",
    };
  },

  methods: {
    getCountStatus(count) {
      if (!count) return "OUTOFSTOCK";
      if (count < 5) return "LOWSTOCK";
      else return "INSTOCK";
    },

    async getMostPopularBooks() {
      try {
        const mostPopularBooks = await API.get("/books/mostpopularbooks");
        this.mostPopularBooks = mostPopularBooks.data.map((elem) => ({
          ...elem.book,
        }));
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    confirmDelete(book) {
      this.displayConfirmDialog = true;
      this.book = book;
    },

    async onDeleteBook() {
      this.displayConfirmDialog = false;
      try {
        await API.delete(`/books/deletebook/${this.book._id}`);
        this.getBooks;
        this.showMessage(`${this.book.title} deleted`);
      } catch (error) {
        console.log(error);
        this.showErrorMessage(error.response.data.message);
        this.getBooks;
      }
    },

    handleChangeWidth() {
      const mediaQuery = window.matchMedia("(min-width: 900px)");
      if (mediaQuery.matches) {
        console.log(mediaQuery);
      }
    },

    onResize() {
      if (window.innerWidth < 666) {
        this.rows = 4;
        this.layout = "grid";
      } else if (window.innerWidth < 900 && window.innerWidth > 666) {
        this.rows = 8;
      } else {
        this.rows = 9;
      }
    },
  },

  computed: {
    searchedBooks() {
      if (this.searchQuery) {
        return this.books.filter((book) => {
          return (
            book.title?.toLowerCase().includes(this.searchQuery) ||
            book.author.first_name?.toLowerCase().includes(this.searchQuery) ||
            book.author.last_name?.toLowerCase().includes(this.searchQuery)
          );
        });
      } else {
        return this.searchedBooksByGenre;
      }
    },

    searchedBooksByGenre() {
      if (this.searchGenreQuery === "all") {
        return [...this.books];
      }
      if (this.searchGenreQuery === "popular") {
        return [...this.mostPopularBooks];
      }
      return this.books.filter(
        (book) =>
          book.genre.name?.toLowerCase() ===
          this.searchGenreQuery?.toLowerCase()
      );
    },

    sortedBooks() {
      const typeDataSort = this.searchedBooks
        ? typeof this.searchedBooks[0][this.selectedSort]
        : "";

      switch (typeDataSort) {
        case "string": {
          return [...this.searchedBooks].sort((firstItem, secondItem) =>
            firstItem[this.selectedSort]?.localeCompare(
              secondItem[this.selectedSort]
            )
          );
        }
        case "number": {
          return [...this.searchedBooks].sort(
            (firstItem, secondItem) =>
              secondItem[this.selectedSort] - firstItem[this.selectedSort]
          );
        }
        default:
          return [...this.searchedBooks];
      }
    },
  },
  created() {
    this.getBooks();
    this.getUsers();
    this.getAuthors();
    this.getGenres();
    this.getAllBookActions();
    this.getMostPopularBooks();

    if (this.bookGenre) {
      this.searchGenreQuery = this.bookGenre;
    }
    window.addEventListener("resize", this.onResize);
  },
};
</script>

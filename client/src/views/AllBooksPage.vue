<template>
  <div class="card" style="border: none; box-shadow: none; padding: 0 4%">
    <Toast />
    <Button
      v-if="user.isAdmin"
      label="New book"
      icon="pi pi-plus"
      class="p-button-success p-mr-2"
      @click="openModal"
      style="margin: 30px 0; align-self: flex-end"
    />
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
      :value="searchedBooksByGenre"
      :layout="layout"
      :paginator="true"
      :rows="9"
    >
      <template #header>
        <div class="p-grid p-nogutter">
          <div class="buttons" style="margin: 20px auto">
            <Button
              label="All"
              class="p-button p-button-text search-button"
              @click="searchQuery = 'all'"
              :class="{ 'active-search-button': searchQuery === 'all' }"
            />
            <Button
              label="Most popular"
              class="p-button p-button-text search-button"
              @click="searchQuery = 'popular'"
              :class="{ 'active-search-button': searchQuery === 'popular' }"
            />
            <Button
              v-for="genre in genres"
              :key="genre.name"
              :label="genre.name"
              class="p-button p-button-text search-button"
              @click="searchQuery = genre.name"
              :class="{ 'active-search-button': searchQuery === genre.name }"
            />
          </div>
          <!-- <div style="width: 100%">
            <span class="p-input-icon-left" style="width: 100%">
              <i class="pi pi-search" />
              <InputText
                placeholder="Search..."
                v-model="searchQuery"
                style="width: 100%"
              />
            </span>
          </div> -->
          <div
            class="p-col-6"
            style="
              text-align: left;
              display: flex;
              margin-top: 20px;
              width: 100%;
              justify-content: space-between;
              align-items: center;
            "
          >
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
              <div
                class="product-description"
                style="
                  margin-top: 1px;
                  letter-spacing: 0.35em;
                  font-family: josefin sans, sans-serif;
                  font-size: 12px;
                  text-transform: uppercase;
                  color: #999;
                "
              >
                {{
                  slotProps.data.author.first_name +
                  " " +
                  slotProps.data.author.last_name
                }}
              </div>
              <div
                class="product-name"
                style="
                  color: #000;
                  font-weight: 500;
                  letter-spacing: 0.01em;
                  word-wrap: break-word;
                "
              >
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
                  v-if="this.user.isAdmin"
                  icon="pi pi-times"
                  class="p-button-rounded p-button-danger p-button-text"
                  @click="deleteBook"
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
              <div
                class="product-description"
                style="
                  margin-top: 1px;
                  letter-spacing: 0.35em;
                  font-family: josefin sans, sans-serif;
                  font-size: 12px;
                  text-transform: uppercase;
                  color: #999;
                "
              >
                {{
                  slotProps.data.author.first_name +
                  " " +
                  slotProps.data.author.last_name
                }}
              </div>
              <div
                class="product-name"
                style="
                  color: #000;

                  font-weight: 500;
                  letter-spacing: 0.01em;

                  word-wrap: break-word;
                "
              >
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
  </div>
</template>

<script>
import adminFormMixin from "@/mixins/adminFormMixin";
import dataStore from "@/mixins/dataStore.js";
import toggle from "@/mixins/toggle.js";

import ModalForm from "@/components/UI/ModalForm";
import AdminBooksForm from "@/components/Admin/Forms/AdminBooksForm";

export default {
  components: {
    ModalForm,
    AdminBooksForm,
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
      searchQuery: "all",
    };
  },

  methods: {
    getCountStatus(count) {
      if (!count) return "OUTOFSTOCK";
      if (count < 5) return "LOWSTOCK";
      else return "INSTOCK";
    },
  },

  computed: {
    searchedBooks() {
      return this.books.filter((book) => {
        return (
          book.title?.toLowerCase().includes(this.searchQuery) ||
          book.author.first_name?.toLowerCase().includes(this.searchQuery) ||
          book.author.last_name?.toLowerCase().includes(this.searchQuery)
        );
      });
    },

    searchedBooksByGenre() {
      if (this.searchQuery === "all") {
        return [...this.books];
      }
      if (this.searchQuery === "popular") {
        return [...this.mostPopularBooks];
      }
      return this.books.filter(
        (book) =>
          book.genre.name?.toLowerCase() === this.searchQuery?.toLowerCase()
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

    mostPopularBooks() {
      const mostPopularBooks = [];
      this.bookActions
        .filter((book) => book.status === "Received")
        .forEach((item) => {
          mostPopularBooks.push(item.book);
        });

      return mostPopularBooks.slice(0, 4);
    },
  },
  created() {
    this.getBooks();
    this.getUsers();
    this.getAuthors();
    this.getGenres();
    this.getAllBookActions();

    if (this.bookGenre) {
      this.searchQuery = this.bookGenre;
    }
  },
};
</script>

<template>
  <div class="card">
    <Toast />
    <Button
      v-if="user.username === 'admin'"
      label="New book"
      icon="pi pi-plus"
      class="p-button-success p-mr-2"
      @click="openModal"
      style="margin-bottom: 30px; align-self: flex-end"
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
    <DataView :value="sortedBooks" :layout="layout" :paginator="true" :rows="6">
      <template #header>
        <div class="p-grid p-nogutter">
          <div class="p-col-6" style="text-align: left">
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText placeholder="Search..." v-model="searchQuery" />
            </span>
          </div>
          <div class="p-col-6" style="text-align: right">
            <DataViewLayoutOptions v-model="layout" />

            <Dropdown
              v-model="selectedSort"
              :options="sortOptions"
              optionLabel="label"
              optionValue="value"
              placeholder="Sort By..."
              style="text-align: left; margin-top: 10px"
            />
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
              ><img :src="slotProps.data.img" :alt="slotProps.data.title" />
            </router-link>

            <div class="product-list-detail">
              <div class="product-name">{{ slotProps.data.title }}</div>
              <div class="product-description">
                {{
                  slotProps.data.author.first_name +
                  " " +
                  slotProps.data.author.last_name
                }}
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
        <div class="p-col-12 p-md-4" style="display: flex">
          <div class="product-grid-item card">
            <div class="product-grid-item-top">
              <div>
                <span class="product-category">{{
                  slotProps.data.category
                }}</span>
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
              <div class="product-name">{{ slotProps.data.title }}</div>
              <div class="product-description">
                {{
                  slotProps.data.author.first_name +
                  " " +
                  slotProps.data.author.last_name
                }}
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
      sortOptions: [
        { label: "Sort By Title", value: "title" },
        { label: "Sort By Rating", value: "rating" },
      ],
      searchQuery: "",
    };
  },

  methods: {
    getCountStatus(count) {
      if (!count) return "OUTOFSTOCK";
      if (count < 5) return "LOWSTOCK";
      else return "INSTOCK";
    },

    mounted() {
      this.getBooks();
      this.getUsers();
      this.getAuthors();
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

    sortedBooks() {
      const typeItems = typeof this.searchedBooks[0][this.selectedSort];
      switch (typeItems) {
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
              firstItem[this.selectedSort] - secondItem[this.selectedSort]
          );
        }
        default:
          return [...this.searchedBooks];
      }
    },
  },
};
</script>

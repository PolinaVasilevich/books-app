<template>
  <div class="card">
    <Message v-if="displayMessage" severity="success">{{ message }}</Message>

    <Message v-if="displayErrorMessage" severity="error">{{ message }}</Message>
    <Button
      v-if="user.username === 'admin'"
      label="Add book"
      class="p-button-outlined"
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
          :dataForm="data"
          path="books/book"
          @resetForm="data = initialForm"
          @closeModal="closeModal"
          @showMessage="showMessage"
          @showErrorMessage="showErrorMessage"
        />
      </template>
    </modal-form>
    <DataView
      :value="filteredData"
      :layout="layout"
      :paginator="true"
      :rows="6"
    >
      <template #header>
        <div class="p-grid p-nogutter">
          <div class="p-col-6" style="text-align: left">
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText placeholder="Search..." v-model="filter" />
            </span>
          </div>
          <div class="p-col-6" style="text-align: right">
            <DataViewLayoutOptions v-model="layout" />
            <div>
              <Dropdown
                v-model="sortKey"
                :options="sortOptions"
                optionLabel="label"
                placeholder="Sort By..."
                @change="onSortChangeOption($event)"
                style="text-align: left; margin: 10px 10px 0 0"
              />

              <span
                class="p-sortable-column-icon pi pi-fw pi-sort-alt"
                style="cursor: pointer"
                @click="isSort = !isSort"
                v-if="!isSort"
              ></span>

              <span
                class="p-sortable-column-icon pi pi-fw p-highlight"
                :class="[
                  isSortUp ? 'pi-sort-amount-up-alt' : 'pi-sort-amount-down',
                ]"
                style="cursor: pointer"
                @click="onSortChange"
                v-else
              ></span>
            </div>
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
      sortField: null,
      sortOptions: [
        { label: "Sort By Title", value: "title" },
        { label: "Sort By Rating", value: "rating" },
      ],
      filter: "",
    };
  },

  created() {
    this.getBooks();
  },

  methods: {
    getCountStatus(count) {
      if (!count) return "OUTOFSTOCK";
      if (count < 5) return "LOWSTOCK";
      else return "INSTOCK";
    },

    onSortChangeOption(event) {
      this.sortField = event.value.value;
    },

    onSortChange() {
      this.isSortUp = !this.isSortUp;
      if (typeof this.books[0][this.sortField] === "string") {
        this.books.sort((firstField, secondField) => {
          if (this.isSortUp) {
            return firstField[this.sortField].toLowerCase() >
              secondField[this.sortField].toLowerCase()
              ? 1
              : -1;
          } else {
            return firstField[this.sortField].toLowerCase() <
              secondField[this.sortField].toLowerCase()
              ? 1
              : -1;
          }
        });
      } else if (typeof this.books[0][this.sortField] === "number") {
        this.books.sort((firstField, secondField) => {
          if (this.isSortUp) {
            return firstField[this.sortField] - secondField[this.sortField];
          } else {
            return secondField[this.sortField] - firstField[this.sortField];
          }
        });
      }
    },
  },

  computed: {
    filteredData() {
      return this.books.filter((elem) => {
        if (this.filter === "") return true;
        else return elem.title.toLowerCase().includes(this.filter);
      });
    },
  },
};
</script>

<template>
  <div>
    <Toast />
    <admin-table
      title="Books"
      :data="searchedItems"
      v-model:searchQuery="searchQuery"
      @openModal="openModal"
      @openEditModal="editModal"
      @deleteItem="onDeleteData"
    >
      <template #content>
        <Column
          field="title"
          header="Title"
          :sortable="true"
          style="min-width: 10rem"
        ></Column>

        <Column
          field="author.first_name"
          header="Author"
          :sortable="true"
          style="min-width: 8rem"
        >
          <template #body="slotProps">
            {{
              slotProps.data.author.first_name +
              " " +
              slotProps.data.author.last_name
            }}
          </template>
        </Column>

        <Column field="genre.name" header="Genre" :sortable="true">
          <template #body="slotProps">
            {{ slotProps.data.genre.name }}
          </template>
        </Column>

        <Column header="Image">
          <template #body="slotProps">
            <router-link
              :to="{
                name: 'adminBookPage',
                params: { id: slotProps.data._id },
              }"
              ><img
                style="width: 150px"
                :src="
                  slotProps.data.img
                    ? slotProps.data.img
                    : 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'
                "
                :alt="slotProps.data.title"
                class="product-image"
            /></router-link>
          </template>
        </Column>

        <Column field="count" header="Count" :sortable="true"></Column>

        <Column
          field="rating"
          header="Rating"
          :sortable="true"
          style="min-width: 12rem"
        >
          <template #body="slotProps">
            <Rating
              :modelValue="slotProps.data.rating"
              :readonly="true"
              :cancel="false"
            />
          </template>
        </Column>
      </template>

      <template #modal>
        <modal-form
          modal-title="Create new record"
          :displayModal="displayModal"
          @close="closeModal"
        >
          <template #modal-content>
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

        <modal-form
          modal-title="Update record"
          :displayModal="displayEditModal"
          @close="closeEditModal"
        >
          <template #modal-content>
            <admin-books-form
              typeForm="update"
              v-model:title="editForm.title"
              v-model:author="editForm.author"
              v-model:genre="editForm.genre"
              v-model:img="editForm.img"
              v-model:count="editForm.count"
              v-model:authors="authors"
              v-model:genres="genres"
              :dataForm="editForm"
              :path="`/books/updatebook/${editForm._id}`"
              :callback="this.getBooks"
              @resetForm="resetEditForm"
              @closeModal="closeEditModal"
              @showMessage="showMessage"
              @showErrorMessage="showErrorMessage"
            />
          </template>
        </modal-form>
      </template>
      <template v-slot:data>
        <tr
          v-for="book in books"
          :key="book._id"
          @click="goToPage(book._id)"
          :style="{ cursor: 'pointer' }"
        >
          <td>{{ book.title }}</td>
          <td>{{ book.author.first_name + " " + book.author.last_name }}</td>
          <td>{{ book.genre.name }}</td>
          <td @click.stop="goToPage">{{ book.count }}</td>
          <td>
            <admin-buttons
              @showEditForm="editModal(book)"
              @delete="onDeleteData(book)"
            />
          </td>
        </tr>
      </template>
    </admin-table>
  </div>
</template>

<script>
import AdminTable from "@/components/Admin/AdminTable.vue";

import ModalForm from "@/components/UI/ModalForm";
import AdminBooksForm from "@/components/Admin/Forms/AdminBooksForm";
import AdminButtons from "@/components/Admin/AdminButtons";

import adminFormMixin from "@/mixins/adminFormMixin.js";
import dataStore from "@/mixins/dataStore.js";
import toggle from "@/mixins/toggle.js";

export default {
  name: "admin-authors",
  mixins: [toggle, adminFormMixin, dataStore],
  components: {
    AdminTable,

    ModalForm,
    AdminBooksForm,
    AdminButtons,
  },

  data() {
    return {
      data: {
        title: "",
        author: "",
        genre: "",
        img: "",
        count: 0,
      },

      editForm: {
        _id: "",
        title: "",
        author: "",
        genre: "",
        img: "",
        count: 0,
      },
    };
  },

  methods: {
    onDeleteData(value) {
      this.removeData(`/books/deletebook/${value._id}`, this.getBooks);
      this.$toast.add({
        severity: "success",
        summary: "Successful",
        detail: `${value.title} Deleted`,
        life: 3000,
      });
    },

    goToPage(bookID) {
      this.$router.push({ path: `/adminbook/${bookID}` });
    },

    resetForm() {
      this.data.title = "";
      this.data.author = this.authors[0];
      this.data.genre = this.genres[0];
      this.data.img = "";
      this.data.count = 0;
    },

    resetEditForm() {
      this.editForm.title = this.initialEditForm.title;
      this.editForm.author = this.initialEditForm.author;
      this.editForm.genre = this.initialEditForm.genre;
      this.editForm.img = this.initialEditForm.img;
      this.editForm.count = this.initialEditForm.count;
    },
  },

  computed: {
    searchedItems() {
      return this.books.filter((item) => {
        return (
          item.title?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          item.author.first_name
            ?.toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
          item.author.last_name
            ?.toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
          item.genre.name
            ?.toLowerCase()
            .includes(this.searchQuery.toLowerCase())
        );
      });
    },
  },

  created() {
    this.getBooks();
    this.getAuthors();
    this.getGenres();
  },

  mounted() {
    this.data.author = this.authors[0];
    this.data.genre = this.genres[0];
  },
};
</script>

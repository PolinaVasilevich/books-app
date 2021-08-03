<template>
  <div>
    <my-alert :message="message" v-if="showMessage" />
    <admin-header>
      <admin-table titleTable="Genres" :headers="headers" :data="genres">
        <template v-slot:modal>
          <button
            type="button"
            class="btn btn-success btn-sm"
            @click="showModal = true"
          >
            Create new record
          </button>
          <my-modal :showModal="showModal" @close="showModal = false">
            <form @submit.prevent="onSubmit" @reset="resetForm">
              <input
                class="form-control input"
                type="text"
                v-model.trim="genre.name"
                placeholder="Enter name genre"
                required
              />
              <div class="btns">
                <button type="submit" class="btn btn-primary">Submit</button>
                <button type="reset" class="btn btn-danger">Reset</button>
              </div>
            </form>
          </my-modal>

          <my-modal :showModal="showEditModal" @close="showEditModal = false">
            <form @submit.prevent="onSubmitUpdate" @reset="onResetUpdate">
              <input
                class="form-control input"
                type="text"
                v-model.trim="editForm.name"
                placeholder="Enter name genre"
                required
              />
              <div class="btns">
                <button type="submit" class="btn btn-primary">Update</button>
                <button type="reset" class="btn btn-danger">Cancel</button>
              </div>
            </form>
          </my-modal>
        </template>
        <template v-slot:data>
          <tr v-for="genre in genres" :key="genre._id">
            <td>{{ genre.name }}</td>
            <td>
              <button
                type="button"
                class="btn btn-warning btn-sm"
                @click="editGenre(genre)"
              >
                Update
              </button>
              <button
                type="button"
                class="btn btn-danger btn-sm"
                @click="onDeleteGenre(genre)"
              >
                Delete
              </button>
            </td>
          </tr>
        </template>
      </admin-table></admin-header
    >
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import AdminTable from "@/components/Admin/AdminTable.vue";
import MyAlert from "@/components/UI/MyAlert";
import AdminHeader from "./AdminHeader.vue";
import API from "@/utils/api";

import "@/assets/styles/main.scss";

export default {
  name: "admin-genres",
  components: { AdminTable, MyAlert, AdminHeader },
  data() {
    return {
      genre: {
        name: "",
      },

      editForm: {
        _id: "",
        fname: "",
      },
      headers: ["Name"],
      message: "",

      showModal: false,
      showMessage: false,
      showEditModal: false,
    };
  },

  methods: {
    ...mapActions({
      getGenres: "books/getGenres",
    }),

    resetForm() {
      this.genre.name = "";

      this.editForm._id = "";
      this.editForm.name = "";
    },

    async addGenre(payload) {
      try {
        await API.post("books/genre", payload);
        this.getGenres();
        this.message = "Genre added!";
        this.showMessage = true;
      } catch (error) {
        console.log(error);
        this.getGenres();
      }
    },

    onSubmit() {
      this.showModal = false;
      this.addGenre(this.genre);
      this.resetForm();
    },

    async removeGenre(genreID) {
      try {
        await API.delete(`/books/deletegenre/${genreID}`);
        this.getGenres();
        this.message = "Genre removed!";
        this.showMessage = true;
      } catch (error) {
        console.log(error);
        this.getGenres();
      }
    },

    onDeleteGenre(genre) {
      this.removeGenre(genre._id);
    },

    editGenre(genre) {
      this.editForm = genre;
      this.showEditModal = true;
    },

    async updateGenre(payload, genreID) {
      try {
        await API.put(`/books/updategenre/${genreID}`, payload);
        this.getGenres();
        this.message = "Book updated!";
        this.showMessage = true;
      } catch (error) {
        console.log(error);
        this.getGenres();
      }
    },

    onSubmitUpdate() {
      this.showEditModal = false;
      this.updateGenre(this.editForm, this.editForm._id);
    },

    onResetUpdate() {
      this.resetForm();
      this.getGenres();
    },
  },

  computed: {
    ...mapState("books", {
      genres: (state) => state.genres,
    }),
  },

  created() {
    this.getGenres();
  },
};
</script>

<template>
  <admin-form
    :typeForm="typeForm"
    :dataForm="dataForm"
    :path="path"
    :callback="callback"
    @showMessage="showMessage"
    @showErrorMessage="showErrorMessage"
    @resetForm="$emit('resetForm')"
  >
    <template v-slot:input>
      <select class="form-control select" v-model="selectUser">
        <option v-for="item in users" :key="item._id" :value="item">
          {{ item.username }}
        </option>
      </select>

      <select class="form-control select" v-model="selectBook">
        <option
          v-for="item in books"
          :key="item._id"
          :value="item"
          :selected="item._id === book._id"
        >
          {{ item.title }}
        </option>
      </select>

      <input
        type="datetime-local"
        class="form-control select"
        :value="moment(date_reserved).format('YYYY-MM-DDTHH:mm')"
        @input="$emit('update:date_reserved', $event.target.value)"
      />
    </template>
  </admin-form>
</template>

<script>
import toggle from "@/mixins/toggle.js";
import adminFormData from "@/mixins/adminFormData.js";

import AdminForm from "@/components/Admin/Forms/AdminForm";
import moment from "moment";

export default {
  name: "admin-genre-create-form",
  components: { AdminForm },
  mixins: [toggle, adminFormData],
  data() {
    return { moment };
  },
  props: {
    user: {
      type: Object,
      required: true,
    },

    book: {
      type: Object,
      required: true,
    },

    date_reserved: {
      type: Date,
      required: true,
    },

    users: {
      type: Array,
    },

    books: {
      type: Array,
    },
  },

  methods: {
    onSubmit() {
      if (this.typeForm === "create") {
        this.addNewRecord("books/reservebook", this.dataForm, this.callback);
        this.message = "New record has created";
        this.$emit("showMessage", this.message);
      } else if (this.typeForm === "update") {
        this.updateData(
          `/books/updatereservedbook/${this.dataForm._id}`,
          this.callback
        );
        this.message = "Record has updated";
        this.$emit("showMessage", this.message);
      }
      this.$emit("closeModal");
    },
  },

  computed: {
    selectUser: {
      get() {
        return this.user;
      },
      set(value) {
        this.$emit("update:user", value);
      },
    },

    selectBook: {
      get() {
        return this.book;
      },
      set(value) {
        this.$emit("update:book", value);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.p-dropdown {
  width: 14rem;
}

.country-item {
  img {
    width: 17px;
    margin-right: 0.5rem;
  }
}
</style>

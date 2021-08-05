<template>
  <form @submit.prevent="onSubmit" @reset="onReset">
    <select
      class="form-control select"
      :value="user"
      @input="$emit('update:user', $event.target.value)"
    >
      <option v-for="item in users" :key="item._id" :value="item">
        {{ item.username }}
      </option>
    </select>

    <select
      class="form-control select"
      :value="book"
      @input="$emit('update:book', $event.target.value)"
    >
      <option v-for="item in books" :key="item._id" :value="item">
        {{ item.title }}
      </option>
    </select>

    <input
      type="datetime-local"
      class="form-control select"
      :value="reserved_date"
      @input="$emit('update:reserved_date', $event.target.value)"
    />

    <div class="btns">
      <button type="submit" class="btn btn-primary">Submit</button>
      <button type="reset" class="btn btn-danger">Reset</button>
    </div>
  </form>
</template>

<script>
import adminFormMixin from "@/mixins/adminFormMixin.js";

export default {
  name: "admin-genre-create-form",
  mixins: [adminFormMixin],
  data() {
    return { selectedUser: null, selectedBook: null };
  },
  props: {
    typeForm: {
      type: String,
      default: "create",
    },

    dataForm: {
      type: Object,
      required: true,
    },

    user: {
      type: Object,
      required: true,
    },

    book: {
      type: Object,
      required: true,
    },

    reserved_date: {
      type: String,
      required: true,
    },
  },

  methods: {
    onReset() {
      this.resetForm(this.dataForm);
    },

    onSubmit() {
      if (this.typeForm === "create") {
        this.addNewRecord(
          "books/reservebook",
          this.dataForm,
          this.getReservedBooks
        );
      } else if (this.typeForm === "update") {
        this.updateData(
          `/books/updatereservedbook/${this.dataForm._id}`,
          this.dataForm,
          this.getReservedBooks
        );
      }
      this.$emit("closeModal");
    },
  },
  created() {
    this.getUsers();
    this.getBooks();
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

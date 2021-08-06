<template>
  <form @submit.prevent="onSubmit" @reset="onReset">
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

    <div class="btns">
      <button type="submit" class="btn btn-primary">Submit</button>
      <button type="reset" class="btn btn-danger">Reset</button>
    </div>
  </form>
</template>

<script>
import adminFormMixin from "@/mixins/adminFormMixin.js";
import moment from "moment";

export default {
  name: "admin-genre-create-form",
  mixins: [adminFormMixin],
  data() {
    return { moment, message: "" };
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

    date_reserved: {
      type: Date,
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
        this.message = "New record has created";
        this.$emit("showMessage", this.message);
      } else if (this.typeForm === "update") {
        this.updateData(
          `/books/updatereservedbook/${this.dataForm._id}`,
          this.dataForm,
          this.getReservedBooks
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

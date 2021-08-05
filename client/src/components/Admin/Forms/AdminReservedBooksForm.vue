<template>
  <form @submit.prevent="onSubmit" @reset="onReset">
    <Dropdown
      :value="user"
      @input="$emit('update:user', $event.target.value)"
      v-model="selectedItem"
      placeholder="Select a user"
      :options="users"
      optionLabel="username"
      :editable="true"
    />

    <Dropdown
      :value="book"
      @input="$emit('update:book', $event.target.value)"
      placeholder="Select a book"
      :options="books"
      optionLabel="title"
      :editable="true"
    />

    <Calendar
      :value="reserved_date"
      @input="$emit('update:reserved_dat', $event.target.value)"
      :showTime="true"
      :showSeconds="true"
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
    return { selectedItem: null };
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
      type: String,
      required: true,
    },

    book: {
      type: String,
      required: true,
    },

    reserved_date: {
      type: Boolean,
      default: false,
      required: true,
    },
  },

  methods: {
    onReset() {
      this.resetForm(this.dataForm);
    },

    onSubmit() {
      if (this.typeForm === "create") {
        this.addNewRecord("auth/user", this.dataForm, this.getUsers);
      } else if (this.typeForm === "update") {
        this.updateData(
          `/auth/updateuser/${this.dataForm._id}`,
          this.dataForm,
          this.getUsers
        );
      }
      this.$emit("closeModal");
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

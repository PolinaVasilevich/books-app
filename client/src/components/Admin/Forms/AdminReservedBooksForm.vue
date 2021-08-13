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
      <select
        class="form-control select"
        v-model="selectUser"
        :disabled="typeForm === 'update'"
      >
        <option v-for="item in users" :key="item._id" :value="item">
          {{ item.username }}
        </option>
      </select>

      <select
        class="form-control select"
        v-model="selectBook"
        :disabled="typeForm === 'update'"
      >
        <option
          v-for="item in books"
          :key="item._id"
          :value="item"
          :selected="item._id === book._id"
        >
          {{ item.title }}
        </option>
      </select>

      <div class="p-field" v-if="typeForm === 'create'">
        <label for="date_reserved">Reserved date</label>
        <input
          id="date_reserved"
          v-if="typeForm === 'create'"
          type="datetime-local"
          class="form-control"
          :value="moment(date_reserved).format('YYYY-MM-DDTHH:mm')"
          @input="$emit('update:date_reserved', $event.target.value)"
        />
      </div>

      <div class="p-field" v-else>
        <label for="return_date">Return date</label>
        <input
          id="return_date"
          type="datetime-local"
          :value="moment(return_date).format('YYYY-MM-DDTHH:mm')"
          @input="$emit('update:return_date', $event.target.value)"
          required="true"
          class="form-control"
          autofocus
        />
      </div>
    </template>
  </admin-form>
</template>

<script>
import toggle from "@/mixins/toggle.js";
import adminFormData from "@/mixins/adminFormData.js";

import AdminForm from "@/components/Admin/Forms/AdminForm";
import moment from "moment";

export default {
  name: "admin-review-form",
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
    },

    return_date: {
      type: Date,
    },

    users: {
      type: Array,
    },

    books: {
      type: Array,
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

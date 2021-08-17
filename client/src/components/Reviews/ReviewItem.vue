<template>
  <div class="review-item">
    <Panel>
      <template #header>
        <div class="content">
          <Rating
            v-model="editDataForm.rating"
            :cancel="false"
            :readonly="!displayEditForm"
            class="margin"
          />

          <span class="margin">{{ review?.user?.username }}</span>
          <span class="margin">{{
            moment(review?.created_date).format("YYYY-MM-DD HH:mm")
          }}</span>
        </div>
      </template>
      <template #icons>
        <button
          class="p-panel-header-icon p-link p-mr-2"
          @click="displayEditForm = !displayEditForm"
          v-if="review?.user?.username === currentUser?.username"
        >
          <span class="pi pi-pencil"></span>
        </button>

        <button
          v-if="isAdmin && !hideReview"
          class="p-panel-header-icon p-link p-mr-2"
          @click="$emit('hideReview')"
        >
          <span class="pi pi-eye-slash"></span>
        </button>

        <button
          v-if="isAdmin && hideReview"
          class="p-panel-header-icon p-link p-mr-2"
          @click="$emit('showReview')"
        >
          <span class="pi pi-eye"></span>
        </button>
      </template>
      <admin-form
        :typeForm="typeForm"
        :dataForm="editDataForm"
        :path="`/books/updatereview/${editDataForm._id}`"
        :callback="callback"
        :showButtons="displayEditForm"
        @closeEditForm="displayEditForm = false"
      >
        <template #input>
          <Textarea
            v-model="editDataForm.text"
            :autoResize="true"
            placeholder="Enter your review"
            :class="{ 'disabled-form': !displayEditForm }"
            required
            style="width: 100%"
          />
        </template>
      </admin-form>
    </Panel>
  </div>
</template>

<script>
import moment from "moment";

import AdminForm from "@/components/Admin/Forms/AdminForm";
import adminFormData from "@/mixins/adminFormData.js";

export default {
  name: "review-item",
  components: { AdminForm },
  mixins: [adminFormData],
  data() {
    return {
      moment,
      displayEditForm: false,
      editDataForm: {
        _id: "",
        text: "",
        rating: null,
      },
      initialEditDataForm: {},
    };
  },
  props: {
    review: {
      type: Object,
      required: true,
    },

    currentUser: { type: Object, required: true },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    fillInEditForm() {
      this.editDataForm = { ...this.review };
      this.initialEditDataForm = { ...this.review };
    },
  },

  created() {
    this.fillInEditForm();
  },
};
</script>

<style></style>

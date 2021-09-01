<template>
  <div class="review-item">
    <!-- <Panel>
      <template #header>
        <div class="content">
          <Rating
            v-model="editDataForm.rating"
            :cancel="false"
            :readonly="!displayEditForm"
            class="margin"
          />

          <span class="margin">{{ review?.user?.username }}</span>
          <span class="margin"
            >Created:
            {{ moment(review?.created_date).format("YYYY-MM-DD HH:mm") }}</span
          >
          <span class="margin" v-if="review.edit_date"
            >Edited:
            {{ moment(review?.edit_date).format("YYYY-MM-DD HH:mm") }}</span
          >
        </div>
      </template>
      <template #icons>
        <button
          class="p-panel-header-icon p-link p-mr-2"
          @click="displayEditForm = !displayEditForm"
          v-if="
            review?.user?.username === currentUser?.username && !review.isHidden
          "
        >
          <span class="pi pi-pencil"></span>
        </button>

        <button
          v-if="currentUser.isAdmin && !review.isHidden"
          class="p-panel-header-icon p-link p-mr-2"
          @click="$emit('hideReview', review)"
        >
          <span class="pi pi-eye-slash"></span>
        </button>

        <button
          v-if="currentUser.isAdmin && review.isHidden"
          class="p-panel-header-icon p-link p-mr-2"
          @click="$emit('hideReview', review)"
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
            v-if="!review.isHidden"
            v-model="editDataForm.text"
            :autoResize="true"
            placeholder="Enter your review"
            :class="{ 'disabled-form': !displayEditForm }"
            required
            style="width: 100%"
          />
          <p v-else>This comment is hidden by the administrator</p>
        </template>
      </admin-form>
    </Panel> -->

    <Card style="background-color: #fbf9f6; margin-bottom: 20px">
      <template #title>
        <div
          style="
            display: flex;
            align-items: center;
            justify-content: space-between;
          "
        >
          <Rating
            v-if="editDataForm.rating"
            v-model="editDataForm.rating"
            :cancel="false"
            :readonly="!displayEditForm"
            class="margin"
          />
          <div>
            <button
              class="p-panel-header-icon p-link p-mr-2"
              @click="displayEditForm = !displayEditForm"
              v-if="
                review?.user?.username === currentUser?.username &&
                !review.isHidden
              "
            >
              <span class="pi pi-pencil"></span>
            </button>

            <button
              v-if="currentUser.isAdmin && !review.isHidden"
              class="p-panel-header-icon p-link p-mr-2"
              @click="$emit('hideReview', review)"
            >
              <span class="pi pi-eye-slash"></span>
            </button>

            <button
              v-if="currentUser.isAdmin && review.isHidden"
              class="p-panel-header-icon p-link p-mr-2"
              @click="$emit('hideReview', review)"
            >
              <span class="pi pi-eye"></span>
            </button>
          </div>
        </div>
      </template>
      <template #content>
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
              v-if="!review.isHidden"
              v-model="editDataForm.text"
              :autoResize="true"
              placeholder="Enter your review"
              :class="{ 'disabled-form': !displayEditForm }"
              required
              style="width: 100%; background: transparent"
            />
            <p v-else>This comment is hidden by the administrator</p>
          </template>
        </admin-form>
      </template>
      <template #footer>
        <span class="margin">{{ review?.user?.username }}</span>
        <small class="margin"
          >Created:
          {{ moment(review?.created_date).format("YYYY-MM-DD HH:mm") }}</small
        >
        <small class="margin" v-if="review.edit_date"
          >Edited:
          {{ moment(review?.edit_date).format("YYYY-MM-DD HH:mm") }}</small
        >
      </template>
    </Card>
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

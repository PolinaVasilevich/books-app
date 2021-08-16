<template>
  <div class="review-item">
    <Panel>
      <template #header>
        <div class="content">
          <Rating
            v-model="ratingBook"
            :cancel="displayEditForm"
            :readonly="!displayEditForm"
            class="margin"
          />
          {{ displayEditForm }}
          <span class="margin">{{ review?.user?.username }}</span>
          <span class="margin">{{
            moment(review?.created_date).format("YYYY-MM-DD HH:mm")
          }}</span>
        </div>
      </template>
      <template #icons>
        <button
          class="p-panel-header-icon p-link p-mr-2"
          @click="$emit('editForm', review._id)"
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
      <p>
        <Textarea
          :value="text"
          @input="$emit('update:text', $event.target.value)"
          :autoResize="true"
          placeholder="Enter your review"
          :class="{ 'disabled-form': !displayEditForm }"
          required
          style="width: 100%"
        />
      </p>
    </Panel>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "review-item",
  data() {
    return {
      moment,
      hideReview: false,
    };
  },
  props: {
    review: {
      type: Object,
      required: true,
    },
    text: { type: Text, required: true },
    rating: { type: Number },
    currentUser: { type: Object, required: true },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    displayEditForm: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ratingBook: {
      get() {
        return this.rating;
      },
      set(value) {
        this.$emit("update:rating", value);
      },
    },
  },
};
</script>

<style></style>

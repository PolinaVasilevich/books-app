<template>
  <div class="review-list">
    <div v-if="items.length">
      <review-item
        v-for="item in items"
        :key="item._id"
        :review="item"
        :currentUser="currentUser"
        :typeForm="typeForm"
        :callback="callback"
        @hideReview="hideReview"
      />
    </div>

    <p v-else>There are no reviews yet.</p>
  </div>
</template>

<script>
import ReviewItem from "@/components/Reviews/ReviewItem";
import adminFormData from "@/mixins/adminFormData.js";

export default {
  name: "review-list",
  mixins: [adminFormData],
  components: {
    ReviewItem,
  },
  data() {},

  props: {
    items: {
      type: Array,
      required: true,
    },
    currentUser: { type: Object, required: true },
  },

  methods: {
    hideReview(value) {
      this.$emit("hideReview", value);
    },
  },
};
</script>

<style>
.single-review {
  background-color: #fbf9f6;
  margin-bottom: 30px;
}
</style>

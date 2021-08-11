<template>
  <div class="review-list">
    <h2>Reviews</h2>
    <div v-if="items.length">
      <review-item v-for="item in items" :key="item._id" :review="item" />
    </div>

    <p v-else>There are no reviews yet.</p>
  </div>
</template>

<script>
import ReviewItem from "@/components/Reviews/ReviewItem";

export default {
  name: "review-list",
  components: {
    ReviewItem,
  },

  props: {
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style></style>

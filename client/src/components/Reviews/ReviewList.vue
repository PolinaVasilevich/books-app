<template>
  <div class="review-list">
    <h2>Reviews</h2>

    <div v-if="items.length">
      <review-item
        v-for="item in items"
        :key="item._id"
        :review="item"
        :text="item.text"
        v-model:rating="item.rating"
        :currentUser="currentUser"
        :displayEditForm="displayEditForm"
        @editForm="showEditForm($event, item._id)"
      />
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
  data() {},

  props: {
    items: {
      type: Array,
      required: true,
    },
    currentUser: { type: Object, required: true },
  },

  methods: {
    showEditForm(value, reviewID) {
      this.displayEditForm = value === reviewID;
    },
  },
};
</script>

<style></style>

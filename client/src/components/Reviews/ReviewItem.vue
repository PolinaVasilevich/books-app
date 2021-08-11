<template>
  <div class="review-item">
    <Panel :toggleable="true">
      <template #header>
        <div class="content">
          <Rating
            :modelValue="review?.rating"
            :cancel="false"
            :readonly="true"
            class="margin"
          />
          <span class="margin">{{ review?.user?.username }}</span>
          <span class="margin">{{
            moment(review?.created_date).format("YYYY-MM-DD HH:mm")
          }}</span>
        </div>
      </template>
      <template #icons>
        <!-- <button
          class="p-panel-header-icon p-link p-mr-2"
          @click="toggle"
          v-if="isAdmin"
        >
          <span class="pi pi-cog"></span>
        </button> -->
        <!-- <Menu id="config_menu" ref="menu" :model="items" :popup="true" /> -->
      </template>
      <p>
        {{ review?.text }}
      </p>
    </Panel>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "review-item",
  props: {
    review: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      moment,
    };
  },
};
</script>

<style></style>

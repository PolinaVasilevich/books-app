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
        <button
          class="p-panel-header-icon p-link p-mr-2"
          @click="this.$refs.menu.toggle($event)"
          :v-if="isAdmin"
        >
          <span class="pi pi-cog"></span>
        </button>
        <Menu id="config_menu" ref="menu" :model="menuItems" :popup="true" />
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
  data() {
    return {
      moment,
      menuItems: [
        {
          label: "Update",
          icon: "pi pi-refresh",
          command: () => {
            this.$toast.add({
              severity: "success",
              summary: "Updated",
              detail: "Data Updated",
              life: 3000,
            });
          },
        },
        {
          label: "Delete",
          icon: "pi pi-times",
          command: () => {
            this.$toast.add({
              severity: "warn",
              summary: "Delete",
              detail: "Data Deleted",
              life: 3000,
            });
          },
        },
      ],
    };
  },
  props: {
    review: {
      type: Object,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style></style>

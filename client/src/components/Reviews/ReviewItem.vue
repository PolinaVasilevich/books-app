<template>
  <div class="review-item">
    <Panel>
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
          @click="$emit('editForm')"
        >
          <span class="pi pi-pencil"></span>
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
    };
  },
  props: {
    review: {
      type: Object,
      required: true,
    },
    text: { type: Text, required: true },
    isAdmin: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style></style>

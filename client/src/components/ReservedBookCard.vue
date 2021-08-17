<template>
  <div>
    <Card class="user-page__content">
      <template #header>
        <router-link :to="{ name: 'book', params: { id: data.book._id } }">
          <img
            :src="data.book.img"
            :alt="data.book.title"
            class="user-page__content__img"
          />
        </router-link>
      </template>
      <template #title>
        {{ data.book.title }} by
        {{ data.book.author.first_name + " " + data.book.author.last_name }}
      </template>
      <template #content>
        <slot name="content"> </slot>
      </template>

      <!-- <template #footer>
        <Button
          v-if="
            getData(item.book._id)
              ? [...getData(item.book._id)].reverse()[0].action !== 'Canceled'
              : ''
          "
          icon="pi pi-times"
          label="Cancel reserve"
          class="p-button-warning"
          @click="cancelReserve(item.book)"
        />
      </template> -->
    </Card>
  </div>
</template>

<script>
export default {
  name: "reserved-book-card",
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style></style>

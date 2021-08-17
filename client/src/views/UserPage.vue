<template>
  <div class="user-page">
    <h1>My Books</h1>
    <div>
      <Card
        v-for="item in userReservedBooks"
        :key="item._id"
        class="user-page__content"
      >
        <template #header>
          <router-link :to="{ name: 'book', params: { id: item.book._id } }">
            <img
              :src="item.book.img"
              :alt="item.book.title"
              class="user-page__content__img"
            />
          </router-link>
        </template>
        <template #title>
          {{ item.book.title }} by
          {{ item.book.author.first_name + " " + item.book.author.last_name }}
        </template>
        <template #content>
          <div>
            <my-button
              style="padding: 0; margin: 0"
              @click="showActions = !showActions"
            >
              <h5>Books actions</h5></my-button
            >

            <Timeline :value="getBookData(item.book._id)" v-if="showActions">
              <template #opposite="slotProps">
                <small class="p-text-secondary">{{
                  moment(slotProps.item.action_date).format("YYYY-MM-DD HH:mm")
                }}</small>
              </template>
              <template #marker="slotProps">
                <span
                  class="custom-marker p-shadow-2"
                  :style="{
                    backgroundColor: icons.find(
                      (item) => item.status === slotProps.item.action
                    )?.color,
                  }"
                >
                  <i
                    :class="
                      icons.find(
                        (item) => item.status === slotProps.item.action
                      )?.icon
                    "
                  ></i>
                </span>
              </template>
              <template #content="slotProps">
                {{ slotProps.item.action }}
              </template>
            </Timeline>
          </div>
        </template>
        <template #footer>
          <Button
            icon="pi pi-times"
            label="Cancel reserve"
            class="p-button-warning"
          />
        </template>
      </Card>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import API from "@/utils/api";
import dataStore from "@/mixins/dataStore.js";

export default {
  mixins: [dataStore],
  data() {
    return {
      moment: moment,
      userReservedBooks: null,
      showActions: false,
      bookActions: [],
      icons: [
        {
          status: "Reserved",
          icon: "pi pi-book",
          color: "#0288D1",
        },
        {
          status: "Received",
          icon: "pi pi-user",
          color: "#689F38",
        },
        {
          status: "Returned",
          icon: "pi pi-shopping-cart",
          color: "#FF9800",
        },
        {
          status: "Canceled",
          icon: "pi pi-check",
          color: "#607D8B",
        },
      ],
    };
  },

  methods: {
    async getUserReservedBook() {
      try {
        this.getReservedBooks();
        this.userReservedBooks = [
          ...this.reservedBooks.filter(
            (book) =>
              book.user._id === this.user._id && book.action === "Reserved"
          ),
        ];
      } catch (error) {
        console.log(error);
      }
    },

    async getBookActions() {
      try {
        const bookActions = await API.get(`books/bookactions/${this.user._id}`);
        this.bookActions = bookActions.data;
      } catch (error) {
        console.log(error);
      }
    },

    getBookData(bookID) {
      const data = this.bookActions.find((item) => item._id === bookID);
      return data?.details;
    },
  },

  created() {
    this.getBookActions();
    this.getUserReservedBook();
  },
};
</script>

<style lang="scss" scoped>
.custom-marker {
  display: flex;
  width: 2rem;
  height: 2rem;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  border-radius: 50%;
  z-index: 1;
}

::v-deep(.p-timeline-event-content) ::v-deep(.p-timeline-event-opposite) {
  line-height: 1;
}

@media screen and (max-width: 960px) {
  ::v-deep(.customized-timeline) {
    .p-timeline-event:nth-child(even) {
      flex-direction: row !important;

      .p-timeline-event-content {
        text-align: left !important;
      }
    }

    .p-timeline-event-opposite {
      flex: 0;
    }

    .p-card {
      margin-top: 1rem;
    }
  }
}
</style>

<template>
  <div>
    <Toast />
    <div class="user-page">
      <h1>My Books</h1>
      <div>
        <Card
          v-for="item in userReservedBooks"
          :key="item.book_id"
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
            <book-actions-user-page :data="item.details" :icons="icons" />
          </template>

          <template #footer>
            <Button
              v-if="getLastActionBook(item) === 'Reserved'"
              icon="pi pi-times"
              label="Cancel reserve"
              class="p-button-warning"
              @click="cancelReserve(item.book)"
            />
          </template>
        </Card>
      </div>
      <p v-if="!userReservedBooks?.length">
        You have not reserved any books yet.
      </p>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import API from "@/utils/api";
import dataStore from "@/mixins/dataStore.js";
import adminFormMixin from "@/mixins/adminFormMixin.js";
import BookActionsUserPage from "@/components/BookActionsUserPage";
export default {
  components: { BookActionsUserPage },
  mixins: [dataStore, adminFormMixin],
  data() {
    return {
      moment: moment,
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
          icon: "pi pi-times",
          color: "#D32F2F",
        },
      ],
    };
  },

  methods: {
    async getReservedBooks() {
      try {
        await this.$store.dispatch(
          "books/getUserReservedBooks",
          this.$route.params.id
        );
      } catch (error) {
        console.log(error);
      }
    },

    async cancelReserve(book) {
      try {
        await API.post(`books/cancelbook`, {
          user: this.user,
          userAction: this.user,
          book,
        });
        this.getReservedBooks();

        this.showMessage("Book reservation canceled");
      } catch (error) {
        console.log(error);
        this.showErrorMessage(error.response.data.message);
      }
    },

    getLastActionBook(data) {
      const lastActionBook = JSON.parse(JSON.stringify(data)).details.sort(
        (a, b) => {
          return new Date(b?.action_date) - new Date(a?.action_date);
        }
      )[0]?.status;

      return lastActionBook;
    },
  },

  created() {
    this.getReservedBooks();
  },
};
</script>

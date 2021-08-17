<template>
  <div>
    <Toast />
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
            <book-actions-user-page
              :data="getData(item.book._id)"
              :icons="icons"
            />
          </template>

          <template #footer>
            <Button
              v-if="
                getData(item.book._id)
                  ? [...getData(item.book._id)].reverse()[0].action !==
                    'Canceled'
                  : ''
              "
              icon="pi pi-times"
              label="Cancel reserve"
              class="p-button-warning"
              @click="cancelReserve(item.book)"
            />
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import API from "@/utils/api";
import dataStore from "@/mixins/dataStore.js";
import BookActionsUserPage from "@/components/BookActionsUserPage";
export default {
  components: { BookActionsUserPage },
  mixins: [dataStore],
  data() {
    return {
      moment: moment,
      userReservedBooks: null,
      bookActions: [],
      icons: [
        {
          action: "Reserved",
          icon: "pi pi-book",
          color: "#0288D1",
        },
        {
          action: "Received",
          icon: "pi pi-user",
          color: "#689F38",
        },
        {
          action: "Returned",
          icon: "pi pi-shopping-cart",
          color: "#FF9800",
        },
        {
          action: "Canceled",
          icon: "pi pi-times",
          color: "#D32F2F",
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

    getData(bookID) {
      const data = this.bookActions.find((item) => item._id === bookID);
      return data?.details;
    },

    async cancelReserve(book) {
      try {
        await API.post(`books/cancelbook`, {
          user: this.user,
          book,
        });
        this.getBookActions();

        this.$toast.add({
          severity: "success",
          summary: "Successful",
          detail: "Book reservation canceled",
          life: 3000,
        });
      } catch (error) {
        console.log(error);
        this.$toast.add({
          severity: "error",
          summary: "Error Message",
          detail: `${error.response.data.message}`,
          life: 3000,
        });
      }
    },
  },

  created() {
    this.getBookActions();
    this.getUserReservedBook();
  },
};
</script>

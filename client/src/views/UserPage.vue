<template>
  <div>
    <Toast />
    <div class="user-page">
      <h1>My reserved books</h1>

      <div v-if="userReservedBooks?.length" style="margin-top: 15px">
        <span
          class="p-input-icon-left"
          style="display: inline-block; width: 100%"
        >
          <i class="pi pi-search" />
          <InputText
            placeholder="Search..."
            v-model="searchQuery"
            style="width: 100%"
          />
        </span>
      </div>

      <div>
        <Card
          v-for="item in searchedItems"
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
            <h5>
              Reservation number:
              <span style="font-weight: normal">{{
                item.reservation_number
              }}</span>
            </h5>

            <book-actions-user-page :data="item.details" :icons="icons" />
          </template>

          <template #footer>
            <Button
              v-if="getLastActionBook(item) === 'Reserved'"
              icon="pi pi-times"
              label="Cancel reserve"
              class="p-button-warning"
              @click="showConfirmDialog(item.book)"
            />
          </template>
        </Card>
        <confirm-dialog
          text="cancel reserve book"
          :displayConfirmDialog="displayConfirmDialog"
          @hideConfirmDialog="displayConfirmDialog = false"
          @action="cancelReserve(item)"
        />
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
import toggle from "@/mixins/toggle.js";
import BookActionsUserPage from "@/components/BookActionsUserPage";
import ConfirmDialog from "@/components/UI/ConfirmDialog";

export default {
  components: { BookActionsUserPage, ConfirmDialog },
  mixins: [dataStore, adminFormMixin, toggle],
  data() {
    return {
      moment: moment,
      displayConfirmDialog: false,
      bookActions: [],
      item: null,
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

      this.displayConfirmDialog = false;
    },

    getLastActionBook(data) {
      const lastActionBook = JSON.parse(JSON.stringify(data)).details.sort(
        (a, b) => {
          return new Date(b?.action_date) - new Date(a?.action_date);
        }
      )[0]?.status;

      return lastActionBook;
    },

    showConfirmDialog(value) {
      this.displayConfirmDialog = true;
      this.item = value;
    },
  },

  computed: {
    searchedItems() {
      return this.userReservedBooks.filter((item) => {
        return (
          item.book.title
            ?.toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
          item?.reservation_number
            ?.toLowerCase()
            ?.includes(this.searchQuery.toLowerCase())
        );
      });
    },
  },

  created() {
    this.getReservedBooks();
  },
};
</script>

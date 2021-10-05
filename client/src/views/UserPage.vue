<template>
  <div>
    <Toast />
    <div class="mkdf-has-bg-image" data-height="300">
      <div class="mkdf-title-wrapper" style="height: 300px">
        <div class="mkdf-title-inner" style="height: inherit">
          <div class="mkdf-grid">
            <h2 class="mkdf-page-title entry-title" style="color: #ffffff">
              My reserved books
            </h2>
          </div>
        </div>
      </div>
    </div>
    <div class="user-page">
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
            class="app-text"
          />
        </span>

        <div class="user-page__buttons">
          <Button
            type="button"
            icon="pi pi-book"
            label="All books"
            @click="showAllBooks"
            :class="[
              'p-button-text',
              {
                'user-page__active-search-button':
                  searchQueryButton?.toLowerCase() === 'all',
              },
            ]"
          />

          <Button
            type="button"
            icon="pi pi-calendar"
            label="Must return today"
            @click="showBooksWhichMustReturnToday"
            :class="[
              'p-button-text',
              {
                'user-page__active-search-button':
                  searchQueryButton?.toLowerCase() === 'returntoday',
              },
            ]"
            :badge="returnTodayBooks?.length"
            badgeClass="p-badge-danger"
          />

          <Button
            type="button"
            icon="pi pi-calendar"
            label="Not returned"
            @click="showBooksWhichNotReturned"
            :class="[
              'p-button-text',
              {
                'user-page__active-search-button':
                  searchQueryButton?.toLowerCase() === 'notreturned',
              },
            ]"
            :badge="notReturnedBooks?.length"
            badgeClass="p-badge-danger"
          />
        </div>
      </div>

      <div>
        <Card
          v-for="item in searchedItems"
          :key="item.book_id"
          class="user-page__content"
        >
          <template #header>
            <router-link :to="{ name: 'book', params: { id: item.book._id } }">
              <div class="user-page__img-container">
                <img
                  :src="item.book.img"
                  :alt="item.book.title"
                  class="user-page__content__img"
                />
              </div>
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
            <book-actions-user-page
              :data="item.details"
              :icons="icons"
              :booksWhichNotReturned="notReturnedBooks"
              :isNotReturned="isNotReturned(item)"
            />
          </template>

          <template #footer>
            <Button
              v-if="getLastActionBook(item) === 'Reserved'"
              icon="pi pi-times"
              label="Cancel reservation"
              class="p-button-warning"
              @click="showConfirmDialog(item)"
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
      <p v-if="!userReservedBooks?.length" style="font-size: 1.2rem">
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
  props: {
    notReturned: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      moment: moment,
      displayConfirmDialog: false,

      filteredData: null,
      bookActions: [],
      item: null,
      searchQueryButton: "all",
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

    async cancelReserve(value) {
      try {
        await API.post(`books/cancelbook`, {
          user: this.user,
          userAction: this.user,
          book: value.book,
          libraryID: value.library,
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

    showBooksWhichNotReturned() {
      this.filteredData = [...this.notReturnedBooks];
      this.searchQueryButton = "notreturned";
    },

    showBooksWhichMustReturnToday() {
      this.filteredData = [...this.returnTodayBooks];
      this.searchQueryButton = "returntoday";
    },

    showAllBooks() {
      this.filteredData = null;
      this.searchQueryButton = "all";
    },

    isNotReturned(book) {
      return !!this.notReturnedBooks?.filter((item) => {
        return item.book.title === book.book?.title;
      })?.length;
    },
  },

  computed: {
    searchedItems() {
      if (this.filteredData) {
        return [...this.filteredData];
      }
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
    this.getNotReturnedBooks(this.$route.params.id);
    this.getReturnTodayBooks(this.$route.params.id);

    if (this.notReturned) {
      this.showBooksWhichNotReturned();
    }
  },
};
</script>

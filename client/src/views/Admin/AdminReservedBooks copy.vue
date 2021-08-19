<template>
  <div>
    <Toast />
    <admin-table
      titleTable="Reserved books"
      v-model:searchQuery="searchQuery"
      :data="searchedItems"
      :showTableButtons="false"
      :showHeaderButtons="false"
      typeTableButton="received"
      @openModal="openModal"
      @openEditModal="editModal"
    >
      <template #content>
        <Column field="data.user.username" header="User" :sortable="true">
          <template #body="slotProps">
            {{ slotProps.data.data.user.username }}
          </template>
        </Column>

        <Column field="data.book.title" header="Book" :sortable="true">
          <template #body="slotProps">
            {{ slotProps.data.data.book.title }}
          </template>
        </Column>

        <Column field="data.status" header="Status" :sortable="true">
          <template #body="slotProps">
            {{ slotProps.data.data.status }}
          </template>
        </Column>

        <Column field="data.action_date" header="Action date" :sortable="true">
          <template #body="slotProps">
            {{
              moment(slotProps.data.data.action_date).format("YYYY-MM-DD HH:mm")
            }}
          </template>
        </Column>

        <Column :exportable="false">
          <template #body="slotProps">
            <Button
              v-if="slotProps.data.data.status?.toLowerCase() === 'reserved'"
              label="Give out book"
              icon="pi pi-user"
              class="p-button-rounded p-button-success p-mr-2"
              @click="
                confirm(
                  slotProps.data.data.book,
                  slotProps.data.data.user,
                  slotProps.data.data.status
                )
              "
            />

            <Button
              v-if="slotProps.data.data.status?.toLowerCase() === 'received'"
              label="Return book"
              icon="pi pi-book"
              class="p-button-rounded p-button-warning p-mr-2"
              @click="
                confirm(
                  slotProps.data.data.book,
                  slotProps.data.data.user,
                  slotProps.data.data.status
                )
              "
            />
          </template>
        </Column>
      </template>
    </admin-table>
    <Dialog
      v-model:visible="showDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span v-if="data?.book">
          Are you sure you want to {{ textDialog }} the book
          <b>{{ data?.book?.title }}</b
          >?</span
        >
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          class="p-button-text"
          @click="showDialog = false"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          class="p-button-text"
          @click="getActionBook"
        />
      </template>
    </Dialog>
  </div>
</template>

<script>
import moment from "moment";
import API from "@/utils/api";
import AdminTable from "@/components/Admin/AdminTable.vue";

import adminFormMixin from "@/mixins/adminFormMixin.js";
import dataStore from "@/mixins/dataStore.js";
import toggle from "@/mixins/toggle.js";

export default {
  name: "admin-users",
  props: ["reservedBookTitle"],
  mixins: [toggle, adminFormMixin, dataStore],
  components: {
    AdminTable,
  },

  data() {
    return {
      moment,
      showDialog: false,
      textDialog: "",
      action: "",
      data: {
        user: "",
        book: "",
      },

      icons: [
        {
          status: "Reserved",
          icon: "pi pi-user",
          color: "#FF9800",
        },

        {
          status: "Received",
          icon: "pi pi-book",
          color: "#0288D1",
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
    getActionBook() {
      if (this.action?.toLowerCase() === "reserved") {
        this.giveOutBook();
      } else if (this.action?.toLowerCase() === "received") {
        this.returnBook();
      }
    },

    confirm(book, user, action) {
      this.data = { book, user };
      this.showDialog = true;
      this.action = action;
    },

    async giveOutBook() {
      try {
        await API.post(`/books/giveoutbook`, {
          book: this.data.book,
          user: this.data.user,
          userAction: this.user,
        });
        this.getReservedBooks();
        this.showMessage("Book received");
      } catch (error) {
        console.log(error);
        this.getReservedBooks();
        this.showErrorMessage(error.response.data.message);
      }

      this.showDialog = false;
    },

    async returnBook() {
      try {
        await API.post(`/books/returnbook`, {
          book: this.data.book,
          user: this.data.user,
          userAction: this.user,
        });
        this.getReservedBooks();
        this.showMessage("Book returned");
      } catch (error) {
        console.log(error);
        this.getReservedBooks();
        this.showErrorMessage(error.response.data.message);
      }

      this.showDialog = false;
    },
  },

  computed: {
    searchedItems() {
      return this.reservedBooks.filter((item) => {
        return (
          item.data.book.title
            ?.toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
          item.data.user.username
            ?.toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
          item.data.status
            ?.toLowerCase()
            .includes(this.searchQuery.toLowerCase())
        );
      });
    },
  },

  created() {
    this.getReservedBooks();
    this.getBooks();
    this.getUsers();

    if (this.reservedBookTitle) {
      this.searchQuery = this.reservedBookTitle;
    }
  },
};
</script>

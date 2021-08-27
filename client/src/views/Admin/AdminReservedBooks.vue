<template>
  <div>
    <Toast />

    <div class="card">
      <h2>Reserved books</h2>
      <div style="margin: 15px 0">
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
      <div style="margin-bottom: 1em">
        <Button
          v-if="!isExpandAll"
          type="button"
          icon="pi pi-plus"
          label="Expand All"
          @click="expandAll"
          style="margin-right: 1em"
          class="p-button-text"
        />
        <Button
          v-else
          type="button"
          icon="pi pi-minus"
          label="Collapse All"
          @click="collapseAll"
          class="p-button-text"
        />

        <Button
          type="button"
          icon="pi pi-book"
          label="All books"
          @click="filteredData = null"
          class="p-button-text"
        />

        <Button
          type="button"
          icon="pi pi-calendar"
          label="Must return today"
          @click="getBooksWhichMustReturnToday"
          class="p-button-text"
        />

        <Button
          type="button"
          icon="pi pi-calendar"
          label="Not returned"
          @click="getBooksWhichNotReturned"
          class="p-button-text"
        />
      </div>

      <TreeTable
        :value="searchedItems"
        :expandedKeys="expandedKeys"
        sortMode="single"
      >
        <Column
          field="user.username"
          header="User"
          :sortable="true"
          :expander="true"
        >
          <template #body="slotProps">
            {{ slotProps.node.data.user.username }}
          </template>
        </Column>

        <Column field="book.title" header="Book" :sortable="true">
          <template #body="slotProps">
            {{ slotProps.node.data.book.title }}
          </template>
        </Column>

        <Column
          field="reservation_number"
          header="Reservation number"
          :sortable="true"
        >
          <template #body="slotProps">
            {{ slotProps.node.data.reservation_number }}
          </template>
        </Column>

        <Column field="status" header="Status" :sortable="true">
          <template #body="slotProps">
            <span
              :class="'status-' + slotProps.node.data.status.toLowerCase()"
              style="padding: 5px 10px"
            >
              {{ slotProps.node.data.status }}
            </span>
          </template>
        </Column>

        <Column field="action_date" header="Action date" :sortable="true">
          <template #body="slotProps">
            {{
              moment(slotProps.node.data.action_date).format("YYYY-MM-DD HH:mm")
            }}
          </template>
        </Column>

        <Column field="return_date" header="Return date" :sortable="true">
          <template #body="slotProps">
            {{
              slotProps.node.data.return_date
                ? moment(slotProps.node.data.return_date).format(
                    "YYYY-MM-DD HH:mm"
                  )
                : ""
            }}
          </template>
        </Column>

        <Column :exportable="false">
          <template #body="slotProps">
            <Button
              v-if="
                slotProps.node.children &&
                slotProps.node.data.status?.toLowerCase() === 'reserved'
              "
              icon="pi pi-user"
              class="p-button-rounded p-button-success p-mr-2"
              @click="
                confirmGiveOutBook(
                  slotProps.node.data.book,
                  slotProps.node.data.user,
                  slotProps.node.data.reservation_number,
                  slotProps.node.data.status
                )
              "
            />

            <Button
              v-if="
                slotProps.node.children &&
                slotProps.node.data.status?.toLowerCase() === 'received'
              "
              icon="pi pi-book"
              class="p-button-rounded p-button-warning p-mr-2"
              @click="
                confirmReturnBook(
                  slotProps.node.data.book,
                  slotProps.node.data.user,
                  slotProps.node.data.reservation_number,
                  slotProps.node.data.status
                )
              "
            />
          </template>
        </Column>
      </TreeTable>
    </div>

    <confirm-dialog
      :text="textDialog"
      :displayConfirmDialog="displayConfirmDialog"
      @hideConfirmDialog="displayConfirmDialog = false"
      @action="returnBook"
    />

    <Dialog
      v-model:visible="displayMainDialog"
      :style="{ width: '450px' }"
      header="Give out the book"
      :modal="true"
      class="p-fluid"
    >
      <div class="p-field">
        <label for="return_date">Return date</label>
        <input
          id="return_date"
          type="datetime-local"
          v-model="data.return_date"
          required="true"
          class="form-control"
          autofocus
        />
      </div>
      <template #footer>
        <Button
          label="Cancel"
          icon="pi pi-times"
          class="p-button-text"
          @click="displayMainDialog = false"
        />
        <Button
          label="Save"
          icon="pi pi-check"
          class="p-button-text"
          @click="onGiveOutBook"
        />
      </template>
    </Dialog>
  </div>
</template>

<script>
import moment from "moment";
import API from "@/utils/api";

import adminFormMixin from "@/mixins/adminFormMixin.js";
import dataStore from "@/mixins/dataStore.js";
import toggle from "@/mixins/toggle.js";

import ConfirmDialog from "@/components/UI/ConfirmDialog";

export default {
  name: "admin-users",
  components: { ConfirmDialog },
  props: ["reservedBookTitle"],
  mixins: [toggle, adminFormMixin, dataStore],

  data() {
    return {
      moment,
      dataTable: [],
      filteredData: null,
      expandedKeys: {},
      displayConfirmDialog: false,
      displayMainDialog: false,
      textDialog: "",
      action: "",
      isExpandAll: false,
      data: {
        user: "",
        book: "",
        return_date: "",
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
    confirmGiveOutBook(book, user, reservation_number) {
      this.data = {
        book,
        user,
        reservation_number,
        return_date: moment(new Date()).format("YYYY-MM-DDTHH:mm"),
      };
      this.displayMainDialog = true;
    },

    onGiveOutBook() {
      this.displayMainDialog = false;
      this.giveOutBook();
    },

    async giveOutBook() {
      try {
        await API.post(`/books/giveoutbook`, {
          book: this.data.book,
          user: this.data.user,
          userAction: this.user,
          reservation_number: this.data.reservation_number,
          return_date: this.data.return_date,
        });

        this.getDataTable();
        this.showMessage("Book gave out");
      } catch (error) {
        console.log(error);
        this.getDataTable();
        this.showErrorMessage(error.response.data.message);
      }
    },

    confirmReturnBook(book, user) {
      this.data = { book, user };
      this.textDialog = `return the book ${book.title}`;
      this.displayConfirmDialog = true;
    },

    async returnBook() {
      try {
        await API.post(`/books/returnbook`, {
          book: this.data.book,
          user: this.data.user,
          userAction: this.user,
        });
        this.getDataTable();
        this.showMessage("Book returned");
      } catch (error) {
        console.log(error);
        this.getDataTable();
        this.showErrorMessage(error.response.data.message);
      }

      this.displayConfirmDialog = false;
    },

    async getDataTable() {
      try {
        const data = await API.get("/books/modifiedreservedbooks");
        this.dataTable = data.data;
      } catch (error) {
        console.log(error);
      }
    },

    expandAll() {
      for (let node of this.dataTable) {
        this.expandNode(node);
      }
      this.isExpandAll = true;

      this.expandedKeys = { ...this.expandedKeys };
    },

    collapseAll() {
      this.expandedKeys = {};
      this.isExpandAll = false;
    },

    expandNode(node) {
      if (node.children && node.children.length) {
        this.expandedKeys[node.key] = true;

        for (let child of node.children) {
          this.expandNode(child);
        }
      }
    },

    getBooksWhichNotReturned() {
      const today = new Date().setHours(0, 0, 0, 0);
      const booksWhichNotReturned = this.dataTable.filter(
        (elem) =>
          elem.data.status === "Received" &&
          new Date(elem.data.return_date).setHours(0, 0, 0, 0) < today &&
          new Date(elem.data.return_date).setHours(0, 0, 0, 0) !== today
      );

      this.filteredData = [...booksWhichNotReturned];
    },

    getBooksWhichMustReturnToday() {
      const today = new Date().setHours(0, 0, 0, 0);
      const booksWhichMustReturnToday = this.dataTable.filter((elem) => {
        return (
          elem.data.status === "Received" &&
          today === new Date(elem.data.return_date).setHours(0, 0, 0, 0)
        );
      });

      this.filteredData = [...booksWhichMustReturnToday];
    },
  },

  computed: {
    searchedItems() {
      if (this.filteredData) {
        return [...this.filteredData];
      }
      return this.dataTable.filter((item) => {
        return (
          item?.data.book?.title
            ?.toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
          item?.user?.username
            ?.toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
          item?.data?.reservation_number
            ?.toLowerCase()
            ?.includes(this.searchQuery.toLowerCase())
        );
      });
    },
  },

  created() {
    this.getDataTable();
    this.getBooks();
    this.getUsers();

    if (this.reservedBookTitle) {
      this.searchQuery = this.reservedBookTitle;
    }
  },
};
</script>

<style scoped lang="scss">
.sm-visible {
  display: none;
}

@media screen and (max-width: 40em) {
  ::v-deep(.sm-invisible) {
    display: none;
  }

  ::v-deep(.sm-visible) {
    display: inline;
    margin-right: 0.5rem;
  }
}
</style>

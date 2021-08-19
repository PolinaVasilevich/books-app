<template>
  <div>
    <Toast />

    <div class="card">
      <h2>Reserved books</h2>

      <div style="margin-bottom: 1em">
        <Button
          type="button"
          icon="pi pi-plus"
          label="Expand All"
          @click="expandAll"
          style="margin-right: 1em"
          class="p-button-text"
        />
        <Button
          type="button"
          icon="pi pi-minus"
          label="Collapse All"
          @click="collapseAll"
          class="p-button-text"
        />
      </div>

      <TreeTable
        :value="dataTable"
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

        <Column field="status" header="Status" :sortable="true">
          <template #body="slotProps">
            {{ slotProps.node.data.status }}
          </template>
        </Column>

        <Column field="action_date" header="Action date" :sortable="true">
          <template #body="slotProps">
            {{
              moment(slotProps.node.data.action_date).format("YYYY-MM-DD HH:mm")
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
              label="Give out book"
              icon="pi pi-user"
              class="p-button-rounded p-button-success p-mr-2"
              @click="
                confirm(
                  slotProps.node.data.book,
                  slotProps.node.data.user,
                  slotProps.node.data.status
                )
              "
            />

            <Button
              v-if="
                slotProps.node.children &&
                slotProps.node.data.status?.toLowerCase() === 'received'
              "
              label="Return book"
              icon="pi pi-book"
              class="p-button-rounded p-button-warning p-mr-2"
              @click="
                confirm(
                  slotProps.node.data.book,
                  slotProps.node.data.user,
                  slotProps.node.data.status
                )
              "
            />
          </template>
        </Column>
      </TreeTable>
    </div>

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

import adminFormMixin from "@/mixins/adminFormMixin.js";
import dataStore from "@/mixins/dataStore.js";
import toggle from "@/mixins/toggle.js";

export default {
  name: "admin-users",
  props: ["reservedBookTitle"],
  mixins: [toggle, adminFormMixin, dataStore],

  data() {
    return {
      moment,
      dataTable: [],
      expandedKeys: {},
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

    getDataTable() {
      const dataTable = [];
      let item = {};
      let children = {};
      this.reservedBooks.forEach((elem1, index) => {
        item.key = index;
        item.user = elem1._id.user;
        item.data = elem1.data[0];
        item.data.user = elem1._id.user;
        item.data.book = elem1._id.book;
        item.children = [];

        elem1.data.slice(1).forEach((elem2, index) => {
          children.key = index;
          children.data = elem2;
          children.data.user = elem1._id.user;
          children.data.book = elem1._id.book;
          item.children.push(children);
          children = {};
        });

        dataTable.push(item);
        item = {};
      });

      this.dataTable = dataTable;
    },

    expandAll() {
      for (let node of this.dataTable) {
        this.expandNode(node);
      }

      this.expandedKeys = { ...this.expandedKeys };
    },

    collapseAll() {
      this.expandedKeys = {};
    },

    expandNode(node) {
      if (node.children && node.children.length) {
        this.expandedKeys[node.key] = true;

        for (let child of node.children) {
          this.expandNode(child);
        }
      }
    },
  },

  computed: {
    // searchedItems() {
    //   return this.reservedBooks.filter((item) => {
    //     return (
    //       item.data.book.title
    //         ?.toLowerCase()
    //         .includes(this.searchQuery.toLowerCase()) ||
    //       item.data.user.username
    //         ?.toLowerCase()
    //         .includes(this.searchQuery.toLowerCase()) ||
    //       item.data.status
    //         ?.toLowerCase()
    //         .includes(this.searchQuery.toLowerCase())
    //     );
    //   });
    // },
  },

  created() {
    this.getReservedBooks();
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

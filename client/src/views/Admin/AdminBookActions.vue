<template>
  <div>
    <Toast />

    <div class="card">
      <h2>All book actions</h2>
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
            class="app-text"
          />
        </span>
      </div>
      <DataTable
        :value="searchedItems"
        :paginator="true"
        :rows="10"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 25]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
        responsiveLayout="scroll"
      >
        <Column
          field="userAction.username"
          header="User action"
          :sortable="true"
        >
          <template #body="slotProps">
            {{ slotProps.data?.userAction?.username }}
          </template>
        </Column>

        <Column field="user.username" header="User" :sortable="true">
          <template #body="slotProps">
            {{ slotProps.data.user.username }}
          </template>
        </Column>

        <Column field="book.title" header="Book" :sortable="true">
          <template #body="slotProps">
            {{ slotProps.data.book?.title }}
          </template>
        </Column>

        <Column field="status" header="Status" :sortable="true"> </Column>

        <Column field="action_date" header="Action date" :sortable="true">
          <template #body="slotProps">
            {{
              slotProps.data.action_date
                ? moment(slotProps.data.action_date).format("YYYY-MM-DD HH:mm")
                : ""
            }}
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import API from "@/utils/api";

import adminFormMixin from "@/mixins/adminFormMixin.js";
import dataStore from "@/mixins/dataStore.js";
import toggle from "@/mixins/toggle.js";

export default {
  name: "admin-book-actions",

  mixins: [toggle, adminFormMixin, dataStore],

  data() {
    return {
      moment,
      data: {
        user: "",
        book: "",
        date_reserved: "",
      },

      editForm: {
        _id: "",
        user: "",
        book: "",
        return_date: moment(new Date()).format("YYYY-MM-DDTHH:mm"),
      },
    };
  },

  methods: {
    async onDeleteData(value) {
      try {
        await API.delete(`/books/deletereservedbook/${value._id}`, {
          data: { book: value.book },
        });

        this.getReservedBooks();
        this.getBooks();
        this.getUsers();

        this.$toast.add({
          severity: "success",
          summary: "Successful",
          detail: `Reserve ${value.book.title} deleted`,
          life: 3000,
        });
      } catch (error) {
        console.log(error);
        this.getReservedBooks();
        this.getBooks();
        this.getUsers();

        this.$toast.add({
          severity: "error",
          summary: "Error Message",
          detail: `${error.response.data.message}`,
          life: 3000,
        });
      }
    },

    resetForm() {
      this.data.user = this.users[0];
      this.data.book = this.books[0];
      this.data.date_reserved = moment(new Date()).format("YYYY-MM-DDTHH:mm");
    },

    resetEditForm() {
      this.editForm.user = this.initialEditForm.user;
      this.editForm.book = this.initialEditForm.book;
      this.editForm.date_reserved = moment(
        this.initialEditForm.date_reserved
      ).format("YYYY-MM-DDTHH:mm");
    },
  },

  computed: {
    searchedItems() {
      return this.bookActions.filter((item) => {
        return (
          item.book.title
            ?.toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
          item?.user.username
            ?.toLowerCase()
            ?.includes(this.searchQuery.toLowerCase()) ||
          item?.status?.toLowerCase()?.includes(this.searchQuery.toLowerCase())
        );
      });
    },
  },

  created() {
    this.getAllBookActions();
  },
};
</script>

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
      <DataTable
        :value="searchedItems"
        :paginator="true"
        :rows="10"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 25]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
        responsiveLayout="scroll"
      >
        <Column field="user.username" header="User" :sortable="true">
          <template #body="slotProps">
            {{ slotProps.data.user.username }}
          </template>
        </Column>

        <Column field="book.title" header="Book" :sortable="true">
          <template #body="slotProps">
            {{ slotProps.data.book.title }}
          </template>
        </Column>

        <Column field="text" header="Review">
          <template #body="slotProps">
            {{
              !slotProps.data.isHidden
                ? slotProps.data.text
                : "This comment is hidden by the administrator"
            }}
          </template>
        </Column>

        <Column field="created_date" header="Created date" :sortable="true">
          <template #body="slotProps">
            {{ moment(slotProps.data.created_date).format("YYYY-MM-DD HH:mm") }}
          </template>
        </Column>

        <Column field="edit_date" header="Edit date" :sortable="true">
          <template #body="slotProps">
            {{
              slotProps.data.edit_date
                ? moment(slotProps.data.edit_date).format("YYYY-MM-DD HH:mm")
                : ""
            }}
          </template>
        </Column>
        <Column
          field="rating"
          header="Rating"
          :sortable="true"
          style="min-width: 12rem"
        >
          <template #body="slotProps">
            <Rating
              :modelValue="slotProps.data.rating"
              :readonly="true"
              :cancel="false"
            />
          </template>
        </Column>

        <Column :exportable="false">
          <template #body="slotProps">
            <Button
              v-if="!slotProps.data.isHidden"
              icon="pi pi-eye-slash"
              class="p-button-rounded p-button-warning"
              @click="confirmHideReview(slotProps.data, 'hide')"
            />
            <Button
              v-if="slotProps.data.isHidden"
              icon="pi pi-eye"
              class="p-button-rounded p-button-success p-mr-2"
              @click="confirmHideReview(slotProps.data, 'show')"
            />
          </template>
        </Column>
      </DataTable>
    </div>
    <Dialog
      v-model:visible="itemHideDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span
          >Are you sure you want to {{ textDialog ? textDialog : "hide" }} this
          review?</span
        >
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          class="p-button-text"
          @click="itemHideDialog = false"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          class="p-button-text"
          @click="hideReview"
        />
      </template>
    </Dialog>
  </div>
</template>

<script>
import API from "@/utils/api";
import moment from "moment";

import adminFormMixin from "@/mixins/adminFormMixin.js";
import dataStore from "@/mixins/dataStore.js";
import toggle from "@/mixins/toggle.js";

export default {
  name: "admin-users",
  mixins: [toggle, adminFormMixin, dataStore],

  data() {
    return {
      moment: moment,
      textDialog: "",
      itemHideDialog: false,
      currentReview: null,
    };
  },

  methods: {
    confirmHideReview(value, textDialog) {
      this.itemHideDialog = true;
      this.currentReview = value;
      this.textDialog = textDialog;
    },

    async hideReview() {
      try {
        await API.put(`/books/updatereview/${this.currentReview._id}`, {
          ...this.currentReview,
          isHidden: !this.currentReview.isHidden,
        });
        this.currentReview = {};

        this.getReviews();
        this.showMessage("Item updated");
      } catch (error) {
        this.getReviews();
        console.log(error);
        this.showErrorMessage(error.response.data.message);
      }
      this.itemHideDialog = false;
    },
  },

  computed: {
    searchedItems() {
      return this.reviews.filter((item) => {
        return (
          item.book.title
            ?.toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
          item.user.username
            ?.toLowerCase()
            .includes(this.searchQuery.toLowerCase())
        );
      });
    },
  },

  created() {
    this.getReviews();
    this.getBooks();
    this.getUsers();
  },
};
</script>

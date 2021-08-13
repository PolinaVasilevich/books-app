<template>
  <div>
    <div class="card">
      <Toolbar class="p-mb-4">
        <template #left>
          <Button
            label="New"
            icon="pi pi-plus"
            class="p-button-success p-mr-2"
            @click="openNew"
            :disabled="disabledCreateButton"
          />
          <Button
            label="Delete"
            icon="pi pi-trash"
            class="p-button-danger"
            @click="confirmDeleteSelected"
            :disabled="!selectedItems || !selectedItems.length"
          />
        </template>

        <template #right>
          <FileUpload
            mode="basic"
            accept="image/*"
            :maxFileSize="1000000"
            label="Import"
            chooseLabel="Import"
            class="p-mr-2 p-d-inline-block"
          />
          <Button
            label="Export"
            icon="pi pi-upload"
            class="p-button-help"
            @click="exportCSV($event)"
          />
        </template>
      </Toolbar>

      <DataTable
        ref="dt"
        :value="data"
        v-model:selection="selectedItems"
        dataKey="_id"
        :paginator="true"
        :rows="10"
        :filters="filters"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 25]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
        responsiveLayout="scroll"
      >
        <template #header>
          <div
            class="
              table-header
              p-d-flex p-flex-column p-flex-md-row p-jc-md-between
            "
          >
            <h5 class="p-mb-2 p-m-md-0 p-as-md-center">{{ title }}</h5>
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText placeholder="Search..." />
            </span>
          </div>
        </template>

        <Column
          selectionMode="multiple"
          style="width: 3rem"
          :exportable="false"
        ></Column>

        <slot name="content"></slot>
        <Column :exportable="false">
          <template #body="slotProps">
            <Button
              icon="pi pi-pencil"
              class="p-button-rounded p-button-success p-mr-2"
              @click="editItem(slotProps.data)"
            />
            <Button
              icon="pi pi-trash"
              class="p-button-rounded p-button-warning"
              @click="confirmDeleteItem(slotProps.data)"
            />
          </template>
        </Column>
      </DataTable>
    </div>
    <slot name="modal"></slot>
    <Dialog
      v-model:visible="deleteItemDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span v-if="item"
          >Are you sure you want to delete entry with id <b>{{ item._id }}</b
          >?</span
        >
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          class="p-button-text"
          @click="deleteItemDialog = false"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          class="p-button-text"
          @click="deleteItem"
        />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="deleteItemsDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span v-if="item"
          >Are you sure you want to delete the selected entries?</span
        >
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          class="p-button-text"
          @click="deleteItemsDialog = false"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          class="p-button-text"
          @click="deleteSelectedItems"
        />
      </template>
    </Dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedItems: null,
      item: {},
      items: null,
      deleteItemDialog: false,
      deleteItemsDialog: false,
      submitted: false,
    };
  },
  props: {
    title: {
      type: String,
      default: "Items",
    },
    data: {
      type: Array,
      required: true,
    },
    disabledCreateButton: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    confirmDeleteItem(item) {
      this.item = item;
      this.deleteItemDialog = true;
    },

    confirmDeleteSelected() {
      this.deleteItemsDialog = true;
    },

    deleteItem() {
      this.$emit("deleteItem", this.item);
      this.deleteItemDialog = false;
      this.product = {};
    },

    openNew() {
      this.item = {};
      this.submitted = false;
      this.$emit("openModal");
    },

    hideDialog() {
      this.itemDialog = false;
      this.submitted = false;
    },

    editItem(item) {
      this.item = { ...item };
      this.$emit("openEditModal", this.item);
    },

    exportCSV() {
      this.$refs.dt.exportCSV();
    },
  },
};
</script>

<style></style>

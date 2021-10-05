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
          />
          <Button
            label="Delete"
            icon="pi pi-trash"
            class="p-button-danger"
            @click="confirmDeleteSelected"
            :disabled="!selectedProducts || !selectedProducts.length"
          />
        </template>

        <template #right>
          <!-- <FileUpload
            mode="basic"
            accept="image/*"
            :maxFileSize="1000000"
            label="Import"
            chooseLabel="Import"
            class="p-mr-2 p-d-inline-block"
          /> -->
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
        :value="items"
        v-model:selection="selectedProducts"
        dataKey="id"
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

        <Column
          field="title"
          header="Title"
          :sortable="true"
          style="min-width: 16rem"
        ></Column>

        <Column header="Author" :sortable="true" style="min-width: 12rem">
          <template #body="slotProps">{{
            slotProps.data.author.first_name +
            " " +
            slotProps.data.author.last_name
          }}</template>
        </Column>

        <Column
          field="genre"
          header="Genre"
          :sortable="true"
          style="min-width: 8rem"
        >
          <template #body="slotProps">{{ slotProps.data.genre.name }}</template>
        </Column>

        <Column header="Image">
          <template #body="slotProps">
            <img
              src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
              :alt="slotProps.data.image"
              class="product-image"
            />
          </template>
        </Column>
        <Column
          field="count"
          header="Count"
          :sortable="true"
          style="min-width: 3rem"
        >
          <!-- <template #body="slotProps">
            {{ formatCurrency(slotProps.data.price) }}
          </template> -->
        </Column>

        <Column
          field="rating"
          header="Reviews"
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
        <!-- <Column
          field="inventoryStatus"
          header="Status"
          :sortable="true"
          style="min-width: 12rem"
          >>
          <template #body="slotProps">
            <span
              :class="
                'product-badge status-' +
                (slotProps.data.inventoryStatus
                  ? slotProps.data.inventoryStatus.toLowerCase()
                  : '')
              "
              >{{ slotProps.data.inventoryStatus }}</span
            >
          </template>
        </Column> -->
        <Column :exportable="false">
          <template #body="slotProps">
            <Button
              icon="pi pi-pencil"
              class="p-button-rounded p-button-success p-mr-2"
              @click="editProduct(slotProps.data)"
            />
            <Button
              icon="pi pi-trash"
              class="p-button-rounded p-button-warning"
              @click="confirmDeleteProduct(slotProps.data)"
            />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Items",
    },
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style></style>

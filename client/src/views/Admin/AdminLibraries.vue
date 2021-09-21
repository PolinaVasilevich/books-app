<template>
  <div>
    <Toast />

    <DataTable
      :value="data"
      v-model:expandedRows="expandedRows"
      dataKey="_id"
      responsiveLayout="scroll"
    >
      <!-- <template #header>
        <div class="table-header-container">
          <Button
            icon="pi pi-plus"
            label="Expand All"
            @click="expandAll"
            class="p-mr-2"
          />
          <Button
            icon="pi pi-minus"
            label="Collapse All"
            @click="collapseAll"
          />
        </div>
      </template> -->

      <Column :expander="true" headerStyle="width: 3rem" />
      <Column field="name" header="Name" sortable></Column>
      <Column field="address" header="Address"></Column>

      <Column>
        <template #body>
          <Button
            label="Add book"
            icon="pi pi-plus"
            class="books-page__admin-button p-button-success p-mr-2"
            @click="openModal"
          />
        </template>
      </Column>

      <template #expansion="slotProps">
        <div class="orders-subtable" v-if="slotProps.data.books.length">
          <DataTable :value="slotProps.data.books" responsiveLayout="scroll">
            <Column field="book.title" header="Title" sortable></Column>
            <Column field="count" header="Count" sortable></Column>
          </DataTable>
        </div>
      </template>
    </DataTable>
  </div>
</template>

<script>
import moment from "moment";
import { ref, onMounted } from "vue";

import API from "@/utils/api";

import ConfirmDialog from "@/components/UI/ConfirmDialog";

export default {
  name: "admin-libraries",

  setup() {
    onMounted(() => {
      getLibraries();
    });

    const data = ref([]);
    const loading = ref(true);

    const expandedRows = ref([]);

    const getLibraries = async () => {
      try {
        const response = await API.get("/books/libraries");
        data.value = response.data;
      } catch (error) {
        console.log(error);
      } finally {
        loading.value = false;
      }
    };

    return { data, expandedRows, loading };
  },
};
</script>

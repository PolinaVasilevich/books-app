<template>
  <div>
    <Toast />
    <div class="card">
      <h2>Libraries</h2>
      <div style="margin: 15px 0">
        <!-- <span
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
        </span> -->
      </div>
      <DataTable
        v-if="!loading"
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
          <template #body="slotProps">
            <Button
              label="Add book"
              icon="pi pi-plus"
              class="books-page__admin-button p-button-success p-mr-2"
              @click="handleAddBook(slotProps.data)"
            />
          </template>
        </Column>

        <template #expansion="slotProps">
          <div class="orders-subtable" v-if="slotProps.data.books.length">
            <DataTable :value="slotProps.data.books" responsiveLayout="scroll">
              <Column field="book.title" header="Title" sortable></Column>
              <Column field="count" header="Count" sortable></Column>
              <Column>
                <template #body="slotProps">
                  <Button
                    icon="pi pi-pencil"
                    class="p-button-rounded p-button-warning p-mr-2"
                    @click="handleEditForm(slotProps.data)"
                  />
                </template>
              </Column>
            </DataTable>
          </div>
        </template>
      </DataTable>
    </div>
    <div>
      <Dialog
        v-model:visible="displayDialog"
        :header="
          !initialForm.library ? 'Add a book to library' : `Enter count of book`
        "
        :modal="true"
        style="width: 40vw"
      >
        <admin-library-book-form
          @submitForm="onAddBookToLibrary"
          :books="books"
          :initialForm="initialForm"
        />
      </Dialog>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import moment from "moment";

import useLibraries from "@/hooks/Libraries/useLibraries";
import useMessage from "@/hooks/useMessage";
import useBooks from "@/hooks/Books/useBooks";
import useDialog from "@/hooks/useDialog";
import ConfirmDialog from "@/components/UI/ConfirmDialog";
import AdminLibraryBookForm from "@/components/Admin/Forms/AdminLibraryBookForm";

export default {
  name: "admin-libraries",
  components: { AdminLibraryBookForm },

  setup() {
    onMounted(() => {
      getLibraries();
      getBooks();
    });

    const expandedRows = ref([]);
    const selectedLibrary = ref(null);
    const initialForm = ref({
      book: {},
      count: null,
    });

    const { submitted, displayDialog, hideDialog, showDialog } = useDialog();
    const { showErrorMessage, showSuccessfulMessage } = useMessage();
    const {
      response: data,
      loading,
      error,
      errorMessage,
      responseMessage,
      getLibraries,
      addBookToLibrary,
    } = useLibraries();

    const {
      response: books,
      loading: loadingBooks,
      errorMessage: errorMessageBooks,
      responseMessage: responseMessageBooks,
      getBooks,
    } = useBooks();

    const onAddBookToLibrary = async (form) => {
      if (form.library) {
        await addBookToLibrary(form.library, {
          book: { ...form.book },
          count: form.count,
        });
      } else {
        console.log(form);
        await addBookToLibrary(selectedLibrary.value._id, form);
        console.log(form);
      }

      hideDialog();
      getLibraries();
      if (error) {
        showErrorMessage(error.value);
      } else {
        showSuccessfulMessage(responseMessage);
      }
    };

    const handleAddBook = (library) => {
      initialForm.value = {
        book: {},
        count: null,
      };
      showDialog();
      selectedLibrary.value = library;
    };

    const handleEditForm = (value) => {
      initialForm.value = { ...value };
      showDialog();
    };

    return {
      data,
      loading,
      books,
      expandedRows,
      displayDialog,
      selectedLibrary,
      handleAddBook,
      onAddBookToLibrary,
      handleEditForm,
      initialForm,
    };
  },
};
</script>

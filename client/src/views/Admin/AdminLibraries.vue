<template>
  <div>
    <Toast />
    <div class="card">
      <h2>Libraries</h2>
      <div>
        <Button
          icon="pi pi-plus"
          label="Add new library"
          @click="handleAddLibrary"
          class="p-button-raised p-button-info p-button-text"
        />
      </div>

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
        v-if="!loading"
        :value="searchedLibraries"
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
            <div style="display: flex; flex-direction: column">
              <Button
                style="width: 150px; margin-bottom: 20px"
                label="Add book"
                icon="pi pi-plus"
                class="p-button-raised p-button-success p-button-text"
                @click="handleAddBook(slotProps.data)"
              />
              <Button
                style="width: 150px"
                label="Delete library"
                icon="pi pi-trash"
                class="p-button-raised p-button-danger p-button-text"
                @click="confirmDeleteLibrary(slotProps.data)"
              />
            </div>
          </template>
        </Column>

        <template #expansion="slotProps">
          <div class="orders-subtable" v-if="slotProps.data.books[0].book">
            <DataTable :value="slotProps.data.books" responsiveLayout="scroll">
              <Column field="book.title" header="Title" sortable></Column>
              <Column field="count" header="Count" sortable></Column>
              <Column style="text-align: center">
                <template #body="slotProps">
                  <Button
                    icon="pi pi-pencil"
                    class="p-button-rounded p-button-warning p-mr-2"
                    @click="handleEditForm(slotProps.data)"
                  />

                  <Button
                    icon="pi pi-trash"
                    class="p-button-rounded p-button-danger"
                    @click="confirmDeleteBook(slotProps.data)"
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

      <Dialog
        v-model:visible="displayLibraryDialog"
        :header="
          !initialLibraryForm.library
            ? 'Add new library'
            : `Edit the library ${initialLibraryForm.name}`
        "
        :modal="true"
        style="width: 40vw"
      >
        <admin-library-form
          @submitForm="addNewLibrary"
          :initialForm="initialLibraryForm"
          @cancel="hideLibraryDialog"
        />
      </Dialog>
    </div>
    <confirm-dialog
      text="delete this item"
      :displayConfirmDialog="displayConfirmDialog"
      @hideConfirmDialog="displayConfirmDialog = false"
      @action="actionDelete"
    />
  </div>
</template>

<script lang="ts">
import { ref, onMounted, defineComponent } from "vue";
import moment from "moment";

import useLibraries from "@/hooks/Libraries/useLibraries";
import useSearchedLibraries from "@/hooks/Libraries/useSearchedLibraries";
import Library from "@/models/Library";
import BookLibrary from "@/models/BookLibrary";
import useMessage from "@/hooks/useMessage";
import useBooks from "@/hooks/Books/useBooks";
import useDialog from "@/hooks/useDialog";
import ConfirmDialog from "@/components/UI/ConfirmDialog.vue";
import AdminLibraryForm from "@/components/Admin/Forms/AdminLibraryForm.vue";
import AdminLibraryBookForm from "@/components/Admin/Forms/AdminLibraryBookForm.vue";

export default defineComponent({
  name: "admin-libraries",
  components: { AdminLibraryBookForm, AdminLibraryForm, ConfirmDialog },

  setup() {
    onMounted(() => {
      getLibraries();
      getBooks();
    });

    const expandedRows = ref([]);
    const actionDelete = ref<any>(null);
    const displayConfirmDialog = ref(false);
    const deleteItem = ref<any>(null);
    const selectedLibrary = ref<any>(null);

    const initialForm = ref({
      _id: "",
      book: {},
      count: null,
    });

    const initialLibraryForm = ref({
      _id: "",
      name: "",
      address: "",
    });

    const { submitted, displayDialog, hideDialog, showDialog } = useDialog();
    const {
      displayDialog: displayLibraryDialog,
      hideDialog: hideLibraryDialog,
      showDialog: showLibraryDialog,
    } = useDialog();

    const { showErrorMessage, showSuccessfulMessage } = useMessage();
    const {
      response: data,
      loading,
      errorMessage,
      responseMessage,
      getLibraries,
      addBookToLibrary,
      deleteBookLibrary,
      deleteLibrary,
    } = useLibraries();

    const {
      errorMessage: errorMessageAddLibrary,
      responseMessage: responseMessageAddLibrary,
      addLibrary,
    } = useLibraries();

    const { searchQuery, searchedLibraries } = useSearchedLibraries(data);

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
        await addBookToLibrary(selectedLibrary.value._id, form);
      }

      hideDialog();

      if (errorMessage.value) {
        showErrorMessage(errorMessage.value);
      } else {
        showSuccessfulMessage(responseMessage);
      }
      getLibraries();
    };

    const handleAddBook = (library) => {
      initialForm.value = {
        _id: "",
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

    const handleAddLibrary = () => {
      initialLibraryForm.value = {
        _id: "",
        name: "",
        address: "",
      };
      showLibraryDialog();
    };

    const addNewLibrary = async (data) => {
      await addLibrary({
        _id: "",
        name: data.name,
        address: data.address,
      });

      hideLibraryDialog();
      getLibraries();

      if (errorMessageAddLibrary.value) {
        showErrorMessage(errorMessageAddLibrary.value);
      } else {
        showSuccessfulMessage(responseMessageAddLibrary);
      }
    };

    const confirmDeleteBook = (data) => {
      actionDelete.value = onDeleteBookLibrary;
      displayConfirmDialog.value = true;
      deleteItem.value = data;
    };

    const onDeleteBookLibrary = async () => {
      displayConfirmDialog.value = false;
      await deleteBookLibrary(
        deleteItem.value.library,
        deleteItem.value.book._id
      );

      getLibraries();

      if (errorMessage.value) {
        showErrorMessage(errorMessage.value);
      } else {
        showSuccessfulMessage(responseMessage);
      }
    };

    const confirmDeleteLibrary = (data) => {
      actionDelete.value = onDeleteLibrary;
      displayConfirmDialog.value = true;
      deleteItem.value = data;
    };

    const onDeleteLibrary = async () => {
      displayConfirmDialog.value = false;
      await deleteLibrary(deleteItem.value._id);

      getLibraries();

      if (errorMessage.value) {
        showErrorMessage(errorMessage.value);
      } else {
        showSuccessfulMessage(responseMessage);
      }
    };

    return {
      searchQuery,
      searchedLibraries,
      loading,
      books,
      expandedRows,
      displayDialog,
      selectedLibrary,
      handleAddBook,
      onAddBookToLibrary,
      handleEditForm,
      initialForm,
      initialLibraryForm,
      displayLibraryDialog,
      hideLibraryDialog,
      showLibraryDialog,
      handleAddLibrary,
      addNewLibrary,
      confirmDeleteBook,
      displayConfirmDialog,
      onDeleteBookLibrary,
      actionDelete,
      onDeleteLibrary,
      confirmDeleteLibrary,
    };
  },
});
</script>

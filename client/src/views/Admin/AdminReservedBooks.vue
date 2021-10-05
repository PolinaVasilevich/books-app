<template>
  <div class="admin-reserved-books">
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
            class="app-text"
          />
        </span>
      </div>
      <div style="margin-bottom: 1em">
        <Button
          v-if="!isExpandAll"
          type="button"
          icon="pi pi-plus"
          label="Expand All"
          @click="expandAll(reservedBooks)"
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
          @click="
            filteredData = null;
            searchQueryButton = 'all';
          "
          :class="[
            'p-button-text',
            {
              'active-search-button':
                searchQueryButton?.toLowerCase() === 'all',
            },
          ]"
        />

        <Button
          type="button"
          icon="pi pi-calendar"
          label="Must return today"
          @click="showAllMustReturnTodayBooks"
          :class="[
            'p-button-text',
            {
              'active-search-button':
                searchQueryButton?.toLowerCase() === 'returntoday',
            },
          ]"
          :badge="allMustReturnTodayBooks?.length"
          badgeClass="p-badge-danger"
        />

        <Button
          type="button"
          icon="pi pi-calendar"
          label="Not returned"
          @click="showAllNotReturtedBooks"
          :class="[
            'p-button-text',
            {
              'active-search-button':
                searchQueryButton?.toLowerCase() === 'notreturted',
            },
          ]"
          :badge="allNotReturnedBooks?.length"
          badgeClass="p-badge-danger"
        />
      </div>

      <TreeTable
        v-if="!loading"
        :value="searchedReservedBooks"
        :expandedKeys="expandedKeys"
        responsiveLayout="scroll"
        sortMode="single"
      >
        <Column
          field="user.username"
          header="User"
          :sortable="true"
          :expander="true"
        >
          <template #body="slotProps">
            {{ slotProps.node.data.userAction.username }}
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
      @action="onReturnBook"
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
import store from "@/store";
import { ref, onMounted, computed } from "vue";
import { mapGetters } from "vuex";

import nodeService from "@/hooks/ReservedBooks/nodeService";
import useReservedBooks from "@/hooks/ReservedBooks/useReservedBooks";
import useSearchedReservedBooks from "@/hooks/ReservedBooks/useSearchedReservedBooks";
import useMessage from "@/hooks/useMessage";
import ConfirmDialog from "@/components/UI/ConfirmDialog";

export default {
  name: "admin-users",
  components: { ConfirmDialog },
  props: ["reservedBookTitle"],

  setup() {
    const data = ref({});
    const displayConfirmDialog = ref(false);
    const displayMainDialog = ref(false);
    const textDialog = ref("");
    const searchQueryButton = ref("all");
    const icons = [
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
    ];

    const { isExpandAll, expandedKeys, expandAll, collapseAll } = nodeService();

    const { showErrorMessage, showSuccessfulMessage } = useMessage();

    const {
      data: reservedBooks,
      allMustReturnTodayBooks,
      allNotReturnedBooks,
      loading,
      error,
      responseMessage,
      getReservedBooks,
      giveOutBook,
      returnBook,
      getAllNotReturnedBooks,
      getAllMustReturnTodayBooks,
    } = useReservedBooks();

    const { searchQuery, searchedReservedBooks, filteredData } =
      useSearchedReservedBooks(reservedBooks);

    onMounted(() => {
      getReservedBooks();
      getAllNotReturnedBooks();
      getAllMustReturnTodayBooks();
    });

    const currentUser = computed(() => {
      return store.getters["login/user"];
    });

    const showAllNotReturtedBooks = () => {
      searchQueryButton.value = "notreturted";
      filteredData.value = [...allNotReturnedBooks.value];
    };

    const showAllMustReturnTodayBooks = () => {
      searchQueryButton.value = "returntoday";
      filteredData.value = [...allMustReturnTodayBooks.value];
    };

    const confirmGiveOutBook = (book, user, reservation_number) => {
      data.value = {
        book,
        user,
        reservation_number,
        return_date: moment(new Date()).format("YYYY-MM-DDTHH:mm"),
      };
      displayMainDialog.value = true;
    };

    const confirmReturnBook = (book, user) => {
      data.value = { book, user };
      textDialog.value = `return the book ${book.title}`;
      displayConfirmDialog.value = true;
    };

    const onReturnBook = async () => {
      const { book, user } = data.value;

      await returnBook({
        book,
        user,
        userAction: currentUser.value,
      });

      getReservedBooks();
      getAllNotReturnedBooks();
      getAllMustReturnTodayBooks();
      displayConfirmDialog.value = false;
      if (error.value) {
        showErrorMessage(error.value);
      } else {
        showSuccessfulMessage(responseMessage);
      }
    };

    const onGiveOutBook = async () => {
      const { book, user, reservation_number, return_date } = data.value;

      await giveOutBook({
        book,
        user,
        userAction: currentUser.value,
        reservation_number,
        return_date,
      });

      getReservedBooks();
      getAllNotReturnedBooks();
      getAllMustReturnTodayBooks();
      displayMainDialog.value = false;
      if (error.value) {
        showErrorMessage(error.value);
      } else {
        showSuccessfulMessage(responseMessage);
      }
    };

    return {
      moment,
      textDialog,
      data,
      filteredData,
      displayConfirmDialog,
      displayMainDialog,
      icons,
      isExpandAll,
      expandedKeys,
      expandAll,
      collapseAll,
      searchQuery,
      searchedReservedBooks,
      reservedBooks,
      onReturnBook,
      confirmReturnBook,
      confirmGiveOutBook,
      onGiveOutBook,
      allMustReturnTodayBooks,
      allNotReturnedBooks,
      showAllNotReturtedBooks,
      showAllMustReturnTodayBooks,
      searchQueryButton,
    };
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

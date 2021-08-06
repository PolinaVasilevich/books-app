<template>
  <div class="card">
    <Message v-if="displayMessage" severity="success">{{ message }}</Message>

    <Message v-if="displayErrorMessage" severity="error">{{ message }}</Message>
    <Button
      v-if="user.username === 'admin'"
      label="Create new record"
      class="p-button-outlined"
      @click="openModal"
      style="margin-bottom: 30px; width: 190px; align-self: flex-end"
    />

    <modal-form
      modal-title="Create new record"
      :displayModal="displayModal"
      @close="closeModal"
    >
      <template v-slot:modal-content>
        <admin-books-form
          typeForm="create"
          v-model:title="data.title"
          v-model:author="data.author"
          v-model:genre="data.genre"
          v-model:img="data.img"
          v-model:count="data.count"
          :dataForm="data"
          path="books/book"
          @resetForm="data = initialForm"
          @closeModal="closeModal"
          @showMessage="showMessage"
          @showErrorMessage="showErrorMessage"
        />
      </template>
    </modal-form>
    <DataView :value="books" :layout="layout" :paginator="true" :rows="6">
      <template #header>
        <div class="p-grid p-nogutter">
          <div class="p-col-6" style="text-align: left">
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText placeholder="Search..." />
            </span>
          </div>
          <div class="p-col-6" style="text-align: right">
            <DataViewLayoutOptions v-model="layout" />
          </div>
        </div>
      </template>

      <template #list="slotProps">
        <div class="p-col-12">
          <div class="product-list-item">
            <router-link
              :to="{ name: 'book', params: { id: slotProps.data._id } }"
              ><img :src="slotProps.data.img" :alt="slotProps.data.title" />
            </router-link>

            <div class="product-list-detail">
              <div class="product-name">{{ slotProps.data.title }}</div>
              <div class="product-description">
                {{
                  slotProps.data.author.first_name +
                  " " +
                  slotProps.data.author.last_name
                }}
              </div>
              <Rating
                :modelValue="slotProps.data.rating"
                :readonly="true"
                :cancel="false"
              ></Rating>
            </div>
            <div class="product-list-action">
              <span
                class="product-badge"
                :class="[
                  slotProps.data.count ? 'status-instock' : 'status-outofstock',
                ]"
                >{{ slotProps.data.count ? "INSTOCK" : "OUTOFSTOCK" }}</span
              >
            </div>
          </div>
        </div>
      </template>

      <template #grid="slotProps">
        <div class="p-col-12 p-md-4">
          <div class="product-grid-item card">
            <div class="product-grid-item-top">
              <div>
                <span class="product-category">{{
                  slotProps.data.category
                }}</span>
              </div>
              <span
                class="product-badge"
                :class="[
                  slotProps.data.count ? 'status-instock' : 'status-outofstock',
                ]"
                >{{ slotProps.data.count ? "INSTOCK" : "OUTOFSTOCK" }}</span
              >
            </div>
            <div class="product-grid-item-content">
              <router-link
                :to="{ name: 'book', params: { id: slotProps.data._id } }"
                ><img :src="slotProps.data.img" :alt="slotProps.data.title" />
              </router-link>
              <div class="product-name">{{ slotProps.data.title }}</div>
              <div class="product-description">
                {{
                  slotProps.data.author.first_name +
                  " " +
                  slotProps.data.author.last_name
                }}
              </div>
              <Rating
                :modelValue="slotProps.data.rating"
                :readonly="true"
                :cancel="false"
              ></Rating>
            </div>
          </div>
        </div>
      </template>
    </DataView>
  </div>
</template>

<script>
import adminFormMixin from "@/mixins/adminFormMixin";
import toggle from "@/mixins/toggle.js";

import ModalForm from "@/components/UI/ModalForm";
import AdminBooksForm from "@/components/Admin/Forms/AdminBooksForm";
export default {
  components: {
    ModalForm,
    AdminBooksForm,
  },
  mixins: [adminFormMixin, toggle],
  data() {
    return {
      layout: "grid",
      data: {
        title: "",
        author: "",
        genre: "",
        img: "",
        count: 0,
      },
    };
  },

  created() {
    this.getBooks();
  },
};
</script>

<style lang="scss" scoped>
.card {
  background: #ffffff;
  padding: 2rem;
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 1px 3px 0 rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  margin-bottom: 2rem;
}
.p-dropdown {
  width: 14rem;
  font-weight: normal;
}

.product-name {
  font-size: 1.5rem;
  font-weight: 700;
}

.product-description {
  margin: 0 0 1rem 0;
}

.product-category-icon {
  vertical-align: middle;
  margin-right: 0.5rem;
}

.product-category {
  font-weight: 600;
  vertical-align: middle;
}

::v-deep(.product-list-item) {
  display: flex;
  align-items: center;
  padding: 1rem;
  width: 100%;

  img {
    width: 85%;
    height: 300px;
    object-fit: cover;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    margin-right: 2rem;
  }

  .product-list-detail {
    flex: 1 1 0;
  }

  .p-rating {
    margin: 0 0 0.5rem 0;
  }

  .product-price {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    align-self: flex-end;
  }

  .product-list-action {
    display: flex;
    flex-direction: column;
  }

  .p-button {
    margin-bottom: 0.5rem;
  }
}

::v-deep(.product-grid-item) {
  margin: 0.5rem;
  border: 1px solid #dee2e6;

  .product-grid-item-top,
  .product-grid-item-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  img {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    margin: 2rem 0;
    display: block;
    height: 300px;
    width: 100%;
    object-fit: cover;
    object-position: center;
  }

  .product-grid-item-content {
    text-align: center;
  }

  .product-price {
    font-size: 1.5rem;
    font-weight: 600;
  }
}

@media screen and (max-width: 576px) {
  .product-list-item {
    flex-direction: column;
    align-items: center;

    img {
      margin: 2rem 0;
    }

    .product-list-detail {
      text-align: center;
    }

    .product-price {
      align-self: center;
    }

    .product-list-action {
      display: flex;
      flex-direction: column;
    }

    .product-list-action {
      margin-top: 2rem;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
  }
}
</style>

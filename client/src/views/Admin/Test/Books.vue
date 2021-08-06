<template>
  <div class="card">
    <DataView
      :value="books"
      :layout="layout"
      :paginator="true"
      :rows="9"
      :sortOrder="sortOrder"
      :sortField="sortField"
    >
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
            <div
              class="img-container"
              style="width: 100%; height: 400px; margin: 0"
            >
              <img :src="slotProps.data.img" :alt="slotProps.data.title" />
            </div>

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
              <img :src="slotProps.data.img" :alt="slotProps.data.img" />
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

export default {
  mixins: [adminFormMixin],
  data() {
    return {
      layout: "grid",
      sortKey: null,
      sortOrder: null,
      sortField: null,
      sortOptions: [
        { label: "Price High to Low", value: "!price" },
        { label: "Price Low to High", value: "price" },
      ],
    };
  },
  productService: null,
  created() {
    this.getBooks;
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
    width: 20%;
    height: 200px;
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
    object-fit: cover;

    width: 100%;
    height: 400px;
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

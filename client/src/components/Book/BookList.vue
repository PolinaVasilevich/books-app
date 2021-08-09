<template>
  <div class="p-col-12">
    <div class="product-list-item">
      <img
        src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
        :alt="slotProps.data.name"
      />
      <div class="product-list-detail">
        <div class="product-name">{{ slotProps.data.name }}</div>
        <div class="product-description">
          {{ slotProps.data.description }}
        </div>
        <Rating
          :modelValue="slotProps.data.rating"
          :readonly="true"
          :cancel="false"
        ></Rating>
        <i class="pi pi-tag product-category-icon"></i
        ><span class="product-category">{{ slotProps.data.category }}</span>
      </div>
      <div class="product-list-action">
        <span class="product-price">${{ slotProps.data.price }}</span>
        <Button
          icon="pi pi-shopping-cart"
          label="Add to Cart"
          :disabled="slotProps.data.inventoryStatus === 'OUTOFSTOCK'"
        ></Button>
        <span
          :class="
            'product-badge status-' +
            slotProps.data.inventoryStatus.toLowerCase()
          "
          >{{ slotProps.data.inventoryStatus }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>

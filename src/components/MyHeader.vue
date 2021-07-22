<template>
  <header class="header">
    <nav class="header__nav">
      <div class="header__logo">
        <h1>Books App</h1>
      </div>
      <div>
        <slot></slot>
      </div>
    </nav>
  </header>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.header {
  padding: 15px;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);

  .header__nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>

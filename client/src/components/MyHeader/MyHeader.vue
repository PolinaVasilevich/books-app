<template>
  <header class="header">
    <div class="header__logo">
      <h1 class="header__logo__title">Books App</h1>
    </div>
    <nav class="header__nav">
      <div style="display: flex">
        <slot></slot>
      </div>
    </nav>
  </header>
</template>

<script>
export default {};
</script>

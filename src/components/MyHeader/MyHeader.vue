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
import "./styles.scss";
export default {};
</script>

<template>
  <div class="grid-card">
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class GridCard extends Vue {}
</script>

<style scoped lang="scss">
.grid-card {
  background-color: #fff;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
}
</style>

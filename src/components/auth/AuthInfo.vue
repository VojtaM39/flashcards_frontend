<template>
  <div class="auth-info">
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class AuthInfo extends Vue {}
</script>

<style scoped lang="scss">
.auth-info {
  font-size: 0.9rem;
  margin-top: 3rem;
  text-align: center;
}

.auth-info::v-deep(a) {
  color: #000;
}
</style>

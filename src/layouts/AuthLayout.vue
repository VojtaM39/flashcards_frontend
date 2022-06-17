<template>
  <div class="auth-layout-wrapper container">
    <div class="auth-layout-content-wrapper col-11 col-md-7 col-lg-6">
      <h3 class="header">{{ header }}</h3>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

export default class AuthLayout extends Vue {
  @Prop({ required: true })
  readonly header!: string;
}
</script>

<style scoped lang="scss">
.auth-layout-wrapper {
  display: flex;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
}

.auth-layout-content-wrapper {
  background-color: #fff;
  padding: 6rem 3rem;
}

.header {
  text-transform: uppercase;
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 3rem;
}
</style>

<template>
  <div class="header-wrapper">
    <h1 class="main-header">
      {{ header }}
    </h1>

    <div class="right-side">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

export default class MainHeader extends Vue {
  @Prop({ required: true })
  header!: string;
}
</script>

<style scoped lang="scss">
.header-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4rem;
}

.main-header {
  text-align: left;
  text-transform: uppercase;
  color: #000;
  font-size: 2.5rem;
  font-weight: 700;
}
</style>

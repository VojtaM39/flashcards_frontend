<template>
  <div class="grid-card-name">{{ name }}</div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

export default class GridCardName extends Vue {
  @Prop({ required: true })
  name!: string;
}
</script>

<style scoped lang="scss">
.grid-card-name {
  font-weight: 500;
  color: #000;
  font-size: 1.1rem;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

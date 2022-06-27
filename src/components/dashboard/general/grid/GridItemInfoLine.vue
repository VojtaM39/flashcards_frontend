<template>
  <div class="info-line" :class="{ 'info-line--align-left': alignLeft }">
    <div class="info-line--text info-line__text--name">
      {{ name }}
    </div>
    <div class="info-line--text info-line__text--value">
      {{ value }}
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

export default class GridItemInfoLine extends Vue {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  value!: string;

  @Prop({ required: false, default: false })
  alignLeft!: boolean;
}
</script>

<style scoped lang="scss">
.info-line {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  font-size: 0.9rem;
}

.info-line--align-left {
  justify-content: flex-start;
}

.info-line__text--name {
  font-weight: 400;
  margin-right: 1rem;
}

.info-line__text--value {
  font-weight: 300;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  word-break: break-word;
  overflow: hidden;
}
</style>

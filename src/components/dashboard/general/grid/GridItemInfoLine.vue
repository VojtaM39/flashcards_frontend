<template>
  <div class="info-line">
    <div class="info-line--text info-line--text__name">{{ name }}</div>
    <div class="info-line--text info-line--text__value">{{ value }}</div>
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

.info-line--text__name {
  font-weight: 400;
  margin-right: 1rem;
}

.info-line--text__value {
  font-weight: 300;
  -webkit-line-clamp: 4;
}
</style>

<template>
  <div class="modal-line">
    <div class="modal-line__name">
      {{ name }}
    </div>

    <div
      class="modal-line__content modal-line__content--text"
      v-if="value !== ''"
    >
      {{ value }}
    </div>
    <div
      class="modal-line__content modal-line__content--slot"
      v-if="value === ''"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

export default class DashboardModalLine extends Vue {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: false, default: "" })
  value!: string;
}
</script>

<style scoped lang="scss">
.modal-line {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.modal-line--name {
  font-weight: 400;
  margin-right: 1rem;
}

.modal-line__content--text {
  font-weight: 300;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  word-break: break-word;
  overflow: hidden;
}
</style>

<template>
  <button
    class="dashboard-button"
    :class="[getTypeClass(), getUppercaseClass(), { loading: loading }]"
  >
    {{ text }}
  </button>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import ButtonType from "@/types/button.type";

export default class DashboardButton extends Vue {
  @Prop({ required: true })
  type!: ButtonType;

  @Prop({ required: true })
  text!: string;

  @Prop({ required: false, default: true })
  uppercase!: boolean;

  @Prop({ required: false, default: false })
  loading!: boolean;
  getTypeClass(): string {
    switch (this.type) {
      case ButtonType.LIGHT:
        return "dashboard-button--light";
      case ButtonType.RED:
        return "dashboard-button--red";
      default:
        return "dashboard-button--dark";
    }
  }

  getUppercaseClass(): string {
    if (this.uppercase) return "dashboard-button--uppercase";
    else return "dashboard-button--nonuppercase";
  }
}
</script>

<style scoped lang="scss">
$dark-color: #000;
$light-color: #fff;
$red-color: #ce0000;

.dashboard-button {
  outline: none;
  background-color: $dark-color;
  color: $light-color;
  border-radius: 3px;
  padding: 0.5rem 1rem;
  font-size: 0.93rem;
  border: $dark-color 1px solid;
  width: 100%;
  font-weight: 500;

  @include media-breakpoint-down(md) {
    font-size: 0.85rem;
    padding: 0.5rem 0.7rem;
  }

  &.loading {
    pointer-events: none;
    cursor: default;
    opacity: 0.5;
  }
}

.dashboard-button--light {
  background-color: $light-color;
  color: $dark-color;
  border-color: $dark-color;
}

.dashboard-button--red {
  background-color: $red-color;
  color: $light-color;
  border-color: $red-color;
}

.dashboard-button--uppercase {
  text-transform: uppercase;
}

.dashboard-button--nonuppercase {
  text-transform: none;
}
</style>

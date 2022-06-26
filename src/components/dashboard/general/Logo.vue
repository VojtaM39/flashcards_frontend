<template>
  <div class="logo-wrapper">
    <router-link
      class="logo-text"
      :style="{ fontSize: fontSize + 'rem' }"
      :to="{ name: 'collections' }"
    >
      <span class="logo-text__letter logo-text_letter--filled">F</span
      ><span class="logo-text__letter logo-text_letter--outlined">C</span>
    </router-link>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

export default class Logo extends Vue {
  @Prop({ required: false, default: 2 })
  readonly fontSize!: number;
}
</script>

<style scoped lang="scss">
$text-color: #000;

.logo-text {
  font-family: "Inter", sans-serif;
  font-weight: 700;
  font-size: 2rem;
  color: $text-color;
  text-decoration: none;

  &:hover {
    color: $text-color;
  }
}

.logo-text_letter--outlined {
  color: $primary-background;
  text-shadow: 1px 1px 0 $text-color, -1px -1px 0 $text-color,
    1px -1px 0 $text-color, -1px 1px 0 $text-color, 1px 1px 0 $text-color;
}
</style>

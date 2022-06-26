<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.5668 16.1667H24.4001L21.3001 13.0667L22.0668 12.3333L26.4001 16.7L22.1001 21L21.3334 20.2667L24.4334 17.1667H12.5668V16.1667ZM16.1668 5.33334V6.36668H7.43343C7.23343 6.36668 7.04454 6.45001 6.86676 6.61668C6.68899 6.78334 6.6001 6.96668 6.6001 7.16668V26.1667C6.6001 26.3667 6.68899 26.55 6.86676 26.7167C7.04454 26.8833 7.23343 26.9667 7.43343 26.9667H16.1668V28H7.43343C6.92232 28 6.48899 27.8222 6.13343 27.4667C5.77788 27.1111 5.6001 26.6778 5.6001 26.1667V7.16668C5.6001 6.65557 5.77788 6.22223 6.13343 5.86668C6.48899 5.51112 6.92232 5.33334 7.43343 5.33334H16.1668Z"
      fill="black"
    />
  </svg>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

export default class LogoutSvg extends Vue {
  @Prop({ required: true })
  width!: number;

  @Prop({ required: true })
  height!: number;
}
</script>

<style scoped></style>

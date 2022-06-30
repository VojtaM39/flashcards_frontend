<template>
  <label class="dashboard-switch">
    <input type="checkbox" value="1" :checked="checked" v-model="checked" />
    <span class="slider round"></span>
  </label>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

export default class DashboardSwitch extends Vue {
  @Prop({ default: true })
  readonly modelValue!: boolean;

  get checked() {
    return this.modelValue;
  }

  set checked(value) {
    this.$emit("update:modelValue", value);
  }
}
</script>

<style scoped lang="scss">
$width: 40px;
$height: 20px;
$slider-gap: 2px;
$slider-radius: $height - ($slider-gap * 2);
$background-color: #35e07a;
$slider-checked-offset: $width - $slider-radius - ($slider-gap * 2);

.dashboard-switch {
  position: relative;
  display: inline-block;
  width: $width;
  height: $height;
}

.dashboard-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: $slider-radius;
  width: $slider-radius;
  left: $slider-gap;
  bottom: $slider-gap;
  background-color: #fff;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: $background-color;
}

input:focus + .slider {
  box-shadow: 0 0 1px $background-color;
}

input:checked + .slider:before {
  -ms-transform: translateX($slider-checked-offset);
  transform: translateX($slider-checked-offset);
}

/* Rounded sliders */
.slider.round {
  border-radius: $height;
}

.slider.round:before {
  border-radius: 50%;
}
</style>

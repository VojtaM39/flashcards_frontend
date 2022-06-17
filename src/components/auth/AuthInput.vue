<template>
  <div class="auth-input">
    <input :type="type" :placeholder="placeholder" @input="updateValue" />
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import InputType from "@/types/input.type";

export default class AuthInput extends Vue {
  @Prop({ required: true })
  readonly type!: InputType;

  @Prop({ required: false })
  readonly placeholder!: string;

  @Prop()
  readonly modelValue: string = "";

  updateValue(event: Event) {
    this.$emit("update:modelValue", (event.target as HTMLInputElement).value);
  }
}
</script>

<style scoped lang="scss">
input {
  border: 1px solid #d3d3d3;
  border-radius: 3px;
  padding: 0.65rem 1rem;
  margin-bottom: 1rem;
  outline: none;
  width: 100%;
  background-color: #fff;

  &::placeholder {
    color: #c4c4c4;
  }
}
</style>

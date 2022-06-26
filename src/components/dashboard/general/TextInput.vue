<template>
  <div class="text-input">
    <input
      v-if="type === InputType.Text"
      type="text"
      :placeholder="placeholder"
      :value="modelValue"
      @input="updateValue"
    />
    <textarea
      v-if="type === InputType.TextArea"
      :placeholder="placeholder"
      :value="modelValue"
      @input="updateValue"
    ></textarea>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import InputType from "@/types/input.type";

export default class TextInput extends Vue {
  InputType = InputType;

  @Prop({ required: false })
  readonly placeholder!: string;

  @Prop({ default: "" })
  readonly modelValue!: string;

  @Prop({ default: InputType.Text })
  readonly type!: InputType;

  updateValue(event: Event) {
    this.$emit("update:modelValue", (event.target as HTMLInputElement).value);
  }
}
</script>

<style scoped lang="scss">
input,
textarea {
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

textarea {
}
</style>

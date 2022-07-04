<template>
  <div class="auth-button">
    <button @click="handleSubmit">{{ value }}</button>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

export default class AuthButton extends Vue {
  @Prop({ required: true })
  readonly value!: string;

  handleSubmit() {
    this.$emit("submit");
  }
}
</script>

<style scoped lang="scss">
button {
  color: #fff;
  background-color: #000;
  border-radius: 3px;
  padding: 0.75rem 1rem;
  margin-top: 1rem;
  font-weight: 600;
  outline: none;
  border: 0;
  width: 100%;
}
</style>

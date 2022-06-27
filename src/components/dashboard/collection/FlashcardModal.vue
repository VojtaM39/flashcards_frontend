<template>
  <DashboardModal
    class="flashcard-modal"
    :action-button-text="actionButtonText"
    :header="modalHeader"
    :open="open"
  >
    <TextInput
      :type="InputType.TextArea"
      placeholder="Question"
      v-model="theModel.question"
    />
    <TextInput
      :type="InputType.TextArea"
      placeholder="Answer"
      v-model="theModel.answer"
    />
  </DashboardModal>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import DashboardModal from "@/components/dashboard/general/DashboardModal.vue";
import TextInput from "@/components/dashboard/general/TextInput.vue";
import { Prop } from "vue-property-decorator";
import ModalType from "@/types/modal.type";
import FlashcardModalData from "@/interfaces/flashcard.modal.interface";
import InputType from "@/types/input.type";

@Options({
  components: { DashboardModal, TextInput },
})
export default class FlashcardModal extends Vue {
  InputType = InputType;

  @Prop({ required: true })
  readonly modelValue!: FlashcardModalData;

  @Prop({ required: true })
  readonly open!: boolean;

  @Prop({ required: true })
  readonly type!: ModalType;

  get theModel() {
    return this.modelValue;
  }

  set theModel(value: FlashcardModalData) {
    this.$emit("update:modelValue", value);
  }

  get actionButtonText() {
    switch (this.type) {
      case ModalType.Edit:
        return "Edit flashcard";
      default:
        return "Create flashcard";
    }
  }

  get modalHeader() {
    switch (this.type) {
      case ModalType.Edit:
        return "Edit flashcard";
      default:
        return "Create flashcard";
    }
  }
}
</script>

<style scoped></style>

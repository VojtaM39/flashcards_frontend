<template>
  <DashboardModal
    class="flashcard-modal"
    action-button-text="Start session"
    header="Start session"
    :open="open"
  >
    <DashboardModalLine name="Collection:" :value="collectionName" />

    <DashboardModalLine name="Random:">
      <DashboardSwitch v-model="theModel.random" />
    </DashboardModalLine>

    <DashboardModalLine name="Infinite:">
      <DashboardSwitch v-model="theModel.infinite" />
    </DashboardModalLine>
  </DashboardModal>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import DashboardModal from "@/components/dashboard/general/DashboardModal.vue";
import DashboardSwitch from "@/components/dashboard/general/DashboardSwitch.vue";
import DashboardModalLine from "@/components/dashboard/general/DashboardModalLine.vue";
import { Prop } from "vue-property-decorator";
import SessionModalData from "@/interfaces/session.modal.interface";
import InputType from "@/types/input.type";

@Options({
  components: { DashboardModal, DashboardSwitch, DashboardModalLine },
})
export default class StartSessionModal extends Vue {
  InputType = InputType;

  @Prop({ required: true })
  readonly modelValue!: SessionModalData;

  @Prop({ required: true })
  readonly open!: boolean;

  get theModel() {
    return this.modelValue;
  }

  set theModel(value: SessionModalData) {
    this.$emit("update:modelValue", value);
  }

  get collectionName() {
    if (this.theModel.collection === null) return "";
    return this.theModel.collection.name;
  }
}
</script>

<style scoped></style>

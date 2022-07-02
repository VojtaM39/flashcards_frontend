<template>
  <DashboardModal
    class="new-collection-modal"
    action-button-text="Create collection"
    header="New collection"
    :open="open"
  >
    <TextInput
      :type="InputType.Text"
      placeholder="Collection name"
      v-model="theModel.name"
    />
  </DashboardModal>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import DashboardModal from "@/components/dashboard/general/DashboardModal.vue";
import TextInput from "@/components/dashboard/general/TextInput.vue";
import { Prop } from "vue-property-decorator";
import InputType from "@/types/input.type";
import NewCollectionModalData from "@/interfaces/new_collection.modal.interface";

@Options({
  components: { DashboardModal, TextInput },
})
export default class NewCollectionModal extends Vue {
  InputType = InputType;

  @Prop({ required: true })
  readonly modelValue!: NewCollectionModalData;

  @Prop({ required: true })
  readonly open!: boolean;

  get theModel() {
    return this.modelValue;
  }

  set theModel(value: NewCollectionModalData) {
    this.$emit("update:modelValue", value);
  }
}
</script>

<style scoped></style>

<template>
  <GridCard class="flashcard-grid-card">
    <div class="flashcard-info">
      <GridItemInfoLine
        name="Q:"
        :value="flashcard.question"
        class="flashcard-grid-card__info-line"
        :align-left="true"
      />
      <GridItemInfoLine
        name="A:"
        :value="flashcard.answer"
        class="flashcard-grid-card__info-line"
        :align-left="true"
      />
    </div>

    <div class="button-wrapper">
      <DashboardButton
        :type="ButtonType.RED"
        text="Delete"
        @click="handleDeleteClick"
        class="flashcard-button"
      />
      <DashboardButton
        :type="ButtonType.LIGHT"
        text="Edit"
        @click="handleEditClick"
        class="flashcard-button"
      />
    </div>
  </GridCard>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import GridCard from "@/components/dashboard/general/grid/GridCard.vue";
import GridItemInfoLine from "@/components/dashboard/general/grid/GridItemInfoLine.vue";
import DashboardButton from "@/components/dashboard/general/DashboardButton.vue";
import { Flashcard } from "@/interfaces/flashcard.interface";
import ButtonType from "@/types/button.type";

@Options({
  components: { GridCard, GridItemInfoLine, DashboardButton },
})
export default class FlashcardGridCard extends Vue {
  ButtonType = ButtonType;

  @Prop({ required: true })
  flashcard!: Flashcard;

  handleDeleteClick() {
    this.$emit("delete");
  }

  handleEditClick() {
    this.$emit("edit");
  }
}
</script>

<style scoped lang="scss">
.flashcard-grid-card__info-line:nth-child(1) {
  margin-bottom: 1rem;
}

.flashcard-info {
  margin: 3rem 0;
}

.button-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.flashcard-button {
  $horizontal-margin: 0.3rem;
  &:nth-child(1) {
    margin-right: $horizontal-margin;
  }

  &:nth-child(2) {
    margin-left: $horizontal-margin;
  }
}
</style>

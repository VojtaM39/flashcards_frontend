<template>
  <GridCard class="flashcard-grid-card">
    <GridItemInfoLine
      name="Q:"
      :value="flashcard.question"
      class="flashcard-grid-card__info-line"
    />
    <GridItemInfoLine
      name="A:"
      :value="flashcard.answer"
      class="flashcard-grid-card__info-line"
    />
  </GridCard>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import GridCard from "@/components/dashboard/general/grid/GridCard.vue";
import GridItemInfoLine from "@/components/dashboard/general/grid/GridItemInfoLine.vue";
import { Flashcard } from "@/interfaces/flashcard.interface";

@Options({
  components: { GridCard, GridItemInfoLine },
})
export default class FlashcardGridCard extends Vue {
  @Prop({ required: true })
  flashcard!: Flashcard;
}
</script>

<style scoped lang="scss">
.flashcard-grid-card__info-line:nth-child(1) {
  margin-bottom: 1rem;
}
</style>

<template>
  <GridCard class="collections-grid-card">
    <GridCardName :name="collection.name" />
    <div class="collections-info">
      <GridItemInfoLine name="Flashcards:" :value="collection.count" />
    </div>
    <div class="button-wrapper">
      <DashboardButton
        :type="ButtonType.LIGHT"
        text="Edit"
        @click="handleEditClick"
        class="collections-button"
      />
      <DashboardButton
        :type="ButtonType.DARK"
        text="Learn"
        @click="handleLearnClick"
        class="collections-button"
        :disabled="collection.count === 0"
      />
    </div>
  </GridCard>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import GridCard from "@/components/dashboard/general/grid/GridCard.vue";
import GridCardName from "@/components/dashboard/general/grid/GridCardName.vue";
import DashboardButton from "@/components/dashboard/general/DashboardButton.vue";
import GridItemInfoLine from "@/components/dashboard/general/grid/GridItemInfoLine.vue";
import ButtonType from "@/types/button.type";
import { Collection } from "@/interfaces/collection.interface";

@Options({
  components: { GridCard, GridCardName, DashboardButton, GridItemInfoLine },
})
export default class CollectionsGridCard extends Vue {
  @Prop({ required: true })
  collection!: Collection;

  ButtonType = ButtonType;

  handleEditClick() {
    this.$router.push({
      name: "collectionDetail",
      params: { id: this.collection._id },
    });
  }

  handleLearnClick() {
    this.$emit("learn");
  }
}
</script>

<style scoped lang="scss">
.collections-info {
  margin: 3rem 0;
}

.button-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.collections-button {
  $horizontal-margin: 0.3rem;
  &:nth-child(1) {
    margin-right: $horizontal-margin;
  }

  &:nth-child(2) {
    margin-left: $horizontal-margin;
  }
}
</style>

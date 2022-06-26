<template>
  <div class="item-grid">
    <div class="item-grid__content">
      <slot />
    </div>

    <div class="item-grid__load-more" v-if="loadMore === true">
      <DashboardButton
        :type="ButtonType.DARK"
        :loading="loadMoreLoading"
        text="Load more"
        @click="handleLoadMoreClick"
        class="item-grid__load-more-button"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import DashboardButton from "@/components/dashboard/general/DashboardButton.vue";
import ButtonType from "@/types/button.type";

@Options({
  components: { DashboardButton },
})
export default class ItemGrid extends Vue {
  ButtonType = ButtonType;

  @Prop({ required: false, default: false })
  loadMore!: boolean;

  @Prop({ required: false, default: false })
  loadMoreLoading!: boolean;

  handleLoadMoreClick() {
    this.$emit("more");
  }
}
</script>

<style scoped lang="scss">
.item-grid__content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 1rem;
  row-gap: 3rem;

  @include media-breakpoint-down(lg) {
    grid-template-columns: repeat(3, 1fr);
  }

  @include media-breakpoint-down(md) {
    grid-template-columns: repeat(1, 1fr);
  }
}

.item-grid__load-more {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 2rem;
}

.item-grid__load-more-button {
  width: auto;
}
</style>

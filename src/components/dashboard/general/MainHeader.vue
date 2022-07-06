<template>
  <div class="header">
    <div class="header__section">
      <button
        @click="handleBackButtonClick"
        class="back-button"
        v-if="backButton"
      >
        <BackIcon class="back-button__icon" />
      </button>

      <h1 class="main-header">
        {{ header }}
      </h1>
    </div>

    <div class="header__section header-section--right">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import BackIcon from "@/components/svg/BackIcon.vue";

@Options({
  components: { BackIcon },
})
export default class MainHeader extends Vue {
  @Prop({ required: true })
  header!: string;

  @Prop({ required: false, default: false })
  backButton!: boolean;

  handleBackButtonClick() {
    this.$router.back();
  }
}
</script>

<style scoped lang="scss">
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4rem;

  @include media-breakpoint-down(md) {
    flex-direction: column;
  }
}

.header__section {
  display: flex;
  flex-direction: row;
  align-items: center;

  @include media-breakpoint-down(md) {
    width: 100%;
  }
}

.header-section--right {
  margin: 0;

  @include media-breakpoint-down(md) {
    margin-top: 1rem;
  }
}

.main-header {
  text-align: left;
  text-transform: uppercase;
  color: #000;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0;
  margin-right: 0.8rem;
  word-break: break-word;

  @include media-breakpoint-down(md) {
    font-size: 1.4rem;
  }
}

.back-button {
  outline: none;
  background: transparent;
  border: 0;
  margin-right: 1rem;
  width: auto;
}

.back-button__icon {
  height: 1.2rem;
  width: auto;
}
</style>

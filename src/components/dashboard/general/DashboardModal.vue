<template>
  <div
    class="dashboard-modal-wrapper"
    :class="{ open: open }"
    @click="handleOutsideClick"
    data-outside-modal-wrapper="1"
  >
    <div class="dashboard-modal">
      <div class="dashboard-modal__header">
        <div class="dashboard-modal__title">
          {{ header }}
        </div>
        <div class="dashboard-modal__close">
          <button @click="handleClose">
            <CloseIcon width="18" height="18" />
          </button>
        </div>
      </div>
      <div class="dashboard-modal__body">
        <slot />
      </div>

      <div class="dashboard-modal__footer">
        <DashboardButton
          :type="ButtonType.DARK"
          :uppercase="false"
          :text="actionButtonText"
          @click="handleActionButtonClick"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import DashboardButton from "@/components/dashboard/general/DashboardButton.vue";
import ButtonType from "@/types/button.type";
import CloseIcon from "@/components/svg/CloseIcon.vue";

@Options({
  components: { DashboardButton, CloseIcon },
})
export default class DashboardModal extends Vue {
  ButtonType = ButtonType;

  @Prop({ required: true })
  actionButtonText!: string;

  @Prop({ required: true })
  header!: string;

  @Prop({ required: true })
  open!: boolean;

  handleClose() {
    this.$emit("close");
  }

  handleActionButtonClick() {
    this.$emit("action");
  }

  handleOutsideClick(event: MouseEvent) {
    if (event.target instanceof Element) {
      if (event.target.getAttribute("data-outside-modal-wrapper") != null) {
        this.$emit("close");
      }
    }
    return false;
  }
}
</script>

<style scoped lang="scss">
.dashboard-modal-wrapper {
  background-color: rgba(0, 0, 0, 0.3);
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999;

  &.open {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.dashboard-modal {
  padding: 4rem 3rem;
  width: 500px;
  background-color: #fff;

  @include media-breakpoint-down(md) {
    width: 90%;
  }
}

.dashboard-modal__header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.dashboard-modal__title {
  font-weight: 700;
  text-transform: uppercase;
  font-size: 1.7rem;

  @include media-breakpoint-down(md) {
    font-size: 1.2rem;
  }
}

.dashboard-modal__close {
  button {
    outline: none;
    border: 0;
    background: transparent;
  }
}

.dashboard-modal__footer {
  margin-top: 2rem;
}
</style>

<template>
  <div id="session-review-view">
    <MainHeader header="Session review" />

    <div class="session-review" v-show="!loading">
      <div
        class="session-review__stats"
        v-if="this.activeSessionReview !== null"
      >
        <div class="session-review__stat-line">
          <div class="session-review__stat-name">Total answered:</div>
          <div class="session-review__stat-value">
            {{ activeSessionReview.session.total }}
          </div>
        </div>
        <div class="session-review__stat-line">
          <div class="session-review__stat-name">Answered correctly:</div>
          <div class="session-review__stat-value">
            {{ activeSessionReview.session.correct }}
          </div>
        </div>
        <div class="session-review__stat-line">
          <div class="session-review__stat-name">Flashcards learned:</div>
          <div class="session-review__stat-value">
            {{ activeSessionReview.learned_percentage }}%
          </div>
        </div>
      </div>

      <div class="session-review__close-button-wrapper">
        <DashboardButton
          :type="ButtonType.DARK"
          text="Close review"
          class="session-review__close-button"
          @click="handleCloseReviewClick"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import MainHeader from "@/components/dashboard/general/MainHeader.vue";
import DashboardButton from "@/components/dashboard/general/DashboardButton.vue";
import ButtonType from "@/types/button.type";
import { namespace } from "vuex-class";
import { SessionReview } from "@/interfaces/session_review.interface";

const sessions = namespace("sessions");

@Options({
  components: { MainHeader, DashboardButton },
})
export default class SessionReviewView extends Vue {
  ButtonType = ButtonType;
  loading = true;

  @sessions.Action
  public getSessionReview!: (
    sessionId: string
  ) => Promise<SessionReview | null>;

  @sessions.Getter
  public activeSessionReview!: SessionReview | null;

  created() {
    this.getSessionReview(this.sessionId).then(() => (this.loading = false));
  }

  handleCloseReviewClick() {
    this.$router.push({ name: "collections" });
  }

  get sessionId() {
    return this.$route.params.id as string;
  }
}
</script>

<style scoped lang="scss">
.session-review {
  min-height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  padding: 2rem;
}

.session-review__stats {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
}

.session-review__stat-line {
  font-size: 1.1rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;

  @include media-breakpoint-down(md) {
    font-size: 0.95rem;
  }
}

.session-review__stat-name {
  width: 100%;
  font-weight: 500;
  text-align: right;
  margin-right: 1rem;
}

.session-review__stat-value {
  width: 100%;
  font-weight: 300;
  text-align: left;
  margin-left: 1rem;
}

.session-review__close-button-wrapper {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.session-review__close-button {
  width: auto;
}
</style>

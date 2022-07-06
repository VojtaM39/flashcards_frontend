<template>
  <div id="session-view">
    <div class="flashcard" v-if="!loading">
      <MainHeader header="Learning session">
        <DashboardButton
          :type="ButtonType.DARK"
          text="End session"
          @click="endSession"
        />
      </MainHeader>

      <div class="session-stats">
        <div class="session-stats__section">
          <SessionCheck class="sessions-stats__icon" />
          <div class="session-stats__value">{{ session.correct }}</div>
        </div>

        <div class="session-stats__section">
          <SessionCross class="sessions-stats__icon" />
          <div class="session-stats__value">{{ sessionIncorrect }}</div>
        </div>
      </div>

      <div class="flashcard-detail" v-if="flashcard !== null">
        <div
          class="flashcard-detail__section flashcard-detail__section--question"
        >
          <div class="flashcard-detail__text">
            {{ flashcard.question }}
          </div>
        </div>
        <div
          class="flashcard-detail__section flashcard-detail__section--answer"
        >
          <DashboardButton
            :type="ButtonType.LIGHT"
            text="Reveal"
            class="flashcard-detail__reveal"
            v-if="!revealed"
            @click="handleRevealClick"
          />

          <div class="flashcard-detail__text" v-if="revealed">
            {{ flashcard.answer }}
          </div>

          <div class="flashcard-detail__answer-buttons" v-if="revealed">
            <DashboardButton
              class="flashcard-detail__answer-button"
              :type="ButtonType.LIGHT"
              text="Incorrect"
              @click="handleAnswerButtonClick(false)"
            />
            <DashboardButton
              class="flashcard-detail__answer-button"
              :type="ButtonType.DARK"
              text="Correct"
              @click="handleAnswerButtonClick(true)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { namespace } from "vuex-class";
import { Flashcard } from "@/interfaces/flashcard.interface";
import {
  UpdateFlashcardStatDto,
  UpdateSessionBodyDto,
  UpdateSessionDto,
} from "@/dtos/sessions.dto";
import { FlashcardSessionStat } from "@/interfaces/flashcard_session_stat.interface";
import { Session } from "@/interfaces/session.interface";
import ButtonType from "@/types/button.type";
import MainHeader from "@/components/dashboard/general/MainHeader.vue";
import DashboardButton from "@/components/dashboard/general/DashboardButton.vue";
import SessionCheck from "@/components/svg/SessionCheck.vue";
import SessionCross from "@/components/svg/SessionCross.vue";
import { ApiCallException } from "@/exceptions/apicall.exception";

const sessions = namespace("sessions");

@Options({
  components: { MainHeader, DashboardButton, SessionCheck, SessionCross },
})
export default class SessionView extends Vue {
  ButtonType = ButtonType;
  revealed = false;
  loading = true;

  @sessions.Action
  public getNextFlashcard!: (sessionId: string) => Promise<Flashcard | null>;

  @sessions.Action
  public updateSession!: (
    updateSessionData: UpdateSessionDto
  ) => Promise<Session>;

  @sessions.Action
  public updateFlashcardStat!: (
    updateFlashcardStatData: UpdateFlashcardStatDto
  ) => Promise<FlashcardSessionStat>;

  @sessions.State
  public session!: Session | null;

  @sessions.State
  public flashcard!: Flashcard | null;

  created() {
    this.getNextFlashcard(this.sessionId).then(() => (this.loading = false));
  }

  handleRevealClick() {
    this.revealed = true;
  }

  async handleAnswerButtonClick(correct: boolean) {
    if (this.session == null || this.flashcard == null) {
      console.log("Data not loaded");
      return;
    }

    const updateFlashcardStatData: UpdateFlashcardStatDto = {
      session: this.session._id,
      flashcard: this.flashcard._id,
      correct: correct,
    };
    try {
      await this.updateFlashcardStat(updateFlashcardStatData);

      this.revealed = false;
      const flashcard = await this.getNextFlashcard(this.session._id);
      if (flashcard == null) {
        await this.endSession();
      }
    } catch (err) {
      if (err instanceof ApiCallException) {
        console.log(err.message);
      }
    }
  }

  async endSession() {
    if (this.session == null) {
      console.log("Data not loaded");
      return null;
    }

    const updateSessionBodyData: UpdateSessionBodyDto = {
      closed: true,
    };

    const updateSessionData: UpdateSessionDto = {
      id: this.session._id,
      body: updateSessionBodyData,
    };

    try {
      await this.updateSession(updateSessionData);
      await this.$router.push({
        name: "sessionReview",
        params: { id: this.session._id },
      });
    } catch (err) {
      if (err instanceof ApiCallException) {
        console.log(err.message);
      }
    }
  }

  get sessionId() {
    return this.$route.params.id as string;
  }

  get sessionIncorrect() {
    if (this.session === null) return 0;
    return this.session.total - this.session.correct;
  }
}
</script>

<style scoped lang="scss">
.session-stats {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 3rem;
}

.session-stats__section {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  &:nth-child(1) {
    margin-right: 2rem;
  }
}

.sessions-stats__icon {
  height: 1.4rem;
  margin-right: 1rem;
}

.session-stats__value {
  font-weight: 500;
  font-size: 1.4rem;
}

.flashcard-detail {
  background-color: #fff;
  padding: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;

  @include media-breakpoint-down(md) {
    flex-direction: column;
  }
}

.flashcard-detail__section {
  $border-separator: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  width: 100%;
  min-height: 40vh;
  position: relative;

  &:nth-child(1) {
    border-right: $border-separator;

    @include media-breakpoint-down(md) {
      border-right: 0;
      border-bottom: $border-separator;
    }
  }
}

.flashcard-detail__text {
  font-size: 1.5rem;
}

.flashcard-detail__reveal {
  width: auto;
}

.flashcard-detail__answer-buttons {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  padding: 0 2rem;
}

.flashcard-detail__answer-button:nth-child(1) {
  margin-right: 1rem;
}
</style>

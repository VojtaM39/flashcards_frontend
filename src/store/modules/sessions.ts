import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import { ApiCallException } from "@/exceptions/apicall.exception";
import { Session } from "@/interfaces/session.interface";
import SessionsApiService from "@/services/sessions.api.service";
import {
  CreateSessionDto,
  UpdateFlashcardStatDto,
  UpdateSessionDto,
} from "@/dtos/sessions.dto";
import { Flashcard } from "@/interfaces/flashcard.interface";
import { FlashcardSessionStat } from "@/interfaces/flashcard_session_stat.interface";
import { SessionReview } from "@/interfaces/session_review.interface";

@Module({ namespaced: true })
class Sessions extends VuexModule {
  public sessionsApiService = new SessionsApiService();

  public session: Session | null = null;
  public flashcard: Flashcard | null = null;

  public sessionReview: SessionReview | null = null;

  get activeSession(): Session | null {
    return this.session;
  }

  get currentFlashcard(): Flashcard | null {
    return this.flashcard;
  }

  get activeSessionReview(): SessionReview | null {
    return this.sessionReview;
  }

  @Mutation
  public saveActiveSession(session: Session): void {
    this.session = session;
  }

  @Mutation
  public saveCurrentFlashcard(flashcard: Flashcard): void {
    this.flashcard = flashcard;
  }

  @Mutation
  public saveActiveSessionReview(sessionReview: SessionReview): void {
    this.sessionReview = sessionReview;
  }

  @Action({ rawError: true })
  public async createSession(
    createSessionData: CreateSessionDto
  ): Promise<Session> {
    return new Promise((resolve, reject) => {
      this.sessionsApiService
        .createSession(createSessionData)
        .then((response) => {
          this.context.commit("saveActiveSession", response.data);
          resolve(response.data);
        })
        .catch((error: ApiCallException) => {
          reject(error);
        });
    });
  }

  @Action({ rawError: true })
  public async updateSession(
    updateSessionData: UpdateSessionDto
  ): Promise<Session> {
    return new Promise((resolve, reject) => {
      this.sessionsApiService
        .updateSession(updateSessionData.id, updateSessionData.body)
        .then((response) => {
          this.context.commit("saveActiveSession", response.data);
          resolve(response.data);
        })
        .catch((error: ApiCallException) => {
          reject(error);
        });
    });
  }

  @Action({ rawError: true })
  public async updateFlashcardStat(
    updateFlashcardStatData: UpdateFlashcardStatDto
  ): Promise<FlashcardSessionStat> {
    return new Promise((resolve, reject) => {
      this.sessionsApiService
        .updateFlashcardStat(updateFlashcardStatData)
        .then((response) => {
          this.context.commit("saveActiveSession", response.data.session);
          resolve(response.data);
        })
        .catch((error: ApiCallException) => {
          reject(error);
        });
    });
  }

  @Action({ rawError: true })
  public async getNextFlashcard(sessionId: string): Promise<Flashcard | null> {
    return new Promise((resolve, reject) => {
      this.sessionsApiService
        .getNextFlashcard(sessionId)
        .then((response) => {
          this.context.commit("saveCurrentFlashcard", response.data);
          resolve(response.data);
        })
        .catch((error: ApiCallException) => {
          reject(error);
        });
    });
  }

  @Action({ rawError: true })
  public async getSessionReview(
    sessionId: string
  ): Promise<SessionReview | null> {
    return new Promise((resolve, reject) => {
      this.sessionsApiService
        .getSessionReview(sessionId)
        .then((response) => {
          this.context.commit("saveActiveSessionReview", response.data);
          resolve(response.data);
        })
        .catch((error: ApiCallException) => {
          reject(error);
        });
    });
  }
}
export default Sessions;

import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
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
    const response = await this.sessionsApiService.createSession(
      createSessionData
    );
    this.context.commit("saveActiveSession", response.data);
    return response.data;
  }

  @Action({ rawError: true })
  public async updateSession(
    updateSessionData: UpdateSessionDto
  ): Promise<Session> {
    const response = await this.sessionsApiService.updateSession(
      updateSessionData.id,
      updateSessionData.body
    );
    this.context.commit("saveActiveSession", response.data);
    return response.data;
  }

  @Action({ rawError: true })
  public async updateFlashcardStat(
    updateFlashcardStatData: UpdateFlashcardStatDto
  ): Promise<FlashcardSessionStat> {
    const response = await this.sessionsApiService.updateFlashcardStat(
      updateFlashcardStatData
    );
    this.context.commit("saveActiveSession", response.data.session);
    return response.data;
  }

  @Action({ rawError: true })
  public async getNextFlashcard(sessionId: string): Promise<Flashcard> {
    const response = await this.sessionsApiService.getNextFlashcard(sessionId);
    this.context.commit("saveCurrentFlashcard", response.data);
    return response.data;
  }

  @Action({ rawError: true })
  public async getSessionReview(sessionId: string): Promise<SessionReview> {
    const response = await this.sessionsApiService.getSessionReview(sessionId);
    this.context.commit("saveActiveSessionReview", response.data);
    return response.data;
  }
}
export default Sessions;

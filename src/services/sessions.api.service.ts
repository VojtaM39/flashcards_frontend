import ApiService from "@/services/api.service";
import { ApiResponse } from "@/interfaces/apiresponse.interface";
import {
  CreateSessionDto,
  UpdateFlashcardStatDto,
  UpdateSessionBodyDto,
  UpdateSessionDto,
} from "@/dtos/sessions.dto";
import { Session } from "@/interfaces/session.interface";
import { FlashcardSessionStat } from "@/interfaces/flashcard_session_stat.interface";
import { Flashcard } from "@/interfaces/flashcard.interface";

export default class SessionsApiService extends ApiService {
  static readonly BASE_ENDPOINT_RESOURCE = "sessions";

  constructor() {
    super(SessionsApiService.BASE_ENDPOINT_RESOURCE);
  }

  async createSession(createSessionData: CreateSessionDto) {
    return await this.post<ApiResponse<Session>, CreateSessionDto>(
      "",
      createSessionData
    );
  }

  async updateSession(
    sessionId: string,
    updateSessionData: UpdateSessionBodyDto
  ) {
    return await this.put<ApiResponse<Session>, UpdateSessionBodyDto>(
      sessionId,
      updateSessionData
    );
  }

  async updateFlashcardStat(updateFlashcardStatData: UpdateFlashcardStatDto) {
    return await this.post<
      ApiResponse<FlashcardSessionStat>,
      UpdateFlashcardStatDto
    >("flashcard-stat", updateFlashcardStatData);
  }

  async getNextFlashcard(sessionId: string) {
    return await this.get<ApiResponse<Flashcard>>(`flashcard/${sessionId}`);
  }
}

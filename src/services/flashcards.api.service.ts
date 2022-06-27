import ApiService from "@/services/api.service";
import { ApiResponse } from "@/interfaces/apiresponse.interface";
import {
  CreateFlashcardDto,
  EditFlashcardBodyDto,
  EditFlashcardDto,
} from "@/dtos/flashcard.dto";
import { Flashcard } from "@/interfaces/flashcard.interface";
import { Paginated } from "@/interfaces/paginated.interface";

export default class FlashcardsApiService extends ApiService {
  static readonly BASE_ENDPOINT_RESOURCE = "flashcards";

  constructor() {
    super(FlashcardsApiService.BASE_ENDPOINT_RESOURCE);
  }

  async createFlashcard(createFlashcardsData: CreateFlashcardDto) {
    return await this.post<ApiResponse<Flashcard>, CreateFlashcardDto>(
      "",
      createFlashcardsData
    );
  }

  async editFlashcard(editFlashcardsData: EditFlashcardDto) {
    return await this.put<ApiResponse<Flashcard>, EditFlashcardBodyDto>(
      editFlashcardsData._id,
      editFlashcardsData.body
    );
  }

  async deleteFlashcard(flashcardId: string) {
    return await this.delete<ApiResponse<Flashcard>>(flashcardId);
  }

  async getFlashcardsByCollection(
    collectionId: string,
    page: number
  ): Promise<ApiResponse<Paginated<Flashcard>>> {
    return await this.get<ApiResponse<Paginated<Flashcard>>>(
      `collection/${collectionId}?page=${page.toString()}`
    );
  }
}

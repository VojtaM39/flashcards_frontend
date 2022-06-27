export interface CreateFlashcardDto {
  question: string;
  answer: string;
  parent_collection: string;
}

export interface EditFlashcardBodyDto {
  question: string;
  answer: string;
}

export interface EditFlashcardDto {
  _id: string;
  body: EditFlashcardBodyDto;
}

export interface FetchCollectionFlashcardsDto {
  collectionId: string;
  page: number;
}

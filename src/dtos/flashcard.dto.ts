export interface CreateFlashcardDto {
  question: string;
  answer: string;
  parent_collection: string;
}

export interface FetchCollectionFlashcardsDto {
  collectionId: string;
  page: number;
}

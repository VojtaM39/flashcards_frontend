export interface CreateSessionDto {
  flashcard_collection: string;
  infinite: boolean;
  random: boolean;
}

export interface UpdateSessionDto {
  id: string;
  body: UpdateSessionBodyDto;
}

export interface UpdateSessionBodyDto {
  closed: boolean;
}

export interface UpdateFlashcardStatDto {
  session: string;
  flashcard: string;
  correct: boolean;
}

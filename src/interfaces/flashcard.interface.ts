export interface Flashcard {
  _id: string;
  parent_collection: string;
  question: string;
  answer: string;
  createdAt: Date;
  updatedAt: Date;
}

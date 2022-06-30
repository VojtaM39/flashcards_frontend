export interface Session {
  _id: string;
  flashcard_collection: string;
  user: string;
  random: boolean;
  unlimited: boolean;
  closed: boolean;
  correct: number;
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

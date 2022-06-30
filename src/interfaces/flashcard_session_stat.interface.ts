import { Session } from "@/interfaces/session.interface";
import { Flashcard } from "@/interfaces/flashcard.interface";

export interface FlashcardSessionStat {
  session: Session | string;
  flashcard: Flashcard | string;
  total: number;
  correct: number;
  createdAt: Date;
  updatedAt: Date;
}

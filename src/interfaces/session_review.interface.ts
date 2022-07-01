import { Session } from "@/interfaces/session.interface";

export interface SessionReview {
  session: Session | string;
  learned_percentage: number;
}

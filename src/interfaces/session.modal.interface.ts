import { Collection } from "@/interfaces/collection.interface";

export default interface SessionModalData {
  collection: Collection | null;
  random: boolean;
  infinite: boolean;
}

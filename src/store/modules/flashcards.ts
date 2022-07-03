import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import CollectionsApiService from "@/services/collections.api.service";
import FlashcardsApiService from "@/services/flashcards.api.service";
import { ApiCallException } from "@/exceptions/apicall.exception";
import { Collection } from "@/interfaces/collection.interface";
import { CreateCollectionDto } from "@/dtos/collection.dto";
import { Flashcard } from "@/interfaces/flashcard.interface";
import {
  CreateFlashcardDto,
  EditFlashcardDto,
  FetchCollectionFlashcardsDto,
} from "@/dtos/flashcard.dto";
import { Paginated } from "@/interfaces/paginated.interface";

@Module({ namespaced: true })
class Flashcards extends VuexModule {
  public collectionsApiService = new CollectionsApiService();
  public flashcardsApiService = new FlashcardsApiService();

  public collections: Collection[] = [];
  public collection: Collection | null = null;
  public flashcards: Flashcard[] = [];

  public collectionsPage = 0;
  public collectionsIsLastPage = false;

  public flashcardsPage = 0;
  public flashcardsIsLastPage = false;

  get authUserCollections(): Collection[] {
    return this.collections;
  }

  get collectionDetail(): Collection | null {
    return this.collection;
  }

  get collectionFlashcards(): Flashcard[] {
    return this.flashcards;
  }

  get authCollectionsPage(): number {
    return this.collectionsPage;
  }

  get authCollectionsIsLastPage(): boolean {
    return this.collectionsIsLastPage;
  }

  get collectionFlashcardsPage(): number {
    return this.flashcardsPage;
  }

  get collectionFlashcardsIsLastPage(): boolean {
    return this.flashcardsIsLastPage;
  }

  @Mutation
  public saveAuthUserCollections(
    paginatedCollections: Paginated<Collection>
  ): void {
    this.collections = paginatedCollections.items;
    this.collectionsPage = paginatedCollections.page;
    this.collectionsIsLastPage =
      paginatedCollections.page >= paginatedCollections.total_pages;
  }

  @Mutation
  public appendAuthUserCollections(
    paginatedCollections: Paginated<Collection>
  ): void {
    this.collections.push(...paginatedCollections.items);
    this.collectionsPage = paginatedCollections.page;
    this.collectionsIsLastPage =
      paginatedCollections.page >= paginatedCollections.total_pages;
  }

  @Mutation
  public saveCollectionDetail(collection: Collection): void {
    this.collection = collection;
  }

  @Mutation
  public saveCollectionFlashcards(
    paginatedFlashcards: Paginated<Flashcard>
  ): void {
    this.flashcards = paginatedFlashcards.items;
    this.flashcardsPage = paginatedFlashcards.page;
    this.flashcardsIsLastPage =
      paginatedFlashcards.page >= paginatedFlashcards.total_pages;
  }

  @Mutation
  public appendCollectionFlashcards(
    paginatedFlashcards: Paginated<Flashcard>
  ): void {
    this.flashcards.push(...paginatedFlashcards.items);
    this.flashcardsPage = paginatedFlashcards.page;
    this.flashcardsIsLastPage =
      paginatedFlashcards.page >= paginatedFlashcards.total_pages;
  }

  @Action({ rawError: true })
  public async fetchAuthenticatedUserCollections(
    page: number
  ): Promise<Paginated<Collection>> {
    return new Promise((resolve, reject) => {
      this.collectionsApiService
        .authUserCollections(page)
        .then((response) => {
          if (page === 1)
            this.context.commit("saveAuthUserCollections", response.data);
          else this.context.commit("appendAuthUserCollections", response.data);
          resolve(response.data);
        })
        .catch((error: ApiCallException) => {
          reject(error);
        });
    });
  }

  @Action({ rawError: true })
  public async createCollection(
    createCollectionData: CreateCollectionDto
  ): Promise<Collection> {
    return new Promise((resolve, reject) => {
      this.collectionsApiService
        .createCollection(createCollectionData)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error: ApiCallException) => {
          reject(error);
        });
    });
  }

  @Action({ rawError: true })
  public async fetchCollection(collectionId: string): Promise<Collection> {
    return new Promise((resolve, reject) => {
      this.collectionsApiService
        .collectionById(collectionId)
        .then((response) => {
          this.context.commit("saveCollectionDetail", response.data);
          resolve(response.data);
        })
        .catch((error: ApiCallException) => {
          reject(error);
        });
    });
  }

  @Action({ rawError: true })
  public async createFlashcard(
    createFlashcardData: CreateFlashcardDto
  ): Promise<Flashcard> {
    return new Promise((resolve, reject) => {
      this.flashcardsApiService
        .createFlashcard(createFlashcardData)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error: ApiCallException) => {
          reject(error);
        });
    });
  }

  @Action({ rawError: true })
  public async editFlashcard(
    editFlashcardData: EditFlashcardDto
  ): Promise<Flashcard> {
    return new Promise((resolve, reject) => {
      this.flashcardsApiService
        .editFlashcard(editFlashcardData)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error: ApiCallException) => {
          reject(error);
        });
    });
  }

  @Action({ rawError: true })
  public async deleteFlashcard(flashcardId: string): Promise<Flashcard> {
    return new Promise((resolve, reject) => {
      this.flashcardsApiService
        .deleteFlashcard(flashcardId)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error: ApiCallException) => {
          reject(error);
        });
    });
  }

  @Action({ rawError: true })
  public async fetchCollectionFlashcards(
    fetchCollectionFlashcardsData: FetchCollectionFlashcardsDto
  ): Promise<Paginated<Flashcard>> {
    return new Promise((resolve, reject) => {
      this.flashcardsApiService
        .getFlashcardsByCollection(
          fetchCollectionFlashcardsData.collectionId,
          fetchCollectionFlashcardsData.page
        )
        .then((response) => {
          if (fetchCollectionFlashcardsData.page === 1)
            this.context.commit("saveCollectionFlashcards", response.data);
          else this.context.commit("appendCollectionFlashcards", response.data);

          resolve(response.data);
        })
        .catch((error: ApiCallException) => {
          reject(error);
        });
    });
  }
}
export default Flashcards;

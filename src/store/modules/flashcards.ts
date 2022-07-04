import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import CollectionsApiService from "@/services/collections.api.service";
import FlashcardsApiService from "@/services/flashcards.api.service";
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
    const response = await this.collectionsApiService.authUserCollections(page);

    if (page === 1)
      this.context.commit("saveAuthUserCollections", response.data);
    else this.context.commit("appendAuthUserCollections", response.data);

    return response.data;
  }

  @Action({ rawError: true })
  public async createCollection(
    createCollectionData: CreateCollectionDto
  ): Promise<Collection> {
    const response = await this.collectionsApiService.createCollection(
      createCollectionData
    );
    return response.data;
  }

  @Action({ rawError: true })
  public async fetchCollection(collectionId: string): Promise<Collection> {
    const response = await this.collectionsApiService.collectionById(
      collectionId
    );
    this.context.commit("saveCollectionDetail", response.data);
    return response.data;
  }

  @Action({ rawError: true })
  public async createFlashcard(
    createFlashcardData: CreateFlashcardDto
  ): Promise<Flashcard> {
    const response = await this.flashcardsApiService.createFlashcard(
      createFlashcardData
    );
    return response.data;
  }

  @Action({ rawError: true })
  public async editFlashcard(
    editFlashcardData: EditFlashcardDto
  ): Promise<Flashcard> {
    const response = await this.flashcardsApiService.editFlashcard(
      editFlashcardData
    );
    return response.data;
  }

  @Action({ rawError: true })
  public async deleteFlashcard(flashcardId: string): Promise<Flashcard> {
    const response = await this.flashcardsApiService.deleteFlashcard(
      flashcardId
    );
    return response.data;
  }

  @Action({ rawError: true })
  public async fetchCollectionFlashcards(
    fetchCollectionFlashcardsData: FetchCollectionFlashcardsDto
  ): Promise<Paginated<Flashcard>> {
    const response = await this.flashcardsApiService.getFlashcardsByCollection(
      fetchCollectionFlashcardsData.collectionId,
      fetchCollectionFlashcardsData.page
    );

    if (fetchCollectionFlashcardsData.page === 1)
      this.context.commit("saveCollectionFlashcards", response.data);
    else this.context.commit("appendCollectionFlashcards", response.data);

    return response.data;
  }
}
export default Flashcards;

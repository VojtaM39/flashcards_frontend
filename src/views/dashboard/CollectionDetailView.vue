<template>
  <div id="collection-detail-view">
    <DashboardModal
      header="Add flashcards"
      :open="isAddNewFlashcardModalOpen"
      actionButtonText="Add flashcard"
      @action="handleAddNewFlashcard"
      @close="closeAddFlashcardsModal"
    >
      <TextInput
        :type="InputType.TextArea"
        placeholder="Question"
        v-model="newFlashcardsQuestion"
      />
      <TextInput
        :type="InputType.TextArea"
        placeholder="Answer"
        v-model="newFlashcardAnswer"
      />
    </DashboardModal>
    <MainHeader
      v-if="collectionDetail !== null"
      :header="collectionDetail.name"
    >
      <DashboardButton
        :type="ButtonType.DARK"
        text="Add flashcard"
        @click="openAddFlashcardModal"
      />
    </MainHeader>
    <div class="content">
      <ItemGrid
        :load-more="!collectionFlashcardsIsLastPage"
        :load-more-loading="false"
        @more="fetchMoreFlashcards"
      >
        <FlashcardGridCard
          v-for="flashcard in collectionFlashcards"
          :flashcard="flashcard"
          :key="flashcard._id"
        />
      </ItemGrid>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { namespace } from "vuex-class";
import { Collection } from "@/interfaces/collection.interface";
import ButtonType from "@/types/button.type";
import InputType from "@/types/input.type";
import MainHeader from "@/components/dashboard/general/MainHeader.vue";
import DashboardButton from "@/components/dashboard/general/DashboardButton.vue";
import DashboardModal from "@/components/dashboard/general/DashboardModal.vue";
import TextInput from "@/components/dashboard/general/TextInput.vue";
import FlashcardGridCard from "@/components/dashboard/collection/FlashcardGridCard.vue";
import ItemGrid from "@/components/dashboard/general/grid/ItemGrid.vue";
import {
  CreateFlashcardDto,
  FetchCollectionFlashcardsDto,
} from "@/dtos/flashcard.dto";
import { Flashcard } from "@/interfaces/flashcard.interface";
import { ApiCallException } from "@/exceptions/apicall.exception";
import { Paginated } from "@/interfaces/paginated.interface";

const flashcards = namespace("flashcards");

@Options({
  components: {
    MainHeader,
    DashboardModal,
    DashboardButton,
    TextInput,
    FlashcardGridCard,
    ItemGrid,
  },
})
export default class CollectionDetailView extends Vue {
  ButtonType = ButtonType;
  InputType = InputType;
  isAddNewFlashcardModalOpen = false;
  newFlashcardsQuestion = "";
  newFlashcardAnswer = "";

  @flashcards.Action
  public fetchCollection!: (collectionId: string) => Promise<Collection>;

  @flashcards.Action
  public fetchCollectionFlashcards!: (
    fetchCollectionFlashcardsData: FetchCollectionFlashcardsDto
  ) => Promise<Paginated<Flashcard>>;

  @flashcards.Action
  public createFlashcard!: (
    createFlashcardData: CreateFlashcardDto
  ) => Promise<Flashcard>;

  @flashcards.Getter
  public collectionDetail!: Collection;

  @flashcards.Getter
  public collectionFlashcards!: Flashcard[];

  @flashcards.Getter
  public collectionFlashcardsIsLastPage!: boolean;

  @flashcards.Getter
  public collectionFlashcardsPage!: number;

  beforeMount() {
    this.fetchCollection(this.getCollectionId());
    this.fetchCollectionFlashcards({
      collectionId: this.getCollectionId(),
      page: 1,
    });
  }

  openAddFlashcardModal() {
    this.isAddNewFlashcardModalOpen = true;
  }

  closeAddFlashcardsModal() {
    this.newFlashcardsQuestion = "";
    this.newFlashcardAnswer = "";
    this.isAddNewFlashcardModalOpen = false;
  }

  async handleAddNewFlashcard() {
    const createFlashcardData: CreateFlashcardDto = {
      parent_collection: this.getCollectionId(),
      question: this.newFlashcardsQuestion,
      answer: this.newFlashcardAnswer,
    };

    try {
      await this.createFlashcard(createFlashcardData);
      this.closeAddFlashcardsModal();
      await this.fetchCollectionFlashcards({
        collectionId: this.getCollectionId(),
        page: 1,
      });
    } catch (err) {
      if (err instanceof ApiCallException) {
        console.log(err.message);
      }
    }
  }

  fetchMoreFlashcards() {
    this.fetchCollectionFlashcards({
      collectionId: this.getCollectionId(),
      page: this.collectionFlashcardsPage + 1,
    });
  }

  getCollectionId() {
    return this.$route.params.id as string;
  }
}
</script>

<style scoped></style>

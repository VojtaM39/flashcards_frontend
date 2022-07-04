<template>
  <div id="collection-detail-view" v-show="!loading">
    <FlashcardModal
      :open="isFlashcardModalOpen"
      :type="flashcardModalType"
      v-model="flashcardModalData"
      @action="handleFlashcardModalAction"
      @close="closeFlashcardModal"
    />

    <MainHeader
      v-if="collectionDetail !== null"
      :header="collectionDetail.name"
      :back-button="true"
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
        @more="fetchMoreFlashcards"
      >
        <FlashcardGridCard
          v-for="flashcard in collectionFlashcards"
          :flashcard="flashcard"
          :key="flashcard._id"
          @delete="handleDeleteFlashcard(flashcard._id)"
          @edit="openEditFlashcardModal(flashcard)"
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
import MainHeader from "@/components/dashboard/general/MainHeader.vue";
import DashboardButton from "@/components/dashboard/general/DashboardButton.vue";
import DashboardModal from "@/components/dashboard/general/DashboardModal.vue";
import TextInput from "@/components/dashboard/general/TextInput.vue";
import FlashcardGridCard from "@/components/dashboard/collection/FlashcardGridCard.vue";
import ItemGrid from "@/components/dashboard/general/grid/ItemGrid.vue";
import FlashcardModal from "@/components/dashboard/collection/FlashcardModal.vue";
import {
  CreateFlashcardDto,
  EditFlashcardBodyDto,
  EditFlashcardDto,
  FetchCollectionFlashcardsDto,
} from "@/dtos/flashcard.dto";
import { Flashcard } from "@/interfaces/flashcard.interface";
import { ApiCallException } from "@/exceptions/apicall.exception";
import { Paginated } from "@/interfaces/paginated.interface";
import FlashcardModalData from "@/interfaces/flashcard.modal.interface";
import ModalType from "@/types/modal.type";

const flashcards = namespace("flashcards");

@Options({
  components: {
    MainHeader,
    DashboardModal,
    DashboardButton,
    TextInput,
    FlashcardGridCard,
    ItemGrid,
    FlashcardModal,
  },
})
export default class CollectionDetailView extends Vue {
  ButtonType = ButtonType;
  isFlashcardModalOpen = false;
  flashcardModalData: FlashcardModalData = this.getDefaultFlashcardModalData();
  flashcardModalType: ModalType = ModalType.Create;
  loading = true;

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

  @flashcards.Action
  public editFlashcard!: (
    editFlashcardData: EditFlashcardDto
  ) => Promise<Flashcard>;

  @flashcards.Action
  public deleteFlashcard!: (flashcardId: string) => Promise<Flashcard>;

  @flashcards.Getter
  public collectionDetail!: Collection;

  @flashcards.Getter
  public collectionFlashcards!: Flashcard[];

  @flashcards.Getter
  public collectionFlashcardsIsLastPage!: boolean;

  @flashcards.Getter
  public collectionFlashcardsPage!: number;

  created() {
    Promise.all([
      this.fetchCollection(this.getCollectionId()),
      this.fetchCollectionFlashcards({
        collectionId: this.getCollectionId(),
        page: 1,
      }),
    ]).then(() => (this.loading = false));
  }

  openAddFlashcardModal() {
    this.flashcardModalType = ModalType.Create;
    this.isFlashcardModalOpen = true;
  }

  openEditFlashcardModal(flashcard: Flashcard) {
    this.flashcardModalType = ModalType.Edit;
    this.flashcardModalData = {
      flashcard_id: flashcard._id,
      question: flashcard.question,
      answer: flashcard.answer,
    };
    this.isFlashcardModalOpen = true;
  }

  closeFlashcardModal() {
    this.flashcardModalData = this.getDefaultFlashcardModalData();
    this.isFlashcardModalOpen = false;
  }

  handleFlashcardModalAction() {
    switch (this.flashcardModalType) {
      case ModalType.Create:
        this.handleAddNewFlashcard();
        break;
      default:
        this.handleEditFlashcard();
        break;
    }
  }

  async handleAddNewFlashcard() {
    const createFlashcardData: CreateFlashcardDto = {
      parent_collection: this.getCollectionId(),
      question: this.flashcardModalData.question,
      answer: this.flashcardModalData.answer,
    };

    try {
      await this.createFlashcard(createFlashcardData);
      this.$toast.success("Successfully created new flashcard");

      this.closeFlashcardModal();
      await this.fetchCollectionFlashcards({
        collectionId: this.getCollectionId(),
        page: 1,
      });
    } catch (err) {
      if (err instanceof ApiCallException) {
        this.$toast.error(err.message);
      }
    }
  }

  async handleEditFlashcard() {
    const editFlashcardBody: EditFlashcardBodyDto = {
      question: this.flashcardModalData.question,
      answer: this.flashcardModalData.answer,
    };

    if (this.flashcardModalData.flashcard_id === null) {
      console.log("error while editing flashcard");
      return;
    }

    const editFlashcardData: EditFlashcardDto = {
      _id: this.flashcardModalData.flashcard_id,
      body: editFlashcardBody,
    };

    try {
      await this.editFlashcard(editFlashcardData);
      this.$toast.success("Successfully edited flashcard");

      this.closeFlashcardModal();
      await this.fetchCollectionFlashcards({
        collectionId: this.getCollectionId(),
        page: 1,
      });
    } catch (err) {
      if (err instanceof ApiCallException) {
        this.$toast.error(err.message);
      }
    }
  }

  async handleDeleteFlashcard(flashcardId: string) {
    if (!confirm("Do you really want to delete this flashcard?")) return;

    try {
      await this.deleteFlashcard(flashcardId);
      this.$toast.success("Successfully deleted flashcard");

      this.closeFlashcardModal();
      await this.fetchCollectionFlashcards({
        collectionId: this.getCollectionId(),
        page: 1,
      });
    } catch (err) {
      if (err instanceof ApiCallException) {
        this.$toast.error(err.message);
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

  getDefaultFlashcardModalData(): FlashcardModalData {
    return {
      flashcard_id: null,
      question: "",
      answer: "",
    };
  }
}
</script>

<style scoped></style>

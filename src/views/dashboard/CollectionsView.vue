<template>
  <div id="collections-view">
    <NewCollectionModal
      v-model="newCollectionModalData"
      :open="isNewCollectionModalOpen"
      @action="handleCreateNewCollection"
      @close="closeNewCollectionModal"
    />

    <StartSessionModal
      v-model="startSessionModalData"
      :open="isStartSessionModalOpen"
      @action="startSession"
      @close="closeNewSessionModal"
    />

    <MainHeader header="My Collections">
      <DashboardButton
        :type="ButtonType.DARK"
        text="Create new"
        @click="openNewCollectionModal"
      />
    </MainHeader>
    <div class="content" v-show="!loading">
      <ItemGrid
        :load-more="!collectionsIsLastPage"
        @more="fetchMoreCollections"
      >
        <CollectionsGridCard
          v-for="collection in collections"
          :collection="collection"
          :key="collection._id"
          @learn="this.openNewSessionModal(collection)"
        />
      </ItemGrid>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import MainHeader from "@/components/dashboard/general/MainHeader.vue";
import ItemGrid from "@/components/dashboard/general/grid/ItemGrid.vue";
import CollectionsGridCard from "@/components/dashboard/collections/CollectionsGridCard.vue";
import DashboardButton from "@/components/dashboard/general/DashboardButton.vue";
import DashboardModal from "@/components/dashboard/general/DashboardModal.vue";
import TextInput from "@/components/dashboard/general/TextInput.vue";
import StartSessionModal from "@/components/dashboard/collections/StartSessionModal.vue";
import NewCollectionModal from "@/components/dashboard/collections/NewCollectionModal.vue";
import { namespace } from "vuex-class";
import { Collection } from "@/interfaces/collection.interface";
import ButtonType from "@/types/button.type";
import { CreateCollectionDto } from "@/dtos/collection.dto";
import { ApiCallException } from "@/exceptions/apicall.exception";
import SessionModalData from "@/interfaces/session.modal.interface";
import NewCollectionModalData from "@/interfaces/new_collection.modal.interface";
import { Session } from "@/interfaces/session.interface";
import { CreateSessionDto } from "@/dtos/sessions.dto";
import { Paginated } from "@/interfaces/paginated.interface";

const flashcards = namespace("flashcards");
const sessions = namespace("sessions");

@Options({
  components: {
    MainHeader,
    ItemGrid,
    CollectionsGridCard,
    DashboardButton,
    DashboardModal,
    TextInput,
    StartSessionModal,
    NewCollectionModal,
  },
})
export default class CollectionsView extends Vue {
  ButtonType = ButtonType;
  isStartSessionModalOpen = false;
  isNewCollectionModalOpen = false;
  startSessionModalData: SessionModalData = this.getDefaultSessionModalData();
  newCollectionModalData: NewCollectionModalData =
    this.getDefaultNewCollectionModalData();
  loading = true;

  @flashcards.Action
  public fetchAuthenticatedUserCollections!: (
    page: number
  ) => Promise<Paginated<Collection>>;

  @flashcards.Action
  public createCollection!: (
    createCollectionData: CreateCollectionDto
  ) => Promise<Collection>;

  @sessions.Action
  public createSession!: (
    createSessionData: CreateSessionDto
  ) => Promise<Session>;

  @flashcards.State
  public collections!: Collection[];

  @flashcards.State
  public collectionsPage!: number;

  @flashcards.State
  public collectionsIsLastPage!: boolean;

  created() {
    this.fetchAuthenticatedUserCollections(1).then(
      () => (this.loading = false)
    );
  }

  openNewCollectionModal() {
    this.isNewCollectionModalOpen = true;
  }

  closeNewCollectionModal() {
    this.isNewCollectionModalOpen = false;
    this.newCollectionModalData = this.getDefaultNewCollectionModalData();
  }

  async handleCreateNewCollection() {
    const createCollectionData: CreateCollectionDto = {
      name: this.newCollectionModalData.name,
    };

    try {
      await this.createCollection(createCollectionData);
      this.$toast.success("Successfully created new collection");

      this.closeNewCollectionModal();
      await this.fetchAuthenticatedUserCollections(1);
    } catch (err) {
      if (err instanceof ApiCallException) {
        this.$toast.error(err.message);
      }
    }
  }

  openNewSessionModal(collection: Collection) {
    this.startSessionModalData.collection = collection;
    this.isStartSessionModalOpen = true;
  }

  async startSession() {
    if (this.startSessionModalData.collection == null) return;

    const createSessionData: CreateSessionDto = {
      flashcard_collection: this.startSessionModalData.collection._id,
      random: this.startSessionModalData.random,
      infinite: this.startSessionModalData.infinite,
    };

    try {
      const session = await this.createSession(createSessionData);

      await this.$router.push({ name: "session", params: { id: session._id } });
    } catch (err) {
      if (err instanceof ApiCallException) console.log(err.message);
    }
  }

  closeNewSessionModal() {
    this.startSessionModalData = this.getDefaultSessionModalData();
    this.isStartSessionModalOpen = false;
  }

  getDefaultSessionModalData(): SessionModalData {
    return {
      collection: null,
      random: false,
      infinite: false,
    };
  }

  fetchMoreCollections() {
    this.fetchAuthenticatedUserCollections(this.collectionsPage + 1);
  }

  getDefaultNewCollectionModalData(): NewCollectionModalData {
    return {
      name: "",
    };
  }
}
</script>

<style scoped lang="scss"></style>

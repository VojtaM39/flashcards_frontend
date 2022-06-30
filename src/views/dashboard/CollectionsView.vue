<template>
  <div id="collections-view">
    <DashboardModal
      header="Create collection"
      :open="isCreateNewCollectionModalOpen"
      actionButtonText="Create collection"
      @action="handleCreateNewCollection"
      @close="closeNewCollectionModal"
    >
      <TextInput placeholder="Collection name" v-model="newCollectionName" />
    </DashboardModal>

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
    <div class="content">
      <ItemGrid>
        <CollectionsGridCard
          v-for="collection in authUserCollections"
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
import { namespace } from "vuex-class";
import { Collection } from "@/interfaces/collection.interface";
import ButtonType from "@/types/button.type";
import { CreateCollectionDto } from "@/dtos/collection.dto";
import { ApiCallException } from "@/exceptions/apicall.exception";
import SessionModalData from "@/interfaces/session.modal.interface";
import { Session } from "@/interfaces/session.interface";
import { CreateSessionDto } from "@/dtos/sessions.dto";

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
  },
})
export default class CollectionsView extends Vue {
  ButtonType = ButtonType;
  isCreateNewCollectionModalOpen = false;
  newCollectionName = "";
  isStartSessionModalOpen = false;
  startSessionModalData: SessionModalData = this.getDefaultSessionModalData();

  @flashcards.Action
  public fetchAuthenticatedUserCollections!: () => Promise<Collection[]>;

  @flashcards.Action
  public createCollection!: (
    createCollectionData: CreateCollectionDto
  ) => Promise<Collection>;

  @sessions.Action
  public createSession!: (
    createSessionData: CreateSessionDto
  ) => Promise<Session>;

  @flashcards.Getter
  public authUserCollections!: Collection[];

  beforeMount() {
    this.fetchAuthenticatedUserCollections();
  }

  openNewCollectionModal() {
    this.isCreateNewCollectionModalOpen = true;
  }

  closeNewCollectionModal() {
    this.newCollectionName = "";
    this.isCreateNewCollectionModalOpen = false;
  }

  async handleCreateNewCollection() {
    const createCollectionData: CreateCollectionDto = {
      name: this.newCollectionName,
    };

    try {
      await this.createCollection(createCollectionData);

      this.closeNewCollectionModal();

      await this.fetchAuthenticatedUserCollections();
    } catch (err) {
      if (err instanceof ApiCallException) {
        console.log(err.message);
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
      this.$router.push({ name: "session", params: { id: session._id } });
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
}
</script>

<style scoped lang="scss"></style>

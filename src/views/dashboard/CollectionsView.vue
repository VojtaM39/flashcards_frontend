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
import { namespace } from "vuex-class";
import { Collection } from "@/interfaces/collection.interface";
import ButtonType from "@/types/button.type";
import { CreateCollectionDto } from "@/dtos/collection.dto";
import { ApiCallException } from "@/exceptions/apicall.exception";

const flashcards = namespace("flashcards");

@Options({
  components: {
    MainHeader,
    ItemGrid,
    CollectionsGridCard,
    DashboardButton,
    DashboardModal,
    TextInput,
  },
})
export default class CollectionsView extends Vue {
  ButtonType = ButtonType;
  isCreateNewCollectionModalOpen = false;
  newCollectionName = "";

  @flashcards.Action
  public fetchAuthenticatedUserCollections!: () => Promise<Collection[]>;

  @flashcards.Action
  public createCollection!: (
    createCollectionData: CreateCollectionDto
  ) => Promise<Collection>;

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
}
</script>

<style scoped lang="scss"></style>

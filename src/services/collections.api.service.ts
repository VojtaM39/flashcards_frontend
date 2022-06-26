import ApiService from "@/services/api.service";
import { ApiResponse } from "@/interfaces/apiresponse.interface";
import { Collection } from "@/interfaces/collection.interface";
import { CreateCollectionDto } from "@/dtos/collection.dto";

export default class CollectionsApiService extends ApiService {
  static readonly BASE_ENDPOINT_RESOURCE = "collections";

  constructor() {
    super(CollectionsApiService.BASE_ENDPOINT_RESOURCE);
  }

  async authUserCollections(): Promise<ApiResponse<Collection[]>> {
    return await this.get<ApiResponse<Collection[]>>("user/me");
  }

  async collectionById(collectionId: string): Promise<ApiResponse<Collection>> {
    return await this.get<ApiResponse<Collection>>(collectionId);
  }

  async createCollection(createCollectionData: CreateCollectionDto) {
    return await this.post<ApiResponse<Collection>, CreateCollectionDto>(
      "",
      createCollectionData
    );
  }
}

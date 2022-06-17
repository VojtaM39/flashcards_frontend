import ApiService from "@/services/api.service";
import { LoginUserDto, RegisterUserDto } from "@/dto/user.dto";
import { User } from "@/interfaces/user.interface";
import { ApiResponse } from "@/interfaces/apiresponse.interface";

export default class AuthApiService extends ApiService {
  static readonly BASE_ENDPOINT_RESOURCE = "auth";

  constructor() {
    super(AuthApiService.BASE_ENDPOINT_RESOURCE);
  }

  async authUser() {
    return await this.get<ApiResponse<User>>("user");
  }

  async signup(user: RegisterUserDto) {
    return await this.post<ApiResponse<User>, RegisterUserDto>("signup", user);
  }

  async login(user: LoginUserDto) {
    return await this.post<ApiResponse<User>, LoginUserDto>("login", user);
  }
}

import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import AuthApiService from "@/services/auth.api.service";
import { User } from "@/interfaces/user.interface";
import { LoginUserDto, RegisterUserDto } from "@/dto/user.dto";
import { ApiCallException } from "@/exceptions/apicall.exception";
import AuthStatus from "@/types/auth.type";

@Module({ namespaced: true })
class Posts extends VuexModule {
  public authApiService = new AuthApiService();

  public authenticatedUserState: User = {
    _id: "",
    email: "",
  };

  public status: AuthStatus = AuthStatus.Unknown;

  get authenticatedUser(): User {
    return this.authenticatedUserState;
  }

  get authenticationStatus(): AuthStatus {
    return this.status;
  }

  @Mutation
  public saveAuthenticatedUser(user: User): void {
    this.authenticatedUserState = user;
  }

  @Mutation
  public saveAuthenticationStatus(status: AuthStatus): void {
    this.status = status;
  }

  @Action
  public async fetchAuthenticatedUser(): Promise<User> {
    return new Promise((resolve, reject) => {
      this.authApiService
        .authUser()
        .then((response) => {
          this.context.commit("saveAuthenticatedUser", response.data);
          this.context.commit(
            "saveAuthenticationStatus",
            AuthStatus.Authenticated
          );
          resolve(response.data);
        })
        .catch((error: ApiCallException) => {
          reject(error);
        });
    });
  }

  @Action
  public async signup(registerUserDto: RegisterUserDto): Promise<User> {
    return new Promise((resolve, reject) => {
      this.authApiService
        .signup(registerUserDto)
        .then((response) => {
          this.context.commit("saveAuthenticatedUser", response.data);
          this.context.commit(
            "saveAuthenticationStatus",
            AuthStatus.Authenticated
          );
          resolve(response.data);
        })
        .catch((error: ApiCallException) => {
          reject(error);
        });
    });
  }

  @Action
  public async login(loginUserDto: LoginUserDto): Promise<User> {
    return new Promise((resolve, reject) => {
      this.authApiService
        .login(loginUserDto)
        .then((response) => {
          this.context.commit("saveAuthenticatedUser", response.data);
          this.context.commit(
            "saveAuthenticationStatus",
            AuthStatus.Authenticated
          );
          resolve(response.data);
        })
        .catch((error: ApiCallException) => {
          reject(error);
        });
    });
  }
}
export default Posts;

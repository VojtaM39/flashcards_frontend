import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import AuthApiService from "@/services/auth.api.service";
import { User } from "@/interfaces/user.interface";
import { LoginUserDto, RegisterUserDto } from "@/dtos/user.dto";
import AuthStatus from "@/types/auth.type";

@Module({ namespaced: true })
class Auth extends VuexModule {
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

  @Mutation
  public clearAuthenticatedUser(): void {
    this.authenticatedUserState = {
      _id: "",
      email: "",
    };
  }

  @Action({ rawError: true })
  public async fetchAuthenticatedUser(): Promise<User> {
    const response = await this.authApiService.authUser();
    this.context.commit("saveAuthenticatedUser", response.data);
    this.context.commit("saveAuthenticationStatus", AuthStatus.Authenticated);
    return response.data;
  }

  @Action({ rawError: true })
  public async signup(registerUserDto: RegisterUserDto): Promise<User> {
    const response = await this.authApiService.signup(registerUserDto);
    this.context.commit("saveAuthenticatedUser", response.data);
    this.context.commit("saveAuthenticationStatus", AuthStatus.Authenticated);
    return response.data;
  }

  @Action({ rawError: true })
  public async login(loginUserDto: LoginUserDto): Promise<User> {
    const response = await this.authApiService.login(loginUserDto);
    this.context.commit("saveAuthenticatedUser", response.data);
    this.context.commit("saveAuthenticationStatus", AuthStatus.Authenticated);
    return response.data;
  }

  @Action({ rawError: true })
  public async logout(): Promise<User> {
    const response = await this.authApiService.logout();
    this.context.commit("clearAuthenticatedUser");
    this.context.commit("saveAuthenticationStatus", AuthStatus.Unauthenticated);
    return response.data;
  }
}
export default Auth;

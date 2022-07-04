import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import store from "@/store";
import { LOGIN } from "@/router/routes.type";
import AuthStatus from "@/types/auth.type";

export default async function authGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  let authStatus: AuthStatus = store.state.auth.authenticationStatus;

  if (authStatus === AuthStatus.Unknown) {
    await store.dispatch("auth/fetchAuthenticatedUser");
    authStatus = store.state.auth.authenticationStatus;
  }

  if (authStatus === AuthStatus.Authenticated) next();
  else next(LOGIN);
}

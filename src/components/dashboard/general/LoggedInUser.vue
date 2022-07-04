<template>
  <div class="logged-in">
    <div class="logged-in__user">
      {{ authenticatedUser.email }}
    </div>
    <div class="logged-in__logout" @click="handleLogout">
      <LogoutSvg width="2rem" height="2rem" />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { namespace } from "vuex-class";
import { User } from "@/interfaces/user.interface";
import AuthStatus from "@/types/auth.type";
import LogoutSvg from "@/components/svg/LogoutSvg.vue";

const auth = namespace("auth");

@Options({
  components: { LogoutSvg },
})
export default class LoggedInUser extends Vue {
  @auth.State
  authenticatedUser!: User;

  @auth.Getter
  authenticationStatus!: AuthStatus;

  @auth.Action public logout!: () => Promise<boolean>;

  async handleLogout() {
    const result = await this.logout();
    if (result) await this.$router.push("/login");
  }
}
</script>

<style scoped lang="scss">
.logged-in {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.logged-in__user {
  color: #000;
  font-weight: 400;
  font-size: 1.1rem;
}

.logged-in__logout {
  margin-left: 0.8rem;
  cursor: pointer;
}
</style>

<template>
  <AuthLayout header="Login">
    <AuthInput
      :type="InputType.Email"
      placeholder="Your e-mail"
      v-model="email"
    />
    <AuthInput
      :type="InputType.Password"
      placeholder="Password"
      v-model="password"
    />
    <AuthButton value="Login" @submit="handleLogin" />
    <AuthInfo
      >Not registered yet?
      <router-link :to="{ name: 'register' }">Create an account</router-link
      >.</AuthInfo
    >
  </AuthLayout>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import AuthLayout from "@/components/auth/AuthLayout.vue";
import AuthInput from "@/components/auth/AuthInput.vue";
import AuthButton from "@/components/auth/AuthButton.vue";
import AuthInfo from "@/components/auth/AuthInfo.vue";
import InputType from "@/types/input.type";
import { LoginUserDto, RegisterUserDto } from "@/dtos/user.dto";
import { namespace } from "vuex-class";
import { ApiCallException } from "@/exceptions/apicall.exception";

const auth = namespace("auth");

@Options({
  components: {
    AuthLayout,
    AuthInput,
    AuthButton,
    AuthInfo,
  },
})
export default class LoginView extends Vue {
  email = "";
  password = "";
  InputType = InputType;

  @auth.Action
  public login!: (registerUserDto: RegisterUserDto) => Promise<boolean>;

  async handleLogin() {
    const loginData: LoginUserDto = {
      email: this.email,
      password: this.password,
    };

    try {
      await this.login(loginData);
      this.$toast.success("Successfully logged in");

      await this.$router.push("/dashboard/collections");
    } catch (err) {
      if (err instanceof ApiCallException) {
        this.$toast.error(err.message);
      }
    }
  }
}
</script>

<style scoped></style>

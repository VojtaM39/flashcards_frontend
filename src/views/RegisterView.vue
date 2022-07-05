<template>
  <AuthLayout header="Register">
    <AuthInput
      :type="InputType.Email"
      placeholder="Your e-mail"
      v-model="email"
    />
    <AuthInput
      :type="InputType.Password"
      placeholder="Password"
      v-model="password1"
    />
    <AuthInput
      :type="InputType.Password"
      placeholder="Password again"
      v-model="password2"
    />
    <AuthButton value="Create account" @submit="handleRegistration" />
    <AuthInfo
      >Already registered?
      <router-link :to="{ name: 'login' }">Login</router-link>.</AuthInfo
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
import { namespace } from "vuex-class";
import { RegisterUserDto } from "@/dtos/user.dto";
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
export default class RegisterView extends Vue {
  email = "";
  password1 = "";
  password2 = "";
  InputType = InputType;

  @auth.Action
  public signup!: (registerUserDto: RegisterUserDto) => Promise<boolean>;

  async handleRegistration() {
    if (this.password1 !== this.password2) {
      return;
    }

    const registrationData: RegisterUserDto = {
      email: this.email,
      password: this.password1,
    };

    try {
      await this.signup(registrationData);
      this.$toast.success("Successfully signed up");

      await this.$router.push("login");
    } catch (err) {
      if (err instanceof ApiCallException) {
        this.$toast.error(err.message);
      }
    }
  }
}
</script>

<style scoped></style>

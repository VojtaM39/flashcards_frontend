<template>
  <div id="homepage-view">
    <div class="homepage-content">
      <div class="homepage-title">
        <span class="homepage-title__word homepage-title__word--filled"
          >Flash</span
        ><span class="homepage-title__word homepage-title__word--outlined"
          >cards</span
        >
      </div>
      <div class="homepage-auth-button-wrapper">
        <router-link
          class="homepage-button homepage-button--light"
          :to="{ name: 'login' }"
          >Login</router-link
        >
        <router-link
          class="homepage-button homepage-button--dark"
          :to="{ name: 'register' }"
          >Register</router-link
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import HelloWorld from "@/components/HelloWorld.vue";

@Options({
  components: {
    HelloWorld,
  },
})
export default class HomeView extends Vue {}
</script>

<style scoped lang="scss">
$main-title-color: #000;
$title-outline-width: 1px;

#homepage-view {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: auto;
}

.homepage-content {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.homepage-title {
  font-size: 5rem;
  font-weight: 700;
  text-transform: uppercase;
  color: $main-title-color;
  margin-bottom: 2rem;

  @include media-breakpoint-down(md) {
    font-size: 10vw;
  }
}

.homepage-title__word--outlined {
  color: $primary-background;
  text-shadow: 1px 1px 0 $main-title-color, -1px -1px 0 $main-title-color,
    1px -1px 0 $main-title-color, -1px 1px 0 $main-title-color,
    1px 1px 0 $main-title-color;
}

.homepage-auth-button-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  align-items: center;
}

.homepage-button {
  $horizontal-margin: 0.25rem;

  width: 100%;
  font-size: 1.1rem;
  font-weight: 500;
  text-align: center;
  text-transform: uppercase;
  padding: 0.5rem 0;
  text-decoration: none;
  border-radius: 3px;
  border: 2px solid #000;
  color: #000;

  &:nth-child(1) {
    margin-right: $horizontal-margin;
  }

  &:nth-child(2) {
    margin-left: $horizontal-margin;
  }
}

.homepage-button--dark {
  color: #fff;
  background-color: #000;
}
</style>

<template>
  <div id="homepage-view" :class="{ 'homepage-view--loading': loading }">
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
import { Vue } from "vue-class-component";

export default class HomeView extends Vue {
  loading = false;

  mounted() {
    this.handleInitialLoad();
  }

  handleInitialLoad() {
    if (document.readyState == "complete") return;

    this.loading = true;
    document.onreadystatechange = () => {
      if (document.readyState == "complete") {
        this.loading = false;
      }
    };
  }
}
</script>

<style scoped lang="scss">
$title-outline-width: 1px;
$main-dark-color: #333;

$animation-delay: 0.3s;
$animation-text-opacity-duration: 0.4s;
$animation-text-background-delay: 0.3s;
$animation-text-background-duration: 0.7s;
$animation-buttons-delay: 0.15s;
$animation-buttons-transform-duration: 0.3s;

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
  font-family: "Roboto", sans-serif;
  font-weight: 900;
  text-transform: uppercase;
  color: transparent;
  margin-bottom: 2rem;
  letter-spacing: 0.125rem;

  @include media-breakpoint-down(md) {
    font-size: 10vw;
  }
}

.homepage-title__word--outlined,
.homepage-title__word--filled {
  -webkit-background-clip: text;
  -webkit-text-stroke: 0.02em $main-dark-color;
  transition-delay: $animation-delay;
  opacity: 1;
  transition: opacity $animation-text-opacity-duration $animation-delay ease-out,
    background-position $animation-text-background-duration
      (
        $animation-delay + $animation-text-opacity-duration +
          $animation-text-background-delay
      )
      cubic-bezier(0.145, 0.96, 0.205, 0.99);
}

.homepage-title__word--filled {
  background-image: linear-gradient(
    270deg,
    $main-dark-color 0%,
    $main-dark-color 50%,
    transparent 50.1%
  );
  background-position: 100% 0;
  background-size: 200% 100%;
}

.homepage-title__word--outlined {
  background-image: linear-gradient(
    90deg,
    $main-dark-color 0%,
    $main-dark-color 50%,
    transparent 50.1%
  );
  background-position: -100% 0;
  background-size: 200% 100%;
}

$buttons-transition: transform $animation-buttons-transform-duration
  (
    $animation-delay + $animation-text-opacity-duration +
      $animation-text-background-delay + $animation-text-background-duration +
      $animation-buttons-delay
  )
  ease-out;

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
  border: 2px solid $main-dark-color;
  color: $main-dark-color;
  transform-origin: 50% 0;
  transform: rotateX(0);
  transition: transform $animation-buttons-transform-duration
    (
      $animation-delay + $animation-text-opacity-duration +
        $animation-text-background-delay + $animation-text-background-duration +
        $animation-buttons-delay
    )
    ease-out;

  &:hover {
    color: $main-dark-color;
  }

  &:nth-child(1) {
    margin-right: $horizontal-margin;
  }

  &:nth-child(2) {
    margin-left: $horizontal-margin;
  }
}

.homepage-button--dark {
  $text-color: #fff;

  color: $text-color;
  background-color: $main-dark-color;

  &:hover {
    color: $text-color;
  }
}

.homepage-view--loading {
  .homepage-title__word--filled,
  .homepage-title__word--outlined {
    opacity: 0;
  }

  .homepage-title__word--filled {
    background-position: 0 0;
  }

  .homepage-title__word--outlined {
    background-position: 0 0;
  }

  .homepage-button {
    transform: rotateX(90deg);
  }
}
</style>

<template>
  <div class="dashboard-layout">
    <div class="site-header">
      <div class="site-header__section">
        <Logo font-size="2" />
      </div>

      <div class="site-header__section">
        <LoggedInUser />
      </div>
    </div>

    <div class="page-wrapper container col-11 col-md-10 col-lg-8">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Logo from "@/components/dashboard/general/Logo.vue";
import LoggedInUser from "@/components/dashboard/general/LoggedInUser.vue";

@Options({
  components: { Logo, LoggedInUser },
})
export default class DashboardView extends Vue {}
</script>

<style scoped lang="scss">
.site-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1rem 2rem;
}
</style>

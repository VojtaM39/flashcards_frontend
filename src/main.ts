import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-default.css";
import "./styles/bootstrap.scss";
import "./styles/fonts.css";

const app = createApp(App);
app.use(store);
app.use(router);
app.use(VueToast, {
  position: "top-right",
});
app.mount("#app");

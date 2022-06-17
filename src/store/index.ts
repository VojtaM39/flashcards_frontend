import Vuex from "vuex";
import auth from "@/store/modules/auth";

const store = new Vuex.Store({
  modules: {
    auth,
  },
});
export default store;

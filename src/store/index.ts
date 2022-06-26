import Vuex from "vuex";
import auth from "@/store/modules/auth";
import flashcards from "@/store/modules/flashcards";

const store = new Vuex.Store({
  modules: {
    auth,
    flashcards,
  },
});
export default store;

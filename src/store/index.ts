import Vuex from "vuex";
import auth from "@/store/modules/auth";
import flashcards from "@/store/modules/flashcards";
import sessions from "@/store/modules/sessions";

const store = new Vuex.Store({
  modules: {
    auth,
    flashcards,
    sessions,
  },
});
export default store;

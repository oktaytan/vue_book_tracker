<template>
  <v-app>
    <v-content style="max-height: 100vh;">
      <router-view @open-draw="openDrawer"></router-view>
    </v-content>
    <v-footer absolute bottom left color="teal lighten-2" dark>
      <v-flex justify-center text-center
        >&copy; BookTracker {{ new Date().getFullYear() }}</v-flex
      >
    </v-footer>

    <MoreOptions />
  </v-app>
</template>

<script>
import MoreOptions from "./components/MoreOptions";
import { mapActions } from "vuex";

export default {
  name: "App",
  components: {
    MoreOptions
  },
  data: () => ({}),
  methods: {
    ...mapActions(["workDrawer"]),
    openDrawer() {
      this.workDrawer(true);
    }
  }
};
</script>

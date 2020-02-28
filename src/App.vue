<template>
  <v-app>
    <v-content style="max-height: 100vh;">
      <router-view @open-draw="openDrawer"></router-view>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "App",
  components: {},
  data: () => ({}),
  computed: {
    ...mapGetters(["getColors"])
  },
  methods: {
    ...mapActions(["workDrawer"]),
    openDrawer() {
      this.workDrawer(true);
    }
  }
};
</script>


<style>
@media only screen and (max-width: 600px) {
  .margin__center--xs {
    padding: 0 3rem !important;
  }
}
</style>
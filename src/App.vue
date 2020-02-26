<template>
  <v-app>
    <v-content style="max-height: 100vh;" class="body">
      <router-view @open-draw="openDrawer"></router-view>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "App",
  components: {},
  data: () => ({}),
  methods: {
    ...mapActions(["workDrawer"]),
    openDrawer() {
      this.workDrawer(true);
    }
  }
};
</script>


<style>
.body {
  background-color: ;
}
</style>
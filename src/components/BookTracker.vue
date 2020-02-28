<template>
  <v-container fluid class="pa-0 pt-0 pb-0 bg" v-if="isLogin">
    <v-row no-gutters justify="space-between">
      <v-col
        cols="12"
        sm="5"
        md="3"
        lg="3"
        :class="{ 'mb-6': $vuetify.breakpoint.smAndDown }"
      >
        <BookLists />
      </v-col>
      <v-col cols="12" sm="6" md="5" lg="5">
        <router-view></router-view>
      </v-col>
      <v-col
        cols="12"
        sm="12"
        md="3"
        lg="3"
        :class="{ 'mt-6': $vuetify.breakpoint.smAndDown }"
      >
        <Options @open-draw="$emit('open-draw')" />
      </v-col>
    </v-row>
    <Notification />
    <MoreOptions />
  </v-container>
</template>

<script>
import BookLists from "./BookLists";
import Options from "./Options";
import Notification from "./Notification";
import MoreOptions from "./MoreOptions";

import { mapGetters, mapActions } from "vuex";

export default {
  name: "Book",
  data: () => ({
    drawer: false
  }),
  mounted() {
    this.hasToken();
    if (!this.isLogin) {
      this.$router.push("/login");
    }
  },
  computed: {
    ...mapGetters(["isLogin", "getColors"])
  },
  components: {
    BookLists,
    Options,
    Notification,
    MoreOptions
  },
  methods: {
    ...mapActions(["hasToken"])
  }
};
</script>

<style scoped>
.bg {
  background: url("../assets/app_bg.jpg") no-repeat 0 0 / cover;
}
</style>

<template>
  <v-container fluid pl-0 pr-0 pt-0 pb-0 fill-height>
    <v-layout align-center fill-height style="max-height: 100vh;">
      <v-flex xs12 sm6 md6>
        <div style="width: 100%; height: 100vh; overflow: hidden;">
          <img
            src="../../assets/login_bg.jpg"
            style="width: 100%; position: relative; top: -300px"
          />
        </div>

        <p class="login__footer">
          &copy; BookTracker {{ new Date().getFullYear() }}
        </p>
      </v-flex>

      <v-spacer></v-spacer>

      <v-flex xs12 sm4 md4>
        <v-form @submit.prevent="login">
          <v-card elevation="12">
            <v-toolbar dark :color="getColors.primary">
              <v-toolbar-title>
                GİRİŞ FORMU
              </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-alert
                dark
                :color="getColors.secondary"
                :value="error"
                icon="close"
              >
                Kullanıcı adı veya şifre hatalı.
              </v-alert>
              <v-text-field
                prepend-icon="person"
                name="login"
                label="Kullanıcı Adı"
                type="text"
                v-model="username"
              >
              </v-text-field>
              <v-text-field
                prepend-icon="lock"
                name="password"
                label="Şifre"
                type="password"
                v-model="password"
              >
              </v-text-field>
            </v-card-text>
            <v-divider light></v-divider>
            <v-card-actions>
              <v-btn to="/signup" dark :color="getColors.primary">Kaydol</v-btn>
              <v-spacer></v-spacer>
              <v-btn type="submit" dark :color="getColors.secondary">
                Giriş Yap
                <v-icon>keyboard_arrow_right</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-flex>
      <v-spacer></v-spacer>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Login",
  data: () => ({
    error: false,
    username: "",
    password: null
  }),
  computed: {
    ...mapGetters(["isLogin", "getColors"])
  },
  methods: {
    ...mapActions(["loginAction"]),
    login() {
      this.loginAction({
        username: this.username,
        password: this.password
      })
        .then(() => {
          if (this.isLogin) {
            this.$router.push("/");
          }
        })
        .catch(error => {
          this.error = true;
          this.$router.push("/login");
        });
    }
  }
};
</script>


<style scoped>
.login__footer {
  position: absolute;
  bottom: 10px;
  right: 5%;
  opacity: 0.4;
}
</style>
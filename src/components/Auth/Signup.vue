<template>
  <v-container fluid fill-height pl-0 pr-0 pb-0 pt-0>
    <v-row no-gutters align="center" style="max-height: 100vh;">
      <v-col cols="12" xs="12" sm="4" md="6" class="d-none d-md-block">
        <div style="width: 100%; height: 100vh; overflow: hidden;">
          <img
            src="../../assets/register_bg.jpg"
            style="width: 100%; height: 100%; position: relative;"
          />
        </div>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="12" xs="8" sm="8" md="4" class="margin__center--xs">
        <v-form @submit.prevent="register">
          <v-card elevation="12">
            <v-toolbar dark :color="getColors.primary">
              <v-toolbar-title>
                KAYIT FORMU
              </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-alert
                dark
                :value="error"
                :color="getColors.secondary"
                icon="warning"
              >
                Bu kullanıcı zaten var. Farklı bilgilerle tekrar deneyiniz.
              </v-alert>
              <v-alert
                dark
                :value="emptyError"
                :color="getColors.secondary"
                icon="warning"
              >
                Bütün alanların doldurulması gerekir.
              </v-alert>
              <v-text-field
                prepend-icon="perm_identity"
                name="fullname"
                label="Ad Soyad"
                v-model="fullname"
                :rules="[rules.required]"
              ></v-text-field>

              <v-text-field
                prepend-icon="person"
                name="username"
                label="Kullanıcı Adı"
                v-model="username"
                :rules="[rules.required]"
              ></v-text-field>

              <v-text-field
                prepend-icon="email"
                name="email"
                label="Email"
                v-model="email"
                :rules="[rules.required, rules.email]"
              ></v-text-field>

              <v-text-field
                prepend-icon="lock"
                name="password"
                label="Şifre"
                type="password"
                v-model="password"
                :rules="[rules.required, rules.length]"
              ></v-text-field>

              <v-text-field
                prepend-icon="lock"
                name="password"
                label="Şifre Tekrarı"
                type="password"
                v-model="confirm_password"
                :rules="[rules.required]"
                :error="valid()"
              ></v-text-field>
            </v-card-text>
            <v-divider light></v-divider>
            <v-card-actions>
              <v-btn to="/login" dark :color="getColors.primary"
                >Giriş Yap</v-btn
              >
              <v-spacer></v-spacer>
              <v-btn type="submit" dark :color="getColors.secondary">
                Kaydol
                <v-icon>keyboard_arrow_right</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
        <p class="login__footer">
          &copy; BookTracker {{ new Date().getFullYear() }}
        </p>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>

    <Notification />
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Notification from "../Notification";

export default {
  name: "Signup",
  components: {
    Notification
  },
  data: () => ({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    rules: {
      required: value => !!value || "Doldurulması zorunlu alan",
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Geçersiz e-mail";
      },
      length: value => {
        return value && value.length < 4 ? "Şifre 4 karakter olmalı" : "";
      }
    },
    error: false,
    emptyError: false
  }),
  computed: {
    ...mapGetters(["getColors"])
  },
  methods: {
    ...mapActions(["registerAction", "workNotification"]),
    valid() {
      return (
        this.confirm_password != "" && this.password !== this.confirm_password
      );
    },
    length() {
      return this.password.length === 4;
    },
    register() {
      if (
        this.fullname != "" &&
        this.username != "" &&
        this.email != "" &&
        this.password &&
        this.confirm_password != ""
      ) {
        const user = {
          fullname: this.fullname,
          username: this.username,
          email: this.email,
          password: this.password,
          category: []
        };

        this.registerAction(user)
          .then(data => {
            const notify = {
              display: true,
              alertClass: "success",
              timeout: 1000,
              text: "Kullanıcı kaydı yapıldı."
            };
            this.workNotification(notify).then(() => {
              setTimeout(() => {
                this.$router.push("/login");
              }, 1000);
            });
          })
          .catch(err => {
            if (err) {
              const notify = {
                display: true,
                alertClass: "red darken-2",
                timeout: 3000,
                text: "Bu kullanıcı sistemde kayıtlı."
              };
              this.workNotification(notify);
            }
          });
      } else {
        this.emptyError = true;
        setTimeout(() => (this.emptyError = false), 3000);
        return false;
      }
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
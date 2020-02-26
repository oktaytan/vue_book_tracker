<template>
  <v-container fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-form @submit.prevent="register">
          <v-card elevation="12">
            <v-toolbar dark color="teal lighten-2">
              <v-toolbar-title>
                KAYIT FORMU
              </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-alert
                dark
                :value="error"
                color="orange darken-1"
                icon="warning"
              >
                Bu kullanıcı zaten var. Farklı bilgilerle tekrar deneyiniz.
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
                :rules="[rules.required]"
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
              <v-btn to="/login" dark color="orange darken-1">Giriş Yap</v-btn>
              <v-spacer></v-spacer>
              <v-btn type="submit" dark color="teal lighten-2">
                Kaydol
                <v-icon>keyboard_arrow_right</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-flex>
    </v-layout>
    <Notification />
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
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
        return value.length < 4 ? "Şifre 4 karakter olmalı" : "";
      }
    },
    error: false
  }),
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
    }
  }
};
</script>

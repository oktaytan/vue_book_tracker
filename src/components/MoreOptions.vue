<template>
  <v-navigation-drawer
    v-model="openDrawer"
    absolute
    right
    temporary
    ref="drawer"
  >
    <v-list>
      <v-list-item>
        <v-list-item-content>
          <v-menu
            v-model="menu"
            bottom
            right
            transition="scale-transition"
            origin="top left"
          >
            <template v-slot:activator="{ on }">
              <v-chip pill v-on="on" color="grey lighten-4">
                <v-avatar left v-if="avatar">
                  <v-img :src="avatar"></v-img>
                </v-avatar>
                <v-avatar left v-else color="grey lighten-2" size="36">
                  <v-icon>person</v-icon>
                </v-avatar>
                <div style="margin-left: 2rem">
                  {{ fullname || "" }}
                </div>
              </v-chip>
            </template>
            <v-card width="300">
              <v-list dark color="teal darken-1">
                <v-list-item>
                  <v-list-item-avatar v-if="avatar">
                    <v-img :src="avatar"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-avatar v-else color="white lighten-2" size="48">
                    <span class="teal--text headline">{{ shortName }}</span>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>{{ fullname || "" }}</v-list-item-title>
                    <v-list-item-subtitle>{{ email }}</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn icon @click="menu = false">
                      <v-icon>mdi-close-circle</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
              <v-list>
                <v-list-item @click="() => {}">
                  <v-list-item-action>
                    <v-icon>mdi-briefcase</v-icon>
                  </v-list-item-action>
                  <v-list-item-subtitle>Profili düzenle</v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>
        </v-list-item-content>
      </v-list-item>

      <v-spacer></v-spacer>
    </v-list>

    <v-divider></v-divider>

    <v-form>
      <v-container fluid>
        <v-flex xs12>
          <v-img :src="imageUrl" style="height: 150px" alt=""></v-img>

          <v-text-field
            label="Bir resim seçin"
            v-model="imageName"
            prepend-icon="attach_file"
            :clearable="clearable"
            @click="pickFile"
          >
          </v-text-field>

          <input
            type="file"
            style="display: none"
            ref="image"
            accept="image/*"
            @change="onFilePicked"
          />
        </v-flex>

        <v-flex xs12 text-center mt-4>
          <v-btn :loading="loading" :disabled="!imageFile" @click="uploadFile">
            Arkaplan yükle
            <v-icon right dark>cloud_upload</v-icon>
          </v-btn>
        </v-flex>
      </v-container>
    </v-form>
  </v-navigation-drawer>
</template>

<script>
import img from "../assets/avatar_sample.jpg";
import { mapGetters, mapActions } from "vuex";
import { capitalize } from "../util/settings";

export default {
  name: "MoreOptions",
  data: () => ({
    avatar: false,
    imageUrl: "",
    imageName: "",
    loading: false,
    imageFile: "",
    clearable: false,
    menu: false,
    fullname: "",
    email: ""
  }),
  computed: {
    ...mapGetters(["getDrawer", "getUser"]),
    openDrawer: {
      get() {
        return this.getDrawer;
      },
      set(value) {
        return this.workDrawer(value);
      }
    },
    shortName() {
      return (
        this.fullname &&
        this.fullname
          .split(" ")
          .map(word => word.charAt(0).toUpperCase())
          .join(" ")
      );
    }
  },
  mounted() {
    this.fullname =
      (this.getUser.fullname && capitalize(this.getUser.fullname)) || "";
    this.email = this.getUser.email;
  },
  watch: {
    fullname(value) {
      return this.getUser.fullname;
    },
    email(value) {
      return this.getUser.email;
    }
  },
  methods: {
    ...mapActions(["workDrawer"]),
    pickFile() {
      this.$refs.image.click();
    },
    onFilePicked(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.imageName = files[0].name;
        if (this.imageName.lastIndexOf(".") <= 0) {
          return;
        }

        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.imageUrl = fr.result;
          this.clearable = true;
          this.imageFile = files[0];
        });
      } else {
        this.imageUrl = "";
        this.imageName = "";
        this.imageFile = "";
      }
    },
    uploadFile() {
      console.log(this.imageFile);
    }
  }
};
</script>

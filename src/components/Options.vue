<template>
  <v-card
    style="width: 100%; height: 100vh; overflow: hidden;"
    tile
    v-if="show"
  >
    <v-toolbar :color="getColors.secondary" dark>
      <v-toolbar-title>Seçenekler</v-toolbar-title>
    </v-toolbar>

    <v-list>
      <v-list-group
        v-for="(item, index) in items"
        :key="index"
        v-model="item.active"
        :prepend-icon="item.action"
        no-action
      >
        <v-list-item slot="activator">
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          v-for="(subItem, key) in item.items"
          :key="key"
          v-on="
            item.action === 'sort'
              ? { click: () => sort(subItem.by) }
              : { click: () => filter(subItem.by) }
          "
        >
          <v-list-item-content>
            <v-list-item-title>{{ subItem.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>

      <v-list-group prepend-icon="gavel" no-action>
        <v-list-item slot="activator">
          <v-list-item-content>
            <v-list-item-title>Ayarlar</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="removeList">
          <v-list-item-content>
            <v-list-item-title class="danger">Listeyi Sil</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click.stop="$emit('open-draw')">
          <v-list-item-content>
            <v-list-item-title>Profilim</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click.stop="logout">
          <v-list-item-title>Çıkış Yap</v-list-item-title>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Options",
  components: {},
  data: () => ({
    drawer: false,
    items: [
      {
        action: "sort",
        title: "Sırala",
        active: false,
        items: [
          {
            title: "Kitap Adı",
            by: "bookName"
          },
          {
            title: "Yazar Adı",
            by: "authorName"
          }
        ]
      },
      {
        action: "filter_list",
        title: "Filtrele",
        active: false,
        items: [
          {
            title: "Okunmayanlar",
            by: "remaining"
          },
          {
            title: "Okunanlar",
            by: "read"
          },
          {
            title: "Hepsi",
            by: "all"
          }
        ]
      }
    ]
  }),
  computed: {
    ...mapGetters(["getColors"]),
    show() {
      return !!this.$route.params.id;
    }
  },
  methods: {
    ...mapActions(["workNotification", "logoutAction", "sortBookAction"]),
    sort(value) {
      this.sortBookAction({ type: value, category_id: this.$route.params.id });
    },
    filter(value) {
      console.log("Sort by " + value);
    },
    removeList() {
      const notify = {
        display: true,
        alertClass: "success",
        timeout: 3000,
        text: "Kitap listesi silindi."
      };
      this.workNotification(notify);
    },
    logout() {
      this.logoutAction().then(out => {
        if (out) {
          this.$router.push("/login");
        }
      });
    }
  }
};
</script>

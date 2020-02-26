<template>
  <v-navigation-drawer
    permanent
    style="width: 100%; max-height: 100%; overflow: hidden; margin-left: 10px;"
  >
    <v-toolbar color="teal lighten-2" dark>
      <SearchBar
        v-if="showSearchBar"
        @blur="showSearchBar = false"
        @search-start="search"
      />
      <v-toolbar-title v-else>Kategoriler</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="displaySearchBar">
        <v-icon>search</v-icon>
      </v-btn>
    </v-toolbar>

    <v-list style="padding: 0">
      <v-list-item pt-0 pb-0>
        <v-list-item-content>
          <v-form @submit.prevent="addCategory">
            <v-text-field
              label="Yeni Kategori ekle"
              v-model="category"
            ></v-text-field>
          </v-form>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon @click="addCategory">
            <v-icon color="orange lighten-1">add</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list style="height: calc(100vh - 176px); overflow-y: croll">
      <v-list-item
        v-for="list in categories"
        :key="list.id"
        :to="{
          name: 'books',
          params: { category: list.category, id: list.id }
        }"
      >
        <v-list-item-content>
          <v-list-item-title v-text="list.category"></v-list-item-title>
        </v-list-item-content>

        <v-list-item-action>
          <v-chip
            v-if="list.count > 0"
            color="teal lighten-2"
            outlined
            small
            class="ma-1"
          >
            {{ list.count }} kitap
          </v-chip>
          <v-btn v-else color="orange" icon @click="removeCategory(list.id)"
            ><v-icon>delete</v-icon></v-btn
          >
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import SearchBar from "./SearchBar";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "BookLists",
  components: {
    SearchBar
  },
  data: () => ({
    drawer: true,
    category: "",
    showSearchBar: false,
    categories: [
      {
        id: 1,
        category: "Roman",
        count: 12
      },
      {
        id: 2,
        category: "Felsefe",
        count: 9
      },
      {
        id: 3,
        category: "Kişisel Gelişim",
        count: 1
      },
      {
        id: 4,
        category: "Hikaye",
        count: 15
      },
      {
        id: 5,
        category: "Bilgisayar Bilimleri",
        count: 4
      }
    ]
  }),
  computed: {},
  methods: {
    addCategory() {
      if (this.category != "") {
        const newCategory = {
          id: this.categories.length + 1,
          category: this.category,
          count: 0
        };
        this.categories.push(newCategory);
        this.category = "";
      }
    },
    removeCategory(id) {
      this.categories = this.categories.filter(item => item.id !== id);
    },
    displaySearchBar() {
      this.showSearchBar = !this.showSearchBar;
    },
    search(value) {
      if (value !== "") {
        this.categories = this.categories.filter(list =>
          list.category.toLowerCase().includes(value.toLowerCase())
        );
      }
    }
  }
};
</script>

<template>
  <v-navigation-drawer
    permanent
    style="width: 100%; max-height: 100%; overflow: hidden; margin-left: 10px;"
  >
    <v-toolbar :color="getColors.primary" dark>
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
            <v-icon :color="getColors.secondary">add</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list style="height: calc(100vh - 160px); overflow-y: croll">
      <v-list-item
        v-for="list in fetchCategories"
        :key="list.id"
        :to="{
          name: 'books',
          params: { category: list.category, id: list.category_id }
        }"
      >
        <v-list-item-content>
          <v-list-item-title v-text="list.category"></v-list-item-title>
        </v-list-item-content>

        <v-list-item-action>
          <v-chip
            v-if="list.books.length > 0"
            :color="getColors.primary"
            outlined
            small
            class="ma-1"
          >
            {{ list.books.length }} kitap
          </v-chip>
          <v-btn
            v-else
            :color="getColors.secondary"
            icon
            @click="removeCategory(list.category_id)"
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
import { v4 as uuidv4 } from "uuid";
import { capitalize } from "../util/settings";

export default {
  name: "BookLists",
  components: {
    SearchBar
  },
  data: () => ({
    drawer: true,
    category: "",
    showSearchBar: false
  }),
  created() {
    this.getCategoriesAction();
  },
  computed: {
    ...mapGetters(["getColors", "fetchCategories", "getUser"])
  },
  methods: {
    ...mapActions([
      "getCategoriesAction",
      "addCategoryAction",
      "deleteCategoryAction"
    ]),
    addCategory() {
      if (this.category != "") {
        const newCategory = {
          category_id: uuidv4(),
          category: capitalize(this.category),
          books: []
        };
        this.addCategoryAction(newCategory);
        this.$nextTick(() => this.getCategoriesAction());
        this.category = "";
      }
    },
    removeCategory(id) {
      this.deleteCategoryAction(id);
      this.$nextTick(() => this.getCategoriesAction());
    },
    displaySearchBar() {
      this.showSearchBar = !this.showSearchBar;
    },
    search(value) {
      let temp = this.categories;
      if (value == "") {
        this.categories = temp;
      }
      this.categories = this.categories.filter(list =>
        list.category.toLowerCase().includes(value.toLowerCase())
      );
    }
  }
};
</script>

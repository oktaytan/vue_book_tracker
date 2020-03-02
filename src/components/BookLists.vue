<template>
  <v-navigation-drawer
    permanent
    style="width: 100%; max-height: 100%; overflow: hidden"
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
              autocomplete="off"
              :color="getColors.text"
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
        :key="list.category_id"
        :color="getColors.text"
        :to="{
          name: 'books',
          params: { category: list.category, id: list.category_id }
        }"
        @dblclick="deleteConfirm = true"
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
            @click="deleteConfirm = true"
            ><v-icon>delete</v-icon></v-btn
          >
        </v-list-item-action>
        <v-dialog v-model="deleteConfirm" max-width="500">
          <v-card>
            <v-card-title>
              Kategoriyi silmek istediğinizden emin misiniz ?
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                style="margin-right: 8px"
                text
                dark
                color="grey"
                @click="deleteConfirm = false"
                >İptal</v-btn
              >
              <v-btn @click="removeCategory(list.category_id)" color="error"
                >Sil</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
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
    showSearchBar: false,
    deleteConfirm: false
  }),
  computed: {
    ...mapGetters(["getColors", "fetchCategories", "getUser"])
  },
  created() {
    this.getCategoriesAction();
  },
  methods: {
    ...mapActions([
      "getCategoriesAction",
      "addCategoryAction",
      "deleteCategoryAction",
      "searchCategoriesAction",
      "workNotification",
      "getBooksAction"
    ]),
    addCategory() {
      if (this.category != "") {
        const newCategory = {
          category_id: uuidv4(),
          category: capitalize(this.category),
          books: []
        };
        this.addCategoryAction(newCategory)
          .then(data => {
            let notify = null;
            if (!data.error && data.status == 200) {
              notify = {
                display: true,
                alertClass: "success",
                timeout: 2000,
                text: data.message
              };
            } else {
              notify = {
                display: true,
                alertClass: "warning",
                timeout: 2000,
                text: "Bir hata oluştu."
              };
            }
            this.workNotification(notify);
            notify = null;
          })
          .catch(err => {
            let notify = {
              display: true,
              alertClass: "info",
              timeout: 3000,
              text: err.message
            };
            this.workNotification(notify);
          });
        this.category = "";
      }
    },
    removeCategory(id) {
      this.deleteCategoryAction(id).then(data => {
        let notify = null;
        if (!data.error && data.status == 200) {
          notify = {
            display: true,
            alertClass: "success",
            timeout: 2000,
            text: data.message
          };
        } else {
          notify = {
            display: true,
            alertClass: "warning",
            timeout: 2000,
            text: "Bir hata oluştu."
          };
        }
        this.workNotification(notify);
        notify = null;

        this.deleteConfirm = false;
        if (this.fetchCategories.length == 0) {
          this.$router.push("/");
        }
      });
    },
    displaySearchBar() {
      this.showSearchBar = !this.showSearchBar;
    },
    search(value) {
      if (value == "") {
        this.getCategoriesAction();
      }
      this.searchCategoriesAction(value);
    }
  }
};
</script>

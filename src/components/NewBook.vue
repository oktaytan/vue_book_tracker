<template>
  <v-row>
    <v-btn icon @click.stop="dialog = true">
      <v-icon :color="getColors.secondary">add</v-icon>
    </v-btn>

    <v-dialog v-model="dialog" max-width="500">
      <v-form @submit.prevent="addBook" ref="newBookForm" lazy-validation>
        <v-card>
          <v-card-title class="headline">Kitap ekle</v-card-title>

          <v-card-text>
            <v-text-field
              :color="getColors.primary"
              label="Kitap Adı"
              v-model="book.title"
              :rules="[rules.required]"
            ></v-text-field>
            <v-text-field
              :color="getColors.primary"
              label="Yazar Adı"
              v-model="book.author"
              :rules="[rules.required]"
            ></v-text-field>
            <v-text-field
              :color="getColors.primary"
              label="Sayfa Sayısı"
              type="number"
              min="0"
              v-model="book.pages"
              :rules="[rules.required]"
            ></v-text-field>
            <v-select
              :color="getColors.primary"
              :items="categories"
              label="Kategori"
              v-model="book.category"
              :rules="[rules.required]"
            ></v-select>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn :color="getColors.secondary" text @click="closeDialog">
              İptal
            </v-btn>

            <v-btn type="submit" :color="getColors.primary" text>
              Ekle
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </v-row>
</template>

<script>
import { capitalize } from "../util/settings";
import { mapGetters } from "vuex";

export default {
  name: "NewBook",
  data() {
    return {
      dialog: false,
      categories: [
        "Roman",
        "Felsefe",
        "Kişesel Gelişim",
        "Hikaye",
        "Bilgisar Bilimleri"
      ],
      book: {
        title: "",
        author: "",
        pages: null,
        category: ""
      },
      rules: {
        required: value => !!value || "Doldurulması zorunlu alan"
      }
    };
  },
  computed: {
    ...mapGetters(["getColors"])
  },
  methods: {
    addBook() {
      if (this.$refs.newBookForm.validate()) {
        let newBook = {
          title: capitalize(this.book.title),
          author: capitalize(this.book.author),
          pages: this.book.pages,
          category: capitalize(this.book.category)
        };
        this.$emit("add-book", newBook);
        this.dialog = false;
        this.$refs.newBookForm.reset();
      }
    },
    closeDialog() {
      this.dialog = false;
      this.book.title = "";
      this.book.author = "";
      this.book.pages = null;
      this.book.category = "";
    }
  }
};
</script>
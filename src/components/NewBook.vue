<template>
  <v-row>
    <v-btn icon @click.stop="dialog = true">
      <v-icon color="orange lighten-1">add</v-icon>
    </v-btn>

    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title class="headline">Kitap ekle</v-card-title>

        <v-card-text>
          <v-form>
            <v-text-field
              color="teal lighten-2"
              label="Kitap Adı"
              v-model="book.title"
            ></v-text-field>
            <v-text-field
              color="teal lighten-2"
              label="Yazar Adı"
              v-model="book.author"
            ></v-text-field>
            <v-select
              color="teal lighten-2"
              :items="categories"
              label="Kategori"
              v-model="book.category"
            ></v-select>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="orange" text @click="closeDialog">
            İptal
          </v-btn>

          <v-btn color="teal lighten-2" text @click="addBook">
            Ekle
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { capitalize } from "../util/settings";

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
        category: ""
      }
    };
  },
  methods: {
    addBook() {
      let newBook = {
        title: capitalize(this.book.title),
        author: capitalize(this.book.author),
        category: capitalize(this.book.category)
      };
      this.$emit("add-book", newBook);
      this.dialog = false;
      this.book.title = "";
      this.book.author = "";
      this.book.category = "";
    },
    closeDialog() {
      this.dialog = false;
    }
  }
};
</script>
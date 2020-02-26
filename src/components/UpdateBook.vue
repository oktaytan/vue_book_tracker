<template>
  <v-row>
    <v-btn icon @click.stop="dialog = true" :disabled="updBook.isRead">
      <v-icon color="orange lighten-1">edit</v-icon>
    </v-btn>

    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title class="headline">Kitabı düzenle</v-card-title>

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
            <v-text-field
              color="teal lighten-2"
              type="number"
              label="Sayfa Sayısı"
              min="0"
              v-model="book.pages"
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

          <v-btn color="orange" text @click="deleteBook">
            Sil
            <v-dialog v-model="deleteConfirm" max-width="450">
              <v-card>
                <v-card-title>
                  Kitabı silmek istediğinizden emin misiniz ?
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
                  <v-btn @click="removeBook" color="error">Sil</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-btn>

          <v-btn color="teal lighten-2" text @click="updateBook">
            Düzenle
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { capitalize } from "../util/settings";

export default {
  name: "UpdateBook",
  props: {
    updBook: Object
  },
  data() {
    return {
      dialog: false,
      deleteConfirm: false,
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
      }
    };
  },
  mounted() {
    this.book.title = this.updBook.title;
    this.book.author = this.updBook.author;
    this.book.pages = this.updBook.pages;
    this.book.category = this.updBook.category;
  },
  methods: {
    updateBook() {
      let newBook = {
        id: this.updBook.id,
        title: this.book.title && capitalize(this.book.title),
        author: this.book.author && capitalize(this.book.author),
        pages: this.book.pages,
        category: this.book.category && capitalize(this.book.category),
        isRead: this.updBook.isRead
      };
      this.$emit("update-book", newBook);
      this.dialog = false;
    },
    deleteBook() {
      this.deleteConfirm = true;
    },
    removeBook() {
      this.$emit("delete-book", this.updBook.id);
      this.dialog = false;
    }
  }
};
</script>
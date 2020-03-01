<template>
  <v-row>
    <v-btn icon @click.stop="dialog = true" :disabled="updBook.isRead">
      <v-icon :color="getColors.secondary">edit</v-icon>
    </v-btn>

    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title class="headline">Kitabı düzenle</v-card-title>

        <v-card-text>
          <v-form>
            <v-text-field
              :color="getColors.primary"
              label="Kitap Adı"
              v-model="book.title"
            ></v-text-field>
            <v-text-field
              :color="getColors.primary"
              label="Yazar Adı"
              v-model="book.author"
            ></v-text-field>
            <v-text-field
              :color="getColors.primary"
              type="number"
              label="Sayfa Sayısı"
              min="0"
              v-model="book.pages"
            ></v-text-field>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn :color="getColors.secondary" text @click="deleteBook">
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

          <v-btn :color="getColors.primary" text @click="updateBook">
            Düzenle
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { capitalize } from "../util/settings";
import { mapGetters } from "vuex";

export default {
  name: "UpdateBook",
  props: {
    updBook: Object
  },
  data() {
    return {
      dialog: false,
      deleteConfirm: false,
      book: {
        title: "",
        author: "",
        pages: null
      }
    };
  },
  computed: {
    ...mapGetters(["getColors"])
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
        book_id: this.updBook.book_id,
        title: this.book.title && capitalize(this.book.title),
        author: this.book.author && capitalize(this.book.author),
        pages: this.book.pages,
        category: this.updBook.category,
        isRead: this.updBook.isRead
      };
      this.$emit("update-book", newBook);
      this.dialog = false;
    },
    deleteBook() {
      this.deleteConfirm = true;
    },
    removeBook() {
      this.$emit("delete-book", this.updBook.book_id);
      this.dialog = false;
    }
  }
};
</script>
<template>
  <v-card
    style="width: 100%; max-height: 100%; overflow-x: hidden; overflow-y: scroll;"
    tile
  >
    <v-toolbar :color="getColors.primary" dark>
      <SearchBar
        v-if="showSearchBar"
        @blur="showSearchBar = false"
        @search-start="search"
      />
      <v-toolbar-title v-else>{{ nameOfCategory }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="displaySearchBar">
        <v-icon>search</v-icon>
      </v-btn>
    </v-toolbar>

    <v-list>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Yeni kitap ekle</v-list-item-title>
        </v-list-item-content>

        <v-list-item-action>
          <NewBook @add-book="addBook" />
        </v-list-item-action>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list
      flat
      three-line
      style="height: calc(100vh - 140px); overflow-y: scroll"
    >
      <template v-for="book in fetchBooks">
        <BookItem
          :key="book.book_id"
          :book="book"
          :category_id="$route.params.id"
          @update-book="updateBook"
          @delete-book="deleteBook"
        />
      </template>
    </v-list>
  </v-card>
</template>

<script>
import BookItem from "./BookItem";
import NewBook from "./NewBook";
import SearchBar from "./SearchBar";

import { mapGetters, mapActions } from "vuex";
import { v4 as uuidv4 } from "uuid";

export default {
  name: "Books",
  components: {
    BookItem,
    NewBook,
    SearchBar
  },
  data: () => ({
    showSearchBar: false
  }),
  created() {
    this.getCategoriesAction().then(() =>
      this.getBooksAction(this.$route.params.id)
    );
  },
  beforeRouteUpdate(to, from, next) {
    this.getCategoriesAction().then(() => this.getBooksAction(to.params.id));
    next();
  },
  computed: {
    ...mapGetters(["getColors", "fetchBooks"]),
    nameOfCategory() {
      return this.$route.params.category || "Kitaplar";
    }
  },
  methods: {
    ...mapActions([
      "getCategoriesAction",
      "getBooksAction",
      "addBookAction",
      "searchBooksAction",
      "deleteBookAction",
      "workNotification"
    ]),
    async addBook(book) {
      const { title, author, pages, category } = await book;
      const newBook = {
        book_id: uuidv4(),
        title,
        author,
        pages,
        category,
        isRead: false
      };
      const payload = {
        category_id: this.$route.params.id,
        book: newBook
      };
      this.addBookAction(payload)
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
          this.getBooksAction(this.$route.params.id);
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
    },
    updateBook(book) {
      const { id, title, author, pages, category, isRead } = book;
      const newBook = {
        book_id: id,
        title,
        author,
        pages,
        category,
        isRead
      };
      const payload = {
        category_id: this.$route.params.id,
        book: newBook
      };
      this.addBookAction(payload).then(() =>
        this.getBooksAction(this.$route.params.id)
      );
    },
    deleteBook(id) {
      const payload = {
        category_id: this.$route.params.id,
        book_id: id,
        delete: true,
        changeRead: false
      };
      this.deleteBookAction(payload)
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
          this.getBooksAction(this.$route.params.id);
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
    },
    displaySearchBar() {
      this.showSearchBar = !this.showSearchBar;
    },
    search(value) {
      if (value == "") {
        this.getBooksAction(this.$route.params.id);
      }
      this.searchBooksAction(value);
    }
  }
};
</script>

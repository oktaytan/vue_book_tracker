<template>
  <v-list-item-group>
    <v-list-item @click="toogle(book.id)">
      <v-list-item-action>
        <UpdateBook
          style="margin-left: 1px"
          :updBook="book"
          @update-book="updateBook"
          @delete-book="deleteBook"
        />
      </v-list-item-action>

      <v-list-item-content>
        <v-list-item-title v-text="book.title"></v-list-item-title>
        <v-list-item-subtitle v-text="subtitle"></v-list-item-subtitle>
        <v-list-item-subtitle v-text="book.category"></v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-action>
        <v-btn icon @click.stop="book.isRead = !book.isRead"
          ><v-icon :color="book.isRead ? 'teal lighten-2' : 'grey'"
            >check_circle</v-icon
          ></v-btn
        >
      </v-list-item-action>
    </v-list-item>
  </v-list-item-group>
</template>

<script>
import UpdateBook from "./UpdateBook";

export default {
  name: "BookItem",
  components: {
    UpdateBook
  },
  props: {
    book: Object
  },
  data: () => ({
    isCheck: true
  }),
  computed: {
    subtitle() {
      return `Yazar: ${this.book.author}`;
    }
  },
  methods: {
    toogle() {
      this.book.isRead = !this.book.isRead;
    },
    updateBook(newBook) {
      this.$emit("update-book", newBook);
    },
    deleteBook(id) {
      this.$emit("delete-book", id);
    }
  }
};
</script>
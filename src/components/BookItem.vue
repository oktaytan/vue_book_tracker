<template>
  <v-list-item-group>
    <v-list-item @click.stop="changeRead(book.book_id)">
      <v-list-item-action>
        <UpdateBook
          style="margin-left: 1px;"
          :updBook="book"
          @update-book="updateBook"
          @delete-book="deleteBook"
          :class="book.isRead ? 'opacity' : ''"
        />
      </v-list-item-action>

      <v-list-item-content :class="book.isRead ? 'opacity' : ''">
        <v-list-item-title v-text="book.title"></v-list-item-title>
        <v-list-item-subtitle v-text="subtitle"></v-list-item-subtitle>
        <v-list-item-subtitle>{{ book.pages }} sayfa</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-action>
        <v-btn icon @click.stop="changeRead(book.book_id)"
          ><v-icon :color="book.isRead ? getColors.primary : 'grey lighten-2'"
            >check_circle</v-icon
          ></v-btn
        >
      </v-list-item-action>
    </v-list-item>
  </v-list-item-group>
</template>

<script>
import UpdateBook from "./UpdateBook";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "BookItem",
  components: {
    UpdateBook
  },
  props: {
    book: Object,
    category_id: String
  },
  data: () => ({}),
  computed: {
    ...mapGetters(["getColors"]),
    subtitle() {
      return `Yazar: ${this.book.author}`;
    }
  },
  methods: {
    ...mapActions(["changeReadAction", "getBooksAction"]),
    changeRead(id) {
      const payload = {
        category_id: this.category_id,
        book_id: id,
        delete: false,
        changeRead: true
      };
      this.changeReadAction(payload).then(() => {
        this.getBooksAction(this.$route.params.id);
      });
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

<style scoped>
.opacity {
  opacity: 0.3;
}
</style>
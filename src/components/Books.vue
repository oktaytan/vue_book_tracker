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
					:key="book.id"
					:book="book"
					@update-book="updateBook"
					@delete-book="deleteBook"
				/>
			</template>
		</v-list>
	</v-card>
</template>

<script>
import BookItem from './BookItem';
import NewBook from './NewBook';
import SearchBar from './SearchBar';

import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'Books',
	components: {
		BookItem,
		NewBook,
		SearchBar
	},
	data: () => ({
		// books: [
		//   {
		//     id: 1,
		//     title: "Web Programlama",
		//     author: "John Doe",
		//     pages: 240,
		//     isRead: true
		//   },
		//   {
		//     id: 2,
		//     title: "Php Ultimate",
		//     author: "Cawis Marchilego",
		//     pages: 380,
		//     isRead: false
		//   },
		//   {
		//     id: 3,
		//     title: "Docker Basics",
		//     author: "John Doe",
		//     pages: 440,
		//     isRead: false
		//   },
		//   {
		//     id: 4,
		//     title: "Modern JavaScript",
		//     author: "John Doe",
		//     pages: 160,
		//     isRead: true
		//   }
		// ],
		showSearchBar: false
	}),
	mounted() {
		const categoryId = this.$route.params.id;
		this.getBooksAction(categoryId);
	},
	computed: {
		...mapGetters(['getColors', 'fetchBooks']),
		nameOfCategory() {
			return this.$route.params.category || 'Kitaplar';
		}
	},
	methods: {
		...mapActions(['getBooksAction']),
		async addBook(book) {
			const { title, author, pages, category } = await book;
			const newBook = {
				id: this.books.length + 1,
				title,
				author,
				pages,
				category,
				isRead: false
			};
			this.books.push(newBook);
		},
		updateBook(book) {
			const { id, title, author, pages, category, isRead } = book;
			const currentBook = this.books.findIndex((item) => item.id === id);
			const newBook = {
				id,
				title,
				author,
				pages,
				category,
				isRead
			};
			this.books.splice(currentBook, 1, newBook);
		},
		deleteBook(id) {
			this.books = this.books.filter((book) => book.id !== id);
		},
		displaySearchBar() {
			this.showSearchBar = !this.showSearchBar;
		},
		search(value) {
			if (value !== '') {
				this.books = this.books.filter(
					(book) =>
						book.title.toLowerCase().includes(value.toLowerCase()) ||
						book.author.toLowerCase().includes(value.toLowerCase())
				);
			}
		}
	}
};
</script>

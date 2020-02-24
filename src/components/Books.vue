<template>
	<v-card style="width: 100%; height: 100%; overflow: hidden;" tile>
		<v-toolbar color="teal lighten-2" dark>
			<v-toolbar-title>{{ nameOfCategory }}</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn icon>
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
			style="height: calc(100vh - 128px); overflow-y: scroll"
		>
			<template v-for="book in books">
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

export default {
	name: 'Books',
	components: {
		BookItem,
		NewBook
	},
	data: () => ({
		books: [
			{
				id: 1,
				title: 'Web Programlama',
				author: 'John Doe',
				category: 'Bilgisayar Bilimleri',
				isRead: true
			},
			{
				id: 2,
				title: 'Php Ultimate',
				author: 'Cawis Marchilego',
				category: 'Bilgisayar Bilimleri',
				isRead: false
			},
			{
				id: 3,
				title: 'Docker Basics',
				author: 'John Doe',
				category: 'Bilgisayar Bilimleri',
				isRead: false
			},
			{
				id: 4,
				title: 'Modern JavaScript',
				author: 'John Doe',
				category: 'Bilgisayar Bilimleri',
				isRead: true
			}
		]
	}),
	methods: {
		async addBook(book) {
			const { title, author, category } = await book;
			const newBook = {
				id: this.books.length + 1,
				title,
				author,
				category,
				isRead: false
			};
			this.books.push(newBook);
		},
		updateBook(book) {
			const { id, title, author, category, isRead } = book;
			const currentBook = this.books.findIndex((item) => item.id === id);
			const newBook = {
				id,
				title,
				author,
				category,
				isRead
			};
			this.books.splice(currentBook, 1, newBook);
		},
		deleteBook(id) {
			this.books = this.books.filter((book) => book.id !== id);
		}
	},
	computed: {
		nameOfCategory() {
			return this.$route.params.category;
		}
	}
};
</script>

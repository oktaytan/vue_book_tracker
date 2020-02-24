<template>
	<v-navigation-drawer
		permanent
		style="width: 100%; overflow: hidden; margin-left: 10px;"
	>
		<v-toolbar color="teal lighten-2" dark>
			<SearchBar v-if="getSearchBar" />
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
						></v-text-field>
					</v-form>
				</v-list-item-content>

				<v-list-item-action>
					<v-btn icon @click="addCategory">
						<v-icon color="orange lighten-1">add</v-icon>
					</v-btn>
				</v-list-item-action>
			</v-list-item>
		</v-list>

		<v-divider></v-divider>

		<v-list style="height: calc(100vh - 128px); overflow-y: scroll">
			<v-list-item
				v-for="list in bookLists"
				:key="list.id"
				:to="{
					name: 'books',
					params: { category: list.category, id: list.id }
				}"
			>
				<v-list-item-content>
					<v-list-item-title v-text="list.category"></v-list-item-title>
				</v-list-item-content>

				<v-list-item-action>
					<v-btn v-if="list.count > 0" icon>{{ list.count }}</v-btn>
					<v-btn v-else color="orange" icon @click="removeCategory(list.id)"
						><v-icon>delete</v-icon></v-btn
					>
				</v-list-item-action>
			</v-list-item>
		</v-list>
	</v-navigation-drawer>
</template>

<script>
import SearchBar from './SearchBar';
import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'BookLists',
	components: {
		SearchBar
	},
	data: () => ({
		drawer: true,
		category: '',
		bookLists: [
			{
				id: 1,
				category: 'Roman',
				count: 12
			},
			{
				id: 2,
				category: 'Felsefe',
				count: 9
			},
			{
				id: 3,
				category: 'Kişisel Gelişim',
				count: 4
			},
			{
				id: 4,
				category: 'Hikaye',
				count: 15
			},
			{
				id: 5,
				category: 'Bilgisayar Bilimleri',
				count: 4
			}
		]
	}),
	computed: {
		...mapGetters(['getSearchBar'])
	},
	methods: {
		...mapActions(['workSearchBar']),
		addCategory() {
			if (this.category != '') {
				const newCategory = {
					id: this.bookLists.length + 1,
					category: this.category,
					count: 0
				};
				this.bookLists.push(newCategory);
				this.category = '';
			}
		},
		removeCategory(id) {
			this.bookLists = this.bookLists.filter((item) => item.id !== id);
		},
		displaySearchBar() {
			this.workSearchBar(!this.getSearchBar);
			// this.$refs.input.focus();
		}
	}
};
</script>

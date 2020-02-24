<template>
	<input
		type="text"
		placeholder="Ara..."
		@input="search"
		v-model.trim="input"
		ref="input"
		@blur="closeSearchBar"
		class="search__input"
	/>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	name: 'SearchBar',
	data() {
		return {
			input: ''
		};
	},
	methods: {
		...mapActions(['workSearchBar']),
		search() {
			console.log(this.input);
		},
		closeSearchBar() {
			this.workSearchBar(false);
		}
	}
};
</script>

<style scoped>
.search__input {
	color: white;
	width: 100%;
	outline: none;
	font-size: 1.1rem;
}

.search__input:focus {
	outline: none;
}

::placeholder {
	color: white;
}
</style>

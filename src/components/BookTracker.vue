<template>
	<v-container fluid pl-0 pr-0 pt-0 pb-0 v-if="isLogin" class="bg">
		<v-layout row justify-space-between>
			<v-flex lg3>
				<BookLists />
			</v-flex>

			<v-flex lg5>
				<router-view></router-view>
			</v-flex>

			<v-flex lg3>
				<Options @open-draw="$emit('open-draw')" />
			</v-flex>
		</v-layout>
		<Notification />
		<MoreOptions />
		<!-- <v-footer absolute bottom left :color="getColors.primary" dark>
      <v-flex justify-center text-center
        >&copy; BookTracker {{ new Date().getFullYear() }}</v-flex
      >
    </v-footer> -->
	</v-container>
</template>

<script>
import BookLists from './BookLists';
import Options from './Options';
import Notification from './Notification';
import MoreOptions from './MoreOptions';

import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'Book',
	data: () => ({
		drawer: false
	}),
	mounted() {
		this.hasToken();
		if (!this.isLogin) {
			this.$router.push('/login');
		}
		this.getCategoriesAction();
	},
	computed: {
		...mapGetters(['isLogin', 'getColors'])
	},
	components: {
		BookLists,
		Options,
		Notification,
		MoreOptions
	},
	methods: {
		...mapActions(['hasToken', 'getCategoriesAction'])
	}
};
</script>

<style scoped>
.bg {
	background: url('../assets/app_bg.jpg') no-repeat 0 0 / cover;
}
</style>

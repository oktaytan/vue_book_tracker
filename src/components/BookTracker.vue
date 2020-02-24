<template>
	<v-container fluid pl-0 pr-0 pt-0 pb-0>
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
	</v-container>
</template>

<script>
import BookLists from './BookLists';
import Options from './Options';
import Notification from './Notification';

export default {
	name: 'Book',
	data: () => ({
		drawer: false
	}),
	components: {
		BookLists,
		Options,
		Notification
	},
	created() {}
};
</script>

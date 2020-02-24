<template>
	<v-snackbar
		:color="notification.class"
		v-model="snackbar"
		top
		right
		:timeout="notification.timeout"
		dark
	>
		<v-icon dark>notification_important</v-icon>
		{{ notification.text }}

		<v-btn dark text @click="snackbar = false"><v-icon>clear</v-icon></v-btn>
	</v-snackbar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'Notification',
	computed: {
		...mapGetters(['notification']),
		snackbar: {
			get() {
				return this.notification.display;
			},
			set(value) {
				this.workNotification(value);
			}
		}
	},
	methods: {
		...mapActions(['workNotification'])
	}
};
</script>

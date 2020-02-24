<template>
	<v-container fill-height>
		<v-layout align-center justify-center>
			<v-flex xs12 sm8 md6>
				<v-form>
					<v-card elevation="12">
						<v-toolbar dark color="teal lighten-2">
							<v-toolbar-title>
								GİRİŞ FORMU
							</v-toolbar-title>
						</v-toolbar>
						<v-card-text>
							<v-form>
								<v-alert
									dark
									color="orange darken-1"
									:value="error"
									icon="close"
								>
									Kullanıcı adı veya şifre hatalı.
								</v-alert>
								<v-text-field
									prepend-icon="person"
									name="login"
									label="Kullanıcı Adı"
									type="text"
								>
								</v-text-field>
								<v-text-field
									prepend-icon="lock"
									name="password"
									label="Şifre"
									type="password"
								>
								</v-text-field>
							</v-form>
						</v-card-text>
						<v-divider light></v-divider>
						<v-card-actions>
							<v-btn to="/signup" dark color="orange darken-1">Kaydol</v-btn>
							<v-spacer></v-spacer>
							<v-btn dark color="teal lighten-2" @click="login">
								Giriş Yap
								<v-icon>keyboard_arrow_right</v-icon>
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-form>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
export default {
	name: 'Login',
	data: () => ({
		error: false
	}),
	methods: {
		login() {
			this.$router.push('/');
		}
	}
};
</script>

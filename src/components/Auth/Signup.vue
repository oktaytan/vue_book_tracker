<template>
	<v-container fill-height>
		<v-layout align-center justify-center>
			<v-flex xs12 sm8 md6>
				<v-card elevation="12">
					<v-toolbar dark color="teal lighten-2">
						<v-toolbar-title>
							KAYIT FORMU
						</v-toolbar-title>
					</v-toolbar>
					<v-card-text>
						<v-form>
							<v-alert
								dark
								:value="error"
								color="orange darken-1"
								icon="warning"
							>
								Bu kullanıcı zaten var. Farklı bilgilerle tekrar deneyiniz.
							</v-alert>
							<v-text-field
								prepend-icon="person"
								name="login"
								label="Kullanıcı Adı"
								v-model="username"
								:rules="[rules.required]"
							></v-text-field>

							<v-text-field
								prepend-icon="email"
								name="email"
								label="Email"
								v-model="email"
								:rules="[rules.required, rules.email]"
							></v-text-field>

							<v-text-field
								prepend-icon="lock"
								name="password"
								label="Şifre"
								type="password"
								v-model="password"
								:rules="[rules.required]"
							></v-text-field>

							<v-text-field
								prepend-icon="lock"
								name="password"
								label="Şifre Tekrarı"
								type="password"
								v-model="confirm_password"
								:rules="[rules.required]"
								:error="!valid()"
							></v-text-field>
						</v-form>
					</v-card-text>
					<v-divider light></v-divider>
					<v-card-actions>
						<v-btn to="/login" dark color="orange darken-1">Giriş Yap</v-btn>
						<v-spacer></v-spacer>
						<v-btn dark color="teal lighten-2" @click="register">
							Kaydol
							<v-icon>keyboard_arrow_right</v-icon>
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
export default {
	name: 'Signup',
	data: () => ({
		username: '',
		email: '',
		password: '',
		confirm_password: '',
		rules: {
			required: (value) => !!value || 'Doldurulması zorunlu alan',
			email: (value) => {
				const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				return pattern.test(value) || 'Geçersiz e-mail';
			}
		},
		error: false
	}),
	methods: {
		valid() {
			return this.password === this.confirm_password;
		},
		register() {
			this.$router.push('/login');
		}
	}
};
</script>

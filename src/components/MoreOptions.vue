<template>
	<v-navigation-drawer v-model="openDrawer" absolute right temporary>
		<v-list>
			<v-list-item>
				<v-list-item-avatar>
					<v-img :src="avatar" alt="Kullanıcı Avatarı"></v-img>
				</v-list-item-avatar>

				<v-spacer></v-spacer>

				<v-list-item-content>
					<v-list-item-title>John Doe</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
		</v-list>
		<v-divider></v-divider>

		<v-form>
			<v-container fluid>
				<v-flex xs12>
					<v-img :src="imageUrl" style="height: 150px" alt=""></v-img>

					<v-text-field
						label="Bir resim seçin"
						v-model="imageName"
						prepend-icon="attach_file"
						:clearable="clearable"
						@click="pickFile"
					>
					</v-text-field>

					<input
						type="file"
						style="display: none"
						ref="image"
						accept="image/*"
						@change="onFilePicked"
					/>
				</v-flex>

				<v-flex xs12 text-center mt-4>
					<v-btn :loading="loading" :disabled="!imageFile" @click="uploadFile">
						Arkaplan yükle
						<v-icon right dark>cloud_upload</v-icon>
					</v-btn>
				</v-flex>
			</v-container>
		</v-form>
	</v-navigation-drawer>
</template>

<script>
import img from '../assets/avatar_sample.jpg';
import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'MoreOptions',
	data: () => ({
		avatar: img,
		imageUrl: '',
		imageName: '',
		loading: false,
		imageFile: '',
		clearable: false
	}),
	computed: {
		...mapGetters(['getDrawer']),
		openDrawer: {
			get() {
				return this.getDrawer;
			},
			set(value) {
				return this.workDrawer(value);
			}
		}
	},
	methods: {
		...mapActions(['workDrawer']),
		pickFile() {
			this.$refs.image.click();
		},
		onFilePicked(e) {
			const files = e.target.files;
			if (files[0] !== undefined) {
				this.imageName = files[0].name;
				if (this.imageName.lastIndexOf('.') <= 0) {
					return;
				}

				const fr = new FileReader();
				fr.readAsDataURL(files[0]);
				fr.addEventListener('load', () => {
					this.imageUrl = fr.result;
					this.clearable = true;
					this.imageFile = files[0];
				});
			} else {
				this.imageUrl = '';
				this.imageName = '';
				this.imageFile = '';
			}
		},
		uploadFile() {
			console.log(this.imageFile);
		}
	}
};
</script>

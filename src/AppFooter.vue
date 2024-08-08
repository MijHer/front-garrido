<template>
	<div class="layout-footer">
		<img alt="Logo" :src="footerImage()" height="60" class="mr-2" />
		
		<span class="font-medium ml-2">Andres Fernandez Garrido</span>
	</div>
</template>

<script>
	export default {
		name: "AppFooter",
		methods: {
			footerImage() {
				return this.$appState.darkTheme ? 'images/logo-garrido.svg' : 'images/logo-garrido.svg';
			}
		},
		computed: {
			darkTheme() {
				return this.$appState.darkTheme;
			}
		}
	}
</script>
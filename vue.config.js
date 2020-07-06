const path = require('path')

module.exports = {
	lintOnSave: false,
	configureWebpack:{
    resolve: {
			extensions: ['.js', '.vue', '.json',".css"],
			alias: {
				'vue$': path.resolve(__dirname, './node_modules/vue/dist/vue.runtime.esm.js')
			}
    }
	}
}
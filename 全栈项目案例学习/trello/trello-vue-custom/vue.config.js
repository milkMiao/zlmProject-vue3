// 通过 `vue.config.js` 配置代理，解决开发过程中的跨域问题。
module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:9090',
                pathRewrite: {
                    '^/api': '/api/v1'
                }
            }
        }
    }
}


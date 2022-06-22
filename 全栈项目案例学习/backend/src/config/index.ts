const configs = {
    development:{
        server: {
            host: 'localhost',
            port: 8080
        },
    },
    test:{
        server: {
            host: 'localhost',
            port: 8080
        },
    },
    production:{
        server: {
            host: 'localhost',
            port: 8080
        },
    }
}

type configKeys = keyof typeof configs //'development' | 'test' | 'production'
//process提示红杠？ 安装@types/node
const NODE_EVN = process.env.NODE_ENV as configKeys || 'development';
//configs[NODE_EVN] 提示红杠？ ---configKeys
export default configs[NODE_EVN];
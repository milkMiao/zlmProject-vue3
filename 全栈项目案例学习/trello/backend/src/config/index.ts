// 项目配置文件
const configs = {
    development:{
        server: {
            host: 'localhost',
            port: 8081
        },
    },
    test:{
        server: {
            host: 'localhost',
            port: 8081
        },
    },
    production:{
        server: {
            host: 'localhost',
            port: 8081
        },
    }
}

type configKeys = keyof typeof configs //'development' | 'test' | 'production'
const NODE_EVN = process.env.NODE_ENV as configKeys || 'development'; //process提示红杠？ 安装@types/node

//configs[NODE_EVN] 提示红杠？ ---configKeys
export default configs[NODE_EVN];
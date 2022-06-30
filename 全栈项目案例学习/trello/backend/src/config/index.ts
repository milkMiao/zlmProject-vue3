// 项目配置文件
import databaseConfig from './database.json'


// 也可以把类型声明放到单独的 .d.ts 文件中，如：/src/types/global.d.ts
//类型定义
interface IDatabaseConfig {
    host: string,
    dialect: "mysql" | "postgres" | "sqlite" | "mariadb" | "mssql",
    username: string,
    password: string | undefined,
    database: string,
    // timezone: string
}

const configs = {
    development:{
        server: {
            host: 'localhost',
            port: 8080
        },
        database: databaseConfig.development as IDatabaseConfig
    },
    test:{
        server: {
            host: 'localhost',
            port: 8080
        },
        database: databaseConfig.test as IDatabaseConfig
    },
    production:{
        server: {
            host: 'localhost',
            port: 8080
        },
        database: databaseConfig.production as IDatabaseConfig
    }
}

type configKeys = keyof typeof configs //'development' | 'test' | 'production'
const NODE_EVN = process.env.NODE_ENV as configKeys || 'development'; //process提示红杠？ 安装@types/node

//configs[NODE_EVN] 提示红杠？ ---configKeys
export default configs[NODE_EVN];
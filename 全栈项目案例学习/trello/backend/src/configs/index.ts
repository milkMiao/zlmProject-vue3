import databaseConfig from './database.json';
import path from 'path';

interface IDatabaseConfig {
    username: string;
    password: string;
    database: string;
    host: string;
    dialect: 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'mariadb';
    timezone: string;
}

const configs = {
    development: {
        server: {
            host: 'localhost',
            port: 8080
        },
        database: databaseConfig.development as IDatabaseConfig,
        jwt: {
            privateKey: 'kaikeba'
        },
        storage: {
            dir: path.resolve(__dirname, '../attachments'),//卡片--附件访问路径
            prefix: '/public/attachments' //卡片--附件访问前缀
            // 路径：/public/attachments/附件.png -----返回给前端
        }
    },
    test: {
        server: {
            host: 'localhost',
            port: 8080
        },
        database: databaseConfig.test as IDatabaseConfig,
        jwt: {
            privateKey: 'kaikeba'
        },
        storage: {
            dir: path.resolve(__dirname, 'attachments'),
            prefix: '/public/attachments'
        }
    },
    production: {
        server: {
            host: 'localhost',
            port: 8080
        },
        database: databaseConfig.production as IDatabaseConfig,
        jwt: {
            privateKey: 'kaikeba'
        },
        storage: {
            dir: path.resolve(__dirname, 'attachments'),
            prefix: '/public/attachments'
        }
    }
};

type configKeys = keyof typeof configs;
const NODE_EVN = process.env.NODE_ENV as configKeys || 'development';
export default configs[NODE_EVN];
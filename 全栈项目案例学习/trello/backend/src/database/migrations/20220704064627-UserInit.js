'use strict';
//创建---数据库迁移脚本
module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
      return queryInterface.createTable('User', {
				id: {
            // 字段类型：数字
            type: Sequelize.INTEGER,
            // 设置为主键
            primaryKey: true,
            // 自动增长
            autoIncrement: true
    		},
    		name: {
            // 字符串类型（20长度）
            type: Sequelize.STRING(20),
            // 值唯一
            unique: true,
            // 不允许 null 值
            allowNull: false
    		},
    		password: {
            // 字符串类型（32长度）
            type: Sequelize.STRING(32),
            // 不允许 null 值
            allowNull: false
    		},
      	createdAt: {
            // 日期类型
            type: Sequelize.DATE,
            // 不允许 null 值
            allowNull: false
      	}
		  });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    // 删除 user 表
    return queryInterface.dropTable('User');
  }
};

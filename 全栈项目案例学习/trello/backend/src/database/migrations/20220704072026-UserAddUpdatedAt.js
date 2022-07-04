'use strict';
// 更新迭代--数据库迁移脚本
module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

    // 给 User 表添加列（字段）：updateAt
    return queryInterface.addColumn('User', 'updatedAt', {
        type: Sequelize.DATE,
        allowNull: false
    })
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    // 删除 user 表的 updatedAt 列（字段）
    return queryInterface.removeColumn('User', 'updatedAt');
  }
};

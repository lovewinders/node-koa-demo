import { sequelize, Sequelize } from './sequelize'
/**
*   角色表
*/
const Role = sequelize.define('role', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true
    }
}, {
    'freezeTableName': true,
    'tableName': 't_roles',
    'timestamps': false,
    'paranoid': false,
    'createdAt': 'created_at',
    'updatedAt': 'updated_at',
    'deletedAt': 'deleted_at'
})

export default Role

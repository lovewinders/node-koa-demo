import {sequelize, Sequelize} from './sequelize'
/**
*   用户－角色关系表
*/
const UserRole = sequelize.define('UserRole',
    {
        id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, unique: true}
    }, {
        'freezeTableName': true,
        'tableName': 't_user_roles',
        'timestamps': false,
        'paranoid': false,
        'createdAt': 'created_at',
        'updatedAt': 'updated_at',
        'deletedAt': 'deleted_at'
    }
);

export default UserRole

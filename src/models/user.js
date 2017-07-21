import { sequelize, Sequelize } from './sequelize'

const User = sequelize.define('User',
    {
        id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, unique: true},
        nickname: {type: Sequelize.STRING, allowNull: true},
        username: {type: Sequelize.STRING, allowNull: false, unique: true},
        password: {type: Sequelize.STRING, allowNull: true},
        status: {type: Sequelize.INTEGER, allowNull: false, defaultValue: 0} // 0 未激活  1 激活
    },
    {
        'freezeTableName': true,
        'tableName': 't_users',
        'timestamps': false,
        'paranoid': false,
        'createdAt': 'created_at',
        'updatedAt': 'updated_at',
        'deletedAt': 'deleted_at'
    }
);

export default User

import User from './user'
import Role from './role'
import UserRole from './user_role'

// 用户角色多对多关系
User.belongsToMany(Role, {'through': UserRole});
Role.belongsToMany(User, {'through': UserRole});

User.sync({force: false});
Role.sync({force: false});

UserRole.sync({force: false});

export {
    User,
    Role,
    UserRole
}

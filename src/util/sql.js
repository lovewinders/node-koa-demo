import {sequelize, Sequelize} from '../model/sequelize';
import {User, App, AppManager, AppDeveloper, Widget, Page, Role, UserRole} from '../model';
import './jsExtends';
import queryToFilterAndLimit from './queryToFilterAndLimit';


class SqlUtils {
    static getUserApps(userId, query) {

        const t_users = User.tableName;
        const t_apps = App.tableName ;
        const t_app_managers = AppManager.tableName;
        const t_app_developers = AppDeveloper.tableName;
        const {filter} = queryToFilterAndLimit(query);

        return ' SELECT App.id,App.auth_id, App.thumbnail, App.name, App.description, App.width, App.height, App.status, App.type, App.industry, App.sub_industry, App.stage,' 
            + ' DATE_FORMAT(App.start_time,\'%Y-%m-%d\') AS startTime, DATE_FORMAT(App.end_time,\'%Y-%m-%d\') AS endTime,'
            + ' Developer.id AS `developers.id`, Developer.nickname AS `developers.nickname`, Developer.username AS `developers.username`,'
            + ' Manager.id AS `managers.id`, Manager.nickname AS `managers.nickname`, Manager.username AS `managers.username`'
            + ` FROM ${t_apps} AS App `
            + ` LEFT OUTER JOIN (${t_app_developers} AS AppDeveloper INNER JOIN ${t_users} AS Developer ON Developer.id = AppDeveloper.user_id) ON App.id = AppDeveloper.app_id`
            + ` LEFT OUTER JOIN (${t_app_managers} AS AppManager INNER JOIN ${t_users} AS Manager ON Manager.id = AppManager.user_id) ON App.id = AppManager.app_id` 
            + ` WHERE App.delete_flag = 0 ${filter} AND  (App.auth_id = ${userId} OR App.id IN ( SELECT distinct app_id FROM ${t_app_managers} WHERE user_id = ${userId}) OR  App.id IN ( SELECT distinct app_id FROM ${t_app_developers} WHERE user_id = ${userId}))`
            + ' ORDER BY App.create_time DESC';
    
    }

    static getAdminApps(query) {

        const t_users = User.tableName;
        const t_apps = App.tableName ;
        const t_app_managers = AppManager.tableName;
        const t_app_developers = AppDeveloper.tableName;
        const {filter} = queryToFilterAndLimit(query);

        return	' SELECT App.id,App.auth_id, App.thumbnail, App.name, App.description, App.width, App.height, App.status, App.type, App.industry, App.sub_industry, App.stage, ' + 
            ' DATE_FORMAT(App.start_time,\'%Y-%m-%d\') AS startTime, DATE_FORMAT(App.end_time,\'%Y-%m-%d\') AS endTime,' + 
            ' DATE_FORMAT(App.create_time, \'%Y-%m-%d\') AS createTime, ' 
			+ ' Developer.id AS `developers.id`, Developer.nickname AS `developers.nickname`, Developer.username AS `developers.username`,'
			+ ' Manager.id AS `managers.id`, Manager.nickname AS `managers.nickname`, Manager.username AS `managers.username`'
			+ ` FROM ${t_apps} AS App `
			+ ` LEFT OUTER JOIN (${t_app_developers} AS AppDeveloper INNER JOIN ${t_users} AS Developer ON Developer.id = AppDeveloper.user_id) ON App.id = AppDeveloper.app_id`
			+ ` LEFT OUTER JOIN (${t_app_managers} AS AppManager INNER JOIN ${t_users} AS Manager ON Manager.id = AppManager.user_id) ON App.id = AppManager.app_id WHERE App.delete_flag = 0 ${filter}`
            + ' ORDER BY App.create_time DESC' ;
	
    }

    static countAdminApps() {

        const t_apps = App.tableName ;

        return `SELECT App.type, COUNT(*) AS value FROM ${t_apps} AS App where App.delete_flag=0 group by App.type`;

    }

    static getNow() {

        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const date = now.getDate();
        const hour = now.getHours();
        const minute = now.getMinutes();
        const second = now.getSeconds();
        return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second;
	
    }

    static getUserAppPages(appId) {

        const t_apps = App.tableName ;

        return ` SELECT App.pages AS pages, App.width AS width, App.height AS height  FROM ${t_apps} AS App WHERE App.id = ${appId} `;
	
    }
    static getOption(pageId) {

        const t_pages = Page.tableName;

        return ` SELECT Page.option FROM ${t_pages} AS Page WHERE Page.name = '${pageId}' `;
	
    }

    static copyPages(name, newPageName) {

        const t_pages = Page.tableName;

        const currentDate = new Date().format('yyyy-MM-dd hh:mm:ss');

        return ` INSERT INTO ${t_pages} (app_id, thumbnail, \`option\`, delete_flag, name, create_time) ` +
			` SELECT Page.app_id, Page.thumbnail, Page.option, Page.delete_flag, '${newPageName}', '${currentDate}' FROM ${t_pages} AS Page WHERE Page.name='${name}' `;
	
    }

    static copyWidgets(name, newPageName) {

        const t_widgets = Widget.tableName;
        const currentDate = new Date().format('yyyy-MM-dd hh:mm:ss');
        const currentTime = String((new Date()).getTime());

        return ` INSERT INTO ${t_widgets} (type, main_type, sub_type, layout, data_source, \`option\`, events, style, delete_flag, page_name, name, create_time)` +
			'SELECT Widget.type, Widget.main_type, Widget.sub_type, Widget.layout, Widget.data_source, Widget.option, Widget.events, Widget.style, Widget.delete_flag, ' +
			` '${newPageName}', concat(Widget.name, '${currentTime}'), '${currentDate}' FROM ${t_widgets} AS Widget WHERE Widget.page_name = '${name}' AND Widget.delete_flag = 0`;

    }
    static countConnections(appIds) {

        return `SELECT app_id, count(*)  AS count FROM t_connections  WHERE app_id in (${appIds.join(',')}) group by app_id`;

    }
}

export default SqlUtils;
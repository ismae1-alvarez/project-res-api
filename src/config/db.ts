import { Sequelize } from "sequelize";

const db = new Sequelize('postgresql://rest_api_rest_node_typescript_user:XBS5ib9hONWl2HwqV1vs84KCdRoCyg2d@dpg-cqrdn888fa8c73d2mveg-a.oregon-postgres.render.com/rest_api_rest_node_typescript?ssl=true');

export default db;
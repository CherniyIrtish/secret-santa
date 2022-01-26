const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(module.filename);
const db: {[key: string]: any} = {};
let sequelize: any;

const connectDB = async() => {

    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: './src/database/database.sqlite'
    });



    fs.readdirSync(__dirname)
    .filter((file: any) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.ts')
    .forEach((file: any) => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

    Object.keys(db).forEach((modelName) => {
        if (db[modelName].associate) {
            db[modelName].associate(db);
        }
    });
    db.sequelize = sequelize;
    db.Sequelize = Sequelize;

    await sequelize.sync({ force: true });
};

export { connectDB, db };



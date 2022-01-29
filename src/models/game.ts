import { Sequelize } from 'sequelize/types';

module.exports = (sequelize: Sequelize, DataTypes: any) => {
    const Game = sequelize.define('Game', {
        isStarted: {
            type: DataTypes.BOOLEAN
        }
    });

    return Game;
};

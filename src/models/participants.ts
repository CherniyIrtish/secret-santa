import { Sequelize } from 'sequelize/types';

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  const Participant = sequelize.define('Participant', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  return Participant;
};

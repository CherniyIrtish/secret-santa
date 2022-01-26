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
    },
    wishes: {
      type: DataTypes.STRING,
      allowNull: false,

      get() {
        return this.getDataValue('wishes').split(';')
      },

      set(val: string[]) {
        this.setDataValue('wishes', val.join(';'));
      },
    }
  });

  return Participant;
};

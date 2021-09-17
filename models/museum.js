const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Museum extends Model {}

Museum.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    link: {
      type: DataTypes.STRING,
    
    },
    picture: {
      type: DataTypes.STRING(1000),
     
    },
    summary: {
      type: DataTypes.STRING(3000),
    
    },
    points: {
      type: DataTypes.INTEGER,
     
    },
    county_id: {
      type: DataTypes.INTEGER,
      
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'museum',
  }
);

module.exports = Museum;
import Sequelize from 'sequelize';

// Create sequelize instance wich will connect to PostgreSQL DB
const sequelize = new Sequelize('slack', 'postgres', 'admin', {
  dialect: 'postgres',
  define: {
    underscored: true,
  },
  operatorsAliases: Sequelize.Op,
});

// Import our models
const models = {
  User: sequelize.import('./user'),
  Channel: sequelize.import('./channel.js'),
  Message: sequelize.import('./message.js'),
  Team: sequelize.import('./team.js'),
  Member: sequelize.import('./member.js'),
  DirectMessage: sequelize.import('./directMessage.js'),
};

// Loop from all models & associate them together
Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;

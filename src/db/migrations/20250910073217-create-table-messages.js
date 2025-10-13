export const up = async (queryInterface, Sequelize) => {
  await queryInterface.createTable('messages', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    chatId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    authorId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    text: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  });
}

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.dropTable('messages');
}


export const up = async (queryInterface, Sequelize) => {
  await queryInterface.createTable('chats', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    member1Id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    member2Id: {
      type: Sequelize.INTEGER,
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
  await queryInterface.dropTable('chats');
}


export const up = async (queryInterface, Sequelize) => {
  await queryInterface.createTable('notifications', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    authorUserId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    targetUserId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    targetPostId: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    isViewed: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
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
  await queryInterface.dropTable('notifications');
}


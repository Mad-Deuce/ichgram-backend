export const up = async (queryInterface, Sequelize) => {
  await queryInterface.addConstraint('chats', {
    fields: ['member1Id'], // The column in 'YourTableName' that will be the foreign key
    type: 'foreign key',
    name: 'FK_Chats_Users_1', // A descriptive name for your constraint
    references: {
      table: 'users', // The table being referenced
      field: 'id', // The primary key column in 'ReferenceTableName'
    },
    onDelete: 'CASCADE', // Optional: Define behavior on deletion of the referenced row
    onUpdate: 'CASCADE', // Optional: Define behavior on update of the referenced row
  });
  await queryInterface.addConstraint('chats', {
    fields: ['member2Id'], // The column in 'YourTableName' that will be the foreign key
    type: 'foreign key',
    name: 'FK_Chats_Users_2', // A descriptive name for your constraint
    references: {
      table: 'users', // The table being referenced
      field: 'id', // The primary key column in 'ReferenceTableName'
    },
    onDelete: 'CASCADE', // Optional: Define behavior on deletion of the referenced row
    onUpdate: 'CASCADE', // Optional: Define behavior on update of the referenced row
  });
  await queryInterface.addConstraint('chats', {
    fields: ['member1Id', 'member2Id'], // The column in 'YourTableName' that will be the foreign key
    type: 'check',
    name: 'Check_Not_Equal_Fields', // A descriptive name for your constraint
    where: {
      member1Id: {
        [Sequelize.Op.ne]: Sequelize.col('member2Id') // Ensures columnA is not equal to columnB
      }
    }
  });
}

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.removeConstraint('chats', 'FK_Chats_Users_1');
  await queryInterface.removeConstraint('chats', 'FK_Chats_Users_2');
  await queryInterface.removeConstraint('chats', 'Check_Not_Equal_Fields');
}


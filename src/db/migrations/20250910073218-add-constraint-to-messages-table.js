export const up = async (queryInterface, Sequelize) => {
  await queryInterface.addConstraint('messages', {
    fields: ['authorId'], // The column in 'YourTableName' that will be the foreign key
    type: 'foreign key',
    name: 'FK_Messages_Users', // A descriptive name for your constraint
    references: {
      table: 'users', // The table being referenced
      field: 'id', // The primary key column in 'ReferenceTableName'
    },
    onDelete: 'CASCADE', // Optional: Define behavior on deletion of the referenced row
    onUpdate: 'CASCADE', // Optional: Define behavior on update of the referenced row
  });
  await queryInterface.addConstraint('messages', {
    fields: ['chatId'], // The column in 'YourTableName' that will be the foreign key
    type: 'foreign key',
    name: 'FK_Messages_Chats', // A descriptive name for your constraint
    references: {
      table: 'chats', // The table being referenced
      field: 'id', // The primary key column in 'ReferenceTableName'
    },
    onDelete: 'CASCADE', // Optional: Define behavior on deletion of the referenced row
    onUpdate: 'CASCADE', // Optional: Define behavior on update of the referenced row
  });
}

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.removeConstraint('messages', 'FK_Messages_Users');
  await queryInterface.removeConstraint('messages', 'FK_Messages_Chats');
}


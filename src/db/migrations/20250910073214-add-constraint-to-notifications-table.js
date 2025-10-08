export const up = async (queryInterface, Sequelize) => {
  await queryInterface.addConstraint('notifications', {
    fields: ['authorUserId'], // The column in 'YourTableName' that will be the foreign key
    type: 'foreign key',
    name: 'FK_Notifications_UsersAuthor', // A descriptive name for your constraint
    references: {
      table: 'users', // The table being referenced
      field: 'id', // The primary key column in 'ReferenceTableName'
    },
    onDelete: 'CASCADE', // Optional: Define behavior on deletion of the referenced row
    onUpdate: 'CASCADE', // Optional: Define behavior on update of the referenced row
  });
  await queryInterface.addConstraint('notifications', {
    fields: ['targetUserId'], // The column in 'YourTableName' that will be the foreign key
    type: 'foreign key',
    name: 'FK_Notifications_UsersTarget', // A descriptive name for your constraint
    references: {
      table: 'users', // The table being referenced
      field: 'id', // The primary key column in 'ReferenceTableName'
    },
    onDelete: 'CASCADE', // Optional: Define behavior on deletion of the referenced row
    onUpdate: 'CASCADE', // Optional: Define behavior on update of the referenced row
  });
  await queryInterface.addConstraint('notifications', {
    fields: ['targetPostId'], // The column in 'YourTableName' that will be the foreign key
    type: 'foreign key',
    name: 'FK_Notifications_Posts', // A descriptive name for your constraint
    references: {
      table: 'posts', // The table being referenced
      field: 'id', // The primary key column in 'ReferenceTableName'
    },
    onDelete: 'CASCADE', // Optional: Define behavior on deletion of the referenced row
    onUpdate: 'CASCADE', // Optional: Define behavior on update of the referenced row
  });
}

export const down = async (queryInterface, Sequelize) => {
  // await queryInterface.removeConstraint('FK_Notifications_UsersAuthor');
  // await queryInterface.removeConstraint('FK_Notifications_Posts');
  // await queryInterface.removeConstraint('FK_Notifications_UsersTarget');
}


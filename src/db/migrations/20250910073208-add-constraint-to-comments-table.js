export const up = async (queryInterface, Sequelize) => {
  await queryInterface.addConstraint('comments', {
    fields: ['userId'], // The column in 'YourTableName' that will be the foreign key
    type: 'foreign key',
    name: 'FK_Comments_Users', // A descriptive name for your constraint
    references: {
      table: 'users', // The table being referenced
      field: 'id', // The primary key column in 'ReferenceTableName'
    },
    onDelete: 'CASCADE', // Optional: Define behavior on deletion of the referenced row
    onUpdate: 'CASCADE', // Optional: Define behavior on update of the referenced row
  });
  await queryInterface.addConstraint('comments', {
    fields: ['postId'], // The column in 'YourTableName' that will be the foreign key
    type: 'foreign key',
    name: 'FK_Comments_Posts', // A descriptive name for your constraint
    references: {
      table: 'posts', // The table being referenced
      field: 'id', // The primary key column in 'ReferenceTableName'
    },
    onDelete: 'CASCADE', // Optional: Define behavior on deletion of the referenced row
    onUpdate: 'CASCADE', // Optional: Define behavior on update of the referenced row
  });
}

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.dropTable('comments');
}


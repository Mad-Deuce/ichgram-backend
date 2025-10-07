import { where } from "sequelize";

export const up = async (queryInterface, Sequelize) => {
  await queryInterface.addConstraint('follows', {
    fields: ['followerUserId'], // The column in 'YourTableName' that will be the foreign key
    type: 'foreign key',
    name: 'FK_FollowerUser_Users', // A descriptive name for your constraint
    references: {
      table: 'users', // The table being referenced
      field: 'id', // The primary key column in 'ReferenceTableName'
    },
    onDelete: 'CASCADE', // Optional: Define behavior on deletion of the referenced row
    onUpdate: 'CASCADE', // Optional: Define behavior on update of the referenced row
  });
  await queryInterface.addConstraint('follows', {
    fields: ['targetUserId'], // The column in 'YourTableName' that will be the foreign key
    type: 'foreign key',
    name: 'FK_FollowTargetUser_Users', // A descriptive name for your constraint
    references: {
      table: 'users', // The table being referenced
      field: 'id', // The primary key column in 'ReferenceTableName'
    },
    onDelete: 'CASCADE', // Optional: Define behavior on deletion of the referenced row
    onUpdate: 'CASCADE', // Optional: Define behavior on update of the referenced row
  });
  await queryInterface.addConstraint('follows', {
    fields: ['targetUserId', 'followerUserId'], // The column in 'YourTableName' that will be the foreign key
    type: 'check',
    name: 'Check_Not_Equal_Fields', // A descriptive name for your constraint
    where: {
      targetUserId: {
        [Sequelize.Op.ne]: Sequelize.col('followerUserId') // Ensures columnA is not equal to columnB
      }
    }
  });
}

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.removeConstraint('FK_FollowerUser_Users');
  await queryInterface.removeConstraint('FK_FollowTargetUser_Users');
  await queryInterface.removeConstraint('FK_FollowerUser_Users');
}


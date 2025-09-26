import bcrypt from "bcrypt"

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('users', [{
    email: 'admin@admin.org',
    isVerified: true,
    password: await bcrypt.hash("admin", 10),
    username: "admin",
    fullname: "admin",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date()
  }], {});
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('users', null, {});
}


export default async function seedDatabase() {
    await sequelize.sync({ force: true });
};
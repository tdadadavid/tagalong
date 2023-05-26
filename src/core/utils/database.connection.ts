import { sequelize } from '../config';

export const initializeDbConnection = async ({force = false}: { force?: boolean}) => {
    return sequelize.sync({ force: force });
}
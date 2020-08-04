// import map from 'lodash/map';
import models from '../server/models';

const truncateTable = (modelName) =>
  models[modelName].destroy({
    where: {},
    force: true,
  });

  /**
 * 
 * This will iterate through all of your models, and delete any data out of the database associated with those models. Easy!
 */
export default async function truncate(model) {
  if (model) {
    return truncateTable(model);
  }

  return Promise.all(
    Object.keys(models).map((key) => {
      if (['sequelize', 'Sequelize'].includes(key)) return null;
      return truncateTable(key);
    })
  );
}
import { Payee } from '../models';


/**
 * CREATE PAYEE IN DATABASE
 * ========================
 * Create payee in the database
 * Return payee object when successful or error
 * 
 * @param {OBJECT} payee 
 */
export async function create(payee) {

  try {

    // Validate payee exists
    if (!payee) {
      // TODO: Needs a better message based on function variable
      throw new Error('Bad Request - Your request did not contain payee data')
    }

    // Creat variable so we can add to it if needed down the track
    let createdPayee = await Payee.create({
      name: payee.name,
      description: payee.description,
      address: payee.address
    });

    // Return new payee
    return createdPayee;

  } catch (error) {
    return error;
  }

}

/**
 * FIND ALL PAYEES
 * ================
 * Find all payees 
 * 
 * @param {INT} offset INT
 * @param {INT} limit INT
 * @param {STRING} where
 */
export async function findAll(offset, limit, where) {

  try {
      const payees = await Payee.findAll({
        limit: limit,
        offset: offset,
        where, where
      });
      return payees;
      
  } catch (error) {
      return error;
  }
  
}

/**
 * FIND AND COUNT ALL PAYEES
 * ==========================
 * Find all the Payees with where 
 * 
 * @param {STRING} where 
 */
export async function findAndCountAll(where, offset, limit) {

  try {
    let findAndCountAll = await Payee.findAndCountAll({
      where: where,
      offset: offset,
      limit: limit
    })
    return findAndCountAll;

  } catch (error) {
      return error;
  }
}

/**
 * FIND PAYEE WITH ID
 * ==================
 * Query database for payee with id
 * 
 * @param {INT} payeeId 
 */
export async function findOne(payeeId) {

  try {

    if (!payeeId) {
      // This want happen because it gets all if there is no id param
      throw new Error('Bad Request - Your request did not specify a payee <id>')
    }

    let payee = await Payee.findOne({
      where: { id: payeeId }
    });
    
    return payee;

  } catch (error) {
    return error;
  }

}

/**
 * UPDATE PAYEE WITH ID
 * ====================
 * Update payee in database with ID
 * 
 * @param {INT} payeeId 
 * @param {OBJECT} payee 
 */
export async function update(payeeId, payee) {
  try {

    if (!payeeId) {
      throw new Error('Bad Request - Your request did not specify a payee <id>')
    }

    if (!payee) {
      throw new Error('Bad Request - Your request did not contain payee data')
    }

    // Update payee in database
    let updated = await Payee.update(
      {
        name: payee.name,
        description: payee.description,
        address: payee.address, 
      },{
        where: { id: payeeId }
      }
    );

    if (updated) {
      // If updated find the updated payee and return row;
      let updatedPayee = await Payee.findOne({ 
        where: 
          { id: payeeId } 
      });
      return updatedPayee;
    }

  } catch (error) {
    return error;
  }
}

/**
 * DELETE PAYEE WITH ID
 * ====================
 * Delete payee in the database with id
 * 
 * @param {INT} payeeId 
 */
async function _delete(payeeId) {

  if (!payeeId) {
    throw new Error('Bad Request - Your request did not specify a payee <id>')
  }

  try {
    return !!await Payee.destroy({
      where: {
          id: payeeId
      }
  });
  } catch(error){
    return error;
  }

}
export {_delete as delete};

/**
 * DELETE ALL PAYEES IN DATABASE
 * =============================
 */
export async function deleteAll() {

  try {
    return !!await Payee.destroy({
      where: {},
      truncate: false
    });
  } catch(error){
    return error.message;
  }

}


// https://dev.to/nedsoft/performing-crud-with-sequelize-29cf
// https://github.com/cploutarchou/node_rest_api_with_mysql
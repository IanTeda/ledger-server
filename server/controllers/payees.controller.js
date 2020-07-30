import { Payee } from '../models';
const payeeService = require('../services/payee.service');
const objectService = require('../services/object.service');

/**
 * CREATE PAYEE
 * ============
 * Send Payee object to the Pay Service to create
 * 
 * @param {*} req http request
 * @param {*} res http response
 */
export async function create(req, res) {

  // Send payee to service for saving to database
  try {

    // Validate request body
    if (!req.body.name) {
      throw new Error('Request body can not be empty!')
    }

    // Create new payee object from request body
    let newPayee = {
      name: req.body.name,
      description: req.body.description,
      address:req.body.address,
    };

    // Create payee
    let payee = await payeeService.create(newPayee);

    if(payee){
      return res.status(201).json({
        status: 201,
        data: payee,
        message: 'Successfully Created Payee'
      });
    }

    throw new Error('Error creating payee')

  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: error.message || 'Unknown error creating payee'
    })
  }
  
}

/**
 * FIND ALL PAYEES
 * ===============
 * Find all the payee entries in the database
 * 
 * @param {OBJECT} req http request
 * @param {OBJECT} res http response
 */
export async function findAll(req, res) {

  try {
    // Calculate query offset and limit
    let limit = req.query.size ? +req.query.size : 10;
    let offset = req.query.page ? req.query.page * limit : 0;

    let where = req.query.filter

    // Find all Payees with service
    let payees = await payeeService.findAll(offset, limit, where);

    if(payees.name === "SequelizeConnectionError"){
      throw new Error('Unable to find payees in the database');
    }

    if (objectService.isNotEmpty(payees)){
      return res.status(200).json({
        status: 200,
        data: payees,
        message: 'Successfully Payee Retrieval'
      })
    }

    throw new Error('Unable to find payees in the database');

  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: error.message
    })
  }
}

/**
 * FIND AND COUNT ALL PAYEES
 * 
 * @param {OBJECT} req 
 * @param {OBJECT} res 
 */
export async function findAndCountAll(req, res){

  try {

    // Count filter
    let where = req.query.filter;

    let total = await payeeService.findAndCountAll(where);
    return res.status(200).json({status: 200, data: total, message: 'Successfully Payee Retrieval'})
  } catch (error) {
    return res.status(400).json({status: 400, message: error.message})
  }
}

/**
 * FIND A PAYEE BY ID
 * ==================
 * Find payee with id
 * 
 * @param {OBJECT} req 
 * @param {OBJECT} res 
 */
export async function findOne(req, res) {
  //  res.send('NOT IMPLEMENTED: Payee find by id');

  try {
    let id = req.params.id;
    let payee = await payeeService.findOne(id);

    if(payee){
      return res.status(200).json({
        status: 200,
        data: payee,
        message: 'Successfully retrieved payee with ID=' + id
      })
    }

    throw new Error('Post with ID=' + id + ' does not exists')

  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: error.message || ' Error while retrieving post with ID=' + payeeId
    })
  }
}

/**
 * UPDATE PAYEE WITH ID
 * ====================
 * Update payee with a given id
 * 
 * @param {OBJECT} req 
 * @param {OBJECT} res 
 */
export async function update(req, res) {

  try {

    let payee = req.body;
    let payeeId = req.params.id;

    let updatedPayee = await payeeService.update(payeeId, payee);

    return res.status(200).json({
      status: 201,
      data: updatedPayee,
      message: 'Successfully Updated Payee'
    });

  } catch (error) {

    return res.status(400).json({
      status: 400,
      message: error.message
    })

  }


}
/**
 * DELETE PAYEE WITH ID
 * ====================
 * Delete the payee with a given id
 * 
 * @param {OBJECT} req 
 * @param {OBJECT} res 
 */
async function _delete(req, res){

  try {
    let id = req.params.id;
    let deleted = await payeeService.delete(id);

    if(deleted){
      return res.status(200).json({
        status: 200,
        message: 'Successfully deleted payee with ID=' + id
      })
    }

    throw new Error('Payee with ID=' + id + ' does not exists and could not be deleted')

  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: error.message || ' Error while deleting post with ID=' + payeeId
    })
  }

};
export { _delete as delete };

/**
 * DELETE ALL PAYEES
 * =================
 * Delete all payees
 * 
 * @param {OBJECT} req 
 * @param {OBJECT} res 
 */
export async function deleteAll(req, res) {
  
  try {

    let deleted = await payeeService.deleteAll();

    if(deleted){
      return res.status(200).json({
        status: 200,
        message: 'Successfully deleted all payees in the database'
      });
    }

    throw new Error('Error trying to delete all Payees');

  } catch(error){
    return res.status(400).json({
      status: 400,
      message: error.message || 'Error trying to delete all Payees'
    });
  }

}

// https://dev.to/nedsoft/performing-crud-with-sequelize-29cf
// https://bezkoder.com/node-js-express-sequelize-mysql/
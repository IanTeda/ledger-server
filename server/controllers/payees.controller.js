import { Payee } from '../models';
const payeeService = require('../services/payee.service');
const objectUtil = require('../util/object.util');
const hateoasUtil = require("../util/hateoas.util");

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
    // TODO: validation needs more work
    if (!req.body.name) {
      throw new Error('Bad Request - Your request did not contain payee data')
    }

    // Create new payee object from request body
    let newPayee = {
      name: req.body.name,
      description: req.body.description,
      address:req.body.address,
    };

    // Create payee
    let createdPayee = await payeeService.create(newPayee);
    let links = hateoasUtil.newEntryLink(req, createdPayee);

    if(createdPayee){
      return res.status(201).json({
        status: 201,
        message: 'Success - Created payee in database',
        data: createdPayee,
        links: links
      });
    }

    throw new Error('Error - Could not create payee')

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
    let payeesAndCountAll = await payeeService.findAndCountAll(where, offset, limit);
    let payees = payeesAndCountAll.rows;
    let total = payeesAndCountAll.count;

    // Check for Sequelize errors
    if(payees.name === "SequelizeConnectionError") {
      throw new Error('Error - Unable to connect to database');
    } else if(payees.name === "SequelizeDatabaseError") {
      throw new Error('Error - Database threw an error');
    }

    // Get links to add to response
    let links = hateoasUtil.pagesLinks(req, total);

    if (objectUtil.isNotEmpty(payees)){
      return res.status(200).json({
        status: 200,
        message: 'Success - Retrieved payees',
        data: payees,
        links: links
      })
    }

    throw new Error('Error: Unable to find payees in the database');

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
    return res.status(200).json({
      status: 200, 
      data: total, 
      message: 'Successfully Payee Retrieval'
    })

  } catch (error) {
    return res.status(400).json({
      status: 400, 
      message: error.message
    })
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

  try {
    let id = req.params.id;
    let payee = await payeeService.findOne(id);
    let links = hateoasUtil.selfLinks(req);

    if(payee){

      // Check for Sequelize errors
      if(payee.name === "SequelizeConnectionError") {
        throw new Error('Error - Unable to connect to the database');

      // If number is to big you get an out of range error, else it returns null
      } else if(payee.name === "SequelizeDatabaseError") {
        throw new Error(`Bad Request - Payee id=${id} is out of range or does not exists`)

      } else {
        return res.status(200).json({
          status: 200,
          message: `Success - Retrieved payee with id=${id}`,
          data: payee,
          links: links
          
        })
      }

    // If number is to big you get an out of range error, else it returns null
    } else {
      throw new Error(`Bad Request - Payee id=${id} is out of range or does not exists`);
    }
  } catch (error) {
    // TODO: add error links to response
    return res.status(404).json({
      status: 404,
      message: error.message || 'Error while retrieving post with id=' + payeeId
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

    let id = req.params.id;

    // Create new payee object from request body
    let payee = {
      name: req.body.name,
      description: req.body.description,
      address:req.body.address,
    };

    let updatedPayee = await payeeService.update(id, payee);
    let links = hateoasUtil.selfLinks(req);

    return res.status(201).json({
      status: 201,
      message: `Success - Updated payee with id=${id}`,
      data: updatedPayee,
      links: links
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

    if(!req.params.id){
      throw new Error('Bad Request - No payee id provided')
    }

    let id = req.params.id;
    let deleted = await payeeService.delete(id);
    let links = hateoasUtil.deleteLinks(req);

    if(deleted){
      return res.status(200).json({
        status: 200,
        message: `Success - Deleted payee with id=${id}`,
        links: links
      })
    }

    throw new Error(`Bad Request - Payee with id=${id} does not exists and could not be deleted`)

  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: error.message || 'Error while deleting post with id=' + payeeId
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
        message: 'Success - Deleted all payees in the database'
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
import { Payee } from '../models';

// Create a new resource
exports.create = (req, res) => {
  // res.send('NOT IMPLEMENTED: Payee create and save');

    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create
    const payee = {
      title: req.body.title,
      description: req.body.description,
      address: req.body.address
    };
  
    // Save to the database
    Payee.create(payee)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Payee."
        });
      });
}

// Find a list of resources
exports.findAll = (req, res) => {
  Payee.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving payees."
      });
    });
}

// Get a single resource by its id
exports.findOne = (req, res) => {
  // res.send('NOT IMPLEMENTED: Payee find by id');
  const id = req.params.id;

  Payee.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
}

// Replace an existing resource by its id with data
exports.update = (req, res) => {
  // res.send('NOT IMPLEMENTED: Payee update by id');

  const id = req.params.id;

  Payee.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Payee was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Payee with id=${id}. Maybe Payee was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Payee with id=" + id
      });
    });
}

// Delete with the specified id in the request
exports.delete = (req, res) => {
  // res.send('NOT IMPLEMENTED: Payee delete by id');
  const id = req.params.id;

  Payee.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Payee was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Payee with id=${id}. Maybe Payee was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Payee with id=" + id
      });
    });
};

// Delete all from the database.
exports.deleteAll = (req, res) => {
  // res.send('NOT IMPLEMENTED: Payee delete all');
  Payee.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Payees were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all payees."
      });
    });
}

// Find all published
exports.findAllPublished = (req, res) => {
  // res.send('NOT IMPLEMENTED: Payee find all published');
  Payee.findAll({ where: { published: true } })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving payees."
    });
  });
}
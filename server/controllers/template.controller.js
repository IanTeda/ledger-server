
// Create a new resource
export async function create(req, res) {
  res.send('NOT IMPLEMENTED: Payee create and save');
}

// Find a list of resources
export async function findAll(req, res) {
  res.send('NOT IMPLEMENTED: Find all');
}

// Get a single resource by its id
export async function findOne(req, res) {
  res.send('NOT IMPLEMENTED: Payee find by id');
}

// Replace an existing resource by its id with data
export async function update(req, res) {
  res.send('NOT IMPLEMENTED: Payee update by id');
}

// Delete with the specified id in the request
const _delete = (req, res) => {
  res.send('NOT IMPLEMENTED: Payee delete by id');
};
export { _delete as delete };

// Delete all from the database.
export async function deleteAll(req, res) {
  res.send('NOT IMPLEMENTED: Payee delete all');
}

// Find all published
export  async function findAllPublished(req, res) {
  res.send('NOT IMPLEMENTED: Payee find all published');
}

// https://sodocumentation.net/node-js/topic/10785/route-controller-service-structure-for-expressjs
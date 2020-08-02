function endPointLink(urlSelf){

  let lastIndex = urlSelf.lastIndexOf("/");

  return urlSelf.substring(0, lastIndex);

}


/**
 * PAGES LINK
 * ==========
 * Return array of links for pagination
 * 
 * @param {OBJECT} req 
 * @param {INT} total 
 */
export function pagesLinks(req, total){

  // Set up variables to use through the function
  let links = [];
  let urlPrev;
  let urlNext;

  // Set page variables
  let size = parseInt(req.query.size ? +req.query.size : 10);
  let page = parseInt(req.query.page ? req.query.page : 0);
  let pages = Math.trunc(total / size);

  let urlSelf = req.protocol + '://' + req.get('host') + req.originalUrl;
  let urlOriginal = req.protocol + '://' + req.get('host') + req.originalUrl.split("?").shift();

  // If we are at the starting page (0) then we don't need a previous li nk
  if(page > 0){
    let pagePrev = page - 1;
    urlPrev = urlOriginal + '?size=' + size + '&page=' + pagePrev;
  }

  // If we are at the last page we don't need a next link
  if(page < pages){
    let pageNext = page + 1;
    urlNext = urlOriginal + '?size=' + size + '&page=' + pageNext;
  }

  if(urlSelf){
      // Build self link
    let relSelf = {
      "rel": "self",
      "href": urlSelf,
      "method": "GET",
      "types":["text/xml","application/json"]
    }
    // Add self link to links array
    links.push(relSelf);
  }

  if(urlPrev){
      // Build previous link
    let relPrev = {
      "rel": "previous",
      "href": urlPrev,
      "method": "GET",
      "types":["text/xml","application/json"]
    }

    // Add previous link to the links array
    links.push(relPrev);
  }

  if(urlNext){
    // Build next link
    let relNext = {
      "rel": "next",
      "href": urlNext,
      "method": "GET",
      "types":["text/xml","application/json"]
    }

    // Add next link to the links array
    links.push(relNext);
  }

  // Return links
  return links

}

/**
 * SELF LINKS
 * ==========
 * Get, update and delete links
 * 
 * @param {OBJECT} req 
 */
export function selfLinks(req){

  let links = [];
  let urlSelf = req.protocol + '://' + req.get('host') + req.originalUrl;
  let urlEndPoint = endPointLink(urlSelf);

  let getLink = {
    "rel": "self",
    "href": urlSelf,
    "action": "get",
    "method": "GET",
    "types":[
      "text/xml",
      "application/json"
    ]
  }

  let updateLink = {
    "rel": "self",
    "href": urlSelf,
    "action": "update",
    "method": "PUT",
    "types":[
      "application/x-www-form-urlencoded"
    ]
  }

  let deleteLink = {
    "rel": "self",
    "href": urlSelf,
    "action": "delete",
    "method": "DELETE",
    "types":[
      "text/xml",
      "application/json"
    ]
  }

  let endPointLinks = {
    "rel": "end point",
    "href": urlEndPoint,
    "action": "get",
    "method": "GET",
    "types":[
      "text/xml",
      "application/json"
    ]
  }

  links.push(getLink);
  links.push(updateLink);
  links.push(deleteLink);
  links.push(endPointLinks);

  return links;

}

/**
 * DELETE LINKS
 * =============
 * What links do we show in a delete response
 * 
 * @param {OBJECT} req 
 */
export function deleteLinks(req){

  let links = [];
  let urlSelf = req.protocol + '://' + req.get('host') + req.originalUrl;
  let urlEndPoint = endPointLink(urlSelf);

  let endPointLinks = {
    "rel": "end point",
    "href": urlEndPoint,
    "action": "get",
    "method": "GET",
    "types":[
      "text/xml",
      "application/json"
    ]
  }

  links.push(endPointLinks);

  return links;
}




// HATEOAS (Hypermedia as the Engine of Application State) 
// https://docs.microsoft.com/en-us/azure/architecture/best-practices/api-design

/**
 * 
 *"links": [
 *  {
 *    "rel": "self",
 *    "href": "http://worland.local:3000/payees/33"
 *    "action": "get"
 *    "method": "GET",
 *    "types":["text/xml","application/json"]
 *  },{
 *    "rel": "self",
 *    "href": "http://worland.local:3000/payees/33",
 *    "action": "update"
 *    "method": "PUT"
 *    "types":["application/x-www-form-urlencoded"]
 *  },{
 *    "rel": "self",
 *    "href": "http://worland.local:3000/payees/33"
 *    "action": "delete",
 *    "method": "DELETE",
 *    "types":["text/xml","application/json"]
 *  }
 *]
 */

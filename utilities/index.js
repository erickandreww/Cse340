const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}

/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
    let grid
    if(data.length > 0){
      grid = '<ul id="inv-display">'
      data.forEach(vehicle => { 
        grid += '<li>'
        grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
        + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
        + 'details"><img src="' + vehicle.inv_thumbnail 
        +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
        +' on CSE Motors" /></a>'
        grid += '<div class="namePrice">'
        grid += '<hr />'
        grid += '<h2>'
        grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
        + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
        + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
        grid += '</h2>'
        grid += '<span>$' 
        + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
        grid += '</div>'
        grid += '</li>'
      })
      grid += '</ul>'
    } else { 
      grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
    }
    return grid
}
 Util.buildVehicleInfo = async function(data) {
  let info
  console.log(data[0].inv_year)
  if(data.length > 0) {
    info = '<div class="vehicle-main">'
    info += '<div class="vehicle-div-img"><img id="vehicle-img" src="' + data[0].inv_image
        +'" alt="Image of '+ data[0].inv_make + ' ' + data[0].inv_model 
        +' on CSE Motors" /></a></div>'
    info += '<div class="vehicle-details">'
    info += '<h3 id="vehicle-name">' + data[0].inv_make + ' ' + data[0].inv_model + ' Details</h3>'
    info += '<p id="vehicle-price"><strong>Price</strong>: $' + data[0].inv_price + '</p>'
    info += '<p id="vehicle-description"><strong>Description</strong>: ' + data[0].inv_description + '</p>'
    info += '<p id="vehicle-color"><strong>Color</strong>: ' + data[0].inv_color + '</p>'
    info += '<p id="vehicle-miles"><strong>Miles</strong>: ' + data[0].inv_miles + '</p>'
    info += '</div>'
    info += '</div>'
  } else {
    info += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return info
 }
/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

module.exports = Util
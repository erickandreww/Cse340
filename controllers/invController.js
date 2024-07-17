const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}
/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByInvId = async function (req, res, next) {
  const inv_id = req.params.invId
  const data = await invModel.getVehicleByInventoryId(inv_id)
  const vehicleInfo = await utilities.buildVehicleInfo(data)
  let nav = await utilities.getNav()
  const vehicleName = `${data[0].inv_year} ${data[0].inv_make} ${data[0].inv_model}`
  res.render("./inventory/vehicles", {
    title: vehicleName, 
    nav, 
    vehicleInfo,
  })
}
/* ***************************
 *  Build management view
 * ************************** */
invCont.buildManage = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/management", {
    title: "Vehicle Management",
    nav,
    errors: null,
  })
}

invCont.buildNewClass = async function (req, res) {
  let nav = await utilities.getNav()
  res.render("./inventory/add-classification", {
    title: "Add New Classification",
    nav,
    errors: null,
  })
}

invCont.buildNewVehicle = async function (req, res) {
  let nav = await utilities.getNav()
  const classList = await utilities.buildClassificationList()
  res.render("./inventory/add-inventory", {
    title: "Add New Vehicle",
    nav,
    classList,
    errors: null,
  })
}

invCont.registerClass = async function (req, res) {
  let nav = await utilities.getNav();
  const {classification_name} = req.body;

  const classResult = await invModel.registerClass(classification_name)
  
  if (classResult) {
    req.flash(
      "notice",
      `The ${classification_name} classification was successfull added.`
    )
    res.status(201).render("inventory/management", {
      title: "Vehicle Management",
      nav,
    })
  } else {
    req.flash("notice", "Sorry, the classification register failed.")
    res.status(501).render("inventory/add-classification", {
      title: "Vehicle Management",
      nav,
    })
  }
}

invCont.registerNewVehicle = async function (req, res) {
  let nav = await utilities.getNav();
  const {inv_make, inv_model, inv_year, inv_description, inv_image, 
    inv_thumbnail, inv_price, inv_miles, inv_color, classification_id} = req.body;
  
  const vehicleResult = await invModel.registerNewVehicle(inv_make, inv_model, inv_year, inv_description, inv_image, 
    inv_thumbnail, inv_price, inv_miles, inv_color, classification_id)
  
  if (vehicleResult) {
    req.flash(
      "notice",
      `The vehicle "${inv_make} ${inv_model}" was successfull added.`
    )
    res.status(201).render("inventory/management", {
      title: "Vehicle Management",
      nav,
    })
  } else {
    req.flash("notice", "Sorry, the registration failed.")
    res.status(501).render("inventory/add-inventory", {
      title: "Vehicle Management",
      nav,
    })
  }
}


module.exports = invCont
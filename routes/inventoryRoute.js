// Needed Resources 
const express = require("express")
const utilities = require("../utilities/")
const router = new express.Router()
const invController = require("../controllers/invController")
const invValidate = require('../utilities/inventory-validation')

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));
router.get("/detail/:invId", utilities.handleErrors(invController.buildByInvId));

router.get("/", utilities.handleErrors(invController.buildManage));

router.get("/newclass", utilities.handleErrors(invController.buildNewClass));
router.post(
    "/newclass", 
    invValidate.classificationRules(),
    invValidate.checkClassification,
    utilities.handleErrors(invController.registerClass)
);

router.get("/newvehicle", utilities.handleErrors(invController.buildNewVehicle));
router.post(
    "/newvehicle", 
    invValidate.newVehicleRules(),
    invValidate.checkNewVehiclesInfo,
    utilities.handleErrors(invController.registerNewVehicle)
);

router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON))

module.exports = router;
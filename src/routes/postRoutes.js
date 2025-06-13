const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router.get("/", postController.getAll);
router.get("/search", postController.search);
router.get("/:id", postController.getById);
router.post("/", postController.create);
router.put("/:id", postController.update);
router.delete("/:id", postController.delete);

module.exports = router;

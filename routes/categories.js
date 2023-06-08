const router = require("express").Router();
const Category = require("../models/Category");
const auth = require("../middleware/auth");
const { validate } = require("../middleware/validations");
const validation = require('../middleware/ValidationList')

router.post("/",[auth, validate(validation.catSchema)], async (req, res) => {
  const newCat = new Category(req.body);
  try {
    const savedCat = await newCat.save();
    res.status(200).json(savedCat);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
    try {
      const cats = await Category.find();
      res.status(200).json(cats);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //UPDATE
router.put("/:id",[auth, validate(validation.catSchema)], async (req, res) => {
  try {
    const post = await Category.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Category.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        return res.status(200).json(updatedPost);
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(401).json("You can update only your categories!");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id",auth, async (req, res) => {
  try {
    const post = await Category.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("Category has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your Category!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

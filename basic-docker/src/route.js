const router = require("express").Router();

router.get("/list", (req, res) => {
  res.send({
    data: [
      {
        name: "John Doe",
        email: "john.doe@example.com",
      },
      {
        name: "Jane Doe",
        email: "",
      },
      {
        name: "John Smith",
        email: "",
      },
    ],
  });
});

module.exports = router;

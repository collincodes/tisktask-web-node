const express = require("express");
const router = express.Router();
const { db } = require("../mysql");
const moment = require("moment");

// filter tasks by status and list index
let filterTasks = (rows, status) => {
  return rows
    .filter(t => t.status === status)
    .sort((a, b) => {
      status === "complete"
        ? a.completed_at - b.completed_at
        : a.list_id - b.list_id;
    });
};

/* GET home page. */
router.get("/", function(req, res, next) {
  db.query("select * from tasks where deleted_at is null", (err, rows) => {
    let todo = filterTasks(rows, "todo");
    let in_progress = filterTasks(rows, "in_progress");
    let complete = filterTasks(rows, "complete");
    res.render("index", {
      title: "tisk task",
      date: moment().format("LL"),
      todo,
      in_progress,
      complete
    });
  });
});

module.exports = router;

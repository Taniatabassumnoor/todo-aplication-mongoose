const express = require("express");
const mongoose = require("mongoose");
const totoSchema = require("../schemas/todoSchema");
const checkLogin = require("../middlewares/checkLogin");
const route = express.Router();

const Todo = new mongoose.model("todo", totoSchema);

// // Get All The Todo's
// route.get("/",  (req, res) => {
//    Todo.find({ status: "active" }, (err, data) => {
//     if (err) {
//       res.status(500).json({
//         error: "There was a server side error",
//       });
//     } else {
//       res.status(200).json({
//         results: data,
//         message: "Todo Get  All successfully",
//       });
//     }
//   });
// });

// Get All The Todo's
route.get("/", checkLogin, (req, res) => {
  console.log(req.username);
  console.log(req.userId);
  Todo.find({ status: "active" })
    .select({
      _id: 0,
      _v: 0,
      date: 0,
    })
    .limit(2)
    .exec((err, data) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error",
        });
      } else {
        res.status(200).json({
          results: data,
          message: "Todo Get  All successfully",
        });
      }
    });
});

// Get single Todo by id
route.get("/:id", (req, res) => {
  Todo.find({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error",
      });
    } else {
      res.status(200).json({
        results: data,
        message: "Todo Got single successfully",
      });
    }
  });
});

// Post single Todo
route.post("/", (req, res) => {
  const newTodo = new Todo(req.body);
  newTodo.save((err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error",
      });
    } else {
      res.status(200).json({
        message: "Todo was inserted successfully",
      });
    }
  });
});

// Post multiple Todo
route.post("/all", (req, res) => {
  Todo.insertMany(req.body, (err) => {
    if (err) {
      res.status(500).json({
        error: "There were a server side error",
      });
    } else {
      res.status(200).json({
        message: "Todos were inserted successfully",
      });
    }
  });
});

// // Put Todo
// route.put("/:id",  (req, res) => {
//    Todo.updateOne(
//     { _id: req.params.id },
//     {
//       $set: {
//         status: "active",
//       },
//     },
//     (err) => {
//       if (err) {
//         res.status(500).json({
//           error: "There was a server side error",
//         });
//       } else {
//         res.status(200).json({
//           message: "Todo was updated successfully",
//         });
//       }
//     }
//   );
// });

// Put Todo
route.put("/:id", (req, res) => {
  const result = Todo.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        status: "active",
      },
    },
    { useFindAndModify: false, new: true },
    (err) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error",
        });
      } else {
        res.status(200).json({
          message: "Todo was updated successfully",
        });
      }
    }
  );
  console.log(result);
});
// Delete Todo
route.delete("/:id", (req, res) => {
  Todo.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error",
      });
    } else {
      res.status(200).json({
        message: "Todo was deleted successfully",
      });
    }
  });
});

module.exports = route;

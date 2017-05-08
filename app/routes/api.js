var mongoose = require("mongoose");
var User = require("../models/user");
var Item = require("../models/item");
var Allergy = require("../models/allergy");
var config = require("../../config");
var request = require("request");
var Recipe = require("../models/recipe");


module.exports = function(app, express, passport) {
  //get an instance of the express router
  var apiRouter = express.Router();

  //middleware to use for all requests
  apiRouter.use(function(req, res, next) {
    //do logging
    console.log("Somebody just came to our app!");
    next();
  });

  //test route to make sure everything is working
  // accessed at GET http://localhost:80/api
  apiRouter.get("/", function(req, res) {
    res.json({ message: "hooray! Welcome to our ap!" });
  });
  //--------------------------------------
  //more routes for our API will happen here

  //on routes that end in /users
  //---------------------------------
  apiRouter
    .route("/users")
    //create a user(accessed at POST http://localhost:80/api/user)
    .post(
      passport.authenticate("local-signup", {
        successRedirect: "/feed",
        failureRedirect: "/login",
        failureFlash: false
      })
    )
    //update user
    .put(function(req, res) {
      //find the user we want to update
      if (req.query.username) {
        User.findOne({ username: req.query.username }, function(err, user) {
          if (User.length != 0) {
            if (err) res.json({ err: err });
            else {
              //return the user
              //update only info only if it's new
              if (
                req.body.name //update name
              )
                user.name = req.body.name;

              if (
                req.body.password //update password
              )
                user.password = req.body.password;

              if (req.body.friends)
                  user.friends.push(req.body.friends);//add to friends

              if (
                req.body.allergic_to_milk //upate allergy to milk
              )
                user.allergic_to_milk = req.body.allergic_to_milk;

              if (
                req.body.allergic_to_eggs //upate allergy to eggs
              )
                user.allergic_to_eggs = req.body.allergic_to_eggs;

              if (
                req.body.allergic_to_fish //upate allergy to fish
              )
                user.allergic_to_fish = req.body.allergic_to_fish;

              if (
                req.body.allergic_to_shellfish //upate allergy to shellfish
              )
                user.allergic_to_shellfish = req.body.allergic_to_shellfish;

              if (
                req.body.allergic_to_tree_nuts //upate allergy to tree nuts
              )
                user.allergic_to_tree_nuts = req.body.allergic_to_tree_nuts;

              if (
                req.body.allergic_to_peanuts //upate allergy to peanuts
              )
                user.allergic_to_peanuts = req.body.allergic_to_peanuts;

              if (
                req.body.allergic_to_wheat //upate allergy to wheat
              )
                user.allergic_to_wheat = req.body.allergic_to_wheat;

              if (
                req.body.allergic_to_soybeans //upate allergy to soybeans
              )
                user.allergic_to_soybeans = req.body.allergic_to_soybeans;

              if (
                req.body.allergic_to_gluten //upate allergy to gluten
              )
                user.allergic_to_gluten = req.body.allergic_to_gluten;

              //save the user
              user.save(function(err) {
                if (err) {
                  res.json({ err: "Error! Can't save" });
                } else {
                  res.json({ message: "User updated!" });
                }
              });
            }
          } else {
            res.json({ err: "nothing to be updated!" });
          }
        });
      }
    })
    //end update

    .get(function(req, res) {
      if (req.query.username) {
        User.find({ username: req.query.username }, function(err, user) {
          if (User.length != 0) {
            if (err) res.json({ err: err });
            else {
              //return the user

              res.json(user);
            }
          } else {
            res.json({ message: "Username not found" });
          }
        });
      } else {
        //get all users
        User.find(function(err, users) {
          if (err) return res.json({ err: err });
          else res.json(users);
        });
      }
    });

  apiRouter.post("/loginUser", passport.authenticate('local-login', {
  	successRedirect: "/feed",
	failureRedirect: "/#/login"
  }))

  apiRouter
    .route("/users/:user_id")
    //get the user with that id
    //(accessed at GET http://localhost:8080/api/users/:user_id)
    .get(function(req, res) {
      User.findById(req.params.user_id, function(err, user) {
        if (err) res.send(err);

        //return that user
        res.json(user);
      });
    })
    //update the user with this id
    //(accessed at PUT http://localhost:8080/api/users/:user_id)

    .put(function(req, res) {
      //use our model to find the user we want
      User.findById(req.params.user_id, function(err, user) {
        if (err) res.json({ err: err });

        //update the user info only if its new
        if (req.body.name) user.name = req.body.name;
        if (req.body.username) user.username = req.body.username;
        if (req.body.password) user.password = req.body.password;
        if (req.body.friends) user.friends.push(req.body.friends);
        //save the user
        user.token_expiration = new Date();
        user.save(function(err) {
          if (err) res.json({ err: err });
          else
            //return a message
            res.json({ message: "User updated!" });
        });
      });
    })
    // delete the user with this id accessed at	DELETE http://localhost:8080/api/user/:user_id)
    .delete(function(req, res) {
      User.remove(
        {
          _id: req.params.user_id
        },
        function(err, user) {
          if (err) res.json({ err: err });

          res.json({ message: "Successfully deleted" });
        }
      );
    });
  //This is for the item route
  //route to items
  //apiRouter.route('/items')

  //create an item accessed at POST http://localhost:8080/api/item

  //create an instance of an item model
  apiRouter.post("/items", function(req, res) {
    var item = new Item();
    //set the items name, description, and expiration date
    item.name = req.body.name;
    item.description = req.body.description;
    item.exp_date = req.body.exp_date;
    item.upvotes = 0;
    item.downvotes = 0;

    //save the item and check for errors
    item.save(function(err) {
      if (err) return res.json({ err: err });
      else res.json({ success: true, message: "Item created!" });
    });
  });

  //get all items
  /*apiRouter.get("/items", function(req, res) {
    console.log("hello");
    Item.find({}, function(err, items) {
      if (err) return res.json({ err: err });
      else res.json(items);
    });
  });
*/
  //get the item by name
  //accessed at GET http://localhost:8080/api/items/:name)

  apiRouter.get("/items", function(req, res) {
    if (req.query.name) {
      Item.find({ $and: [ { $or: [ { "fields.item_name": new RegExp(req.query.name,'i') }, { "name": new RegExp(req.query.name,'i')}, { "fields.brand_name": new RegExp(req.query.name,'i')} ] } ] }, function(err, item) {
        if (item.length != 0) {
          if (err) res.json({ err: err });
          else {
            //return the item
            console.log("PREVIOUS ITEM FOUNd");
            res.json(item);
          }
        } else {
          var options = {
            method: "GET",
            url: "https://api.nutritionix.com/v1_1/search/" + req.query.name,
            qs: {
              appId: config.nutritionix.appId,
              appKey: config.nutritionix.appKey,
              fields: "*",
              results: "0:50"
            },
            headers: {
              "postman-token": "01a3693a-6d0c-890c-3ae7-69609ab44652",
              "cache-control": "no-cache",
              "content-type": "application/x-www-form-urlencoded"
            },
            form: {
              appId: config.nutritionix.appId,
              appKey: config.nutritionix.appKey,
              query: req.query.name
            }
          };
          var itemResults = [];
          request(options, function(error, response, body) {
            if (error) throw new Error(error);
            var items = JSON.parse(body);
            items.hits.forEach(function(i) {

              var item = new Item(i);
                item.ingredients = i.fields.nf_ingredient_statement;
                item.name = i.fields.item_name;

              if (item.ingredients != null) {
                  filterAllergies(item);
                  itemResults.push(item);
              }
            });
            //res.json(itemResults);

            Item.find({ $and: [ { $or: [ { "fields.item_name": new RegExp(req.query.name,'i') }, { "name": new RegExp(req.query.name,'i')}, { "fields.brand_name": new RegExp(req.query.name,'i')} ] } ] }, function(err, item) {
                if (item.length != 0) {
                    if (err) res.json({err: err});
                    else {
                        //return the item
                        console.log("IN ANOTHER PREVIOS ITEM")
                        res.json(item);
                    }
                } else {
                    res.json({message: "ehh"});
                }
            });
          });
        }
      });
    } else {
      //get all items,
      Item.find(function(err, items) {
        if (err) return res.json({ err: err });
        else res.json(items);
      });

      //res.json({message: 'Nothing to be queried'});
    }
  });

  apiRouter.route("/items/:item_id").delete(function(req, res) {
    Item.remove(
      {
        _id: req.params.item_id
      },
      function(err, item) {
        if (err) res.json({ err: err });

        res.json({ message: "Successfully deleted" });
      }
    );
  });

  apiRouter.put("/items", function(req, res) {
    if (req.query.name) {
      Item.findOne({ name: req.query.name }, function(err, item) {
        if (Item.length != 0) {
          if (err) res.json({ err: err });
          else {
            if (req.body.upvotes) item.upvotes++;
            if (req.body.downvotes) item.downvotes++;
            item.save(function(err) {
              if (err) res.json({ err: "Error! Can't Update" });
              else {
                res.json({
                  message: "Successfully updated Item upvotes / downvotes"
                });
              }
            }); //end Item.save
          } //end else
        } else {
          //END IF
          res.json({ err: "Nothing to be updated " });
        }
      });
    }
  });

  /****allergies route****/

  //post allergies
  apiRouter.post("/allergies", function(req, res) {
    //create an instance of the Allergy model
    var allergy = new Allergy();

    //set the allergy information(comes from the request)
    allergy.name = req.body.name;
    allergy.category = req.body.category;

    //save the user and check for errors
    allergy.save(function(err) {
      if (err) return res.json({ err: err });
      else res.json({ success: true, message: "allergy created!" });
    });
  });

  //get allergies
  apiRouter.get("/allergies", function(req, res) {
    if (req.query.name) {
      Allergy.find({ name: req.query.name }, function(err, allergy) {
        if (allergy.length != 0) {
          if (err) res.json({ err: err });
          else {
            //return the allerg
            res.json(allergy);
          }
        } else {
          res.json({ message: "allergy not found" });
        }
      });
    } else if (req.query.category) {
      Allergy.find({ category: req.query.category }, function(err, allergy) {
        if (allergy.length != 0) {
          if (err) res.json({ err: err });
          else {
            //return the allerg
            res.json(allergy);
          }
        } else {
          res.json({ message: "allergy not found" });
        }
      });
    } else {
      //get all allergies
      Allergy.find(function(err, allergies) {
        if (err) return res.json({ err: err });
        else res.json(allergies);
      });

      //res.json({message: 'Nothing to be queried'});
    }
  });

  apiRouter.get("/auth", function(req, res) {
    if (req.isAuthenticated()) {
      res.json({
        success: true
      });
    } else {
      res.json({
        success: false
      });
    }
  });

  apiRouter.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  //res.json({message: 'Nothing to be queried'});

  //recipe route

  apiRouter.post("/recipe", function(req, res) {
    var recipe = new Recipe();
    recipe.name = req.body.name;
    recipe.author = req.body.author;

    recipe.ingredients.push(req.body.ingredients);
    recipe.save(function(err) {
      if (err) return res.json({ err: err });
      else res.json({ success: true, message: "Recipe created" });
    });
  });

  apiRouter.get("/recipe", function(req, res) {
    if (req.query.name) {
      Recipe.find({ name: req.query.name }, function(err, recipe) {
        //check if it is null
        if (recipe.length != 0) {
          if (err)
            res.json({ err: err }); //return the recipe
          else res.json(recipe);
        } else {
          //recipe not found
          res.json({ message: "Recipe not found" });
        }
      });
    } else {
      res.json({ message: "Nothing to be queried" });
    }
  });


  // Get User Object
  apiRouter.post('/getUserInfo', auth, function(req, res){
  	Users.findOne({username: req.body.username}, function(err, user){
		if(err){
			res.json(err)
		} else {
			res.json(user)
		}
	})
  })
  return apiRouter;
};

function auth(req, res, next) {
  if (!req.isAuthenticated()) {
    res.send(401);
  } else {
    next();
  }
}

function filterAllergies(item) {
    item.flagCategories.all = [];
    Allergy.find({}, function(err, allergies) {
        allergies.forEach(function(allergyI) {
          var regExpress = new RegExp(allergyI.name, 'i');
            if (item.ingredients.search(regExpress) != -1) {

                console.log("MATCH", allergyI.name, allergyI.category);
                item.allChanged = true;
                item.markModified('allChanged');

                item.flagCategories.all.push(allergyI.name);
                item.markModified('flagCategories.all');

                switch (allergyI.category.toString()) {
                    case "egg":
                        item.flagCategories.egg.push(allergyI.name);
                        break;
                    case "soy":
                        item.flagCategories.soy.push(allergyI.name);
                        break;
                    case "shellfish":
                        item.flagCategories.shellfish.push(allergyI.name);
                        break;
                    case "peanuts":
                        item.flagCategories.peanuts.push(allergyI.name);
                        break;
                    case "milk":
                        item.flagCategories.milk.push(allergyI.name);
                        break;
                    case "wheat":
                        item.flagCategories.wheat.push(allergyI.name);
                        break;
                    case "other":
                        item.flagCategories.other.push(allergyI.name);
                        break;
                    case "fish":
                        item.flagCategories.fish.push(allergyI.name);
                        break;
                    case "meat":
                        item.flagCategories.meat.push(allergyI.name);
                        break;
                    case "gluten":
                        item.flagCategories.gluten.push(allergyI.name);
                        break;
                }
            }
        });
        item.save(function(err) {
            console.log(err);
        });
    });
}

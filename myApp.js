require('dotenv').config();

const mongoose = require('mongoose')

require('mongoose').set('debug', true);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) console.log(err)
  else console.log("mongdb is connected");
});

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
})

let Person = mongoose.model("Person", personSchema);



const createAndSavePerson = (done) => {
  let data = {
    name: "Joan",
    age: 27,
    favoriteFoods: ["Ramen", "Pasta"]
  }
  const person = new Person({
    name: data.name, age: data.age,
    favoriteFoods: data.favoriteFoods
  });

  person.save((err, data) => {
    if (err) return console.log(err);
    console.log(data)
    done(null, data);
  })
};

const createManyPeople = (arrayOfPeople, done) => {

  Person.create(arrayOfPeople, function(err, data) {
    if (err) return console.log(err);
    console.log(data)
    done(null, data);
  })

};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) return console.log(err);
    console.log(data)
    done(null, data);
  })

};

const findOneByFood = (food, done) => {

  Person.findOne({ "favoriteFoods": { "$in": food } }, (err, data) => {
    if (err) return console.log(err);
    console.log(data)
    done(null, data)
  })
};

const findPersonById = (personId, done) => {
  Person.findById({ _id: personId }, (err, data) => {
    if (err) return console.log(err);
    console.log(data)
    done(null, data);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (error, person) =>{
    if(error) return console.log(error);
    person.favoriteFoods.push(foodToAdd)
    person.save( (err, data) =>{
    if (err) return console.log(err);
    console.log(data)
    done(null, data);
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({"name": personName}, {$set: {"age": ageToSet}}, { returnNewDocument: true }, (err, data) => {
    if (err) return console.log(err);
    console.log(data)
    done(null, data);
  })

};

const removeById = (personId, done) => {
  Person.findOneAndRemove({_id: personId},   
  (err, data) => {
    if (err) return console.log(err);
    console.log(data)
    done(null, data);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({"name":nameToRemove},   
  (err, data) => {
    if (err) return console.log(err);
    console.log(data)
    done(null, data);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({"favoriteFoods": foodToSearch}).sort({"name": 1}).limit(2).select("name").exec((err, data) => {
    if (err) return console.log(err);
    console.log(data)
    done(null, data);
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;

//"mongodb+srv://<username>:<password>@cluster0.mwwucev.mongodb.net/?retryWrites=true&w=majority"

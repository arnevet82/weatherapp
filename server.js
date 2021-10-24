const {getUserData, updateUserData, deleteUser} = require('./be/getData');
const express = require('express'); 
const { MongoClient } = require('mongodb');
const app = express(); 
const port = process.env.PORT || 5000;
let userCollection;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


MongoClient.connect('mongodb+srv://natalie:d4d4d4d4@cluster0.9pp9b.mongodb.net/goals_db?retryWrites=true&w=majority', function (err, client) {
  
  if (err) throw err;

  const db = client.db('goals_db');
  userCollection = db.collection('goals');
  
  app.listen(port, () => console.log(`Listening on port ${port}`));

})




// get data
 app.get('/get_data', async (req, res) => { 
  await getUserData('Natalie', userCollection, req, res);
}); 

// update data
app.post('/update_data', async (req, res) => { 
  await updateUserData(userCollection, req, res);
}); 

// delete data
app.post('/delete_data', async (req, res) => { 
  await deleteUser(userCollection, req, res);
});


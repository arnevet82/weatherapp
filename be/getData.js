
module.exports = {
    getUserData,
    updateUserData,
    deleteUser
}



async function getUserData(clientUserName, userCollection, req, res) {

    const result = await userCollection.findOne({ userName: clientUserName });
    if (result) {
        console.log(`Found a listing in the collection with the name ${clientUserName}`, result);
        res.send({ express: result});
    } else {
        console.log(`No listings found with the name ${clientUserName}`);
        res.send({ express: 'Oops' });
    }
  }


  async function updateUserData( userCollection, req, res) {

    let updateObj = {
        ...req.body,
    }
    delete updateObj._id;

    const result = await userCollection.updateOne({ firstName: updateObj.firstName }, 
        { $set: updateObj}, { upsert: true });
        console.log(`${result.matchedCount} document(s) matched the query criteria.`);
        console.log(`${result.modifiedCount} document(s) was/were updated.`);

    if (result) {
        
        console.log(`updated ${req.body.firstName}`, result);
        res.send({ express: result.matchedCount });
    } else {
        console.log(`No listings found with the name ${req.body.firstName}`);
        res.send({ express: 'Oops' });
    }

  }




  async function deleteUser(userCollection, req, res) {

    const result = await userCollection.deleteOne({ firstName: req.body.firstName });
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
    if (result.deletedCount) {
        console.log(`deleted ${req.body.firstName}`, result);
        res.send({ express: result.matchedCount });
    } else {
        console.log(`No listings found with the name ${req.body.firstName}`);
          res.send({ express: 'Oops' });
    }

}



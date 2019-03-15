import React, { useState, useEffect } from "react";
import PouchDB from 'pouchdb';
import PouchDBfind from 'pouchdb-find';
import  uuidv4 from 'uuid/v4';

PouchDB.plugin(PouchDBfind);


function withPouchDB(WrappedComponent) {
  return function PouchDBService(props) {

    let [userId, setUserId] = useState(null);
    let [db, setDb] = useState(null);

    useEffect(() => { // Get or create a UUID
      userId = localStorage.getItem('UUID');
      if (!userId) {
        userId = uuidv4()
        localStorage.setItem('UUID', userId);
      } 
      setUserId(userId)
    },[userId])

    useEffect(() => { // Setup the database
      if (userId) {
        let remoteDB = new PouchDB('https://offchain-dbs01.commit-me.com:6984/draft-pledges')

        db = new PouchDB('draft-pledges');
        db.sync(remoteDB, {
          live: false
        }).on('change', function (change) {
          console.log('db changed somewhere')
          console.log(change)
          // yo, something changed!
        }).on('error', function (err) {
          console.log('db error in syncing')
          console.log(err)
          // yo, we got an error! (maybe the user went offline?)
        });
        
        setDb(db)
      }
    }, [])

    return (
      <WrappedComponent db={db} userId={userId} {...props} />
    )
  };
}

export default withPouchDB;

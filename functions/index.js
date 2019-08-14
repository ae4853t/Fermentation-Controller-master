'use strict';

const functions = require('firebase-functions');


// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();
// [END import]



/**
 * Cloud Function to be triggered by Pub/Sub that logs a message using the data published to the
 * topic as JSON.
 */

exports.helloPubSub = functions.pubsub.topic('photon').onPublish((message) => {
    
// the Particle function sends keys as numbers to save on string length
// This list is used to convert keys to readable values
      const newKeys = { 
        1: "beerTemp", 
        2: "fridgeTemp", 
        3: "fridgeTarget", 
        4: "currentState", 
        5: "pastState", 
        6: "stateStartTime", 
        7: "mode", 
        8: "targetTemp", 
        9: "profileName", 
        10: "profileStartTime" };    

//Function to convert keys in JSON.  
      function renameKeys(obj, newKeys) {
        const keyValues = Object.keys(obj).map(key => {
          const newKey = newKeys[key] || key;
          return { [newKey]: obj[key] };
        });
        return Object.assign({}, ...keyValues);
      }  
      
      // Decode the PubSub Message body.
      const messageBody = message.data ? Buffer.from(message.data, 'base64').toString() : null;
     
      let jsonData = JSON.parse(messageBody);
      let KeysJson = renameKeys(jsonData,newKeys);
    console.log(KeysJson);
      return admin.database().ref("Photon/data").set(KeysJson); 
    });
    // [END Function]

    
exports.chartPubSub = functions.pubsub.topic('chart').onPublish((message) => {

    // the Particle function sends keys as numbers to save on string length
    // This list is used to convert keys to readable values
        const newKeys = { 
            1: "beerTemp", 
            2: "chamberTemp", 
            3: "fridgeTarget", 
            4: "currentState"};    
    
    //Function to convert keys in JSON.  
        function renameKeys(obj, newKeys) {
            const keyValues = Object.keys(obj).map(key => {
            const newKey = newKeys[key] || key;
            return { [newKey]: obj[key] };
            });
            const ts = {ts: message.attributes.published_at}
            return Object.assign({}, ...keyValues, ts);
            
        }  
        
        // Decode the PubSub Message body.
        const messageBody = message.data ? Buffer.from(message.data, 'base64').toString() : null;
        
        let jsonData = JSON.parse(messageBody);
        let KeysJson = renameKeys(jsonData,newKeys);
        console.log(KeysJson);
        return admin.database().ref("TemperatureData").push(KeysJson); 
        });
        // [END Function]


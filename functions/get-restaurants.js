'use strict';

const co = require('co');
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

const defaultResults = process.env.defaultResults_count || 8;
const tableName = process.env.restaurants_table;

function* getRestaurants(count){
    let req = {
       // TableName: "restaurants",  //Replace this the direct table name from the code with the variable name
        TableName: tableName,
        Limit: count
    };
   
    let resp = yield dynamodb.scan(req).promise();
    return resp.Items;
    
}

module.exports.handler = co.wrap(function* (event, context, cb){
    let restaurants = yield getRestaurants(defaultResults);
    console.log("Restaurants - ", restaurants);
    let response = {
        statusCode: 200,
        body: JSON.stringify(restaurants)
    }

    console.log("response body - ", response.body)

    cb(null,response);
});
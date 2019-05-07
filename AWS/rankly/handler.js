"use strict";

const fetch = require('node-fetch');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const emojis = ['\u{1F984}','\u{1F600}','\u{1F604}','\u{1F609}','\u{1F603}','\u{1F601}'];

module.exports.rank = async event => {
  const rank = event.queryStringParameters.rank;
  const rankEmoji = emojis[rank >= emojis.length ? emojis.length-1 : rank];
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin':'*'
    },
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: rankEmoji,
    }, null, 2),
  };
  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

module.exports.postIcon = (event, context, callback) => {
  // const url = event.queryStringParameters.imageUrl;
  // const id = event.queryStringParameters.userId;
  const url = 'https://www.w3schools.com/w3images/fjords.jpg';
  const id = '1';
  if (url && id) {
    fetch(url)
    .then((response) => {
      if (response.ok) {
        return response;
      }
      return Promise.reject(new Error(
            `Failed to fetch ${response.url}: ${response.status} ${response.statusText}`));
    })
    .then(response => response.buffer())
    .then(buffer => (
      s3.putObject({
        Bucket: process.env.BUCKET,
        Key: id,
        Body: buffer,
      }).promise()
    ))
    .then(v => callback(null, v), callback)
    .catch(err => console.log('ERROR', err));
  }
};

module.exports.getIcon = (event, context, callback) => {
  // const id = event.queryStringParameters.userId;
  const id = '1';
  if (id) {
    const params = {
      "Bucket": process.env.BUCKET,
      "Key": id
    }
    s3.getObject(params, function(err, data) {
      if (err) {
        callback(err,null);
      } else {
        let response = {
          "statusCode": 200,
          "body": data
        }
        callback(null, response);
      }
    })
  }
}

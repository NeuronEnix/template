// src/server/websocket.handler.js

exports.handler = async (event) => {
  console.log('WebSocket event: ', event);

  // Your WebSocket logic goes here

  return {
    statusCode: 200,
    body: 'WebSocket connection established.',
  };
};

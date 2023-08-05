const grpc = require('@grpc/grpc-js');
const { GreetRequest } = require('../proto/greet_pb');
const { GreetServiceClient } = require('../proto/greet_grpc_pb');

function doGreet(client) {
  console.log('doGreet was invoked');
  const req = new GreetRequest().setFirstName('Adithya');

  client.greet(req, (err, res) => {
    if (err) {
      return console.log(err);
    }
    console.log(`Greet: ${res.getResult()}`);
  });
}

function main() {
  let credentials = grpc.ChannelCredentials.createInsecure();
  const serverAddress = '0.0.0.0:50051'
  const client = new GreetServiceClient(serverAddress, credentials,);

  // rpc call
  doGreet(client);

  client.close();
}

main()
const grpc = require("@grpc/grpc-js");
const { GreetRequest } = require("../proto/greet_pb");
const { GreetServiceClient } = require("../proto/greet_grpc_pb");

// unary
function doGreet(client) {
  console.log("doGreet was invoked");
  const req = new GreetRequest().setFirstName("Adithya");

  client.greet(req, (err, res) => {
    if (err) {
      return console.log(err);
    }
    console.log(`Greet: ${res.getResult()}`);
  });
}

// server side streaming
function doGreetManyTime(client) {
  console.log("doGreetManyTime was invoked");
  const req = new GreetRequest().setFirstName("Adithya");
  const call = client.greetManyTime(req);

  call.on("data", (res) => {
    console.log(`greetManyTime called : ${res.getResult()}`);
  });
}

function main() {
  let credentials = grpc.ChannelCredentials.createInsecure();
  const serverAddress = "0.0.0.0:50051";
  const client = new GreetServiceClient(serverAddress, credentials);

  // rpc calls
  // unary
  // doGreet(client);
  // server side streaming
  doGreetManyTime(client);
  client.close();
}

main();

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

// client side streaming
function doLongGreet(client) {
  console.log("doLongGreet was invoked");

  const namesList = ["Ben", "Tom", "Jerry", "John", "Brad"]
  const call = client.longGreet((err, res) => {
    if (err) {
      return console.log(err);
    }
    console.log(`Long Greet ${res.getResult()}`);
  })

  namesList.map((name)=>{
    return new GreetRequest().setFirstName(name)
  }).forEach((req)=>{call.write(req)})
  call.end()
}

function doGreetEveryOne(client) {
  console.log("doGreetEveryOne was invoked");
  const namesList = ["Ben", "Tom", "Jerry", "John", "Brad"]
  const call = client.greetEveryOne()

  call.on("data",(res)=>{
    console.log(`GreetEveryOne : Hai : ${res.getResult()}`);
  })

  namesList.map((name)=>{
    return new GreetRequest().setFirstName(name)
  }).forEach((req)=>{call.write(req)})
  call.end()
}

function main() {
  let credentials = grpc.ChannelCredentials.createInsecure();
  const serverAddress = "0.0.0.0:50051";
  const client = new GreetServiceClient(serverAddress, credentials);

  // rpc calls
  // doGreet(client);
  // doGreetManyTime(client);
  // doLongGreet(client);
  doGreetEveryOne(client)
  client.close();
}

main();

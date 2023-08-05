const grpc = require("@grpc/grpc-js");
const { PrimesRequest } = require("../proto/primes_pb");
const { PrimesClient } = require("../proto/primes_grpc_pb");

// server side streaming
function doPrimeManyTime(client) {
  console.log("doPrimeManyTime was invoked");
  const req = new PrimesRequest().setUserNumber(120);
  const call = client.primes(req);

  call.on("data", (res) => {
    console.log(`prime value : ${res.getPrime()}`);
  });
}

function main() {
  let credentials = grpc.ChannelCredentials.createInsecure();
  const serverAddress = "0.0.0.0:50051";
  const client = new PrimesClient(serverAddress, credentials);

  // rpc calls
  doPrimeManyTime(client);
  client.close();
}

main();

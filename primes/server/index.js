const grpc = require("@grpc/grpc-js");
const service_implementation = require("./service.implementation")
const { PrimesService } = require("../proto/primes_grpc_pb")


const localAddress = "0.0.0.0:50051";

function cleanup(server) {
  console.log("Cleanup")
  if (server) {
    server.forceShutdown();
  }
}

function main() {
  const server = new grpc.Server();
  const credentials = grpc.ServerCredentials.createInsecure();

  process.on("SIGINT", () => {
    console.log("Caught interrupt signal");
    cleanup(server);
  });

  server.addService(PrimesService, service_implementation)

  server.bindAsync(localAddress, credentials, (err, _) => {
    if (err) {
      return cleanup(server);
    }
    server.start();
  });

  console.log(`Listening on port ${localAddress}`);
}

main();

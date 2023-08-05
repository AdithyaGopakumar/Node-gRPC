  const grpc = require("@grpc/grpc-js")
  const {GreetServiceClient}= require("../proto/greet_grpc_pb")

  function main() {
    const serverAddress = "localhost:50051"
    const credentials = grpc.ChannelCredentials.createInsecure()
    const client = new GreetServiceClient(serverAddress,credentials)
    
    // call rpc endpoints


    client.close()
  }

  main()
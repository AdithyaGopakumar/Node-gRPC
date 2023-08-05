const grpc = require('@grpc/grpc-js');
const { SumRequest } = require('../proto/sum_pb');
const { CalculatorClient } = require('../proto/calculator_grpc_pb');

function doSum(client) {
  console.log('doSum was invoked');
  const req = new SumRequest().setFirstNumber(10).setSecondNumber(20)

  client.sum(req,(err,res)=>{
    if(err){
      return console.log(err);
    }

    console.log(`Sum :${res.getResult()}`)
  })
}

function main() {
  let credentials = grpc.ChannelCredentials.createInsecure();
  const serverAddress = '0.0.0.0:50051'
  const client = new CalculatorClient(serverAddress, credentials,);

  // rpc call
  doSum(client);

  client.close();
}

main()
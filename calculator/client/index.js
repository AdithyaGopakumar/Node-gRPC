const grpc = require('@grpc/grpc-js');
const { SumRequest } = require('../proto/sum_pb');
const { CalculatorClient } = require('../proto/calculator_grpc_pb');
const { AvgRequest } = require("../proto/avg_pb")

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

function doAvg(client) {
  console.log('doAvg was invoked');

  const numbers =[1,2,3,4,5,6,7,8,9,10]

  const call = client.avg((err,res)=>{
    if(err){
      return console.log(err);
    }

    console.log(`AVG :${res.getResult()}`)
  })

  numbers.map((number)=>{
    return new AvgRequest().setNumber(number)
  }).forEach((req)=>{ call.write(req)})

  call.end();
}

function main() {
  let credentials = grpc.ChannelCredentials.createInsecure();
  const serverAddress = '0.0.0.0:50051'
  const client = new CalculatorClient(serverAddress, credentials,);

  // rpc calls
  // doSum(client);
  doAvg(client)

  client.close();
}

main()
const pb = require("../proto/greet_pb")

// unary
exports.greet = (call, callback) => {
  console.log("Greet was invoked");
  const res = new pb.GreetResponse().setResult(`Hello ${call.request.getFirstName()}`)
  callback(null, res)
}

// server side streaming
exports.greetManyTime = (call, _) => {
  console.log("Greet Many was invoked");
  const res = new pb.GreetResponse()
  for (let i = 1; i <= 10; i++) {
    res.setResult(`Hello ${call.request.getFirstName()} : ${i}`)
    call.write(res)
  }
  call.end()
}

// client side streaming
exports.longGreet=(call,callback)=>{
  console.log("Long Greet was invoked");
  let greet =""

  call.on("data",(req)=>{
    greet+=`Hello ${req.getFirstName()}\n`
  })

  call.on("end",()=>{
    const res = new pb.GreetResponse().setResult(greet)
    callback(null,res)
  })
}
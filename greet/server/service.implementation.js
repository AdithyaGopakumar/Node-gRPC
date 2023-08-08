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
exports.longGreet = (call, callback) => {
  console.log("Long Greet was invoked");
  let greet = ""

  call.on("data", (req) => {
    greet += `Hello ${req.getFirstName()}\n`
  })

  call.on("end", () => {
    const res = new pb.GreetResponse().setResult(greet)
    callback(null, res)
  })
}

// bidirectional streaming
exports.greetEveryOne = (call, _) => {
  console.log("greetEveryOne was invoked");

  call.on("data", (req) => {
    console.log(`received request ${req}`);
    const res = new pb.GreetResponse().setResult(req.getFirstName())
    console.log(`sending response ${res}`);
    call.write(res)
  })

  call.on("end", () => {
    call.end()
  })
}

const sleep =(ms)=> new Promise((r)=> setTimeout(r,ms))
exports.greetWithDeadline = async (call, callback) => {
  console.log("greetWithDeadline was invoked");

  for (let index = 0; index < 3; index++) {
    if (call.cancelled) {
      console.log("The client cancelled the request");
    }
    await sleep(1000)
  }
  const res = new pb.GreetResponse().setResult(`Hello ${call.request.getFirstName()}`)
  callback(null, res)
}
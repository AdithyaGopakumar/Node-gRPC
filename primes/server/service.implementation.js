const {PrimesResponse} = require("../proto/primes_pb")

// server side streaming
exports.primes = (call, _) => {
  console.log("Primes was invoked");
  const res = new PrimesResponse()
  let k = 2
  let n = call.request.getUserNumber()
  while (n > 1) {
    if (n % k === 0) {
      res.setPrime(k)
      call.write(res)
      n = n / k;
    } else {
      k = k + 1;
    }
  }

  call.end()
}
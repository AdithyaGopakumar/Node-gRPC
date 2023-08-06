const { SumResponse } = require("../proto/sum_pb");
const { AvgResponcse } = require("../proto/avg_pb")

exports.sum = (call, callback) => {
  console.log("Sum was invoked");
  const res = new SumResponse().setResult(
    call.request.getFirstNumber() + call.request.getSecondNumber()
  );
  callback(null, res);
};

exports.avg = (call, callback) => {
  console.log("avg was invoked");
  let count = 0.0
  let total = 0.0

  call.on("data", (req) => {
    total += req.getNumber()
    ++count
  })

  call.on("end", () => {
    const res = new AvgResponcse().setResult(total / count)
    callback(null,res)
  })
}

// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var sum_pb = require('./sum_pb.js');
var avg_pb = require('./avg_pb.js');

function serialize_calculator_AvgRequest(arg) {
  if (!(arg instanceof avg_pb.AvgRequest)) {
    throw new Error('Expected argument of type calculator.AvgRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_AvgRequest(buffer_arg) {
  return avg_pb.AvgRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_calculator_AvgResponcse(arg) {
  if (!(arg instanceof avg_pb.AvgResponcse)) {
    throw new Error('Expected argument of type calculator.AvgResponcse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_AvgResponcse(buffer_arg) {
  return avg_pb.AvgResponcse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_calculator_SumRequest(arg) {
  if (!(arg instanceof sum_pb.SumRequest)) {
    throw new Error('Expected argument of type calculator.SumRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_SumRequest(buffer_arg) {
  return sum_pb.SumRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_calculator_SumResponse(arg) {
  if (!(arg instanceof sum_pb.SumResponse)) {
    throw new Error('Expected argument of type calculator.SumResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_SumResponse(buffer_arg) {
  return sum_pb.SumResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var CalculatorService = exports.CalculatorService = {
  sum: {
    path: '/calculator.Calculator/Sum',
    requestStream: false,
    responseStream: false,
    requestType: sum_pb.SumRequest,
    responseType: sum_pb.SumResponse,
    requestSerialize: serialize_calculator_SumRequest,
    requestDeserialize: deserialize_calculator_SumRequest,
    responseSerialize: serialize_calculator_SumResponse,
    responseDeserialize: deserialize_calculator_SumResponse,
  },
  avg: {
    path: '/calculator.Calculator/Avg',
    requestStream: true,
    responseStream: false,
    requestType: avg_pb.AvgRequest,
    responseType: avg_pb.AvgResponcse,
    requestSerialize: serialize_calculator_AvgRequest,
    requestDeserialize: deserialize_calculator_AvgRequest,
    responseSerialize: serialize_calculator_AvgResponcse,
    responseDeserialize: deserialize_calculator_AvgResponcse,
  },
};

exports.CalculatorClient = grpc.makeGenericClientConstructor(CalculatorService);

// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var primes_pb = require('./primes_pb.js');

function serialize_primes_PrimesRequest(arg) {
  if (!(arg instanceof primes_pb.PrimesRequest)) {
    throw new Error('Expected argument of type primes.PrimesRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_primes_PrimesRequest(buffer_arg) {
  return primes_pb.PrimesRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_primes_PrimesResponse(arg) {
  if (!(arg instanceof primes_pb.PrimesResponse)) {
    throw new Error('Expected argument of type primes.PrimesResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_primes_PrimesResponse(buffer_arg) {
  return primes_pb.PrimesResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var PrimesService = exports.PrimesService = {
  primes: {
    path: '/primes.Primes/Primes',
    requestStream: false,
    responseStream: true,
    requestType: primes_pb.PrimesRequest,
    responseType: primes_pb.PrimesResponse,
    requestSerialize: serialize_primes_PrimesRequest,
    requestDeserialize: deserialize_primes_PrimesRequest,
    responseSerialize: serialize_primes_PrimesResponse,
    responseDeserialize: deserialize_primes_PrimesResponse,
  },
};

exports.PrimesClient = grpc.makeGenericClientConstructor(PrimesService);

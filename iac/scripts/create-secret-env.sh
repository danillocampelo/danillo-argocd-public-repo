#!/bin/bash

while getopts f:n:d: flag
do
    case "${flag}" in
        f) file=${OPTARG};;
        n) ns=${OPTARG};;
        d) deployment=${OPTARG};
    esac
done

if [ -z "$file" ]; then
  echo "File is required"
  exit 1
fi
if [ -z "$ns" ]; then
  echo "Namespace is required"
  exit 1
fi

args=""

while read p; do
  args+="--from-literal=$p "
done <$file

echo "restart deployment $deployment"

kubectl delete secret generic smiles-api-secret -n $ns  2>/dev/null
kubectl create secret generic smiles-api-secret $args -n $ns  2>/dev/null

if [ -n "$deployment" ]; then
  kubectl rollout restart deployment $deployment -n $ns
fi


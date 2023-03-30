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

env_public=()
args=()

while read p; do
  if [[ "$p" == *"NEXT_PUBLIC_"* ]]; then
    env_public+=($p)
  fi
  args+="--from-literal=$p "
done <$file

printf '%s\n' "${env_public[@]}"

kubectl delete configmap nextjs-app-config -n $ns  2>/dev/null
kubectl create configmap nextjs-app-config --from-file=.env.local=$file -n $ns  2>/dev/null

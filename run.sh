#!/bin/bash

IFS='>'
cmd=$1
prefix="yarn run $cmd --env.package="
baseCommand="yarn run concurrently"

names=""
commands=""

shift
for var in "${@}"
do
    names="$names$var,"
    commands="$commands\"$prefix$var\" "
done

echo "Build Concurently: $names"
eval "$baseCommand --kill-others-on-fail -n \"$names\" $commands"

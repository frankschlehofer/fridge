#!/bin/bash

echo "Running Postgres.."
brew services start postgresql@14

echo "Running Express server"
cd ./server
npm run dev &

echo "Running client"
cd ../client
npm run dev &

cd ../

wait




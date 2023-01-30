#!/bin/bash

cd /mnt/repo/ventamo_webadmin
git pull
docker-compose down -v 
docker-compose up -d --build --remove-orphans -V 
```sh
# A container is a running instance of an image.
# Containers contain all of their own dependencies.
Docker registry: https://hub.docker.com
All node tags: https://hub.docker.com/_/node
Docs: https://docs.docker.com/reference/

# run
docker run looshi-image:late

# run with a name
docker run -it --name looshi-image alpine:3.10

# run detached
docker run -it --detach ubuntu:bionic
docker run -dit ubuntu:bionic  #shorthand

# run and then drop into bash
docker run -it node:12-stretch bash

# run and allow port 3000
docker run -it --publish 3000:3000 looshi-node-app:latest
docker run -it -p 3000:3000 looshi-node-app:latest  # shorthand

# pause / unpause
docker pause docker-name-or-id
docker unpause docker-name-or-id

# kill
docker kill container-name
docker kill $(docker ps -q) # kill all

# show all containers
docker ps         # that are running
docker ps --all   # that have been run or are running

# show all images
docker image list

# run and then destroy right after its run with --rm
docker run -it --name looshi-image --rm alpine:3.10

# restart
docker restart container_name

# download a container
docker pull some-tag-somewhere

# shows you a bunch of info
docker inspect node:12-stretch

# execute a command from the shell without being inside the shell
docker exec container-name-or-id command-name  #  ls, ps aux, etc
docker top container-name-or-id  # ( will do ps aux of container, shorthand for exec if you just need ps aux )

# history of the docker setup, it's like git history
docker history node:12-stretch

# general docker info about the host
docker info

# search for available images
docker search node

# show all images that exist ?
docker image list

# remove a container
docker rm container-id

# find which container you are currently in
cat /etc/issue

# connect to an already running container
docker attach container_name

# stop a process
docker kill docker-id or name

# remove an image
docker rm looshi-image

# where dockerfilelocation has a file called "Dockerfile" inside it:
docker build --tag looshi-image dockerfilelocation

# prompts for input, enter text, then hit control D
cat > looshi.txt

# which windows are you in ?
cat /etc/issue  #Ubuntu 18.04.6 LTS \n \l

# ------------ File storage within containers ------------
# There is none ?
# Containers are ephemeral, so if they need storage the Docker Host
# can create volumes which docker containers can access.
https://docs.docker.com/engine/reference/commandline/volume_create/

# Create a mount of type bind
# From the container's perspective, the files appear as if they were local.
# This example will bind the static asset file in the nginx example app
# to a "raw" nginx container.
cd docker-notes
docker run --mount type=bind,source="$(pwd)"/nginx-app/data/www,target=/usr/share/nginx/html -p 8080:80 nginx:1.21


# Create a mount of type volume
docker run --env DATA_PATH=/my-data/data.txt --mount type=volume,src=incrementor-data,target=/data incrementor


# ------------ CHROOT ------------
# Below are some general notes on namespaces and cgroups
# Probably won't be using these directly as the whole point of Docker
# is to abstract away these linux capabilities.
# chroot is about hiding files outside of the root
# unshare is about hiding processes or capabilities outside the root,
# e.g. ps aux will only show what's inside the root after you unshare

# chroot changes the root for any processes ran after ?
# ( needs a space after my-new-root )
chroot my-new-root/ bash

# debootstrap is "debian bootstrap"
apt-get update  # I don't know why this is required but i had to do it
apt-get install debootstrap
debootstrap --variant=minbase bionic /better-root

# "start the unshared chroot" :
unshare --mount --uts --ipc --net --pid --fork --user --map-root-user chroot /better-root bash
# now, within this chroot container
mount -t proc proc /proc
mount -t sysfs none /sys
mount -t tmpfs none /tmp


# -------------- CONTROL GROUPS --------------
# you can assign control groups to a chroot container
# it will limit memory and processing power

# install htop
apt-get install -y cgroup-tools htop

# create new cgroup
cgcreate -g cpu,memory,blkio,devices,freezer:/sandbox

# start an unshared container environment
unshare --mount --uts --ipc --net --pid --fork --user --map-root-user chroot /better-root bash

# go to a new tab and connect to the ubuntu parent process of the unshared env
docker exec -it <container-id> bash

# list all the processes, and find the bash process from the unshared container
ps aux

# run the cgclassify on the unshared container pid
cgclassify -g cpu,memory,blkio,devices,freezer:sandbox 7498

# limit to use only 5% available of the cores available to this
cgset -r cpu.cfs_period_us=100000 -r cpu.cfs_quota_us=$[ 5000 * $(getconf _NPROCESSORS_ONLN) ] sandbox
 # limit memory to 80
cgset -r memory.limit_in_bytes=80M sandbox
# see what's going on w it
cgget -r memory.stat sandbox

# it seems like I got this to work, if you hit `htop` it shows only 10% cpu on the "yes" command
```

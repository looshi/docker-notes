```sh
Docker hub: https://hub.docker.com

# tags are similar to package names
All tags: https://hub.docker.com/_/node

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

# show all containers that are running
docker ps

# show all containers that exist on the host, i guess a log of everything running or already ran
docker ps --all

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


# find which image you are currently in
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


# ------------ CHROOT ------------
# chroot is about hiding files outside of the root
# unshare is about hiding processes or capabilities outside the root,
# e.g. ps aux will only show what's inside the root after you unshare

# start the docker container:
docker run -it --name docker-host --rm --privileged ubuntu:bionic

# Connect to an already running docker container:
docker exec -it <container-id> bash

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

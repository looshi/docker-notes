```sh
# Random Shell Stuff

# -------- Change shell prompt on the fly --------
export PS1 = ":)"

#  -------- tldr  --------
# easy way for quick referencing
sudo apt install tldr
tldr ps # will list useful commands for ps


#  -------- ps  ------
# list processes
#  doesn't always use formal "-" flags.

ps # processes of current user
ps -ef
  # e  - all processes
   # f - show process families and group them

ps aux
   # a - all processes
   # u - show  user column
   # x - processes without controlling ttys

ps aux | node # look for for node processes


lsof -i :3333 # find processes at a specific port

#  -------- kill  --------
# Stops processes
# programs respond to different signals differently
# SIGHUP is "hang up", the user’s terminal is disconnected
# e.g., daemons will probably keep running even though they got a "hang up"

kill -9 455872
    # -9 sends SIGKILL to PID 455872
kill -l
    # 1) SIGHUP	 2) SIGINT	 3) SIGQUIT	 4) SIGILL	 5) SIGTRAP
    # 6) SIGABRT	 7) SIGBUS	 8) SIGFPE	 9) SIGKILL	10) SIGUSR1
    # 11) SIGSEGV	12) SIGUSR2	13) SIGPIPE	14) SIGALRM	15) SIGTERM



#  -------- htop  --------
# like ps but better graphics
sudo apt install htop
htop # start htop


#  -------- bg  ------
# run a process in the background
node server.js
CTRL-Z # pauses process and puts in jobs list
jobs # lists jobs
bg 1 # start job #1 in background
fg 1 # bring job #1 to foreground


# -------- tmux --------
sudo apt install tmux
tmux # start tmux
tmux kill-server # stop tmux
CTRL D # exit tmux
```

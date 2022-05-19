```sh
# Random Redis stuff

# inc, dec
SET value 1
INCR value # 2
INCRBY value 4 # 6
DECR value # 5
DECRBY value 4 # 1
GET value # 1

# set multiple
MSET a 1 b 2
MGET a b  # 1 2

EXISTS a # 1
EXISTS z # 0

# delete a key
DEL value # 1
DEL value # 0 since it no longer exists
EXISTS value # 0


# Set if exists
SET dog mutt XX  # nil since it doesn't exist

# Set if doesn't exist
SET dog mutt NX # OK
GET dog # mutt

# Time to live
SET cat 9 EX 6 # Expires in 6 seconds

# lists
RPUSH animals:list "dog" "cat" "bird"
LRANGE animals:list 0 -1
RPOP animals:list # removes last item and returns it
LPOP animals:list # removes first item and returns it
LTRIM RTRIM # remove multiple
LTRIM animals:list 0 2 # removes last 2 items

# hash
HMSET my:dog name "looshi" age "5" sport "frisbee"
HGET my:dog sport # frisbee

# sets
SADD numbers "1" "2" "3"
SISMEMBER numbers 5 # 0  is in set ?
SMEMBERS numbers # 1 2 3
SPOP numbers # returns random value
TYPE numbers # set

# sorted set
ZADD numbers 1 first
ZADD numbers 2 second
ZADD numbers 3 third
ZRANGE numbers 0 -1 # first second third

# LRU - least recently used, evicts items after memory exceeds amount

```

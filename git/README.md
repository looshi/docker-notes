```sh
# git stuff I can never remember...

# diff 2 files
# "no-index" means you don't want to diff from current changes to HEAD
git diff --no-index ./fileA.txt ./fileB.txt

# search for commits containing a specific string
# will look into diffs and commit messages
git log -S string-to-look-for

# see what commits are in one branch but not the other:
git log main..my-branch-name

# see what you're about to push:
git log origin/master..HEAD

# git rebase -i with 2 args, e.g. rebasing from master to patch
# allows you to switch the base branch and interactively remove
# any commits from the master branch that you don't want.
git rebase -i stage your_branch_name

# git rebase --onto 3 args, does the above in one step
# however I've been using the interactive rebase more often, just because
# it's more visual so if you mess up order of args you can see it before commit
git rebase --onto master hash-right-before-the-one-you-want-to-keep-of-your-branch your_branch_name

```

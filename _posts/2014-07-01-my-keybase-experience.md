---
title: My Keybase experience
tags:
  - IWTBF
description: >
    About my experience as a Keybase user.
---

## Me at Keybase

Hi! I am [**fibo** at Keybase][2].

> Keybase will be a public directory of publicly auditable public keys. All paired, for convenience, with unique usernames.

I've just signed up to [Keybase][1] *alpha* last 12th of June thanks to a private invitation. Thank you, Max & Chris!

I like [Keybase][1], 'cause:

* It is a pretty good way to getting started [Pretty Good Privacy][3]
* It is a service accessible to everyone, you don't need to manage your own server.
* It is open source, see [Keybase organization on GitHub][4].
* It has a [Node][5] client, I like it!

## My identity

First of all, I created a [public OpenPGP key][6].
Then I veryfied my identity, there are severall ways. I started with this [gist proof][7].

## Use case

I use [coveralls.io](https://coveralls.io/) to generate test coverage reports,
and I need a secret token to commit results. It is a file named *.coveralls.yml* with a content like

```
repo_token: yCNr4OfqZJtFkWsUmcCuQs2SGkYYzuZsx
```

It is not so confidential, but it is not a good habit to keep private files
in public repos so let's encrypt 'em all!
Note that my previous solution was to add the file to the *.gitignore* list and creating it manually every time.
For instance, double check that in your *.gitignore* file there are the following rows

```
# Test coverage
coverage
.coveralls.yml
```

The good news are that with [keybase][1] you have an easy way to do so.

Here I start from scratch cause I do not have *keybase cli* installed

```
npm install -g keybase
mkdir ~/.gnupg
```

At the time of this writing, it is necessary to create *~/.gnupg* folder manually, see [this issue](https://github.com/keybase/node-client/issues/202) on GitHub.

Start a session

```
keybase login
```

Encrypt *.coveralls.yml* file.  It will create a *.coveralls.yml.asc* encrypted file which can add it to the repo, while the original *.coveralls.yml* is still ignored by *git*.

```
cd /path/to/my/repo
keybase encrypt fibo .coveralls.yml
git add .coveralls.yml.asc
```

To decrypt it, launch

```
keybase decrypt -o .coveralls.yml .coveralls.yml.asc
```

which will prompt for your *passphrase*. At the time of this writing I did not found a way to cache the *passphrase*, anyway this process is shorter and safer than before.
Adding this command somewhere in your repo it is a good idea,
for example, since it is a *Node* package, I added this entry to the *package.json*

```
  "scripts": {
  …
    "decrypt:.coveralls.yml": "keybase decrypt -o .coveralls.yml .coveralls.yml.asc",
  …
  },
```

so I can launch `npm run decrypt:.coveralls.yml` to decrypt my *coveralls* token.
Note that it will ask for the *passphrase*: it would be nice to having it filled
automatically, in a similar way it does an ssh agent. I will look for a solution
maybe in the future, by now it is already a improvement having the encrypted token versioned.

[1]: https://keybase.io/
[2]: https://keybase.io/fibo
[3]: http://en.wikipedia.org/wiki/Pretty_Good_Privacy
[4]: https://github.com/keybase
[5]: http://nodejs.org/
[6]: https://keybase.io/fibo/key.asc
[7]: https://gist.github.com/a5ebb031ad2ee2bdaf00


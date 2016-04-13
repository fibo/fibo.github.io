---
---

## Scenario

Suppose you have an API Gateway, with an nginx reverse proxy and many
micro services behind. You want to use [JSON Web Tokens][JWT] to provide
a secure layer.
The idea is:

> Use nginx to implement the JWT verification in order to do it once and to decouple services from the security layer.

## Installation

Instructions from [nginx-jwt][nginx-jwt]

Install [OpenResty][OpenResty]

```
apt-get install libreadline-dev libncurses5-dev libpcre3-dev \
    libssl-dev perl make build-essential
wget https://openresty.org/download/openresty-1.9.7.4.tar.gz
tar xf openresty-1.9.7.4.tar.gz
cd openresty-1.9.7.4/
./configure
make
sudo make install
```

Install nginx and replace it with openresty

```
sudo apt-get install nginx
sudo mv /usr/sbin/nginx /usr/sbin/nginx.orig
sudo ln -s /usr/local/openresty/nginx/sbin/nginx /usr/sbin/nginx
sudo mv /etc/nginx/ /etc/nginx.orig
sudo mv /usr/local/openresty/nginx/conf/ /usr/local/openresty/nginx/conf.orig
sudo ln -s /etc/nginx/ /usr/local/openresty/nginx/conf
```

This could seem a quick and dirty solution, however [OpenResty][OpenResty] is not
packaged with apt-get at the time of this writing, and it is worth it to
follow the instructions above, so now you can start it as usual

```
sudo service nginx
```

Let's install [nginx-jwt][nginx-jwt], by downloading latest release and
extracting it under */usr/local/nginx-jwt*.

```
wget https://github.com/auth0/nginx-jwt/releases/download/v1.0.1/nginx-jwt.tar.gz
sudo mkdir /usr/local/nginx-jwt
sudo tar xf nginx-jwt.tar.gz -C /usr/local/nginx-jwt
```

## Configuration

If you don't have a JWT token yet, you can generate it with [test/sign](https://github.com/auth0/nginx-jwt/blob/master/test/sign) script

```
$ node test/sign '{"sub": "flynn"}' 'My JWT secret'
Payload: { sub: 'flynn' }
Secret: My JWT secret
Token: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmbHlubiIsImlhdCI6MTQ2MDU1MzIwNH0.jHAr60QWLMjj3AEbXTyswq5KTxVWbcapLZbtOYqoCA4
```

Note that it is a bare wrapper around [jsonwebtoken][jsonwebtoken], so it would
be really easy to generate the token on a node webserver, you just need to share
the secret, for instance, the best way to do so is using an environment variable
with the same value in both systems. Keep in mind that nginx and nodejs or
whatever web server could run on different hosts.

```
export JWT_SECRET="My JWT secret"
```

Set also `JWT_SECRET_IS_BASE64_ENCODED` on nginx server

```
export JWT_SECRET_IS_BASE64_ENCODED=true
```

and edit nginx.conf

```
sudo cat <<EOF > /etc/nginx/nginx.conf
env JWT_SECRET;
env JWT_SECRET_IS_BASE64_ENCODED;

http {

}
EOF
```

[nginx-jwt]: https://github.com/auth0/nginx-jwt
[OpenResty]: http://openresty.org/
[jsonwebtoken]: https://www.npmjs.com/package/jsonwebtoken

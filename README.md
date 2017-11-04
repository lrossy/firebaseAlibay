# Firebase Alibay backend

So far we've only been using firebase-admin from browser javascript using the firebase npm package.

To speed up development, we're going to be using firebase from NodeJS using the firebase-admin npm package.

## Setup instructions

You will need to create a new firebase project

Install the firebase-admin package

```npm install --save firebase-admin```

Generate a new private key (see image below)

Import the admin module with the code provided by firebase (see image below)

Modify the code provided by firebase by specifying the location of your new private key (see image below)

![some text](https://github.com/decodejacques/firebaseAlibay/blob/master/firebase-admin-setup.png)

More details here: https://firebase.google.com/docs/admin/setup

## Giving your code to the front end developers

The front end developers will not be using the firebase-admin package. Instead, they will use the firebase package we've been using thus far.

Don't forget to change the database rules so that the front end developers can write and read to the database.
# Dev Guide

## Setup
Before we can code, let's setup everything first.

**Note** : All steps here can be googled or can be search on youtube.

### Requirements 
1. Create your MongoDb locally or via Cloud (MongoDb Atlas etc..).

[MongoDb Atlas](https://www.mongodb.com/atlas/database)

2. Create an OAuth credential on your Google Console.

[You Can Follow This Documentation](https://developers.google.com/identity/gsi/web/guides/overview)

3. You must have the following installed on your development computer.
- vscode or other IDE
- Git
- nodejs
- npm

### Get Source Code

```sh
git clone https://github.com/Jervx/Polka-NextJs-Version.git
```
[Polka Repo](https://github.com/Jervx/Polka-NextJs-Version.git)


### Install dependencies

open the polka folder via terminal (terminal, CMD, bash, shell).

Execute the following command.

```sh
npm install

```

### Environment Variables

create a file inside polka folder named **.env.local**.

Write the following inside the **.env.local** file. The values must be change depending on your OAuth credentials & your MongoDB URI.

```env
GOOGLE_CLIENT_ID="YOUR GOOGLE OAUTH CLIENT ID HERE"
GOOGLE_CLIENT_SECRET="YOUR GOOGLE OAUTH CLIENT SECRET HERE"
MONGOURI="YOUR MONGODB URI HERE"
NEXTAUTH_URL=http://localhost:3000
JWT_SECRET="YOUR JWT SECRET, YOU CAN USE RANDOM STRING HERE"
```


## Deployment

### Upload the changes to your forked repo of polka in your github account

Fork or create a new repo & push your changes to the repo in your github account.

### Vercel

You can create account on Vercel & connect it to your github account then you can deploy it there & it will automatically compile & deploy every commits.

**NOTE** : Make sure to add thesame environment variables from your **.env.local** to your vercel project settings environment variabls.
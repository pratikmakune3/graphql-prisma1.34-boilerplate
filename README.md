# graphql-prisma1.34-boilerplate

1. Let's install node version> 12, to be precise, 12.14.1. </br>
   <b>Quick tip</b> - Really efficient to install and managing multiple verisons of node using nvm (node version manager)

2.
```ssh
   $ yarn install
```

3. 
```ssh
   $ docker-compose up -d 
```
   Takes a while…
   to pull all the required images from docker hub.
   In Prorail app, pulls, Prisma 1.34 Image and MySQL 5.7 Image 
   - Prisma service runs on port 5566
   - MySQL service runs on 3306
   Make sure these ports are resource free or feel free to change the ports configuration in docker-compose.yml
   - Directions to change ports 
   The most common port used is 3306 if you’re RDMS freak :) make sure to change client port (in above example 3307)
   
   Quick example - 
   docker-compose.yml ->
   
```javascript
    version: '3'
    services:
      prisma_prorail:
        image: prismagraphql/prisma:1.34
        restart: always
        ports:
        - "5566:5566"
        environment:
          PRISMA_CONFIG: |
            port: 5566
            # uncomment the next line and provide the env var PRISMA_MANAGEMENT_API_SECRET=my-secret to activate cluster security
            # managementApiSecret: my-secret
            databases:
              default:
                connector: mysql
                host: db_prorail
                database: default@prorail
                user: root
                password: root
                rawAccess: true
                port: 3306
                migrations: true
      db_prorail:
        image: mysql:5.7
        restart: always
        # Uncomment the next two lines to connect to your your database from outside the Docker environment, e.g. using a database GUI like Workbench
        expose: 
        - "3306"
        ports:
        - "3307:3306" 
        environment:
          MYSQL_USER: root
          MYSQL_ROOT_PASSWORD: root
        volumes:
          - mysql:/var/lib/mysql
    volumes:
      mysql:
```
4. 
```ssh
  $ prisma deploy
```
5. Hit http://localhost:4001. </br>
   That's where your node application runs, It's a refection of schema.graphql
   
6. 
```ssh
  $ npm run dev
```
   
   If all sets up well without any errors, you should see "The Prorail Server is Up and Running!!!" in console.
   
7. You’re all setup to run queries, mutations and test subscriptions

   Let's start by creating user by -

```javascript
   mutation {
     createUser(
       name: "YOUR_NAME"
       email: "youremail@email.com"
       password: "your_password"
     ) {
       id
       name
       email
       password
     }
   }

```

8. Let's fetch all users out there sitting in your database by -

```javascript
   query{
      users{
       id
       name
       email
       password
     }	  
   }

```

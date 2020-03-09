# vai-test

Note:
```
Please note that the db current points to online mongo instance/i would suggest to use your local mongodb to test the implementation
Please make the required change in dao/dao.js for mongodb connection string
```

Steps to run the project:
1. navigate to project directory.
2. run `npm install`
3. run `node app.js`

The server should be running on port 3000.

You should be able to hit the followig endpoint:
```
http://localhost:3000/complexity
http://localhost:3000/complexity?mode=verbose
```

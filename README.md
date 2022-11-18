# keizoku-study

This was created during my time as a student at Code Chrysalis.

This web app was created to help learners track the amount of time they've spent studying specific topics.

### Setup

Fork this repository. 
Both frontend and backend code are contained in this repository.
Instructions assume you will be deploying on [render](https://www.render.com).

#### Database setup:

1. Create a new PostgreSQL database.
2. Once it is finished deploying you will need the ```Internal Database URL``` located in the database's info tab.

#### Backend setup:

1. Create a new Web Service.
2. Set the ```Root Directory``` to ```backend```.
3. Set ```Environment``` to ```Node```.
4. Make sure your Web Service is deployed to the same region as your PostgreSQL database. 
5. Set ```Branch``` to ```Main```.
6. Set ```Build Command``` to ```npm run build```.
7. Set ```Start Command``` to ```npm run start```.
8. Under ```Advanced``` click ```Add Environment Variable```.
9. Create a variable with Key: ```DATABASE_URL``` set to your PostgreSQL ```Internal Database URL``` as mentioned in Database setup step 2.
10. Create a variable with Key: ```NODE_ENV``` set to ```production```.
11. Create a variable with Key: ```TOKEN_KEY```, click ```Generate```, and save.
12. Deploy!
13. Make a note of your backend's full URL ```https://www``` included.

#### Frontend setup:

1. Create a new static site and connect it to your forked repository. 
2. After naming your site, set the root directory to ```backend```.
3. Set ```branch``` to ```main```.
4. Set ```Build Command``` to ```npm run build```.
5. Under ```Advanced``` click ```Add Environment Variable```.
6. Create a variable with Key: ```REACT_APP_API_URL``` set to your backend's full URL as mentioned in Backend setup step 12.
7. Deploy!

https://raeki-solo-mvp.onrender.com/

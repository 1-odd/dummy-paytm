## Simple Paytm App

This project contains a simple Paytm application

It has the following features:

  

- User authorization system (JWT)
- user can signup / signin

- user's bank account will created automatically with random amount of money while signup 

- user can see all other user at dashboard 
- user can search other user by first name or last name of the target user
- user can send some amount from its own account to target user account

  

**Follow these instruction to run application**

- create **.env** file in the backend folder and add these 2 things

- PORT = 3001

- DB_URL = your MongoDB connection String till .net only
- JWT_PASS = any number or word without space

- run this command inside backend folder in your terminal

		npm i

		npm start

  

- now your backend is ready move to frontend folder

- run these command in Frontend folder

  

		npm i

		npm run dev

  

- Now your application is in working mode .

- if you face any issue read it out again or can contact with me.

  
  

**Tech-stack we used :**

1. Backend:

- Node , Express , MongoDB , zod ( for payload validation ) etc.

2. Frontend:

- React only

  

**Improvements**

  

- Can do lots of improvements

- Can add update user component in frontend , in backend API already written

- Can add a delete user  logic for frontend and backend as well
- Can do state management using redux or recoil for better performance 
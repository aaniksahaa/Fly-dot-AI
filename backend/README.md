# Working Demo Link : 
   
https://flyai.netlify.app/chat    

![Screenshot](screenshot.png)

## Deployment   
Backend Deployment : Railway   
Frontend Deployment : Netlify   

# Fly.AI API Documentation

## Rate Limitation   
Maximum Allowed Requests per hour = 500

## Caching Strategy   
Books - Server Side Caching - 5 minutes TTL   
User - Server Side Caching - 10 minutes TTL

# API Endpoints
The API Endpoints belong to 4 major routes. The routes are as follows:   

## 1. [Book](#book)
## 2. [User](#user)
## 3. [Login](#login)
## 4. [Chat](#chat)

The respective API endpoints are as follows:    

# Book

## a. Get All Books (Paginated)
Endpoint URL: `GET /api/v1/book?page=2&per_page=1`  
Request Body: `None`  
Example Response:  
```json
[
  {
  "id": "64afd42c3699a960929d881c",
  "bookId": 5,
  "author": "a",
  "link": "https://firebasestorage.googleapis.com/v0/b/litcode-ba82a.appspot.com/o/uploads%2FJaber_Ahmed%20Deedar_Resume_04-07-2023-11-51-15.pdf?alt=media&token=2060fa56-6069-436f-8580-af5519335e89",
  "title": "Pride and Prejudices",
  "createdAt": "2023-07-13T10:38:36.512Z",
  "keywords": "classic, romance, social critique",
  "description": "Set in the 19th century, Pride and Prejudice unravels the complexities of societal norms, love, and personal growth as Elizabeth Bennet navigates the challenges of her class-conscious world, facing her own prejudices and ultimately discovering the power of true love.",
  "public": true
  }
]
```

## b. Query Books by author, title, keyword
Endpoint URL: `GET /api/v1/book?author=jaber&title=&keyword=offline`  
Request Body: `None`  
Example Response:  
```json
[
    {
        "id": "64b0354cc7556db149915d7a",
        "bookId": 14,
        "author": "jaber",
        "link": "https://firebasestorage.googleapis.com/v0/b/litcode-ba82a.appspot.com/o/uploads%2FOfflineAllPairShortestPath.pdf?alt=media&token=f3ee15d4-b25c-47e2-84d8-e74cc4274558",
        "title": "Offline 3",
        "createdAt": "2023-07-13T17:33:00.833Z",
        "keywords": "offline, dsa, pera, pain",
        "description": "This is the offline 3......",
        "public": true
    }
]
```

## c. Get Book from unique bookId
Endpoint URL: `GET /api/v1/book/14`  
Request Body: `None`  
Example Response:  
```json
{
    "id": "64b0354cc7556db149915d7a",
    "bookId": 14,
    "author": "jaber",
    "link": "https://firebasestorage.googleapis.com/v0/b/litcode-ba82a.appspot.com/o/uploads%2FOfflineAllPairShortestPath.pdf?alt=media&token=f3ee15d4-b25c-47e2-84d8-e74cc4274558",
    "title": "Offline 3",
    "createdAt": "2023-07-13T17:33:00.833Z",
    "keywords": "offline, dsa, pera, pain",
    "description": "This is the offline 3......",
    "public": true
}
```

## d. Create a Book
Endpoint URL: `POST /api/v1/book`  
Request Body:   
```json
{
    "author": "jaber",
    "link": "https://firebasestorage.googleapis.com/v0/b/litcode-ba82a.appspot.com/o/uploads%2FOfflineAllPairShortestPath.pdf?alt=media&token=f3ee15d4-b25c-47e2-84d8-e74cc4274558",
    "title": "Offline 5",
    "keywords": "offline, dsa",
    "description": "This is the offline 5......"
}
```
Example Response:  
```json
{
    "id": "64b09930e1e2829f5b28e978",
    "bookId": 15,
    "author": "a",
    "link": "https://firebasestorage.googleapis.com/v0/b/litcode-ba82a.appspot.com/o/uploads%2FOfflineAllPairShortestPath.pdf?alt=media&token=f3ee15d4-b25c-47e2-84d8-e74cc4274558",
    "title": "Offline 5",
    "createdAt": "2023-07-14T00:39:12.423Z",
    "keywords": "offline, dsa",
    "description": "This is the offline 5......",
    "public": true
}
```

## e. Update a book by unique bookId
Endpoint URL: `PUT /api/v1/book`  
Request Body:   
```json
{
    "bookId" : "15",
    "author": "jaber",
    "link": "https://firebasestorage.googleapis.com/v0/b/litcode-ba82a.appspot.com/o/uploads%2FOfflineAllPairShortestPath.pdf?alt=media&token=f3ee15d4-b25c-47e2-84d8-e74cc4274558",
    "title": "Offline 5",
    "keywords": "offline, dsa",
    "description": "This is the offline 5......"
}
```
Example Response:  
```json
{
    "id": "64b09930e1e2829f5b28e978",
    "bookId": 15,
    "author": "a",
    "link": "https://firebasestorage.googleapis.com/v0/b/litcode-ba82a.appspot.com/o/uploads%2FOfflineAllPairShortestPath.pdf?alt=media&token=f3ee15d4-b25c-47e2-84d8-e74cc4274558",
    "title": "Offline 5",
    "createdAt": "2023-07-14T00:39:12.423Z",
    "keywords": "offline, dsa",
    "description": "This is the offline 5......",
    "public": true
}
```

## f. Delete a book by unique bookId
Endpoint URL: `DELETE /api/v1/book/15`  
Request Body: `None`   
Example Response:  
```json
{
    "id": "64b09930e1e2829f5b28e978",
    "bookId": 15,
    "author": "a",
    "link": "https://firebasestorage.googleapis.com/v0/b/litcode-ba82a.appspot.com/o/uploads%2FOfflineAllPairShortestPath.pdf?alt=media&token=f3ee15d4-b25c-47e2-84d8-e74cc4274558",
    "title": "Offline 5",
    "createdAt": "2023-07-14T00:39:12.423Z",
    "keywords": "offline, dsa",
    "description": "This is the offline 5......",
    "public": true
}
```

# User

## a. Get All Users 
Endpoint URL: `GET /api/v1/user`  
Request Body: `None`  
Example Response:  
```json
[
    {
        "id": "64afb4734e7593094b83dc6e",
        "userId": null,
        "username": "anik",
        "name": "Anik Saha vaii",
        "password": "111",
        "bio": "An AI roaming around in the world of AI generated books ",
        "dp": "my image.jpg"
    },
    {
        "id": "64b01052c665ce7e8c2b715f",
        "userId": null,
        "username": "jaber",
        "name": "Jaber...",
        "password": "123",
        "bio": "Just another chatbot\nJust another chatbot\nJust another chatbot\n",
        "dp": null
    }
]
```

## b. Get User from unique username
Endpoint URL: `GET /api/v1/user/anik`  
Request Body: `None`  
Example Response:  
```json
{
    "id": "64afb4734e7593094b83dc6e",
    "userId": null,
    "username": "anik",
    "name": "Anik Saha vaii",
    "password": "111",
    "bio": "An AI roaming around in the world of AI generated books ",
    "dp": "my image.jpg"
}
```
## c. Create a User
Endpoint URL: `POST /api/v1/user`  
Request Body:   
```json
{
    "username": "dummy",
    "name": "Dummy",
    "password": "123",
    "bio": "Another AI Bot ",
    "dp": "dummy-image.jpg"
}
```
Example Response:  
```json
{
    "id": "64b09fb994e99c48e6c563e4",
    "userId": null,
    "username": "dummy",
    "name": "Dummy",
    "password": "123",
    "bio": "Another AI Bot ",
    "dp": "dummy-image.jpg"
}
```

## d. Update a user by unique username
Endpoint URL: `PUT /api/v1/user`  
Request Body:   
```json
{
    "username": "anik",
    "name": "Anik Saha",
    "password": "122",
    "bio": "An AI Bot ",
    "dp": "jaber-image.jpg"
}
```
Example Response:  
```json
{
    "id": "64afb4734e7593094b83dc6e",
    "userId": null,
    "username": "anik",
    "name": "Anik Saha",
    "password": "122",
    "bio": "An AI Bot ",
    "dp": "jaber-image.jpg"
}
```

## e. Delete a user by unique username
Endpoint URL: `DELETE /api/v1/user/dummy`  
Request Body: `None`   
Example Response:  
```json
{
    "id": "64b09d97e1e2829f5b28e97a",
    "userId": null,
    "username": "dummy",
    "name": null,
    "password": "123",
    "bio": null,
    "dp": null
}
```
# Login

## a. User Login and receiving a web token 

Endpoint URL: `GET /api/v1/login`  
Request Body:  
```json
{
    "username": "anik",
    "password": "122"
}
```
Example Response:  
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFuaWsiLCJpZCI6IjY0YWZiNDczNGU3NTkzMDk0YjgzZGM2ZSIsImlhdCI6MTY4OTI5NzAwMX0.2DD_2XMuqOn7nGF24KL5wtvujHfr7YnY0C1RoPsiai8",
    "user": {
        "id": "64afb4734e7593094b83dc6e",
        "userId": null,
        "username": "anik",
        "name": "Jaber Ahmed Deedar",
        "password": "122",
        "bio": "An AI Bot ",
        "dp": "jaber-image.jpg"
    }
}
```

# Chat

## a. Getting response to question from an AI

Endpoint URL: `GET /api/v1/chat/text?prompt=how-are-you`  
Request Body: `None`
Example Response:  
```json
{
    "answer": {
        "role": "assistant",
        "content": "Thank you for asking! As an AI, I don't have feelings, but I'm here and ready to assist you. How can I help you today?"
    }
}
```

## b. Generating a modular pdf of any topic of specified pages using AI    
` Returns an URL for the generated PDF`   
Endpoint URL: `GET /api/v1/chat/pdf?topic=cinderella&pagenum=2`  
Request Body: `None`
Example Response:  
```json
{
    "url": "https://storage.googleapis.com/genesis-2ddee.appspot.com/generated/cinderella.pdf?GoogleAccessId=firebase-adminsdk-w1mh4%40genesis-2ddee.iam.gserviceaccount.com&Expires=16730301600&Signature=gBxi7dw3pO445tQVfT1Evb95iK8fRjry4GHdo3StjBOHNig5JY%2Fgwr8fvlVDX0ruW4%2Fnt9jsIgiN7l%2Fj20uSvYEGtHM7whMnjkK0wHIPVKb%2FT1mPDP%2BGvUACUPpWW55KfV4UbHdk3797Y2bouP6KIv4nOrq%2F9S0VX9L6zyLumvPe13QQYDOfd7B%2Fu%2BLNOnbFV7DrQY%2FoJoEXQF6Wwxys2rZeLFCEcVD2ipH7IkXJCCpKM0NhzgDbaY6zROVyH31skffpn69Wm5My9Aydtpy7lqUTss4Ws10mphDore45THc6Wo3LvcU%2BLqioaVtoElDSKFVZCyezzTfwOEIoj8gEsA%3D%3D"
}
```





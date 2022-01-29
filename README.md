# secret-santa
1. Clone repository from https://github.com/CherniyIrtish/secret-santa.
2. Go to root folder.
3. Run `npm i`.
4. Run `npm run start`
5. Swagger you can find `http://localhost:3000/api-docs`
---
--> GET 127.0.0.1:3000/api/v1/participants?id={?} - get gifted participant by id.<br/>
--> POST 127.0.0.1:3000/api/v1/participants - register new participant.
// body {firstName: string, lastName: string, wishes: string[]} in JSON format. <br/>
--> POST 127.0.0.1:3000/api/v1/shuffle - shuffle participants. 

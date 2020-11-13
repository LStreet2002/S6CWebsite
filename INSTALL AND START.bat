node app.js
if errorlevel 1 (
   cls
   npm install express firebase-admin && node app.js
   node app.js
) 


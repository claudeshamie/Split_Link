const express = require('express');
const app = express();

const authRouter = require('./routes/authRouter'); // Replace with the actual path

app.use('/auth', authRouter); // Mount the auth router at /auth

// Other routes and configurations...

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

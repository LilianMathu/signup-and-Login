const express = require('express');
const app = require('./api/app');
const port = process.env.PORT || 3000;

const app = express();

app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
});
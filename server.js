const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the 'client/build' directory
app.use(express.static(path.join(__dirname, 'client', 'build')));

// Define your API routes
const budgetData = {
  myBudget: [
    {
      title: 'Eat out',
      budget: 25
    },
    {
      title: 'Rent',
      budget: 275
    },
    {
      title: 'Grocery',
      budget: 110
    },
  ]
};

app.get('/api/budget', (req, res) => {
  res.json(budgetData);
});

// Serve the React app for any other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

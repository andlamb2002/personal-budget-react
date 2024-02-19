const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

const budget = {
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
  res.json(budget);
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});


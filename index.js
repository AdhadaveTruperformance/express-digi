
import 'dotenv/config'
import express from 'express';
const app = express();
const port = process.env.port || 3000;

app.use(express.json());

let teaData = [];
let nextId = 1;

// Add New Tea
app.post('/teas', (req, res) => {
  const { name, price } = req.body;
  const newTea = { id: nextId++, name, price };
  teaData.push(newTea);
  res.status(201).send(newTea);
});

// Get All Teas
app.get('/teas', (req, res) => {
  res.status(200).send(teaData);
});

// Get Tea by ID
app.get('/teas/:id', (req, res) => {
  const tea = teaData.find(t => t.id === parseInt(req.params.id)); // Correcting usage of 'id' here
  if (!tea) {
    return res.status(404).send("Tea Not found");
  }
  res.status(200).send(tea);
});

// Update Tea by ID
app.put('/teas/:id', (req, res) => {
  const tea = teaData.find(t => t.id === parseInt(req.params.id)); // Corrected this line
  if (!tea) {
    return res.status(404).send("Tea Not found");
  }

  const { name, price } = req.body;
  tea.name = name;
  tea.price = price;
  res.status(200).send(tea);
});

// Delete Tea by ID
app.delete('/teas/:id', (req, res) => {
  const index = teaData.findIndex(t => t.id === parseInt(req.params.id)); // Corrected this line
  if (index === -1) {
    return res.status(404).send('Tea not found');
  }
  
  teaData.splice(index, 1);
  return res.status(200).send('Tea Deleted successfully');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

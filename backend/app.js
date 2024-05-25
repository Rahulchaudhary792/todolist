const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const port = 3000;
const formDataStore = [];
app.post('/tasks', (req, res) => {
	const { id, title, description, status, dueDate } = req.body;
	formDataStore.push({ id, title, description, status, dueDate });
	console.log(req.body);
	res.status(200).json({ message: 'Task successfully added'});
});
app.get('/tasks', (req, res) => {
    res.status(200).json(formDataStore);
});
app.delete('/tasks/:id', (req, res) => {
    const id = req.params;
	const index = formDataStore.findIndex(item => item.id === id); 
	formDataStore.splice(index, 1);
    res.status(200).json({ message: 'Item deleted successfully' });
});
app.get('/tasks/:id', (req, res) => {
	const { id } = req.params;
	const item = formDataStore.find(item => item.id === id);
	res.status(200).json(item);
})
app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
	const item = formDataStore.find(item => item.id === id);
	item.title = req.body.title;
	item.description = req.body.description;
	item.status = req.body.status;
	item.dueDate = req.body.dueDate;
	res.status(200).send({ message: 'Task updated successfully' });
});
app.listen(port, () => {
	console.log("Server Running");
});
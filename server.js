const express = require('express');
const path = require('path');
const app = express();

// Servez les fichiers statiques générés par le build de Angular
app.use(express.static('./dist/assignment-app'));

// Redirigez toutes les requêtes vers le fichier index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/assignment-app', 'index.html'));
});

// Définissez le port sur celui spécifié par l'environnement, sinon 8080
const PORT = process.env.PORT || 8046;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

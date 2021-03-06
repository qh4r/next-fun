const express = require('express');
const next = require('next');
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_DEV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get('/blog', (req, res) => app.render(req, res, '/'));
  server.get('/blog/:id', (req, res) => app.render(req, res, '/post', {id: req.param.id, ...req.query}));
  server.get('/post', (req, res) => {
    if(req.query.id) {
      return res.redirect(301, `/blog/${req.query.id}`);
    }
    return res.redirect(301, '/blog');
  });
  server.get('/', (req, res) => res.redirect(301, '/blog'));
  server.get('/*', handle);

  server.listen(port, err => {
    if(err) {
      throw err;
    }
    console.log('listening')
  })
});

// #to preview with now
// npm run build
// now --dotenv
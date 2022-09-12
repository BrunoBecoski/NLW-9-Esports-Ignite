import express from 'express'

const api = express()

api.get('/ads', (request, response) => {
  return response.send(
    [
      { id: '1', name: 'Anúncio 1' },
      { id: '2', name: 'Anúncio 2' },
      { id: '3', name: 'Anúncio 3' }
    ]
  );
})

api.listen(3333)
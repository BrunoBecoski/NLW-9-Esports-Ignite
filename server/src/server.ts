import express from 'express'

const api = express()

api.get('/ads', (request, response) => {
  return response.send(
    [
      { id: '1', name: 'Anúncio 1' },
      { id: '2', name: 'Anúncio 2' },
      { id: '3', name: 'Anúncio 3' },
      { id: '4', name: 'Anúncio 4' },
      { id: '5', name: 'Anúncio 5' },
    ]
  );
})

api.listen(3333)
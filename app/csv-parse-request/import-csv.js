// primeiro precisamos carregar o arquivo em uma readable stream
// isso irá permitir passar essa stream de leitura para uma stream de escrita
// a stream de escrita é o parse-csv que irá converter as linhas csv em objetos json
// podemos iterar sobre cada chunk desse parse já que ele é um writable stream
// em cada iteração será possível fazer um requisição chamando a rota de criação de task

import { parse } from 'csv-parse'
import { createReadStream } from 'node:fs'

const csvPath = new URL('../../import.csv', import.meta.url)
const apiUrl = 'http://localhost:3333/tasks'

const readableStreamCSV = createReadStream(csvPath)

async function importCSVToAPI() {
  const lines = []

  const writableStreamParse = readableStreamCSV.pipe(
    parse({ delimiter: ',', columns: true }),
  )

  for await (const line of writableStreamParse) {
    const { title, description } = line

    await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description }),
    })
  }

  return lines
}

importCSVToAPI()

// falta tratar erros

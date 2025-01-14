import { parse } from 'csv-parse'
import { createReadStream } from 'node:fs'

const csvPath = new URL('../../import.csv', import.meta.url)
const apiUrl = 'http://localhost:3333/tasks'

const readableStreamCSV = createReadStream(csvPath)

async function importCSVToAPI() {
  let sucessCounter = 0
  let errorCounter = 0

  const writableStreamParse = readableStreamCSV.pipe(
    parse({ delimiter: ',', columns: true }),
  )

  for await (const line of writableStreamParse) {
    const { title, description } = line
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      })

      if (response.status === 201) {
        sucessCounter++
        process.stdout.write(
          `\r ✅ Sucessos: ${sucessCounter} | ❌ Erros: ${errorCounter}`,
        )
      } else {
        errorCounter++
        process.stdout.write(
          `\r ✅ Sucessos: ${sucessCounter} | ❌ Erros: ${errorCounter}`,
        )
      }
    } catch (error) {
      errorCounter++
      process.stdout.write(
        `\r ✅ Sucessos: ${sucessCounter} | ❌ Erros: ${errorCounter}`,
      )
    }
  }

  console.log(
    `\n\nTotal: ${sucessCounter + errorCounter}, Sucessos: ${sucessCounter}, Erros: ${errorCounter}`,
  )
}

importCSVToAPI()

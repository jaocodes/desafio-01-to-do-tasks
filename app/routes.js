import { Database } from './local-database.js'
import { randomUUID } from 'node:crypto'
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const tasks = database.select('tasks')

      return res.writeHead(200).end(JSON.stringify(tasks))
    },
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { title, description } = req.body || {}
      const now = new Date()

      if (!title || !description) {
        return res.writeHead(400).end(
          JSON.stringify({
            message: 'Validation error',
            fieldsRequired: {
              title: 'required, must be a string',
              description: 'required, must be a string',
            },
          }),
        )
      }

      const newTask = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: now,
        updated_at: now,
      }

      database.insert('tasks', newTask)

      return res.writeHead(201).end(JSON.stringify(newTask))
    },
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params
      const { title, description } = req.body || {}
      const now = new Date()

      const [task] = database.select('tasks', { id })

      if (!task) {
        return res.writeHead(404).end()
      }

      if (!title && !description) {
        return res.writeHead(400).end(
          JSON.stringify({
            message:
              'Validation error, at least one is required, title or description',
          }),
        )
      }

      database.update('tasks', id, {
        title: title ?? task.title,
        description: description ?? task.description,
        updated_at: now,
      })

      return res.writeHead(204).end()
    },
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params
      const [task] = database.select('tasks', { id })

      if (!task) return res.writeHead(404).end()

      database.delete('tasks', id)
      return res.writeHead(204).end()
    },
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (req, res) => {
      const { id } = req.params
      const [task] = database.select('tasks', { id })

      if (!task) return res.writeHead(404).end()

      const completed_at = task.completed_at !== null ? null : new Date()

      database.update('tasks', id, { completed_at })

      return res.writeHead(204).end()
    },
  },
]

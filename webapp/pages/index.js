import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
/** Material UI Components */
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import List from '@material-ui/core/List'
/** Custom Components */
import todoAPI from '../api/todo'
import externalTodosApi from '../api/server'
import TodoComponent from '../components/Todo/Todo'

/**
 * Main Index Page to render on homepage
 */
function IndexPage() {
  const [todos, setTodos] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [externalTodos, setExternalTodos] = useState([])
  // Fetch todos from API
  const fetchData = async () => {
    setIsLoading(true)
    const result = await todoAPI()
    setTodos(result)
    setIsLoading(false)
  }
  // Fetch todos from Server
  const fetchServiceData = async () => {
    setIsLoading(true)
    const result = await externalTodosApi()
    setExternalTodos(result.data.data)
    setIsLoading(false)
  }
  return (
    <React.Fragment>
      <Head>
        <title>Create Next App</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid container>
        <Grid item xs={6}>
          <Typography variant="h1" component="h1" gutterBottom>
            Hello
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h1" component="h1" gutterBottom>
            World
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" color="primary" onClick={() => fetchData()}>
            Fetch Data
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" color="primary" onClick={() => fetchServiceData()}>
            Fetch Service Data
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <List>
            {isLoading ? <CircularProgress />
              : <TodoComponent
                todos={todos}
                // deleteTodo={(id) => setTodos(todos.filter((itm) => itm.id !== id))}
              />
            }
            {isLoading ? <CircularProgress />
              : <TodoComponent
                todos={externalTodos}
                // deleteTodo={(id) => setTodos(todos.filter((itm) => itm.id !== id))}
              />
            }
          </List>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

/**
 * propTypes
 * @property {function} todoAPI - API to retrieve Todos.
 */
IndexPage.propTypes = {
  todoAPI: PropTypes.func,
}

export default IndexPage

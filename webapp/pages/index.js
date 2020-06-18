import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
/** Material UI Components */
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import List from '@material-ui/core/List'
/** Custom Components */
import todoAPI from '../api/todo'
import externalTodosApi from '../api/server'
import TodoComponent from '../components/Todo/Todo'
import ActionCard from '../components/ActionCard/ActionCard'

/**
 * Main Index Page to render on homepage
 */
function IndexPage() {
  const [todos, setTodos] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingExt, setIsLoadingExt] = useState(false)
  const [externalTodos, setExternalTodos] = useState([])
  // Fetch todos from API
  const fetchData = async () => {
    setIsLoadingExt(true)
    const result = await todoAPI()
    setTodos(result)
    setIsLoadingExt(false)
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
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Reference App
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container spacing={8}>
        <Grid item xs={6}>
          <ActionCard
            heading="External API Call"
            title="Fetch Todos"
            secondary="/todos"
            description="The following function makes a call to an external service"
            fetchData={fetchData}
          />
        </Grid>
        <Grid item xs={6}>
          <ActionCard
            heading="Interal API Call"
            title="Fetch Todos"
            secondary="/api/todos"
            description="The following function makes a call to an external service"
            fetchData={fetchServiceData}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <List>
            {isLoadingExt ? <CircularProgress />
              : <TodoComponent
                todos={todos}
                deleteTodo={(id) => setTodos(todos.filter((itm) => itm.id !== id))}
              />
            }
            {isLoading ? <CircularProgress />
              : <TodoComponent
                todos={externalTodos}
                deleteTodo={(id) => setTodos(todos.filter((itm) => itm.id !== id))}
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

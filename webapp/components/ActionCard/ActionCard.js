import React from 'react'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

/**
 * ActionCard
 * Renders cards
 * @param {object} props
 * @param {func} classes
 */
const ActionCard = (props) => (
  <Card style={{ margin: 20 }}>
    <CardContent>
      <Typography color="textSecondary" gutterBottom>
        {props.heading}
      </Typography>
      <Typography variant="h5" component="h2">
        {props.title}
      </Typography>
      <Typography color="textSecondary">
        {props.secondary}
      </Typography>
      <Typography variant="body2" component="p">
        {props.description}
      </Typography>
    </CardContent>
    <CardActions>
      <Button
        size="small"
        variant="contained"
        color="secondary"
        onClick={() => props.fetchData()}
      >
        Fetch Todos
      </Button>
    </CardActions>
  </Card>
)

/**
 * propTypes
 * @property {string} heading - Heading string
 * @property {string} title - Heading string
 * @property {string} secondary - Heading string
 * @property {string} description - Heading string
 * @property {function} fetchData - Function to fetch todos
 */
ActionCard.propTypes = {
  heading: PropTypes.string,
  title: PropTypes.string,
  secondary: PropTypes.string,
  description: PropTypes.string,
  fetchData: PropTypes.func,
}

export default ActionCard

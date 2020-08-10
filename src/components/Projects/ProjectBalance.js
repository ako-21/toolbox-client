import React from 'react'
import { Redirect, withRouter } from 'react-router-dom'

class ProjectBalance extends React.Component {
  state = {
    selected: false,
    id: null
  }
  render () {
    if (this.state.selected === true) {
      return <Redirect to={{ pathname: '/projects/' + this.state.id, state: { updated: this.props.updated }, props: { msgAlert: this.props.msgAlert } }}/>
    }
    return (
      <p
        className={ this.props.valueSpent / this.props.valueBudget >= 0.8 ? 'white' : 'regular'}
        onClick={ event => {
          this.setState({
            selected: true,
            id: this.props.id
          })
        }}>
        $ {this.props.valueBudget - this.props.valueSpent}
      </p>
    )
  }
}
// <span className={ project.spent / project.budget >= 0.8 ? 'white' : 'regular'}>$ {project.budget - project.spent}</span>
export default withRouter(ProjectBalance)

import React from 'react'
import { Redirect, withRouter } from 'react-router-dom'

class Project extends React.Component {
  state = {
    selected: false,
    id: null
  }
  render () {
    if (this.state.selected === true) {
      return <Redirect to={'/projects/' + this.state.id} />
    }
    return (
      <p onClick={ event => {
        this.setState({
          selected: true,
          id: this.props.id
        })
      }}>
        {this.props.value}
      </p>
    )
  }
}

export default withRouter(Project)

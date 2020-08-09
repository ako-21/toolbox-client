import React from 'react'
import { Redirect, withRouter } from 'react-router-dom'

class Project extends React.Component {
  state = {
    selected: false,
    id: null
  }
  render () {
    if (this.state.selected === true) {
      return <Redirect to={{ pathname: '/projects/' + this.state.id, state: { updated: this.props.updated }, props: { getRequest: this.props.getRequest } }}/>
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

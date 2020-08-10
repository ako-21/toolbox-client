import React from 'react'
import { Redirect, withRouter } from 'react-router-dom'

class ProjectDate extends React.Component {
  state = {
    selected: false,
    id: null
  }
  render () {
    if (this.state.selected === true) {
      return <Redirect to={{ pathname: '/projects/' + this.state.id, state: { updated: this.props.updated }, props: { msgAlert: this.props.msgAlert } }}/>
    }
    return (
      <p onClick={ event => {
        this.setState({
          selected: true,
          id: this.props.id
        })
      }}>
        {this.props.projectDate.substring(0, this.props.projectDate.indexOf('T'))}
      </p>
    )
  }
}

export default withRouter(ProjectDate)

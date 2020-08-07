import React from 'react'
import axios from 'axios'
import apiUrl from './../../apiConfig'
import { Redirect, withRouter } from 'react-router-dom'

class ProjectDetail extends React.Component {
  state = {
    project: null,
    deleted: false
  }
  componentDidMount () {
    console.log(this.props)
    return axios({
      url: `${apiUrl}/projects/${this.props.match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      }
    })
      .then(response => {
        this.setState({
          project: response.data.project
        })
      })
      .catch(error => console.log(error))
  }
  render () {
    if (this.state.deleted === true) {
      return <Redirect to='/projects' />
    }
    let jsx
    if (this.state.project === null) {
      jsx = <p>...Loading...</p>
    } else {
      jsx = (
        <div>
          {this.state.project.name}
          {this.state.project.description}
          {this.state.project.budget}
          {this.state.project.spent}
        </div>
      )
    }
    return (
      <div>
        {jsx}
      </div>
    )
  }
}
export default withRouter(ProjectDetail)

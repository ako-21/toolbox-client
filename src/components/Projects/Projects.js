import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from './../../apiConfig'

class Projects extends React.Component {
    state = {
      projects: null
    }
    componentDidMount () {
      console.log('at componentDidMount')
      return axios({
        url: `${apiUrl}/projects`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.props.user.token}`
        }
      })
        .then(response => {
          // handle success
          this.setState({
            projects: response.data.projects
          })
        })
        .catch(error => {
          // handle error
          console.log(error)
        })
    }
    render () {
      let jsx
      if (this.state.projects === null) {
        jsx = <p> Loading... </p>
      } else if (this.state.projects.length === 0) {
        jsx = <p> no Projects, add a Project! </p>
      } else {
        jsx = (
          <ul>
            {this.state.projects.map(project => {
              return (
                <li key={project._id}>
                  <Link to={`/projects/${project._id}`}>{project.name}</Link>
                </li>
              )
            })}
          </ul>
        )
      }
      return (
        <div>
          {jsx}
        </div>
      )
    }
}

export default Projects

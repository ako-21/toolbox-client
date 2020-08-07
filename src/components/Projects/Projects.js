import React from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from './../../apiConfig'
import Table from 'react-bootstrap/Table'
import Project from './Project'

class Projects extends React.Component {
    state = {
      projects: null
    }
    componentDidMount () {
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
        jsx =
          <React.Fragment>
            <br />
            <div className="bg-fourth mt-5 font heading">
              Your DIY Projects
            </div>
            <Table striped bordered hover variant="light">
              <thead>
                <tr className="font tbl text-fourth">
                  <th>Name</th>
                  <th>Budget</th>
                  <th>Spent</th>
                </tr>
              </thead>
              <tbody className="font tbl">
                {this.state.projects.reverse().map(project => (
                  <tr key={project._id} id={project._id}>
                    <td>
                      <Project id={project._id} value={project.name}
                      />
                    </td>
                    <td>
                      <Project id={project._id} value={project.budget}
                      />
                    </td>
                    <td>
                      <Project id={project._id} value={project.spent}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <button className="bg-secondary font add round">
               +
            </button>
          </React.Fragment>
      }
      return (
        <div>
          {jsx}
        </div>
      )
    }
}

export default withRouter(Projects)

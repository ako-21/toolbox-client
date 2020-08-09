import React from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from './../../apiConfig'
import Table from 'react-bootstrap/Table'
import Project from './Project'
import Create from './Create'
import Modal from 'react-bootstrap/Modal'

class Projects extends React.Component {
    state = {
      projects: null,
      show: false
    }
    getRequest = () => {
      axios({
        url: apiUrl + '/projects',
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.props.user.token}`
        }
      })
        .then(response => {
          this.setState({
            projects: response.data.projects
          })
        })
    }
    closeModal = () => {
      this.setState({
        show: false,
        updated: false
      })
    }

    componentDidMount () {
      axios({
        url: `${apiUrl}/projects`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.props.user.token}`
        }
      })
        .then(response => {
          this.setState({
            projects: response.data.projects
          })
        })
        .then(() => this.getRequest())
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
        jsx =
        <React.Fragment>
          <br />
          <div className="mt-10">
            <button className="bg-secondary font add round" onClick={() => {
              this.setState({
                show: true
              })
            }}>
               +
            </button>
            <Modal show={this.state.show}
              aria-labelledby="contained-modal-title-vcenter"
              centered >
              <Modal.Header className="d-flex justify-content-center">
                <Modal.Title>Create a Project</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Create getRequest={this.getRequest} user={this.props.user} projects={this.state.projects} closeModal={this.closeModal}>
                </Create>
              </Modal.Body>
              <Modal.Footer>
              </Modal.Footer>
            </Modal>
          </div>
        </React.Fragment>
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
                      <Project updated={this.state.updated} getRequest={this.getRequest} id={project._id} value={project.name}
                      />
                    </td>
                    <td>
                      <Project updated={this.state.update} getRequest={this.getRequest} id={project._id} value={project.budget}
                      />
                    </td>
                    <td>
                      <Project updated={this.state.updated} getRequest={this.getRequest} id={project._id} value={project.spent}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <button className="bg-secondary font add round" onClick={() => {
              this.setState({
                show: true
              })
            }}>
               +
            </button>
            <Modal show={this.state.show}
              aria-labelledby="contained-modal-title-vcenter"
              centered >
              <Modal.Header className="d-flex justify-content-center">
                <Modal.Title>Create a Project</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Create getRequest={this.getRequest} user={this.props.user} projects={this.state.projects} closeModal={this.closeModal}>
                </Create>
              </Modal.Body>
              <Modal.Footer>
              </Modal.Footer>
            </Modal>
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

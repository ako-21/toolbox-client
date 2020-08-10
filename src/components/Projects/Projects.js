// readMe and documentation
// deploy

import React from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from './../../apiConfig'
import Table from 'react-bootstrap/Table'
import Project from './Project'
import ProjectName from './ProjectName'
import ProjectBalance from './ProjectBalance'
import ProjectDate from './ProjectDate'
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
          <div className="bg-fourth mt-5 font heading round mb-5">
            Add Some Projects!
          </div>
          <br />
          <br />
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
                <Create getRequest={this.getRequest} msgAlert={this.props.msgAlert} user={this.props.user} projects={this.state.projects} closeModal={this.closeModal}>
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
                  <th>Created On</th>
                  <th>Name</th>
                  <th>Budget</th>
                  <th>Spent</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody className="font tbl">
                {this.state.projects.map(project => (
                  <tr key={project._id} id={project._id}>
                    <td>
                      <ProjectDate msgAlert={this.props.msgAlert} projectDate={project.createdAt} id={project._id} />
                    </td>
                    <td>
                      <ProjectName updated={this.state.updated} msgAlert={this.props.msgAlert} getRequest={this.getRequest} id={project._id} value={project.name}
                      />
                    </td>
                    <td>
                      <Project updated={this.state.update} msgAlert={this.props.msgAlert} getRequest={this.getRequest} id={project._id} value={project.budget}
                      />
                    </td>
                    <td>
                      <Project updated={this.state.updated} msgAlert={this.props.msgAlert} getRequest={this.getRequest} id={project._id} value={project.spent}
                      />
                    </td>
                    <td className={ project.spent / project.budget >= 0.8 ? 'bg-danger' : 'regular'}>
                      <ProjectBalance valueSpent={project.spent} msgAlert={this.props.msgAlert} valueBudget={project.budget} id={project._id} />
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
                <Create getRequest={this.getRequest} msgAlert={this.props.msgAlert} user={this.props.user} projects={this.state.projects} closeModal={this.closeModal}>
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

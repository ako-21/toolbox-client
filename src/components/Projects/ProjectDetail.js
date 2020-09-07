import React from 'react'
import axios from 'axios'
import apiUrl from './../../apiConfig'
import { Redirect, withRouter } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ProjectPhases from './ProjectPhases'
import messages from './../AutoDismissAlert/messages'

class ProjectDetail extends React.Component {
  state = {
    project: {
      name: '',
      description: '',
      budget: '',
      spent: ''
    },
    deleted: false,
    show: false,
    updated: false,
    cancel: false,
    details: false
  }

showDetails = () => {
  this.setState({
    details: !this.state.details
  })
}

handleCancel = () => {
  this.setState({
    cancel: true
  })
}
handleInputChange = () => {
  const projectKey = event.target.name
  const value = event.target.value
  const projectCopy = Object.assign({}, this.state.project)
  projectCopy[projectKey] = value
  this.setState({ project: projectCopy })
}
handleSubmit = () => {
  event.preventDefault()
  this.setState({ project: {
    name: this.state.project.name,
    description: this.state.project.description,
    budget: this.state.project.budget,
    spent: this.state.project.spent
  }
  })
  axios({
    method: 'PATCH',
    url: apiUrl + '/projects/' + this.props.match.params.id,
    headers: {
      'Authorization': `Bearer ${this.props.user.token}`
    },
    data: {
      project: this.state.project
    }
  })
    .then(() => this.props.msgAlert({
      heading: 'Update Success',
      message: messages.updateSuccess,
      variant: 'success'
    }))
    .then(this.setState({
      updated: true
    }))
    .catch(() => this.props.location.props.msgAlert({
      heading: 'Update Failure',
      message: messages.updateFailure,
      variant: 'danger'
    }))
}

  deleteProject = (event) => {
    axios({
      method: 'DELETE',
      url: apiUrl + '/projects/' + this.props.match.params.id,
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      }
    })
      .then(() => this.props.location.props.msgAlert({
        heading: 'Delete Success',
        message: messages.deleteSuccess,
        variant: 'success'
      }))
      .then(this.setState({
        deleted: true
      }))
  }
  componentDidMount () {
    return axios({
      url: `${apiUrl}/projects/${this.props.match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      }
    })
      .then(response => console.log(response.data))
      .then(response => {
        this.setState({
          project: {
            name: response.data.project.name,
            description: response.data.project.description,
            budget: response.data.project.budget,
            spent: response.data.project.spent
          }
        })
      })
      .catch(error => console.log(error))
  }
  render () {
    if (this.state.updated === true || this.state.cancel === true) {
      return <Redirect to='/projects' />
    }
    if (this.state.deleted === true) {
      return <Redirect to={{ pathname: '/projects', state: { updated: this.props.location.state.updated } }} />
    }
    let jsx
    if (this.state.project === null) {
      jsx = <p>...Loading...</p>
    } else if (this.state.details === false) {
      jsx = (
        <div>
          <br />
          <div className="d-flex bg-fourth mt-5 mb-3 font heading round">
            Your DIY Project  &nbsp;  &apos;{this.state.project.name}&apos; &nbsp;
            <div className="details">
              <Button size="sm" variant="third" onClick={this.showDetails}>+ Details</Button>
            </div>
          </div>
          <Form className="bg-fifth round mb-5" onSubmit={this.handleSubmit}>
            <Form.Row className="d-flex flex-column align-items-end">
              <Button variant="third" size="sm" className="cancel mr-1" onClick={this.handleCancel}>X</Button>
            </Form.Row>
            <Form.Row className="mb-3 mt-4 d-flex flex-column align-items-center">
              <Col lg={10}>
                <Form.Label className="font tbl">
                Name
                </Form.Label>
                <Form.Control
                  onChange={this.handleInputChange}
                  value={this.state.project.name}
                  name="name"
                  placeholder="Project Name"
                  required={true} />
              </Col>
            </Form.Row>
            <Form.Row className="mb-3 d-flex flex-column align-items-center">
              <Col lg={10}>
                <Form.Label className="font tbl">
               Description
                </Form.Label>
                <Form.Control as="textarea" rows="4"
                  onChange={this.handleInputChange}
                  value={this.state.project.description}
                  type="textarea"
                  name="description"
                  className="description"
                  placeholder="Project Description"
                  required={true} />
              </Col>
            </Form.Row>
            <Form.Row className="mb-3 d-flex flex-column align-items-center">
              <Col lg={10} className="mb-3">
                <Form.Label className="font tbl">
                Budget ($)
                </Form.Label>
                <Form.Control
                  onChange={this.handleInputChange}
                  value={this.state.project.budget}
                  name="budget"
                  type="number"
                  placeholder="Your Budget"
                  required={true} />
              </Col>
              <Col lg={10}>
                <Form.Label className="font tbl">
                Spent ($)
                </Form.Label>
                <Form.Control
                  onChange={this.handleInputChange}
                  value={this.state.project.spent}
                  name="spent"
                  type="number"
                  placeholder="Amount Spent"
                  required={true} />
              </Col>
            </Form.Row>
            <Form.Row className="mb-5 mt-4 d-flex flex-row justify-content-center">
              <Button className="mr-4" type="submit" variant="fourth" size="large">Submit Edit</Button>
              <Button variant="danger" size="large" onClick={() => {
                this.setState({
                  show: true
                })
              }}>Delete</Button>
            </Form.Row>
          </Form>
          <Modal show={this.state.show}
            aria-labelledby="contained-modal-title-vcenter"
            centered >
            <Modal.Header className="d-flex justify-content-center">
              <Modal.Title>Delete Project</Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex justify-content-center font">
              Are you sure you want to delete &apos;{this.state.project.name}&apos; ?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="fourth" className="mr-2" onClick={this.closeModal}>Cancel</Button>
              <Button variant="danger" onClick={this.deleteProject}>Yes, Delete</Button>
            </Modal.Footer>
          </Modal>
        </div>
      )
    } else {
      jsx = (
        <div>
          <br />
          <div className="d-flex bg-fourth mt-5 mb-3 font heading round">
            Your DIY Project  &nbsp;  &apos;{this.state.project.name}&apos; &nbsp;
            <div className="details">
              <Button size="sm" variant="third" onClick={this.showDetails}>- Details</Button>
            </div>
          </div>
          <ProjectPhases name={this.state.project.name} budget={this.state.project.budget} spent={this.state.project.spent}></ProjectPhases>
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

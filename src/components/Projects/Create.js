import React from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import apiUrl from './../../apiConfig'

class Create extends React.Component {
    state = {
      project: {
        name: '',
        description: '',
        budget: '',
        spent: ''
      }
    }
    handleInputChange = (event) => {
      const projectKey = event.target.name
      const value = event.target.value
      const projectCopy = Object.assign({}, this.state.project)
      projectCopy[projectKey] = value
      this.setState({ project: projectCopy })
    }

    handleSubmit = (event) => {
      event.preventDefault()
      this.setState({ project: {
        name: '',
        description: '',
        budget: '',
        spent: ''
      }
      })
      axios({
        method: 'POST',
        url: apiUrl + '/projects',
        headers: {
          'Authorization': `Bearer ${this.props.user.token}`
        },
        data: {
          project: this.state.project
        }
      })
        .then(() => this.props.getRequest())
        .then(() => this.props.closeModal())
    }

    render () {
      return (
        <div>
          <Form onSubmit={this.handleSubmit}>
            <Form.Row className="mb-2">
              <Col>
                <Form.Control
                  onChange={this.handleInputChange}
                  value={this.state.project.name}
                  name="name"
                  placeholder="Project Name"
                  required={true} />
              </Col>
            </Form.Row>
            <Form.Row className="mb-2">
              <Col>
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
            <Form.Row className="mb-2">
              <Col>
                <Form.Control
                  onChange={this.handleInputChange}
                  value={this.state.project.budget}
                  name="budget"
                  type="number"
                  placeholder="Your Budget"
                  required={true} />
              </Col>
              <Col>
                <Form.Control
                  onChange={this.handleInputChange}
                  value={this.state.project.spent}
                  name="spent"
                  type="number"
                  placeholder="Amount Spent"
                  required={true} />
              </Col>
            </Form.Row>
            <Form.Row>
              <Button className="ml-1 mt-1" type="submit" variant="light" size="large">Add</Button>
            </Form.Row>
          </Form>
        </div>
      )
    }
}

export default Create

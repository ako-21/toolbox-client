import React from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from './../../apiConfig'
import { ReactTinyLink } from 'react-tiny-link'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

class Inspirations extends React.Component {
  state = {
    inspirations: null,
    inspiration: {
      url: ''
    }
  }

  componentDidMount () {
    axios({
      url: `${apiUrl}/projects/${this.props.match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      }
    })
      .then(response => {
        this.setState({
          inspirations: response.data.project.inspiration
        })
      })
      .catch(error => console.log(error))
  }

  handleInputChange = (event) => {
    const inspirationKey = event.target.name
    const value = event.target.value
    const inspirationCopy = Object.assign({}, this.state.inspiration)
    inspirationCopy[inspirationKey] = value
    this.setState({ inspiration: inspirationCopy })
  }
  handleSubmit = (event) => {
    event.preventDefault()
    this.setState({ inspiration: {
      url: ''
    }
    })
    axios({
      method: 'POST',
      url: apiUrl + '/inspiration',
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      },
      data: {
        inspiration: {
          url: this.state.inspiration.url,
          projectId: this.props.match.params.id
        }
      }
    })
  }

  render () {
    let jsx
    if (this.state.inspirations === null) {
      jsx = <h1>LOADING...</h1>
    } else {
      jsx =
      <React.Fragment>
        <Form onSubmit={this.handleSubmit}>
          <Form.Row className="mb-2">
            <Col className="col-8">
              <Form.Control
                onChange={this.handleInputChange}
                value={this.state.inspiration.url}
                name="url"
                placeholder="URL"
                required={true}
                type="url"
              />
            </Col>
            <Col className="col-4">
              <Button type="submit">Add</Button>
            </Col>
          </Form.Row>
        </Form>
        <div className="overflow-auto card-body-height">
          {this.state.inspirations.map(insp => (
            <ReactTinyLink key={insp._id} cardSize="large" showGraphic={false} maxLine={4} minLine={1} url={insp.url}></ReactTinyLink>
          ))}
        </div>
      </React.Fragment>
    }
    return (
      <div>
        {jsx}
      </div>
    )
  }
}

export default withRouter(Inspirations)

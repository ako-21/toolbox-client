import React from 'react'
import Moment from 'react-moment'
import Card from 'react-bootstrap/Card'
import { withRouter } from 'react-router-dom'

class ProjectPhases extends React.Component {
  state = {
    show: true
  }

  render () {
    const today = new Date()
    const created = this.props.createdAt
    return (
      <div>
        <div className="d-flex flex-row justify-content-around mb-5">
          <div className="fin d-flex justify-content-end round">
            <h3 className="mr-3">Budget: ${this.props.budget}</h3>
            <h3 className="mr-5">Spent: ${this.props.spent}</h3>
          </div>
          <div className="fin d-flex justify-content-center round">
            <h3 className="mr-2">
              <Moment diff={created} unit="days">{today}</Moment>
            </h3>
            <h3>Days Old</h3>
          </div>
        </div>
        <div className="container-fluid mb-5">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-12 d-flex justify-content-center">
              <Card style={{ width: '18rem' }} className="bg-secondary">
                <Card.Header className="text-center mt-2 mb-2 phase-card font">Brainstorm</Card.Header>
                <div className="d-flex flex-column align-items-center">
                  <Card style={{ width: '15rem' }} className="bg-sixth inspiration-card">
                    <Card.Title className="text-center mt-2 phase-card phase-title font bg-secondary pt-2 pb-2">Inspiration</Card.Title>
                    <Card.Body className="bg-sixth overflow-auto">
                    www.hello.com
                    www.hello.com
                    www.hello.com
                    www.hello.com
                    www.hello.com
                    </Card.Body>
                  </Card>
                  <Card style={{ width: '15rem' }} className="bg-sixth inspiration-card">
                    <Card.Title className="text-center mt-2 phase-card phase-title font bg-secondary pt-2 pb-2">Instruction</Card.Title>
                    <Card.Body className="bg-sixth overflow-auto">
                  www.hello.com
                  www.hello.com
                  www.hello.com
                  www.hello.com
                  www.hello.com
                    </Card.Body>
                  </Card>
                </div>
              </Card>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 d-flex justify-content-center">
              <Card style={{ width: '18rem' }} className="bg-secondary">
                <Card.Title className="text-center mt-2 phase-card font">Planning</Card.Title>
              </Card>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 d-flex justify-content-center">
              <Card style={{ width: '18rem' }} className="bg-secondary">
                <Card.Title className="text-center mt-2 phase-card font">Doing</Card.Title>
              </Card>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 d-flex justify-content-center">
              <Card style={{ width: '18rem' }} className="bg-secondary">
                <Card.Title className="text-center mt-2 phase-card font">Done</Card.Title>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(ProjectPhases)

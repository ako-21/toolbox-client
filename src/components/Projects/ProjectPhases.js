import React from 'react'
import Moment from 'react-moment'
import Card from 'react-bootstrap/Card'
import { withRouter } from 'react-router-dom'
import { ReactTinyLink } from 'react-tiny-link'
import Inspirations from './Inspirations'
// import Button from 'react-bootstrap/Button'
// import Form from 'react-bootstrap/Form'
// import Col from 'react-bootstrap/Col'

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
            <div className="col-lg-3 col-md-6 col-sm-12 d-flex justify-content-center card-background pt-2 pb-2">
              <Card style={{ width: '18rem' }} className="bg-sixth">
                <Card.Header className="text-center mt-2 mb-2 phase-card bg-secondary font">Brainstorm</Card.Header>
                <div className="d-flex flex-column align-items-center">
                  <Card.Title className="text-center mt-2 font p-2">Inspiration</Card.Title>
                  <Card.Body style={{ width: '15rem' }} className="bg-sixth">
                    <Inspirations user={this.props.user} match={this.props.match}></Inspirations>
                  </Card.Body>
                  <Card.Title className="text-center mt-2 font p-2">Instruction</Card.Title>
                  <Card.Body style={{ width: '15rem' }} className="bg-sixth">
                    <div className="overflow-auto card-body-height">
                      <ReactTinyLink cardSize="large" showGraphic={false} maxLine={4} minLine={1} url="https://www.youtube.com/watch?v=3YK96_qfc-Y&t=9s"></ReactTinyLink>
                    </div>
                  </Card.Body>
                </div>
              </Card>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 d-flex justify-content-center card-background pt-2 pb-2">
              <Card style={{ width: '18rem' }} className="bg-sixth">
                <Card.Header className="text-center mt-2 mb-2 phase-card bg-secondary font">Planning</Card.Header>
                <div className="d-flex flex-column align-items-center">
                  <Card.Body style={{ width: '15rem' }} className="bg-sixth overflow-auto card-body-height">
                    <ReactTinyLink cardSize="large" showGraphic={false} maxLine={4} minLine={1} url="https://youtu.be/3YK96_qfc-Y"></ReactTinyLink>
                  </Card.Body>
                </div>
              </Card>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 d-flex justify-content-center card-background pt-2 pb-2">
              <Card style={{ width: '18rem' }} className="bg-sixth">
                <Card.Header className="text-center mt-2 mb-2 phase-card bg-secondary font">Doing</Card.Header>
                <div className="d-flex flex-column align-items-center">
                  <Card.Body style={{ width: '15rem' }} className="bg-sixth overflow-auto card-body-height">
                    <ReactTinyLink cardSize="large" showGraphic={false} maxLine={4} minLine={1} url="https://youtu.be/3YK96_qfc-Y"></ReactTinyLink>
                  </Card.Body>
                </div>
              </Card>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 d-flex justify-content-center card-background pt-2 pb-2">
              <Card style={{ width: '18rem' }} className="bg-sixth">
                <Card.Header className="text-center mt-2 mb-2 phase-card bg-secondary font">Done</Card.Header>
                <div className="d-flex flex-column align-items-center">
                  <Card.Body style={{ width: '15rem' }} className="bg-sixth overflow-auto card-body-height">
                    <ReactTinyLink cardSize="large" showGraphic={false} maxLine={4} minLine={1} url="https://youtu.be/3YK96_qfc-Y"></ReactTinyLink>
                  </Card.Body>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(ProjectPhases)

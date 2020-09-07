import React from 'react'
import { withRouter } from 'react-router-dom'

class ProjectPhases extends React.Component {
  state = {
    show: true
  }

  render () {
    return (
      <div className="d-flex flex-row justify-content-around">
        <div className="fin d-flex justify-content-end round">
          <h3 className="mr-3">Budget: ${this.props.budget}</h3>
          <h3 className="mr-5">Spent: ${this.props.spent}</h3>
        </div>
        <div className="fin d-flex justify-content-end round">
          <h3 className="mr-5">__Days Old</h3>
        </div>
      </div>
    )
  }
}

export default withRouter(ProjectPhases)

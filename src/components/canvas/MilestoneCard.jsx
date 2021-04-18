import React, { Component } from 'react'

export default class MilestoneCard extends Component {

    state = {order: 0}

    showButton = (id, selectedMilestones) => {
        return !selectedMilestones.includes(id)
    }

    handleChange = (e) => {
        const {value} = e.target
        this.setState({order: value})
      }

    render() {
        if(this.props.journeyDetail) {

            const {order, milestone} = this.props.journeyDetail
            return (
                <li>
                    <p>Order: {order}</p>
                    <p>{milestone.name}</p>
                    {this.props.removeBtn && <button onClick={() => this.props.removeMilestoneFromJourney(milestone)}>Remove Milestone</button>}
                </li>
            )
        } else {

            const {_id, name} = this.props.milestone
            return (
            <li>
                <p>{name}</p>
                {this.showButton(_id, this.props.selectedMilestones) && <input type='number' value={this.state.order} onChange={this.handleChange}/>}
                {this.showButton(_id, this.props.selectedMilestones) && <button onClick={() => this.props.addMilestoneToJourney(this.props.milestone, this.state.order)}>Add Milestone</button>}
            </li>
            )
        }
    }
}
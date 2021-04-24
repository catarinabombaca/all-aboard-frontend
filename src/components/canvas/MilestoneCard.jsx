import React, { Component } from 'react'

export default class MilestoneCard extends Component {

    state = {order: 0}

    showButton = (id, selectedMilestones) => {
        return !selectedMilestones.includes(id)
    }

    // disableButton = (order, selectedOrder) => {
    //     return !selectedOrder.includes(order)
    // }

    handleChange = (e) => {
        const {value} = e.target
        this.setState({order: value})
      }

    render() {
        if(this.props.journeyDetail) {

            const {order, milestone} = this.props.journeyDetail
            return (
                <li className="list-group-item d-flex flex-row justify-content-start align-itens-center">
                    <p className='flex-grow-1 text-start'>{order} - {milestone.name}</p>
                    {this.props.removeBtn && <button className='m-2 btn btn-danger btn-sm align-self-end'
                    onClick={() => this.props.removeMilestoneFromJourney(milestone)}>Remove Milestone</button>}
                </li>
            )
        } else {

            const {_id, name} = this.props.milestone
            return (
            <li className="list-group-item d-flex flex-row justify-content-start align-itens-center">
                {this.showButton(_id, this.props.selectedMilestones) && <input className='w-25 mt-2 me-3 h-25' type='number' value={this.state.order} onChange={this.handleChange}/>}
                <p className='flex-grow-1 text-start w-100 h-25 mt-2'>{name}</p>
                {this.showButton(_id, this.props.selectedMilestones) && <button className="m-2 btn btn-dark-blue btn-sm align-self-end h-25 w-50"
                onClick={() => this.props.addMilestoneToJourney(this.props.milestone, this.state.order)}>Add Milestone</button>} 

                {/* {this.disableButton(this.state.order, this.props.selectedOrder) && this.showButton(_id, this.props.selectedMilestones) && <button className="m-2 btn btn-dark-blue btn-sm align-self-end h-25 w-50"
                onClick={() => this.props.addMilestoneToJourney(this.props.milestone, this.state.order)} disabled>Add Milestone</button>}         */}
            </li>
            )
        }
    }
}
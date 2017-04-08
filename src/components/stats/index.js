import React, {Component} from 'react';

export default class Stats extends Component {
    render() {
        const {jobsFound} = this.props;
        return <div className="jobs-count">{jobsFound}</div>
    }
}
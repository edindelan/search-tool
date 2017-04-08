import React, {Component} from 'react';

export default class SearchListItem extends Component {
    render() {
        const {job} = this.props;
        return <div>{job.title}</div>
    }
}

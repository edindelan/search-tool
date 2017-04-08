import React, {Component} from 'react';
import SearchListItem from '../searchListItem';

export default class SearchList extends Component {
    render() {
        const {data} = this.props;
        return <div>
                {data.map(job => {
                    return <SearchListItem key={job.id} job={job}/>
                })}
            </div>
    }
}
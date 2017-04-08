import React, {Component} from 'react';
import { uniqueId } from 'lodash';

export default class Search extends Component {
    isInHints = (hints, word) => {
        return hints.filter(hint => {
            return hint.keyword === word.keyword && hint.type === word.type;
        })
    };

    findHints = (keyword) => {
        const {data} = this.props;
        let hints = [];
        data.forEach(job => {
            const words = job.title.split(' ');
            const locHint = {type: 'loc', keyword: job.location, selected: false, id: uniqueId()};
            const teamHint = {type: 'team', keyword: job.area, selected: false, id: uniqueId()};
            if(keyword && hints.length < 10) {
                if(job.location.toLowerCase().includes(keyword) && !this.isInHints(hints, locHint).length){
                    hints.push(locHint);
                }

                if(job.area.toLowerCase().includes(keyword) && !this.isInHints(hints, teamHint).length){
                    hints.push(teamHint);
                }

                words.forEach(word => {
                    const wordHint = {type: 'word', keyword: word, selected: false, id: uniqueId()};
                    if(word.toLowerCase().includes(keyword) && !this.isInHints(hints, wordHint).length) {
                        hints.push(wordHint);
                    }
                });
            }
        });

        hints.sort((a, b) => {
            const nameA = a.type.toUpperCase();
            const nameB = b.type.toUpperCase();
            return (nameA === nameB) ? 0 : (nameA < nameB) ? -1 : 1;
        });

        this.setState({searchHints: hints});
    };

    onType = () => {
        this.makeSearch();
    };

    onChange = () => {
        this.makeSearch();
    };

    makeSearch = () => {
        this.searchKeyword = this.searchInput.value.toLowerCase();
        this.search(this.searchKeyword);
    };

    search = (keyword) => {
        const {data} = this.props;
        this.findHints(keyword);
        const filtered = data.filter(job => {
            return job.title.toLowerCase().includes(keyword)
        });

        if(filtered.length) {
            this.setState({jobs: filtered, jobsFound: filtered.length});
        } else {
            this.setState({jobs: [], jobsFound: 0});
        }
    };

    render() {
        return <input
            ref={(input) => this.searchInput = input}
            onKeyPress={this.onType}
            onChange={this.onChange}
            type="text"
        />;
    }
}

import React, {Component} from 'react';
import { uniqueId } from 'lodash';

export default class Search extends Component {
    isInHints = (hints, word) => {
        return hints.filter(hint => {
            return hint.keyword === word.keyword && hint.type === word.type;
        })
    };

    createHint = (type, keyword) => {
        return {
            type,
            keyword,
            selected: false,
            id: uniqueId()
        }
    };

    findHints = (keyword) => {
        const {data, onHintsStateChange} = this.props;
        let hints = [];
        data.forEach(job => {
            const words = job.title.split(' ');
            const locHint = this.createHint('loc', job.location);
            const teamHint = this.createHint('team', job.area);
            if(keyword && hints.length < 10) {
                if(job.location.toLowerCase().includes(keyword) && !this.isInHints(hints, locHint).length){
                    hints.push(locHint);
                }

                if(job.area.toLowerCase().includes(keyword) && !this.isInHints(hints, teamHint).length){
                    hints.push(teamHint);
                }

                words.forEach(word => {
                    const wordHint = this.createHint('word', word);
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

        onHintsStateChange(hints);
    };

    onType = () => {
        this.makeSearch();
    };

    onChange = () => {
        this.makeSearch();
    };

    makeSearch = () => {
        const {onSearchKeywordChange} = this.props;
        this.searchKeyword = this.searchInput.value.toLowerCase();
        this.search(this.searchKeyword);
        onSearchKeywordChange(this.searchKeyword);
    };

    search = (keyword) => {
        const {data, onSearchStateChange} = this.props;
        this.findHints(keyword);
        const filtered = data.filter(job => {
            return job.title.toLowerCase().includes(keyword)
        });

        filtered.length
            ? onSearchStateChange(filtered, filtered.length)
            : onSearchStateChange([], 0);
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

import React, {Component} from 'react';
import Hint from '../hint';


export default class Hints extends Component {
    filterHints = (filterSelected) => {
        const { searchHints } = this.props;
        return searchHints.filter(hint => filterSelected ? hint.selected : !hint.selected);
    };

    render() {
        const { filter, searchKeyword, onHintStateChange } = this.props;
        return <div>
            {this.filterHints(filter).map((hint, i) => {
                return <Hint
                    key={i}
                    hint={hint}
                    searchKeyword={searchKeyword}
                    onHintStateChange={onHintStateChange}
                />;
            })}
        </div>
    }
}
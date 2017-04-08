import React, {Component} from 'react';

function hightlightHint(hint, searchKeyword) {
    const pattern = new RegExp(searchKeyword, 'gi');
    return {__html: hint.type + ': ' + hint.keyword.replace(pattern,"<strong>" + searchKeyword + "</strong>")}
}

export default class Hint extends Component {
    onHintClick = () => {
        const { hint, onHintStateChange } = this.props;
        onHintStateChange(hint.id);
    };

    render() {
        const { hint, searchKeyword } = this.props;
        return <div>
            <span dangerouslySetInnerHTML={hightlightHint(hint, searchKeyword)} />
            <span onClick={this.onHintClick}> X </span>
        </div>
    }
}

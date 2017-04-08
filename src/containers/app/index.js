import React, {Component} from 'react';
import Hints from '../../components/hints';
import Search from '../../components/search'
import jobsData from '../../data/jobs';
import SearchList from "../../components/searchList";
import Stats from "../../components/stats";
import './styles.css';

class App extends Component {
    state = {
        jobs: jobsData,
        jobsFound: jobsData.length,
        searchHints: []
    };

    onHintStateChange = id => {
        const { searchHints } = this.state;
        const updatedSearchHints = searchHints.map(hint => hint.id === id ? {...hint, selected: !hint.selected} : hint);
        this.setState({searchHints: updatedSearchHints});
    };

    onSearchStateChange = (jobs, jobsFound) => {
        this.setState({jobs, jobsFound})
    };

    onHintsStateChange = (searchHints) => {
        this.setState({searchHints})
    };

    onSearchKeywordChange = (keyword) => {
        this.searchKeyword = keyword;
    };

    render() {
        const { jobs, jobsFound, searchHints} = this.state;
        return (
            <div className="app">
                <Hints
                    searchHints={searchHints}
                    filter={true}
                    searchKeyword={this.searchKeyword}
                    onHintStateChange={this.onHintStateChange}
                />
                <Search
                    data={jobsData}
                    onSearchStateChange={this.onSearchStateChange}
                    onHintsStateChange={this.onHintsStateChange}
                    onSearchKeywordChange={this.onSearchKeywordChange}
                />
                <Hints
                    searchHints={searchHints}
                    searchKeyword={this.searchKeyword}
                    onHintStateChange={this.onHintStateChange}
                />
                <Stats jobsFound={jobsFound}/>
                <SearchList data={jobs}/>
            </div>
        );
    }
}

export default App;


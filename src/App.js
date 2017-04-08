import React, {Component} from 'react';
import jobsData from './data/jobs';
import './App.css';

class App extends Component {
    state = {
        jobs: jobsData,
        jobsFound: jobsData.length,
        searchHints: [],
        searchKeyword: ""
    };

    type = () => {
        this.makeSearch();
    };

    change = () => {
        this.makeSearch();
    };

    makeSearch = () => {
        this.setState({searchKeyword: this.searchInput.value.toLowerCase()});
        const { searchKeyword } = this.state;
        this.search(searchKeyword);
    };

    isInHints = (hints, word) => {
        return hints.filter(hint => {
            return hint.keyword === word.keyword && hint.type === word.type;
        })
    }

    findHints = (keyword) => {
        let hints = [];
        jobsData.forEach(job => {
            const words = job.title.split(' ');
            const locHint = {type: 'loc', keyword: job.location};
            const teamHint = {type: 'team', keyword: job.area};
            if(keyword && hints.length < 10) {
                if(job.location.toLowerCase().includes(keyword) && !this.isInHints(hints, locHint).length){
                    hints.push(locHint);
                }

                if(job.area.toLowerCase().includes(keyword) && !this.isInHints(hints, teamHint).length){
                    hints.push(teamHint);
                }

                words.forEach(word => {
                    const wordHint = {type: 'word', keyword: word};
                    if(word.toLowerCase().includes(keyword) && !this.isInHints(hints, wordHint).length) {
                        hints.push(wordHint);
                    }
                });
            }
        });

        hints.sort((a, b) => {
            const nameA = a.type.toUpperCase(); // ignore upper and lowercase
            const nameB = b.type.toUpperCase(); // ignore upper and lowercase
            return (nameA === nameB) ? 0 : (nameA < nameB) ? -1 : 1;
        });

        this.setState({searchHints: hints});
    };

    search = (keyword) => {
        this.findHints(keyword);
        const filtered = jobsData.filter(job => {
            return job.title.toLowerCase().includes(keyword)
        });

        if(filtered.length) {
            this.setState({jobs: filtered, jobsFound: filtered.length});
        } else {
            this.setState({jobs: [], jobsFound: 0});
        }

    };

    render() {
        const { jobs, jobsFound, searchHints, searchKeyword} = this.state;
        const pattern = new RegExp(searchKeyword, 'gi');
        console.log(searchHints);
        return (
            <div className="App">
                <input ref={(input) => this.searchInput = input } onKeyPress={this.type} onChange={this.change} type="text"/>
                {searchHints.map((hint, i) => {
                        {/*return <div key={i}>{hint.type}: {hint.keyword.replace(pattern,"<strong>" + searchKeyword + "</strong>")}</div>*/}
                        return <div key={i}>{hint.type}: {hint.keyword}</div>
                })}

                <h1>{jobsFound}</h1>
                {jobs.map(job => {
                    return <div key={job.id}>{job.title}</div>;
                })}
            </div>
        );
    }
}

export default App;

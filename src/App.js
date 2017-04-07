import React, {Component} from 'react';
import jobsData from './data/jobs';
import './App.css';

class App extends Component {
    state = {
        jobs: jobsData,
        jobsFound: jobsData.length,
        searchHints: []
    };

    type = () => {
        this.makeSearch();
    };

    change = () => {
        this.makeSearch();
    };

    makeSearch = () => {
        const keyword = this.searchInput.value.toLowerCase();
        this.search(keyword);
    };

    findHints = (keyword) => {
        console.log(keyword);
        let hints = [];
        jobsData.forEach(job => {
            const tmp = job.title.split(' ');
            tmp.forEach(word => {
                if(keyword && hints.length < 10 && word.toLowerCase().includes(keyword) && !hints.includes(word)) {
                    hints.push(word);
                }
            });

        });

        this.setState({searchHints: hints})
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
        const { jobs, jobsFound, searchHints } = this.state;
        return (
            <div className="App">
                <input ref={(input) => this.searchInput = input } onKeyPress={this.type} onChange={this.change} type="text"/>
                {searchHints.map((hint, i) => {
                        return <div key={i}>{hint}</div>
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

import React, { Component } from 'react';
import axios from 'axios';
import '../GithubIssues.scss';
import DisplayIssuesList from './DisplayIssuesList';


class GithubIssues extends Component {
	state = {
		issues: []
	}

	componentDidMount() {
        //set data which comes from Github API calls
        //there is a restriction to receive 30 issues in response but
        //if per_page query parameter is added it would return 100 issues
		axios.get('https://api.github.com/repos/tensorflow/tfjs/issues?per_page=100')
		.then(response => {
		  this.setState({issues: response.data});
		})
		.catch(error => {
		  console.log(error);
		});
	  }

	render() {
		return (
			<div className="githubIssues">
				<h1>Github Issues Filtering Dashboard</h1>
				<DisplayIssuesList issues={this.state.issues}/>
			</div>
		);
}
}

export default GithubIssues;

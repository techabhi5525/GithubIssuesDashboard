import React, { Component } from 'react';
import Filter from './Filter'
import Labels from './Labels';

/*
This component will receive a list of issues via props
Display a list of issues in a responsive grid
Pass issues as values to filter to show filtering dropdown component
Pass labels associated with issues to Labels component
*/

class DisplayIssuesList extends Component {

	state = {
		filterType: '',
		filterValue: '',
		issues: this.props.issues
	}

	componentWillReceiveProps(nextProps) {
		const {issues} = this.props;
		if (nextProps.issues !== issues) {
			this.setState({issues: nextProps.issues});
		}
	}

    //Will be invoked when any of the filtering criteria is changed
	onFilterChange = (type, {target}) => {
		if(!type) {
			const {issues} = this.props;
			this.setState({issues});
			return;
        }
       //get the list of filtered issues to set the state accordingly
		const filteredIssues = this.props.issues.filter(issue => {
			if (typeof type === typeof []) {
				type.forEach(key => {
					if(issue[key]){
						issue = issue[key];
					}
				})
				if(typeof issue === typeof [] && issue.length > 0){
                    //need to return only the matching issues
					const isMatchingissue = issue.map((val) => val.name === target.value);
					if(isMatchingissue.includes(true)){
						return true;
					} else {
						return false;
					}
				}
				if(issue.length > 0){
					return issue === target.value;
				}
			} else {
				return this.state.issues.filter(issue => issue[type] === target.value);
			}
		});
		this.setState({
			issues: filteredIssues
		});
	}

    //will be invoked when reset filters button clicked
	refreshFilters() {
		this.setState({issues: this.props.issues});
	}

	render() {
		const issueList = this.state.issues.map( (issue, index) => (
			<div key={issue.id}>
				<div className="gridContainer">
					<div className="gridItem">{issue.title}</div>
					<Labels labels={issue.labels}/>
					<div className="gridItem">{issue.user.login}</div>
					<div className="gridItem lastItem">{issue.state}</div>
				</div>
			</div>
		));
		return (
			<div>
				<h3>This screen show list of issues assciated with the github repository</h3>
				<div className="filterContainer">
					<button className="resetButton" onClick={this.refreshFilters.bind(this)}>Reset Filters &#10227;</button>
					<Filter type={['labels', 'name']} values={this.props.issues} onFilterChange={this.onFilterChange}   />
					<Filter type={['user', 'login']} values={this.props.issues} onFilterChange={this.onFilterChange}  />
					<Filter type='state' values={this.props.issues}  onFilterChange={this.onFilterChange} />
				</div>
				<div className="filterContainer">
					<div className="gridItem gridTitle">Issue Title</div>
					<div className="gridItem gridTitle">Label</div>
					<div className="gridItem gridTitle">Author</div>
					<div className="gridItem gridTitle lastItem">Status</div>
				</div>
				{issueList}
			</div>
		);
}
}

export default DisplayIssuesList;

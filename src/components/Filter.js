import React, { Component } from 'react';

/*
This component will render filtering dropdown with unique values  
*/
class Filter extends Component {

	geneateDropdownOptions = () => {
        const {values, type} = this.props;
        const user = [];
		if (typeof type === typeof [] && values.length > 0) {
			return values.map(val => {
				let valueToCheck = val;
				type.forEach(key => {
						if(valueToCheck[key]){
							valueToCheck = valueToCheck[key];
						}
				});
				if(typeof valueToCheck === typeof [] && valueToCheck.length > 0){
					return valueToCheck.map((val) => <option key={val.id} value={val.name}>{val.name}</option>);
				}
				if(valueToCheck.length > 0){
                    if(user.indexOf(valueToCheck) === -1){
                        user.push(valueToCheck);
                        return <option key={val.id} value={valueToCheck}>{valueToCheck}</option>
                    }
				}
			})
		} else {
            if(values.length > 0){
                const filteredIssues = [...new Set(values.map(val => val[this.props.type]))];
                return filteredIssues.map((val, index) => <option key={val+index} value={val}>{val}</option>);
            }
		}
	}
	render() {
		return (
				<div className="filterDropdownContainer">
					<select className="filterDropdown" onChange={(event) => this.props.onFilterChange(this.props.type, event)}>
					<option value="Select" defaultValue >Select &#9660;</option>
					{this.geneateDropdownOptions()}
					</select>
				</div>
		);
	}
}

export default Filter;
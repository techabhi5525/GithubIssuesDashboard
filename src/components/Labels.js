import React, { Component } from 'react';

/*
This component will render different type of issues label 
*/
class Labels extends Component {

	render() {
        const labels = this.props.labels.map(label => {
            const labelColor = { background: "#"+label.color, marginRight: '2px' };
            return <span className="issuesLabel" style={labelColor} key={label.id}>{label.name}</span>
        })
		return (
            <div className="issueslabelContainer">
                {labels}
            </div>
		);
	}
}

export default Labels;
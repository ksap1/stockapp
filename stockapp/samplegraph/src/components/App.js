import React from 'react';
import { render } from 'react-dom';
import Chart from './Chart';
import { getData } from "./utils"

import { TypeChooser } from "react-stockcharts/lib/helper";

class ChartComponent extends React.Component {
	constructor(props){
		super(props);
		this.state={
			ready: false,
			url: this.props.url,
		}
	}

	componentDidMount() {
		getData(this.state.url).then(dt => {
			this.setState({data:dt});
			this.setState({ready:true});
		});
		
	}
	componentDidUpdate(prevProps, prevState, snapshot){
		if(prevProps.url !== this.props.url){
			this.setState({url:this.props.url});
			getData(this.state.url).then(dt => {
				this.setState({data:dt});
				this.setState({ready:true});
			});
		}
	}
	static getDerivedStateFromError(error) {
		return { ready: false };
	}
	render() {
		if (!this.state.ready) {
			return (<div>
				<span class="colorgrad loading" display="inline" kind="animated">Loading...</span>
			</div>)
		}
		return (
			<div>
				<Chart type="svg" data={this.state.data} height = {this.props.height}/>
			</div> 
		)
	}
}

export default ChartComponent;
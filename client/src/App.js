import React, { Component } from 'react';
import PlayAppItem from './components/playAppItem/playAppItem';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			apps: [],
			genre: '',
			sort: '',
			error: null
		};
	}
	setGenre(genre) {
		this.setState({
			genre: genre
		});
	}
	setSort(sort) {
		this.setState({
			sort: sort
		});
	}
	handelSubmit(e) {
		e.preventDefault();
		const baseUrl = 'http://localhost:8000/apps';
		const params = [];
		if (this.state.genre) {
			params.push(`genre=${this.state.genre}`);
		}
		if (this.state.sort) {
			params.push(`sort=${this.state.sort}`);
		}
		console.log(params);
		const query = params.join('&');
		const url = `${baseUrl}?${query}`;
		console.log(url);
		fetch(url)
			.then(res => {
				if (!res.ok) {
					throw new Error(res.statusText);
				}
				return res.json();
			})
			.then(data => {
				this.setState({
					apps: data,
					error: null
				});
				console.log(this.state.apps);
			})
			.catch(err => {
				this.setState({
					error: `Sorry could not reach server ${err}`
				});
			});
	}

	render() {
		const apps = this.state.apps.map((app, i) => {
			return <PlayAppItem {...app} key={i} />;
		});
		return (
			<main className='App'>
				<h1>Google Play Apps</h1>
				<div className='appList'>
					<form onSubmit={e => this.handelSubmit(e)}>
						<label htmlFor='genres'>Genres: </label>
						<input
							type='text'
							id='genres'
							name='genres'
							value={this.state.genre}
							onChange={e => this.setGenre(e.target.value)}
						/>
						<label htmlFor='sort'>Sort: </label>
						<select
							name='sort'
							id='sort'
							value={this.state.sort}
							onChange={e => this.setSort(e.target.value)}>
							<option value=''>None</option>
							<option value='rank'>Rating</option>
							<option value='title'>App</option>
						</select>
						<button type='submit'>Submit</button>
					</form>
					<div className='app_error'>{this.state.error}</div>
				</div>
				{apps}
			</main>
		);
	}
}
export default App;

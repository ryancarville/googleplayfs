import React from 'react';
import './playAppItem.css';

export default function PlayAppItem(props) {
	return (
		<div className='appItem'>
			<div className='app_name'>{props.App}</div>
			<div className='app_rating'>Stars: {props.Rating}</div>
			<div className='app_genre'>{props.Genre}</div>
		</div>
	);
}

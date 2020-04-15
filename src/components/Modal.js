import React from 'react';
import '../styles/modal.scss';

export default function Modal(props) {

	return (
		<div aria-hidden={props.visible} onClick={(e) => { if (e.target.className.indexOf("shadow_box") != -1) { props.hideModal(); } }} className="shadow_box" style={(props.visible) ? { 'display': 'block' } : { 'display': 'none' }}>
			<div className="modal_content">
				<div className="modal_header">
					<h1>{props.title}</h1>
					<button className="modal_exit" onClick={(e) => { props.hideModal(); }}>X</button>
				</div>
				{props.children}
			</div>
		</div>
	)
}

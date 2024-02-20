import React from 'react'

export default function Display(props, { children }) {
	return (
		<div>
			{(props.if) ? children : null}
		</div>
	)
}

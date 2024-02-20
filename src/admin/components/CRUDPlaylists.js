import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import moment from 'moment';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function CRUDPlaylists() {
	const [tutorials, setTutorials] = useState([]);

	useEffect(() => {
		Axios.get("/api/tutorial").then((response) => {
			setTutorials(response.data);
		})
	}, [])

	const handleDelete = (e) => {
		if (confirm('Are you sure you want to delete this post?')) {
			let deleteId = e.target.getAttribute("data-id")
			Axios.delete("/api/tutorial/" + deleteId).then((resp) => {
				var newTutorial = tutorials.map((tut) => { return tut; });
				var deletedIndex = newTutorial.filter((tut) => { return tut._id == deleteId });
				deletedIndex = newTutorial.indexOf(deletedIndex[0]);
				newTutorial.splice(deletedIndex, 1);
				setTutorials(newTutorial);
			})
		}
	}

	return (
		<div>
			<div className="crudMenu">
				<form action="/api/youtube" enctype="multipart/form-data" method="post" id="newTut" name="newTut">
					<h3>Name</h3>
					<input type="text" name="title" id="title" required />
					<h3>Social Description</h3>
					<input type="text" name="social_description" id="social_description" required />
					<h3>Author</h3>
					<input type="text" name="author" id="author" required />
					<h3>Playlist/Video ID</h3>
					<input type="text" name="playlist_id" id="playlist_id" required />
					<h3>Active</h3>
					<input type="checkbox" name="active" id="active" required />
					<input type="submit" className="btn btn-primary" name="submit" id="submit" value="Submit" />
				</form>
			</div>
			<div className="crudMenu">
				<table>
					<thead>
						<tr>
							<th>Tutorial Name:</th>
							<th>Date:</th>
							<th>Edit:</th>
							<th>Delete:</th>
						</tr>
					</thead>
					<tbody>
						{tutorials.map((tut) => {
							return (
								<tr>
									<td>{tut.title}</td>
									<td>{moment(tut.date).format("lll")}</td>
									<td><button className="btn btn-secondary">EDIT</button></td>
									<td><button class="btn btn-danger" data-id={tut._id} onClick={handleDelete}>DELETE</button></td>
								</tr>
							)
						})}
					</tbody>
				</table>

			</div>
			<Modal.Dialog>
				<Modal.Header closeButton>
					<Modal.Title>Modal title</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<p>Modal body text goes here.</p>
				</Modal.Body>

				<Modal.Footer>
					<Button variant="secondary">Close</Button>
					<Button variant="primary">Save changes</Button>
				</Modal.Footer>
			</Modal.Dialog>
		</div>
	)
}

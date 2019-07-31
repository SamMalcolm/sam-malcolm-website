import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import moment from 'moment';

export default function CRUDBlog() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		Axios.get("/api/blog/all").then((response) => {
			setPosts(response.data);
		})
	}, [])

	const handleDelete = (e) => {
		if (confirm('Are you sure you want to delete this post?')) {
			console.log("DELETING " + e.target.getAttribute("data-id"))
			Axios.delete("/api/blog/" + e.target.getAttribute("data-id"))
		}
	}

	return (
		<div>
			<div className="crudMenu">
				<form action="/api/blog" enctype="multipart/form-data" method="post" id="newBlog" name="newBlog">
					<h3>Name</h3>
					<input type="text" name="title" id="title" required />
					<h3>Social Description</h3>
					<input type="text" name="social_description" id="social_description" required />
					<h3>Date</h3>
					<input type="date" name="date" id="date" required />
					<h3>Markup</h3>
					<textarea form="newBlog" name="content" id="content" required></textarea>
					<h3>Active</h3>
					<input type="checkbox" name="active" id="active" />
					<h3>Feature Image</h3>
					<input type="file" name="feature_image" id="feature_image" required />
					<input type="submit" className="btn btn-primary" name="submit" id="submit" value="Submit" />
				</form>
			</div>
			<div className="crudMenu">
				<table>
					<thead>
						<tr>
							<th>Post Name:</th>
							<th>Date:</th>
							<th>Edit:</th>
							<th>Delete:</th>
						</tr>
					</thead>
					<tbody>
						{posts.map((post) => {
							return (
								<tr>
									<td>{post.title}</td>
									<td>{moment(post.date).format("lll")}</td>
									<td><button>EDIT</button></td>
									<td><button class="btn btn-danger" data-id={post._id} onClick={handleDelete}>DELETE</button></td>
								</tr>
							)
						})}
					</tbody>
				</table>

			</div>
		</div>
	)
}

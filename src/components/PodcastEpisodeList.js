import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Post from './Post'

export default function PodcastEpisodeList(props) {

	const [episodes, setEpisodes] = useState([])
	const [author, setAuthor] = useState("")

	useEffect(() => {
		axios.get('/api/podcasts/' + props.id).then((response) => {
			console.log(response.data[0].episodes)
			setAuthor(response.data[0].author)
			setEpisodes(response.data[0].episodes)
		})
	}, [])

	return (
		<div>
			{(episodes).map((episode) => {
				return (
					<Post date={episode.pub_date} author={author} title={episode.title} social_description={episode.social_description} feature_image={episode.feature_image} >
						{(episode.spotify) && (
							<a style={{ borderColor: props.highlight }} href={episode.spotify} target="_blank" className="smBtn">Listen on Spotify</a>
						)}
						{(episode.apple) && (
							<a style={{ borderColor: props.highlight }} href={episode.apple} target="_blank" className="smBtn">Listen on Apple Podcasts</a>
						)}
					</Post>
				)
			})}
		</div>
	)
}

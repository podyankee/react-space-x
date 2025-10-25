import { useState, useEffect } from 'react'
import './Details.scss'
import { useNavigate, useParams } from 'react-router-dom'
import Youtube from 'react-youtube'
import Main from '../Main'
import useLaunches from '../useLaunches/useLaunches'

const Details = () => {
	const [launch, setLaunch] = useState(null)

	const { getLaunch, data } = useLaunches()
	const navigate = useNavigate()

	const { id } = useParams()

	useEffect(() => {
		if (id) {
			const currentLaunch = getLaunch(id)

			setLaunch(currentLaunch)
		}
	}, [id, getLaunch])

	return (
		<>
			<Main rocket={launch?.name} />
			{launch ? (
				<main className='details'>
					<div className='container'>
						<div className='details-row'>
							<div className='details-image'>
								<img
									src={launch.links?.patch?.small || 'https://via.placeholder.com/400'}
									alt={launch.name}
								/>
							</div>
							<div className='details-content'>
								<p className='details-description'>{launch.details || 'Описание отсутствует'}</p>
							</div>
						</div>
						<Youtube className='details.youtube' videoId={launch.links.youtube_id} />
					</div>
					<a onClick={() => navigate(-1)} className='button button-back'>
						go back
					</a>
				</main>
			) : (
				'...Загрузка данных'
			)}
		</>
	)
}

export default Details

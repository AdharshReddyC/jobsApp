import {Link} from 'react-router-dom'

const JobsList = props => {
  console.log('inside')
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails

  return (
    <li>
      <Link to={`/jobs/${id}`}>
        <img src={companyLogoUrl} alt="similar job company logo" />
        <h1>{title}</h1>
        <p>{rating}</p>
        <p>{location}</p>
        <h1>Type of Employment</h1>
        <p>{employmentType}</p>
        <h1>Description</h1>
        <p>{jobDescription}</p>
      </Link>
    </li>
  )
}

export default JobsList

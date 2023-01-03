import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import JobsList from '../JobsList'
import Header from '../Header'

class JobItemDetails extends Component {
  state = {
    jobData: {},
    similarJobData: [],
    isLoading: false,
    isSuccess: false,
  }

  componentDidMount() {
    this.getJobData()
  }

  getJobData = async () => {
    this.setState({
      isLoading: true,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/jobs/${id}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const fetchedData = await response.json()

      const updatedSimilarJobsData = fetchedData.similar_jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.job_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }))

      const updatedJobData = {
        companyLogoUrl: fetchedData.job_details.company_logo_url,
        companyWebsiteUrl: fetchedData.job_details.company_website_url,
        employmentType: fetchedData.job_details.employment_type,
        id: fetchedData.job_details.id,
        jobDescription: fetchedData.job_details.job_description,
        skills: fetchedData.job_details.skills,
        lifeAtCompany: fetchedData.job_details.life_at_company,
        location: fetchedData.job_details.location,
        packagePerAnnum: fetchedData.job_details.package_per_annum,
        rating: fetchedData.job_details.rating,
        title: fetchedData.job_details.title,
      }

      this.setState({
        jobData: updatedJobData,
        similarJobData: updatedSimilarJobsData,

        isLoading: false,
        isSuccess: true,
      })
    } else {
      this.setState({isSuccess: false, isLoading: false})
    }
  }

  renderJobDetailsView = () => {
    const {jobData} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      id,
      jobDescription,
      skills,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobData

    const {description, image_url} = lifeAtCompany

    return (
      <div>
        <div>
          <img src={companyLogoUrl} alt="job details company logo" />
          <h1>{title}</h1>
          <p>{rating}</p>
          <p>{location}</p>
          <p>{employmentType}</p>
          <p>{packagePerAnnum}</p>
        </div>
        <div>
          <h1>Description</h1>
          <a href={companyWebsiteUrl}>Visit</a>
          <p>{jobDescription}</p>
        </div>
        <div>
          <h1>Skills</h1>
          {skills.map(eachItem => (
            <img
              src={eachItem.image_url}
              alt={eachItem.name}
              key={eachItem.name}
            />
          ))}
        </div>
        <div>
          <h1>Life at Company</h1>
          <img src={image_url} alt="life at company" />
          <p>{description}</p>
        </div>
      </div>
    )
  }

  renderSimilarJobsList = () => {
    const {similarJobData} = this.state

    return (
      <ul className="products-list">
        {similarJobData.map(product => (
          <JobsList jobDetails={product} key={product.id} />
        ))}
      </ul>
    )
  }

  renderSuccessView = () => {
    console.log('success')
    return (
      <div>
        <Header />
        {this.renderJobDetailsView()}
        <div>
          <h1>Similar Jobs</h1>

          {this.renderSimilarJobsList()}
        </div>
      </div>
    )
  }

  renderLoader = () => (
    <div testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderUnSuccessfullViewe = () => {
    console.log('fail')
    return (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
        />
        <h1>Oops! Something Went Wrong</h1>
        <p>We cannot seem to find the page you are looking for</p>
        <button onClick={this.getJobData}>Retry</button>
      </div>
    )
  }

  render() {
    const {isLoading, isSuccess} = this.state

    switch (isSuccess) {
      case true:
        return isLoading ? this.renderLoader() : this.renderSuccessView()

      default:
        return this.renderUnSuccessfullViewe()
    }
  }
}

export default JobItemDetails

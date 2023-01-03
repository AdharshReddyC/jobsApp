import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import NavBar from '../NavBar'
import Header from '../Header'
import JobsList from '../JobsList'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]
class Jobs extends Component {
  state = {
    employmentType: '',
    minimumPackage: '',
    search: '',
    isLoading: false,
    jobsData: [],
    isSuccess: false,
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    const {employmentType, minimumPackage, search} = this.state
    this.setState({
      isLoading: true,
    })

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${minimumPackage}&search=${search}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const fetchedData = await response.json()

      const updatedData = fetchedData.jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.job_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }))

      this.setState({
        jobsData: updatedData,
        isLoading: false,
        isSuccess: true,
      })
    } else {
      this.setState({isSuccess: false, isLoading: false})
    }
  }

  renderLoader = () => (
    <div className="products-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderJobsList = () => {
    const {jobsData} = this.state
    console.log('in')

    return (
      <>
        <Header />
        <NavBar
          employmentTypesList={employmentTypesList}
          salaryRangesList={salaryRangesList}
        />
        <div>
          <input type="search" onChange={this.onChangeSearch} />
          <button onClick={this.getJobs} testid="searchButton">
            Search
          </button>
          <br />
        </div>
        <ul className="products-list">
          {jobsData.map(product => (
            <JobsList jobDetails={product} key={product.id} />
          ))}
        </ul>
      </>
    )
  }

  renderUnSuccessfullView = () => {
    console.log('fail')
    return (
      <>
        <Header />
        <NavBar
          employmentTypesList={employmentTypesList}
          salaryRangesList={salaryRangesList}
        />
        <div>
          <input type="search" onChange={this.onChangeSearch} />
          <button onClick={this.getJobs} testid="searchButton">
            Search
          </button>
          <br />
        </div>
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
            alt="failure view"
          />
          <h1>Oops! Something Went Wrong</h1>
          <p>We cannot seem to find the page you are looking for</p>
          <button onClick={this.getJobs}>Retry</button>
        </div>
      </>
    )
  }

  onChangeSearch = event => {
    this.setState({search: event.target.value})
  }

  render() {
    const {jobsData, isLoading, isSuccess} = this.state

    switch (isSuccess) {
      case true:
        return isLoading ? this.renderLoader() : this.renderJobsList()

      default:
        return this.renderUnSuccessfullView()
    }
  }
}

export default Jobs

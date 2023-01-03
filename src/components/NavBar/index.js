import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

class NavBar extends Component {
  state = {
    profileDetails: {},
    isLoading: false,
    isSuccess: true,
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({
      isLoading: true,
    })
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis.ccbp.in/profile'

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const fetchedData = await response.json()

      const updatedData = {
        name: fetchedData.profile_details.name,
        profileImageUrl: fetchedData.profile_details.profile_image_url,
        shortBio: fetchedData.profile_details.short_bio,
      }
      console.log(fetchedData)

      this.setState({
        profileDetails: updatedData,
        isLoading: false,
        isSuccess: true,
      })
    } else {
      this.setState({isSuccess: false})
    }
  }

  renderLoader = () => (
    <div className="products-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderUnSuccessfullViewe = () => {
    console.log('fail')
    return (
      <div>
        <button onClick={this.getProfileDetails}>Retry</button>
      </div>
    )
  }

  renderProfileDetails = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails

    return (
      <div>
        <img src={profileImageUrl} alt="profile" />
        <h1>{name}</h1>
        <p>{shortBio}</p>
      </div>
    )
  }

  renderDisplayFilters = () => {
    console.log('filetes')
    const {employmentTypesList, salaryRangesList} = this.props
    console.log(employmentTypesList)

    return (
      <>
        <div>
          <h1>Type of Employment</h1>
          <ul>
            {employmentTypesList.map(eachItem => (
              <li key={eachItem.employmentTypeId}>
                <input
                  type="checkbox"
                  id={eachItem.employmentTypeId}
                  value={eachItem.label}
                />
                <label htmlFor={eachItem.employmentTypeId}>
                  {eachItem.label}
                </label>
                <br />
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h1>Salary Range</h1>
          <h1>Type of Employment</h1>
          <ul>
            {salaryRangesList.map(eachItem => (
              <li key={eachItem.salaryRangeId}>
                <input
                  type="radio"
                  id={eachItem.salaryRangeId}
                  value={eachItem.label}
                />
                <label htmlFor={eachItem.salaryRangeId}>{eachItem.label}</label>
                <br />
              </li>
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderSuccessView = () => {
    console.log('success')
    return (
      <>
        <div>{this.renderProfileDetails()}</div>
        <div>{this.renderDisplayFilters()}</div>
      </>
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

export default NavBar

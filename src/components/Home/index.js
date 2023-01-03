import {Redirect, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import Header from '../Header'
import './index.css'

const Home = props => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <div>
      <Header />
      <div>
        <h1>Find The Job That Fits Your Life</h1>
        <p>Millions of people are searching for jobs dd</p>
        <Link to="/jobs">
          <button>Find Jobs</button>
        </Link>
      </div>
    </div>
  )
}

export default Home

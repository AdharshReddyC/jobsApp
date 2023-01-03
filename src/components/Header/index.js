import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

const Header = props => {
  console.log('Header')

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <ul>
      <li>
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
      </li>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/jobs">Jobs</Link>
      </li>
      <li>
        <button onClick={onClickLogout}>Logout</button>
      </li>
    </ul>
  )
}

export default withRouter(Header)

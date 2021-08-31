import { useState, useEffect } from 'react'
import GoogleLogin from 'react-google-login';
import { useRouter } from 'next/router'
import Api from '../components/Api'

const GoogleLoginBtn = (props) => {
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)

  const responseGoogle = async (response) => {
    const body = {
      email: response.profileObj.email,
      name: response.profileObj.name
    }
    const responseAPI = await Api("auth/login_google", "POST", body)
    localStorage.setItem("token", responseAPI.token)
    localStorage.setItem("name", response.profileObj.name)
    router.push('/')
  }

  const responseGoogleFail = async (response) => {
    var errorMessage = "Login dengan Google gagal";
  }

  useEffect(() => {
    setIsMounted(true)

    return function cleanup() {
      setIsMounted(false)
    };
  }, []);
  
  if (isMounted) {
    return (
      <GoogleLogin
        clientId="682556003693-6sbae3dl0q1q0mqlk80dkc3hls8v6npl.apps.googleusercontent.com"
        render={renderProps => (
          <div className="button br-sm is-fullwidth" onClick={renderProps.onClick}>
            <span className="ico api-google-ico"></span>
            <span>Sign in with Google</span>
          </div>
        )}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogleFail}
        cookiePolicy={'single_host_origin'}
      />
    )
  } else {
    return (
      <div></div>
    )
  }
}

export default GoogleLoginBtn;
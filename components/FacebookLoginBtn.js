import { useState, useEffect } from 'react'
import FacebookLogin  from 'react-facebook-login/dist/facebook-login-render-props';
import { useRouter } from 'next/router'
import Api from '../components/Api'

const FacebookLoginBtn = (props) => {
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)

  const responseFacebook = async (response) => {
    const body = {
      facebook_id: response.id,
      name: response.name
    }
    const responseAPI = await Api("auth/login_facebook", "POST", body)
    localStorage.setItem("token", responseAPI.token)
    localStorage.setItem("name", response.name)
    router.push('/')
  }

  useEffect(() => {
    setIsMounted(true)
    
    return function cleanup() {
      setIsMounted(false)
    };
  },[]);

  if(isMounted){
    return(
      <FacebookLogin 
        getLoginStatus={true}
        appId="513137909786805"
        render={renderProps => (
          <div className="button br-sm is-fullwidth" onClick={renderProps.onClick}>
            <span className="ico api-facebook-ico"></span>
            <span>Sign in with Facebook</span>
          </div>
        )}
        autoLoad={false}
        callback={responseFacebook}
      />
    )
  }else{
    return(
      <div></div>
    )
  }
}

export default FacebookLoginBtn;
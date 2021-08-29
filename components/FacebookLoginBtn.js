import { useState, useEffect } from 'react'
import FacebookLogin  from 'react-facebook-login/dist/facebook-login-render-props';
import { useRouter } from 'next/router'

const FacebookLoginBtn = (props) => {
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)

  const responseFacebook = async (response) => {
    const body = {
      facebook_id: response.id,
      name: response.name
    }
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    };
    const arr = await fetch(process.env.API + "auth/login_facebook", requestOptions)
      .then(response => response.json())
      .then(data => {
        return data
      });
    localStorage.setItem("token", arr.token)
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
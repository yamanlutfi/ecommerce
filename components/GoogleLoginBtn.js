import { useState, useEffect } from 'react'
import GoogleLogin from 'react-google-login';
import { useRouter } from 'next/router'

const GoogleLoginBtn = (props) => {
  const router = useRouter()
  const [lastPage, setLastPage] = useState('')
  const [isMounted, setIsMounted] = useState(false)

  const responseGoogle = async (response) => {
    var formData = new FormData();
    formData.append("email", response.profileObj.email);
    formData.append("name", response.profileObj.name);
    formData.append("client_id", process.env.REACT_APP_SERVER_CLIENT);
    formData.append("secret_key", process.env.REACT_APP_SERVER_KEY);
    formData.append("exp", process.env.REACT_APP_SERVER_EXP);

    // var getLogin = await Post('login-google', formData);
    // var errorMessage = "Login dengan Google gagal";
    // if(getLogin.status === "ERROR"){
    //   props.setMsg(errorMessage);
    // }else if(getLogin.status === "OK"){
    //   props.setMsg("");
    //   localStorage.setItem("id", "true");
    //   localStorage.setItem("name", getLogin.customer.name);
    //   localStorage.setItem("token", getLogin.token);
    //   if(lastPage === null || lastPage === ""){
    //     router.push('/')
    //   }else{
    //     router.push(lastPage)
    //   }
    //   // props.getCart();
    // }else if(getLogin.error.status == "ERROR"){
    //   props.setMsg(errorMessage);
    // }
    formData.delete('email');
    formData.delete('name');
  }
  const responseGoogleFail = async (response) => {
    var errorMessage = "Login dengan Google gagal";
  }
  useEffect(() => {
    setIsMounted(true)
    setLastPage((localStorage.getItem('lastPage'))? localStorage.getItem('lastPage') : '/')
    
    return function cleanup() {
      setIsMounted(false)
    };
  },[]);
  if(isMounted){
    return(
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
  }else{
    return(
      <div></div>
    )
  }
}

export default GoogleLoginBtn;
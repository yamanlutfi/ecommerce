import { useState, useEffect } from 'react'
import FacebookLogin  from 'react-facebook-login/dist/facebook-login-render-props';
import { useRouter } from 'next/router'

const FacebookLoginBtn = (props) => {
  const router = useRouter()
  const [lastPage, setLastPage] = useState('')
  const [isMounted, setIsMounted] = useState(false)

  const responseFacebook = async (response) => {
    console.log(response);
    var formData = new FormData();
    formData.append("name", response.name);
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
    formData.delete('name');
  }
  const responseFacebookFail = async (response) => {
    var errorMessage = "Login dengan Facebook gagal";
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
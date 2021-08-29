import Head from 'next/head'
import { useRef } from 'react'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import GoogleLoginBtn from '../components/GoogleLoginBtn'
import FacebookLoginBtn from '../components/FacebookLoginBtn'


export default function login(props) {
  const router = useRouter()
  const refBtn = useRef(null)

  const setMsg = (msg) => {
    setMessage(msg)
  }

  const submitLogin = async (e) => {
    e.preventDefault()
    refBtn.current.disabled = true
    refBtn.current.innerHTML = "Loading..."

    var body = {};
    const formData = new FormData(e.target);  
    Array.from(formData.entries()).forEach(([key, value]) => {
      body[key] = value;
    })

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    }
    const arr = await fetch(process.env.API + "auth/login", requestOptions)
      .then(response => response.json())
      .then(data => {
        return data
      })

    // Save Token for access data Cart and wishlist
    localStorage.setItem("token", arr.token)
    localStorage.setItem("name", arr.name)

    refBtn.current.disabled = false
    refBtn.current.innerHTML = "Sign in"

    if(arr.status == "Success"){
      router.push('/')
    }
  }

  return (
    <>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="hero is-fullheight is-medium is-gradient is-bold">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
              <article className="card is-rounded br-md">
                <form className="card-content" onSubmit={submitLogin}>
                  <h1 className="title has-text-centered is-fullwidth">Login</h1>
                  <div className="field">
                    <p className="control has-icons-left">
                      <input className="input br-text" type="text" placeholder="Email / Username" name="username" required/>
                      <span className="icon is-small is-left">
                        <FontAwesomeIcon icon={faEnvelope} className="my-icon" />
                      </span>
                    </p>
                  </div>
                  <div className="field">
                    <p className="control has-icons-left">
                      <input className="input br-text" type="password" placeholder="Password" name="password" required/>
                      <span className="icon is-small is-left">
                        <FontAwesomeIcon icon={faLock} className="my-icon" />
                      </span>
                    </p>
                  </div>
                  <div className="field">
                    <p className="control">
                      <label className="checkbox">
                        <input type="checkbox" />
                        <small className="ml-2">Remember me</small>
                      </label>
                    </p>
                  </div>
                  <div className="field mb-0">
                    <p className="control">
                      <button ref={refBtn} type="submit" className="button is-primary br-sm is-fullwidth">
                        Sign in
                      </button>
                    </p>
                  </div>
                  <div className="pt-1 pb-1">
                    <hr />
                    <center className="or has-text-grey"><span>Or</span></center>
                  </div>
                  <div className="field mt-4">
                    <div className="control">
                      <FacebookLoginBtn setMsg={setMsg.bind(this)} {...props} />
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <GoogleLoginBtn setMsg={setMsg.bind(this)} {...props} />
                    </div>
                  </div>
                </form>
              </article>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

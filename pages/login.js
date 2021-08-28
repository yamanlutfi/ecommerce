import Head from 'next/head'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import GoogleLoginBtn from '../components/GoogleLoginBtn'
import FacebookLoginBtn from '../components/FacebookLoginBtn'


export default function login(props) {

  const setMsg = (msg) => {
    setMessage(msg)
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
                <form className="card-content">
                  <h1 className="title has-text-centered is-fullwidth">Login</h1>
                  <div className="field">
                    <p className="control has-icons-left">
                      <input className="input br-text" type="email" placeholder="Email / Username" />
                      <span className="icon is-small is-left">
                        <FontAwesomeIcon icon={faEnvelope} className="my-icon" />
                      </span>
                    </p>
                  </div>
                  <div className="field">
                    <p className="control has-icons-left">
                      <input className="input br-text" type="password" placeholder="Password" />
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
                      <Link href="/">
                        <button type="submit" className="button is-primary br-sm is-fullwidth">
                          Sign in
                        </button>
                      </Link>
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

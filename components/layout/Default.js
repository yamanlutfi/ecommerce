import { useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseUser, faTable, faCartArrowDown, faUser, faHeart, faSearch, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import Back from '../Back';

const Default = ({ children, page }) => {
	const router = useRouter();

  const refSearchBox = useRef(null)
  const refFocus = useRef(null)

  const showSearchBox = () => {
    refSearchBox.current.classList.remove("is-display-none")
    refFocus.current.focus()
  };

  const hideSearchBox = () => {
    refSearchBox.current.classList.add("is-display-none")
  };

  const submitSearch = (e) => {
    hideSearchBox()
    e.preventDefault()
    router.push("/search/"+refFocus.current.value)
  }

  return (
    <div className="default-content">
      <nav className="navbar is-fixed-top is-flex my-page-width" role="navigation">
        {
          (page == "home") ?
            (<Link href="/wishlist">
              <div className="p-4 nav-item">
                <FontAwesomeIcon icon={faHeart} className="w-18 has-text-grey" />
              </div>
            </Link>)
            :
            (<div className="p-4 nav-item"><Back /></div>)
        }
        <div className="is-fullwidth pr-4 mt-2 nav-item">
          <div className="field">
            <p className="control has-icons-left">
              <input className="input br-text" type="text" placeholder="Search" onClick={showSearchBox} />
              <span className="icon is-small is-left">
                <FontAwesomeIcon icon={faSearch} className="my-icon" />
              </span>
            </p>
          </div>
        </div>
      </nav>

      <main className="my-page-width">{children}</main>
      {
        (page == "home") ?
          (<nav className="navbar is-fixed-bottom my-page-width" role="navigation">
            <div className="navbar-menu pb-0">
              <Link href="/">
                <a className="navbar-item is-expanded  is-block has-text-centered">
                  <FontAwesomeIcon icon={faHouseUser} className="w-18 has-text-grey" />
                  <p className="is-size-7">Home</p>
                </a>
              </Link>
              <Link href="/search/gitar">
                <a className="navbar-item is-expanded  is-block has-text-centered">
                  <FontAwesomeIcon icon={faTable} className="w-18 has-text-grey" />
                  <p className="is-size-7">Feed</p>
                </a>
              </Link>
              <Link href="/cart">
                <a className="navbar-item is-expanded is-block has-text-centered">
                  <FontAwesomeIcon icon={faCartArrowDown} className="w-18 has-text-grey" />
                  <p className="is-size-7">Cart</p>
                </a>
              </Link>
              <Link href="/login">
                <a className="navbar-item is-expanded  is-block has-text-centered">
                  <FontAwesomeIcon icon={faUser} className="my-icon has-text-grey" />
                  <p className="is-size-7">Profile</p>
                </a>
              </Link>
            </div>
          </nav>)
          :
          ""
      }

      <div className="search-box is-display-none" ref={refSearchBox}>
        <nav className="navbar is-fixed-top is-flex my-page-width" role="navigation">
          <div className="p-4 nav-item">
            <div onClick={hideSearchBox}>
              <FontAwesomeIcon icon={faArrowLeft} className="w-18 has-text-grey" />
            </div>
          </div>
          <div className="is-fullwidth pr-4 mt-2 nav-item">
            <form className="field" onSubmit={submitSearch}>
              <p className="control has-icons-left">
                <input className="input br-text" type="search" placeholder="Search" ref={refFocus} />
                <span className="icon is-small is-left">
                  <FontAwesomeIcon icon={faSearch} className="my-icon" />
                </span>
              </p>
            </form>
          </div>
        </nav>
        <div className="section my-page-width mt-4">
          <div className="container">
            <Link href="/search/gitar-akustik">
              <a className="icon-text mb-4 is-fullwidth" onClick={hideSearchBox}>
                <span className="icon">
                  <FontAwesomeIcon icon={faSearch} className="w-20 has-text-grey-lighter" />
                </span>
                <span className="keyword-list has-text-grey">gitar akustik</span>
              </a>
            </Link>
            <Link href="/search/gitar-yamaha">
              <a className="icon-text mb-4 is-fullwidth" onClick={hideSearchBox}>
                <span className="icon">
                  <FontAwesomeIcon icon={faSearch} className="w-20 has-text-grey-lighter" />
                </span>
                <span className="keyword-list has-text-grey">gitar yamaha</span>
              </a>
            </Link>
            <Link href="/search/gitar-listrik">
              <a className="icon-text mb-4 is-fullwidth" onClick={hideSearchBox}>
                <span className="icon">
                  <FontAwesomeIcon icon={faSearch} className="w-20 has-text-grey-lighter" />
                </span>
                <span className="keyword-list has-text-grey">gitar listrik</span>
              </a>
            </Link>
            <Link href="/search/senar-gitar">
              <a className="icon-text mb-4 is-fullwidth" onClick={hideSearchBox}>
                <span className="icon">
                  <FontAwesomeIcon icon={faSearch} className="w-20 has-text-grey-lighter" />
                </span>
                <span className="keyword-list has-text-grey">senar gitar</span>
              </a>
            </Link>
            <Link href="/search/gitar-ukulele">
              <a className="icon-text mb-4 is-fullwidth" onClick={hideSearchBox}>
                <span className="icon">
                  <FontAwesomeIcon icon={faSearch} className="w-20 has-text-grey-lighter" />
                </span>
                <span className="keyword-list has-text-grey">gitar ukulele</span>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Default;
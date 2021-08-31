import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseUser, faTable, faCartArrowDown, faUser, faHeart } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import SearchBox from '../SearchBox'

const Default = ({ children }) => {

  return (
    <div className="default-content">
      <SearchBox
        btn={(<Link href="/wishlist">
          <div className="p-4 nav-item">
            <FontAwesomeIcon icon={faHeart} className="w-18 has-text-grey" />
          </div>
        </Link>)} 
      />

      <main className="my-page-width">{children}</main>
      
      <nav className="navbar is-fixed-bottom my-page-width" role="navigation">
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
          <Link href="/wishlist">
            <a className="navbar-item is-expanded  is-block has-text-centered">
              <FontAwesomeIcon icon={faUser} className="my-icon has-text-grey" />
              <p className="is-size-7">Profile</p>
            </a>
          </Link>
        </div>
      </nav>
    </div>
  )
};

export default Default;
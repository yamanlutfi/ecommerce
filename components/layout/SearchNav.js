import SearchBox from '../SearchBox';
import Back from '../Back';

const SearchNav = ({ children }) => {

  return (
    <div className="default-content">
      
      <SearchBox btn={(<div className="p-4 nav-item"><Back /></div>)}/>

      <main className="my-page-width">{children}</main>

    </div>
  )
};

export default SearchNav;
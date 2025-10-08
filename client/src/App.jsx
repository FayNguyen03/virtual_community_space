import {useState, useEffect,React} from 'react'
import { useRoutes, Link} from 'react-router-dom'
import Locations from './pages/Locations'
import LocationEvents from './pages/LocationEvents'
import Events from './pages/Events'
import './App.css'
import LocationsAPI from './services/LocationsAPI'


const App = () => {
  const [locations, setLocations] = useState([])
  
  useEffect(() => {
          (async () => {
              try {
                  const locationsData = await LocationsAPI.getAllLocations();  
                  setLocations(locationsData);
              }
              catch (error) {
                  throw error
              }
          }) ()
      }, [])
  
  let locationRoutes = [];

  locations.forEach(element => {
    locationRoutes.push({
      path: "/" + element.name.replace(/\s/g, "").replaceAll('.', "").toLowerCase(),
      element: <LocationEvents index={element.id}/>
    })

  });

  let routes = [
    {
      path: '/',
      element: <Locations />
    },
    {
      path: '/events',
      element: <Events />
    },
    
  ].concat(locationRoutes);

  let element = useRoutes(routes);

  return (
    <div className='app'>

      <header className='main-header'>
        <h1>Virtual Music Concerts</h1>

        <div className='header-buttons'>
          <Link to='/' role='button'>Home</Link>
          <Link to='/events' role='button'>Events</Link>
        </div>
      </header>

      <main>
        {element}
      </main>
    </div>
  )
}

export default App

import Routes from './components/routes/routes';
import Store from './components/store/store';
import { Provider } from 'react-redux';

function App() {

  return (
    <div>
      <Provider store={Store}>
      <Routes/>
      </Provider>
    </div>
  )
}

export default App

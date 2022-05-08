
import { GlobalStyles } from '@mui/material';import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import LoginScrean from './components/LoginScrean';
import MainScrean from './components/MainScrean';
import stateContext from './contexts/stateContext';
import useTaskState from './hooks/useTaskState';

const Provider = stateContext.Provider

function App() {

  const { state } = useTaskState()

  return (
    <Provider value={state}>
      <GlobalStyles
        styles={{
          body: { margin:0 }
        }}
      />
      <Header />
      <Routes>
        <Route path="/" element={<MainScrean />} />
        <Route path="login" element={<LoginScrean />} />
      </Routes>

    </Provider>
  );
}

export default App;

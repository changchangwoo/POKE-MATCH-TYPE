import './App.css'
import { Route, Routes } from 'react-router-dom'
import Main from './pages/Main'
import Match from './pages/Match'
import { css } from '@emotion/react'
import Navigation from './components/nav/Navigation'
import ChangeButtons from './components/nav/ChangeButtons'
import Footer from './components/Footer'

function App() {
  return (
    <>
    <Navigation/>
    <div css={Container}>
    <ChangeButtons />
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path="/type" element={<Match />}/>
    </Routes>
    <Footer />
    </div>
    </>
  )
}
const Container = css`
width: 100vw;
max-width: 800px;
padding: 50px 20px 20px 20px;
display: flex;
flex-direction: column;
gap: 20px;
box-sizing: border-box;
`
export default App

import { ChakraProvider, Box } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Explore from './pages/Explore'
import Create from './pages/Create'

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Box minH="100vh" bg="gray.900">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/create" element={<Create />} />
          </Routes>
        </Box>
      </Router>
    </ChakraProvider>
  )
}

export default App

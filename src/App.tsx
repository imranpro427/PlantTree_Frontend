// @ts-nocheck
import React from 'react';
import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Charts from './components/Charts/Charts';
import Home from "./components/home/Home"


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
    <Router>
      <Routes>
        {/* Route for HomePage */}
        <Route path="/home" element={<Charts />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
      


    </>
  )
}

export default App

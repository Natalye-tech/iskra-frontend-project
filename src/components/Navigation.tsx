import React from 'react'
import {Link} from 'react-router-dom'

export function Navigation() {
  return (
    <nav className="h-[50px] flex justify-between px-5 bg-grey-200 items-center text-blue">
      <img width='180px' src='iskra1.svg'></img>
      <span>
        <Link to="/" className="mr-2">page2</Link>
        <Link to="/page" className="mr-2">About</Link>
        <Link to="/page1" className="mr-2">Page1</Link>
      </span>

    </nav>
  )
}

import React from 'react'
import {NavLink} from 'react-router-dom'
import {ThemeConsumer} from '../context/theme'
import {FaMoon,FaRegSun} from 'react-icons/fa'

const activeStyle = {
  color: 'rgb(0, 136, 83)'
}

export default function Nav () {
  return(
    <ThemeConsumer>
      { ({theme, toggleTheme}) => (
        <nav className='row space-between'>
          <ul className='row nav'>
            <li>
              <NavLink
                to='/'
                exact
                activeStyle={activeStyle}
                className='nav-link'
              >
                Top
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/new'
                exact
                activeStyle={activeStyle}
                className='nav-link'
              >
                New
              </NavLink>
            </li>
          </ul>
          <button
            className='btn-clear green-icons'
            onClick={toggleTheme}>
            {theme === 'light' ? <FaMoon size={22}/> : <FaRegSun size={22} /> }
          </button>
        </nav>
      )}
    </ThemeConsumer>
  )
}

import React from 'react'
import Navbar from 'react-bootstrap/Navbar'

export default function Menu() {
    return (
        <header>
            <nav>
                <Navbar>
                    <Navbar.Brand href="#home">PokemonApp</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Created by: <a href="#login">Rafael Roman</a>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Navbar>
            </nav>
        
        </header>
    )
}


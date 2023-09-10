
import { Link, Route, HashRouter as Router, Routes } from 'react-router-dom';

import {  NavLink } from "react-router-dom";
import { Home } from './pages/Home';
import { About } from './pages/About';
import { MailIndex } from './pages/MailIndex';
import { MailDetails } from './pages/MailDetails';



export function App() {

    return (
        <Router>
        <section className="main-app">
            <header className="app-header">
                <section className="container">
                <h1 className='name'>Hi Lee</h1>
                <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/mail">Mail</NavLink>
                </nav>
                </section>
            </header>

            <main className='container'>
            <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/mail" element={<MailIndex />} />
                        <Route path="/mail/:mailId" element={<MailDetails />} />

                    </Routes>
                {/*<Home />*/}
            </main>

            <footer>
                <section className="container">
                    email 2023 &copy;
                </section>
            </footer>
        </section>
        </Router>


    )
}


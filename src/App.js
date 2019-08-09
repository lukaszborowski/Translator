import React, {Component} from "react";
import ReactDOM from "react-dom";
import './App.css';
import "./styles.scss";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Alert from 'react-bootstrap/Alert';
import {
    HashRouter, Route, Link, Switch, NavLink,
} from 'react-router-dom';

const wordTab = ["Car", "Elephant", "Dog", "Cat", "Robot", "Plane", "Highway", "Developer", "House", "Home", "Word", "Simple", "Roof", "Book", "Chair", "Tomato", "Window", "Pillow", "Clock", "Bulb", "Wallet", "Light", "Bed", "Cable", "Switch", "Medal", "Work", "Person", "Object", "Sun", "Sky", "Grass", "Finger", "Toe", "Office", "Today", "Tomorrow", "Bicycle", "Flower", "Dirt", "Earth", "Mars", "North", "South", "East", "Star", "West", "Sparkle", "Arrow", "Point", "Time", "Fire", "Escape", "Battle", "Age", "Aircraft", "Sea", "Ship"];


function randomWords(max, min) {
    const random = Math.floor(Math.random() * (max - min + 1)) + min;
    return random;

}

let randomWord = wordTab[randomWords(wordTab.length, 1)];

// Nawigacja
class NavMenu extends Component {


    render() {

        return (
            <nav className="nav__container">
                <NavTitle/><a href="#/login"><Button variant="primary" size="sm"
                                                     className="nav__login">Login</Button></a>

            </nav>
        )
    }
}

class NavTitle extends Component {
    render() {
        return (

            <h1 className="nav__title__holder">Translate IT!</h1>
        );
    }
}

class NavMenuLogin extends Component {


    render() {

        return (
            <nav className="nav__container__logged">
                <NavTitleLogged/>
                <div className="nav__logged__container">
                    <a href="#/mytab"><Button variant="primary" size="sm" className="nav__login__myTab">My Tab</Button></a>
                    <a href="#/"><Button variant="primary" size="sm" className="nav__login__logout">Log Out</Button></a>

                </div>
            </nav>
        )
    }
}

class NavTitleLogged extends Component {
    render() {
        return (

            <h1 className="nav__title__holder__logged">Translate IT!</h1>
        );
    }
}

// Słowo dnia

class WordOfDay extends Component {
    state = {
        word: randomWord,
        langto: "fr",
        wordtrans: ""

    };

    langChangeEnFr = e => {
        this.setState({
            lang: "en",
            langto: "fr"
        })
    };

    langChangeEnJap = e => {
        this.setState({
            lang: "en",
            langto: "ja"
        })
    };

    langChangeEnSp = e => {
        this.setState({
            lang: "en",
            langto: "es"
        })
    };


    componentDidMount() {

        this.fetcher = fetch(`https://systran-systran-platform-for-language-processing-v1.p.rapidapi.com/translation/text/translate?source=en&target=${this.state.langto}&input=${this.state.word}`, {
            method: "GET",
            headers: {
                "x-rapidapi-host": "systran-systran-platform-for-language-processing-v1.p.rapidapi.com",
                "x-rapidapi-key": "43a2daa856msh67624a0b2f7535bp139c20jsn9540ff2c7e99"
            }

        });
        Promise.all([this.fetcher])
            .then(resp => {
                resp.forEach(file => {
                    this.process(file.text());
                })
            })
            .catch(err => {
                console.log('Jakiś problem z Promise:', err);
            });


    };

    componentDidUpdate() {
        this.fetcher = fetch(`https://systran-systran-platform-for-language-processing-v1.p.rapidapi.com/translation/text/translate?source=en&target=${this.state.langto}&input=${this.state.word}`, {
            method: "GET",
            headers: {
                "x-rapidapi-host": "systran-systran-platform-for-language-processing-v1.p.rapidapi.com",
                "x-rapidapi-key": "43a2daa856msh67624a0b2f7535bp139c20jsn9540ff2c7e99"
            }

        });
        Promise.all([this.fetcher])
            .then(resp => {
                resp.forEach(file => {
                    this.process(file.text());
                })
            })
            .catch(err => {
                console.log('Jakiś problem z Promise:', err);
            });

    }

    componentWillUnmount() {

    }

    process = (prom) => {
        prom.then(data => {
            const datas = JSON.parse(data);
            const datastrue = datas.outputs[0].output;
            this.setState({
                wordtrans: datastrue
            });


        })

    };


    render() {
        return (<>
                <h2 className="wordOfDay__title">Random Word</h2>
                <div className="wordOfDay__container">
                    <ButtonGroup size='sm' aria-label="Basic example">
                        <Button variant="secondary" className="wordOfDay__Buttons" onClick={this.langChangeEnFr}>ENG ->
                            FR</Button>
                        <Button variant="secondary" className="wordOfDay__Buttons" onClick={this.langChangeEnJap}>ENG
                            -> JAP</Button>
                        <Button variant="secondary" className="wordOfDay__Buttons" onClick={this.langChangeEnSp}>ENG ->
                            ESP</Button>
                    </ButtonGroup>
                    <div className="wordOfDay__container__header">
                        <h3 className="wordOfday__word">{this.state.word}</h3></div>
                    <div className="wordOfDay__definition">
                        <strong>Translation: {this.state.wordtrans}</strong><br/>

                    </div>
                </div>
            </>
        )
    }
}

// My Tab

class NavMenuMyTab extends Component {
    render() {

        return (
            <nav className="nav__container__logged">
                <NavTitleLogged/>
                <div className="nav__logged__container">
                    <a href="#/logged"><Button variant="primary" size="sm"
                                               className="nav__login__main">Main</Button></a>
                    <a href="#/"><Button variant="primary" size="sm" className="nav__login__logout">Log Out</Button></a>

                </div>
            </nav>
        )
    }

}

class MyTabTitle extends Component {

    componentDidMount() {
    console.log(localStorage.getItem('Words'));
    }

    render() {
        return (

             <>
                 <h2 className="myTab__title">Let's look at Yours pinned Words!</h2>
                 <ul className="myTab__list">
                     {JSON.parse(localStorage.getItem('Words')).map((el,i) => {
                         return <li key={i} className="myTab__list__item"><stron className="outer"><strong>{el.word}</strong> Translation to {el.language} : <strong>{el.wordtrans}</strong></stron> </li>
                     })}

                 </ul>
             </>
        )
    }
}

class MyTab extends Component {


    render() {
        return <>
            <NavMenuMyTab/>
            <SpacingBig/>
            <MyTabTitle/>
            <SpacingBig/>
            <Footer/>
        </>
    }
}

// Szukanie


class SearchZone extends Component {

    state = {
        lang: "en",
        langto: "fr",
        word: "",
        wordtrans: ""
    };

    langChangeEnFr = e => {
        this.setState({
            lang: "en",
            langto: "fr"
        })
    };

    langChangeEnJap = e => {
        this.setState({
            lang: "en",
            langto: "ja"
        })
    };

    langChangeEnSp = e => {
        this.setState({
            lang: "en",
            langto: "es"
        })
    };

    handleOnChange = e => {
        this.setState({
            word: e.target.value
        });

    };
    handleOnClick = () => {

        this.fetcher = fetch(`https://systran-systran-platform-for-language-processing-v1.p.rapidapi.com/translation/text/translate?source=${this.state.lang}&target=${this.state.langto}&input=${this.state.word}`, {
            method: "GET",
            headers: {
                "x-rapidapi-host": "systran-systran-platform-for-language-processing-v1.p.rapidapi.com",
                "x-rapidapi-key": "43a2daa856msh67624a0b2f7535bp139c20jsn9540ff2c7e99"
            }

        });
        Promise.all([this.fetcher])
            .then(resp => {
                resp.forEach(file => {
                    this.process(file.text());
                })
            })
            .catch(err => {
                console.log('Jakiś problem z Promise:', err);
            });
    };

    process = (prom) => {
        prom.then(data => {
            const datas = JSON.parse(data);
            const datastrue = datas.outputs[0].output;
            this.props.parent(datastrue, this.state.word, this.state.langto);
            console.log(datastrue);
            this.setState({
                wordtrans: datastrue
            });


        })

    };


    render() {

        return (
            <>
                <h2 className="searchZone__title">Let's Translate it</h2>
                <div className="searchZone__container">
                    <ButtonGroup vertical size='sm' aria-label="Basic example">
                        <Button variant="secondary" className="searchZone__Buttons" onClick={this.langChangeEnFr}>ENG ->
                            FR</Button>
                        <Button variant="secondary" className="searchZone__Buttons" onClick={this.langChangeEnJap}>ENG
                            -> JAP</Button>
                        <Button variant="secondary" className="searchZone__Buttons" onClick={this.langChangeEnSp}>ENG ->
                            ESP</Button>
                    </ButtonGroup>
                    <input className="searchZone__text" placeholder="Search" value={this.state.word} type="text"
                           onChange={this.handleOnChange}/>
                    <Button variant="primary" size="lg" className="searchZone__button"
                            onClick={this.handleOnClick}>Search</Button>


                </div>
            </>
        );
    }
}


class Spacing extends Component {
    render() {
        return (
            <div className="spacing"/>
        )
    }
}

class SpacingBig extends Component {
    render() {
        return (
            <div className="spacingBig"/>
        )
    }
}

// Response

class PonsResponse extends Component {
    render() {
        return (
            <>

                <div className="ponsResponse__container">
                    <h3 className="ponsResponse__title">Translate by SYSTRAN.io</h3>
                    <div className="ponsResponse__container__inner">
                        <h4 className="ponsResponse__word">Translation : </h4>
                        <div className="ponsResponse__response">{this.props.refe}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}


// Footer

class Footer extends Component {
    render() {
        return (
            <footer>
                <h3 className="footer__h">Technologies provided by</h3>
                <ul className="footer__list">
                    <li className="footer__item">SYSTRAN.io API</li>

                </ul>
            </footer>


        );
    }
}

// Logowanie
class NavMenuLogged extends Component {


    render() {

        return (
            <nav className="log__panel__nav">
                <NavTitle/>

            </nav>
        )
    }
}

class LogPanel extends Component {

    state = {
        login: "KotMaciek",
        password: "KotMaciek",
        loginin: "",
        passin: "",
        alert: "",
    }
    handleLogin = (e) => {
        const login = e.target.value;
        this.setState({
            loginin: login
        })
    }

    handlePassword = (e) => {
        const password = e.target.value;
        this.setState({
            passin: password
        })
    }

    handlelogged = () => {
        if (this.state.login === this.state.loginin && this.state.password === this.state.passin) {
            return (window.location.href = "#/logged")
        } else {
            return (
                this.setState({
                    alert: <>
                        <Alert variant="warning" className="alert">
                            Incorrect Login or Password
                        </Alert>
                    </>

                }))
        }
    }

    render() {
        return (
            <>
                <div className="log__panel">
                    <h4>{this.state.alert}</h4>
                    <input className="log__panel__login" type="text" placeholder="Login" onChange={this.handleLogin}/>
                    <Spacing/>
                    <input className="log__panel__pass" type="password" placeholder="Password"
                           onChange={this.handlePassword}/>
                    <Spacing/>
                    <Button variant="primary" size="sm" className="log__panel__button"
                            onClick={this.handlelogged}>Login</Button>
                </div>
            </>
        )
    }
}

class Login extends Component {
    state = {
        login: "KotMaciek",
        password: "KotMaciek",
        loginin: "",
        passin: "",
    }

    render() {
        return (
            <div>
                <NavMenuLogged/>
                <SpacingBig/>
                <LogPanel/>
                <SpacingBig/>
                <Footer/>
            </div>
        )
    }

}

// Wyswietlanie


class Main extends Component {
    state = {
        wordtrans: ""
    };

    handleWordTrans = (element) => {
        this.setState({
            wordtrans: element
        })
    }

    render() {
        return (
            <>
                <NavMenu/>
                <Spacing/>
                <WordOfDay/>
                <Spacing/>
                <SearchZone parent={this.handleWordTrans}/>
                <Spacing/>
                <PonsResponse refe={this.state.wordtrans}/>
                <SpacingBig/>
                <SpacingBig/>
                <Footer/>

            </>
        );
    }
}

class MainLogged extends Component {
    state = {
        wordtrans: "",
        word: "",
        lang: "",
        language: ""
    };

    handleWordTrans = (element, elementSec, elementThird) => {
        this.setState({
            wordtrans: element,
            word: elementSec,
            lang: elementThird
        })
    }

    usingStorage = (lang) => {
        if (localStorage.getItem("Words") === null || localStorage.getItem("Words") === "" || localStorage.getItem("Words") === undefined) {
            localStorage.setItem("Words", JSON.stringify([{
                word: this.state.word,
                wordtrans: this.state.wordtrans,
                language: lang
            }
            ]))
        } else {
            console.log(localStorage.getItem("Words"));
            let localStrObject = JSON.parse(localStorage.getItem("Words"));
            localStrObject.push({
                word: this.state.word,
                wordtrans: this.state.wordtrans,
                language: this.state.language
            });
            localStorage.setItem("Words", JSON.stringify(localStrObject));
        }

    };

    handleMyTab = () => {

        if (this.state.lang === "fr") {
            this.usingStorage("French")
        }


        if (this.state.lang === "ja") {

            this.usingStorage("Japanise")

        }
        if (this.state.lang === "es") {
             this.usingStorage("Spanish")
        }

    };

    render() {
        return (
            <>
                <NavMenuLogin/>
                <Spacing/>
                <WordOfDay/>
                <Spacing/>
                <SearchZone parent={this.handleWordTrans}/>
                <Spacing/>
                <PonsResponse refe={this.state.wordtrans}/>
                <Spacing/>
                <span className="pin" onClick={this.handleMyTab}><i className="fas fa-thumbtack"></i>Pin Translation to MyTab<i
                    className="fas fa-thumbtack"></i></span>
                <SpacingBig/>
                <Footer/>

            </>
        );
    }
}

class App extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route exact path="/" component={Main}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/logged" component={MainLogged}/>
                    <Route path="/mytab" component={MyTab}/>
                </Switch>
            </HashRouter>

        )
    }
}

export default App;

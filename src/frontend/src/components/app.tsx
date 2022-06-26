import React, { Component } from "react";
import ReactDOM from "react-dom/client";



export default class App extends Component {
    name;
    constructor(props) {
        super(props);
        this.name = 'MainApp';
    }
    // const element = <h1>Hello, world</h1>;
    render() {
        return (
            <div className="shopping-list" >
                <h1>Shopping List for { this.name } </h1>
                <ul>
                    <li> abcde </li>
                    <li>Instagram </li>
                    <li> Oculus </li>
                </ul>
            </div>
        );
    }
}

const appDiv =  document.getElementById("app");
const root = ReactDOM.createRoot(appDiv);
root.render(<App />)
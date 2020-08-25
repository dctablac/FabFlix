import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <p>Created By: Dan Tablac</p>
                <div className="social-media-icons">
                    <a href="https://www.facebook.com/dan.tablac"><img className="social-media-icon" src={require("../css/assets/facebook.png")} alt="fb"/></a>
                    <a href="https://www.linkedin.com/in/dan-christopher-tablac-a7a26217a/"><img className="social-media-icon" src={require("../css/assets/linkedin.png")} alt="ln"/></a>
                    <a href="https://www.github.com/dctablac"><img className="social-media-icon" src={require("../css/assets/github.png")} alt="gh"/></a>
                </div>
            </div>
        );
    }
}

export default Footer;
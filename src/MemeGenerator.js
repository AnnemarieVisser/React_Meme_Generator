import React, { Component } from "react"

class MemeGenerator extends Component {
    constructor() {
        super()
        this.state = {
            topText: "",
            bottomText: "",
            randomImage: "http://i.imgflip.com/1bij.jpg",
            allMemeImgs: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    async componentDidMount() {
        try {
            const response = await fetch("https://api.imgflip.com/get_memes");
            const memes = await response.json();
            this.setState({ allMemeImgs: memes });
            if (!response.ok) {
                throw Error(response.statusText);
            }
        } catch (error) {
            console.log(error);
        }
    }

    handleChange(event) {
        console.log('working!')
        console.log(event);
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    handleClick(event) {
        event.preventDefault()

        const randNum = Math.floor(Math.random() * 100)

        const randMemeImg = this.state.allMemeImgs.data.memes[randNum].url
        console.log(randMemeImg)
        this.setState({ randomImage: randMemeImg })
        console.log(this.state.randomImage)
    }

    render() {
        return (
            <div>
                <form className="meme-form">
                    <input
                        type="text"
                        name="topText"
                        value={this.state.topText}
                        placeholder="Top text"
                        onChange={this.handleChange}
                    />
                    <input
                        type="text"
                        name="bottomText"
                        value={this.state.bottomText}
                        placeholder="Bottom text"
                        onChange={this.handleChange}
                    />
                    <button onClick={this.handleClick}>Generate</button>
                </form>


                <div className="meme">
                    <img src={this.state.randomImage} alt="alt text" />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>

            </div>
        )
    }
}


export default MemeGenerator
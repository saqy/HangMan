import React, { Component } from 'react'

import './style.css'

const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

export default class Hangman extends Component {
  constructor(props) {
    super(props)
    this.state = {
      word: '',
      missedAttempts: 0,
      wordSlots: [],
      finalResult: null,
      isComplete: false
    }
  }

  componentWillMount() {
    this.newGame()
  }

  removeDuplicateCharacters(string) {
    return string
      .split('')
      .filter(function (item, pos, self) {
        return self.indexOf(item) == pos;
      })
      .join('');
  }


  createRandomWord(length) {
    var consonants = 'bcdfghjlmnpqrstv',
      vowels = 'aeiou',
      rand = function (limit) {
        return Math.floor(Math.random() * limit);
      },
      i, word = '', length = parseInt(length, 10),
      consonants = consonants.split(''),
      vowels = vowels.split('');
    for (i = 0; i < length / 2; i++) {
      var randConsonant = consonants[rand(consonants.length)],
        randVowel = vowels[rand(vowels.length)];
      word += (i === 0) ? randConsonant.toUpperCase() : randConsonant;
      word += i * 2 < length - 1 ? randVowel : '';
    }
    return this.removeDuplicateCharacters(word);
  }

  newGame = () => {

    let randomnumber = Math.floor(Math.random() * (5 - 3 + 1)) + 3;
    console.log(randomnumber);
    this.setState({ finalResult: this.createRandomWord(randomnumber).toLocaleUpperCase() });


    let wordSlots = new Array(randomnumber);
    this.setState({
      isComplete: false,
      missedAttempts: 0,
      wordSlots: wordSlots
    })
  }

  checkCharacter = e => {
    e.preventDefault()

    const character = e.target.value
    let temp = this.state.wordSlots;
    let finalResult = this.state.finalResult;
    console.log(finalResult);
    let idx = finalResult.indexOf(character);
    if (idx !== -1) {
      temp.splice(idx, 1, character);
    }
    else {
      this.setState({
        missedAttempts: this.state.missedAttempts + 1
      })
    }

    if (temp.join().replace(/,/g, '') === finalResult) {
      this.setState({ isComplete: true });
    }

    this.setState({
      wordSlots: temp
    })
  }

  getKeyboard = () => {
    return alphabets.map(letter =>
      <li key={letter}>
        <button value={letter} onClick={this.checkCharacter}>
          {letter}
        </button>
      </li>
    )
  }

  getSlots = length => {
    const { wordSlots } = this.state
    if (!length)
      length = 0

    let list = []

    for (let i = 0; i < length; i++) {
      list.push(<li key={i}>{wordSlots[i]}</li>)
    }
    return list
  }


  render() {

    const { missedAttempts, wordSlots, isComplete } = this.state

    return (

      <div>
        <div className="header">
          <div className="container">
            <div className="text-wrap">
              <ul>
                {this.getSlots(wordSlots.length)}
              </ul>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="container">
            <div className="character_detail">
              <ul>
                {this.getKeyboard()}
              </ul>
              <div className="reset_info">
                <ul>
                  <li>
                    <button onClick={this.newGame}>
                      <img src="images/reset.png" alt="reload" />
                    </button>
                    {isComplete &&
                      <p>
                        Congratulation, You Won :)
                      <br />press the above button to start again!
                    </p>
                    }
                    {
                      missedAttempts > 4 &&
                      <p>
                        ah , You Lose :(
                      <br />press the above button to try again!
                    </p>
                    }
                  </li>
                </ul>
              </div>
            </div>
            <div className="character_animation">
              <div className="cloud_wrap">
                <div className="cloud1">
                  <img src="images/cloud.png" alt="" />
                </div>
                <div className="cloud2">
                  <img src="images/cloud.png" alt="" />
                </div>
                <div className="clear"></div>
              </div>
              <div className="animation_person">
                <div className="ballon_wrap">
                  <img src="../images/ballon2.png" className={missedAttempts === 0 ? 'ballon1' : 'ballon1 hide'} alt="" />
                  <img src="images/ballon1.png" className={missedAttempts > 1 ? 'ballon2 hide' : 'ballon2'} alt="" />
                  <img src="images/ballon3.png" className={missedAttempts > 2 ? 'ballon3 hide' : 'ballon3'} alt="" />
                  <img src="images/ballon4.png" className={missedAttempts > 3 ? 'ballon4 hide' : 'ballon4'} alt="" />
                  <img src="images/ballon5.png" className={missedAttempts > 4 ? 'ballon5 hide' : 'ballon5'} alt="" />
                </div>
                <img className={missedAttempts > 4 ? 'animated hinge' : 'animated'} src="images/man.png" alt="" />
              </div>
            </div>
            <div className="clear"></div>
          </div>
        </div>
        <div className="footer">
          <div className="container"></div>
        </div>
      </div>
    )
  }
}

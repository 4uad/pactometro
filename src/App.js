import React from 'react';
import './App.css';

const parties = [
  {
    party : "PSOE",
    default : true,
    ideology : 1,
    seats : 123,
    color : "#EF1C27",
    active : false,
    vote : null,
    logo : "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Logotipo_del_PSOE.svg/80px-Logotipo_del_PSOE.svg.png"
  },
  {
    party : "PP",
    default: false,
    ideology : 8,
    seats : 66,
    color : "#1D84CE",
    active : false,
    vote : null,
    logo : "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/PP_icono_2019.svg/80px-PP_icono_2019.svg.png"
  },
  {
    party : "Ciudadanos",
    default: false,
    ideology : 7,
    seats : 57,
    color : "#EB6109",
    active : false,
    vote : null,
    logo : "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Ciudadanos_icono_2017.svg/80px-Ciudadanos_icono_2017.svg.png"
  },
  {
    party : "Unidas Podemos",
    default: true,
    ideology : 2,
    seats : 42,
    color : "#672F6C",
    active : false,
    vote : null,
    logo : "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/UPsimbol.svg/80px-UPsimbol.svg.png"
  },
  {
    party : "VOX",
    default: true,
    ideology : 9,
    seats : 24,
    color : "#63be21",
    active : false,
    vote : null,
    logo : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/VOX_logo.svg/80px-VOX_logo.svg.png"
  },
  {
    party : "ERC-SOBIRANISTES",
    default: true,
    ideology : 4,
    seats : 15,
    color : "#FFB232",
    active : false,
    vote : null,
    logo : "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Esquerra_Republicana_de_Catalunya-Sobiranistes_icono.svg/80px-Esquerra_Republicana_de_Catalunya-Sobiranistes_icono.svg.png"
  },
  {
    party : "JxCAT-JUNTS",
    default: true,
    ideology : 5,
    seats : 7,
    color : "#ED5975",
    active : false,
    vote : null,
    logo : "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Junts_per_Catalunya.svg/48px-Junts_per_Catalunya.svg.png"
  },
  {
    party : "EAJ-PNV",
    default: true,
    ideology : 6,
    seats : 6,
    color : "#008000",
    active : false,
    vote : null,
    logo : "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/EAJlogo.svg/60px-EAJlogo.svg.png"
  },
  {
    party : "EH Bildu",
    default: true,
    ideology : 3,
    seats : 4,
    color : "#b5cf18",
    active : false,
    vote : null,
    logo : "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/EHBilduLogoa2.png/44px-EHBilduLogoa2.png"
  },
  {
    party : "Navarra Suma",
    default: true,
    ideology : 6,
    seats : 2,
    color : "#2A52BE",
    active : false,
    vote : null,
    logo : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Logo_Navarra_Suma.png/47px-Logo_Navarra_Suma.png"
  },
  {
    party : "Coalición Canaria",
    default: true,
    ideology : 6,
    seats : 2,
    color : "#ffd700",
    active : false,
    vote : null,
    logo : "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Coalici%C3%B3n_Canaria.svg/45px-Coalici%C3%B3n_Canaria.svg.png"
  },
  {
    party : "Compromís",
    default: true,
    ideology : 2,
    seats : 1,
    color : "#E65F00",
    active : false,
    vote : null,
    logo : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Comprom%C3%ADs_%28isotip%29.svg/39px-Comprom%C3%ADs_%28isotip%29.svg.png"
  },
  {
    party : "PRC",
    default: true,
    ideology : 4,
    seats : 1,
    color : "#C2CE0C",
    active : false,
    vote : null,
    logo : "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Logo_PRC.svg/59px-Logo_PRC.svg.png"
  }
]

// Main app title

class Title extends React.Component {

  render() {
    const bgImg = {backgroundImage : "url(" + this.props.bg + ")"}

    let mainTitle = this.props.text

    if(this.props.secondary !== undefined) {
      mainTitle =  <>
                      {mainTitle}
                      <span className = "secondary-title">
                        <span className = "title-sep"> | </span>
                        {this.props.secondary}
                      </span>
                    </>
    }

    return(
      <>
      <div style = {bgImg} className = "title-bg">

      </div>
      <h1 className = "main-title">
          {mainTitle}
      </h1>

      </>
    )
  }
}

// Defines an individual Seat in parliament

class Seat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active : false,
      hovered : false
    }
    this.mouseEnter = this.mouseEnter.bind(this)
    this.mouseLeave = this.mouseLeave.bind(this)
  }

  mouseEnter() {
    this.setState({
      active : true,
      hovered : true
    })
  }

  mouseLeave() {
    this.setState({
      active : false,
      hovered : false
    })
  }

  render() {

    const seatStyle = {
      left : (50 + this.props.r * Math.cos(this.props.theta)) + "%",
      top : -(this.props.r * Math.sin(this.props.theta) - 50) + "%",
      color: this.props.color
    }

    const labelStyle = {
      left : (50 + this.props.r * Math.cos(this.props.theta)) + "%",
      top : -(this.props.r * Math.sin(this.props.theta) - 50) + "%",
      display : this.state.hovered ? "inline-block" : "none"
    }

    const seatClass = "seat" + (this.state.active ? " heartBeat" : "")

    let seat = <></>

    if(this.props.vote === true) {
        seat = <i className = {"fas fa-check-circle " + seatClass} style = {seatStyle} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} onClick = {() => this.props.switchFunc(this.props.party, false)} />
    }
    if(this.props.vote === false) {
        seat = <i className = {"fas fa-times-circle " + seatClass} style = {seatStyle} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} onClick = {() => this.props.switchFunc(this.props.party, null)} />
    }

    if(this.props.vote == null) {
        seat = <i className = {"fas fa-circle " + seatClass} style = {seatStyle} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} onClick = {() => this.props.switchFunc(this.props.party, true)} />
    }

    return(
      <>
        <span className = "seat-label" style = {labelStyle}>{this.props.party + " (" + this.props.seats + "):"}<br />{this.props.vote == null ? "Abstención" : (this.props.vote ? "Sí" : "No")}</span>
        {seat}
      </>
    )


  }
}

// Defines a parliament

class Parliament extends React.Component {

  render() {

    this.len = [120 * Math.PI];

    for(let i = 1; i < this.props.rows; i++) {
      this.len.push(this.len[0] * (1 + i/5))
    }

    this.seatLength = this.len.reduce( (a, b) => a + b) / this.props.seats

    this.rows = this.len.map( (r, i) => Math.round(r / this.seatLength) )

    const totalSeats = this.rows.reduce( (a, b) => a + b)

    if(totalSeats < this.props.seats) {
      this.rows[this.props.rows - 1] += this.props.seats - totalSeats
    }

    if(totalSeats > this.props.seats) {
      this.rows[this.props.rows - 1] -= totalSeats - this.props.seats
    }

    let partyOutput = {
      party: [],
      seats: [],
      votes: [],
      colors: [],
      active: []
    }

    for(let i = 0; i < this.props.rows; i++) {
      partyOutput.party.push(Array(this.rows[i]).fill(null))
      partyOutput.seats.push(Array(this.rows[i]).fill(null))
      partyOutput.votes.push(Array(this.rows[i]).fill(null))
      partyOutput.colors.push(Array(this.rows[i]).fill(null))
      partyOutput.active.push(Array(this.rows[i]).fill(false))
    }

    let theseParties = Array.from(this.props.parties)

    const parlParties = theseParties.sort((a, b) => a.ideology < b.ideology ? -1 : 1)

    let remainingSeatsTotal = this.props.seats
    let remainingSeats = parlParties.map((p, i) => p.seats)
    let thisRowSeats = []
    let seatCumSum = []
    let assignedSeats = 0
    let rowOutput = {
      party : [],
      seats : [],
      votes: [],
      colors: [],
      active: []
    }
    let minimumSeatsPerRow = 2
    let index = 0;

    for(let i = 0; i < this.props.rows; i++) {
      if(i === 1) {
        minimumSeatsPerRow = 3
      }

      thisRowSeats = remainingSeats.map( (p, j) => Math.round(p * this.rows[i] / remainingSeatsTotal) ).map( (p, j) => p < minimumSeatsPerRow ? (remainingSeats[j] < minimumSeatsPerRow && p > 0 ? remainingSeats[j] : 0) : p)
      assignedSeats = thisRowSeats.reduce( (a, b) => a + b)

      if(assignedSeats < this.rows[i]) {
        thisRowSeats = thisRowSeats.map( (p, j) => Math.round( p * this.rows[i] / assignedSeats))
        assignedSeats = thisRowSeats.reduce( (a, b) => a + b)
      }

      if(assignedSeats < this.rows[i]) {
        thisRowSeats[thisRowSeats.indexOf(Math.min(...thisRowSeats.filter(s => s > minimumSeatsPerRow)))] += this.rows[i] - assignedSeats
      }
      if(assignedSeats > this.rows[i]) {
        thisRowSeats[thisRowSeats.indexOf(Math.max(...thisRowSeats))] -= assignedSeats - this.rows[i]
      }


      seatCumSum = []

      thisRowSeats.reduce( function (a,b,i) { return seatCumSum[i] = a + b ; }, 0);

      rowOutput = {
        party : [],
        seats : [],
        votes: [],
        colors: [],
        active: []
      }

      index = 0;

      for(let j = 0; j < this.rows[i]; j++) {
        index = seatCumSum.findIndex(s => s > j)
        rowOutput.party.push(parlParties[index].party)
        rowOutput.seats.push(parlParties[index].seats)
        rowOutput.votes.push(parlParties[index].vote)
        rowOutput.colors.push(parlParties[index].color)
        rowOutput.active.push(parlParties[index].active)
      }

      partyOutput.party[i] = rowOutput.party
      partyOutput.seats[i] = rowOutput.seats
      partyOutput.votes[i] = rowOutput.votes
      partyOutput.colors[i] = rowOutput.colors
      partyOutput.active[i] = rowOutput.active

      remainingSeats = remainingSeats.map( (r, j) => r - thisRowSeats[j])
      remainingSeatsTotal = remainingSeats.reduce( (a, b) => a + b)
    }

    const thetaStepSize = this.rows.map((seats) => Math.PI / (seats - 1));
    const maxRadius = this.len[this.props.rows - 1]
    const normalizedRadius = this.len.map( (r, i) => r * 50 / maxRadius)
    const seats = this.rows.map((n, i) => (Array(n).fill(thetaStepSize[i]).map((t, j) => <Seat switchFunc = {this.props.switchFunc} party = {partyOutput.party[i][j]} seats = {partyOutput.seats[i][j]} r = {normalizedRadius[i]} theta = {Math.PI - t * j} vote = {partyOutput.votes[i][j]} color = {partyOutput.colors[i][j]} active = {partyOutput.active[i][j]} key = {"r" + i + "s" + j} />)));

    return(
      <div className = "parliament">
          {seats}
      </div>
    )
  }

}

class Switch extends React.Component {

  render() {

    const style = {
      backgroundColor : this.props.color
    }

    const styleBtn = {
      borderColor : this.props.color,
      backgroundColor : "white",
      backgroundImage : "url(" + this.props.logo + ")",
      transition: "left 0.7s"
    }

    if(this.props.position === true) {
      styleBtn.left = 0
    }

    if(this.props.position === false) {
      styleBtn.left = "100%"
    }

    return(
      <div style = {style} className = "switch">
        <div className = "switch-section" onClick = {() => this.props.switchFunc(this.props.party, true)} />
        <div className = "switch-section" onClick = {() => this.props.switchFunc(this.props.party, null)} />
        <div className = "switch-section" onClick = {() => this.props.switchFunc(this.props.party, false)} />
        <span className = "switch-label">{this.props.party + this.props.seats}</span>
        <div style = {styleBtn} className = "switch-btn" />
      </div>
    )
  }
}

class Button extends React.Component {
  render() {
    return(
      <button className = "grey-btn" onClick = {() => this.props.func(null)}><i className = {this.props.icon} /> {this.props.label}</button>
    )
  }
}

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      parties : parties
    }

    this.changeVote = this.changeVote.bind(this)
    this.changeAllVotes = this.changeAllVotes.bind(this)
  }

  changeVote(party, vote) {
    let p = Array.from(this.state.parties)
    const i = p.findIndex( o => o.party === party)

    for(let j = 0; j < p.len; j++) {
      p[j].active = false
    }

    p[i].vote = vote
    p[i].active = true

    this.setState({
      parties: p
    })
  }

  changeAllVotes(vote) {
    let p = Array.from(this.state.parties)

    for(let j = 0; j < p.length; j++) {
      p[j].active = p[j].vote !== vote ? true : false
      p[j].vote = vote
    }

    this.setState({
      parties: p
    })
  }

  render() {

    const switches = this.state.parties.map((o, i) => <Switch key = {i} party = {o.party} seats = {" (" + o.seats + ")"} switchFunc = {this.changeVote} color = {o.color} position = {o.vote} logo = {o.logo} />)

    return(
      <>
      <Title text = "Pactómetro" secondary = {"Elecciones generales"} bg = {"espana.jpg"} />
      <div className = "main-frame row">
        <div className = "col-lg-5 col-sm-12 switches">
          <div className = "switch-header">
            <span>Sí</span>
            <span>Abs.</span>
            <span>No</span>
          </div>
          {switches}
        </div>
        <div className = "col-lg-4 col-sm-12 parl">
          <Parliament seats = {350} rows = {10} parties = {this.state.parties} switchFunc = {this.changeVote} />
        </div>
        <div className = "col-lg-3 col-sm-12">
          <Button func = {this.changeAllVotes} label = "Reiniciar" icon = "fas fa-undo" />
        </div>
      </div>
      </>
    )
  }
}

export default App;

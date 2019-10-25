import React from 'react';
import './App.css';
import queryString from 'query-string'
import Draggable from 'react-draggable'

// Parties and their properties

const rowCount = 10
const seatCount = 350

const parties = [
  {
    key : "psoe",
    party : "PSOE",
    ideology : 1,
    seats : 123,
    color : "#EF1C27",
    vote : null,
    logo : "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Logotipo_del_PSOE.svg/80px-Logotipo_del_PSOE.svg.png"
  },
  {
    key : "pp",
    party : "PP",
    ideology : 8,
    seats : 66,
    color : "#1D84CE",
    vote : null,
    logo : "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/PP_icono_2019.svg/80px-PP_icono_2019.svg.png"
  },
  {
    key : "cs",
    party : "Ciudadanos",
    ideology : 7,
    seats : 57,
    color : "#EB6109",
    vote : null,
    logo : "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Ciudadanos_icono_2017.svg/80px-Ciudadanos_icono_2017.svg.png"
  },
  {
    key : "up",
    party : "Unidas Podemos",
    ideology : 2,
    seats : 42,
    color : "#672F6C",
    vote : null,
    logo : "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/UPsimbol.svg/80px-UPsimbol.svg.png"
  },
  {
    key : "vox",
    party : "VOX",
    ideology : 9,
    seats : 24,
    color : "#63be21",
    vote : null,
    logo : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/VOX_logo.svg/80px-VOX_logo.svg.png"
  },
  {
    key : "erc",
    party : "ERC-SOBIRANISTES",
    ideology : 4,
    seats : 15,
    color : "#FFB232",
    vote : null,
    logo : "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Esquerra_Republicana_de_Catalunya-Sobiranistes_icono.svg/80px-Esquerra_Republicana_de_Catalunya-Sobiranistes_icono.svg.png"
  },
  {
    key : "jx",
    party : "JxCAT-JUNTS",
    ideology : 5,
    seats : 7,
    color : "#ED5975",
    vote : null,
    logo : "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Junts_per_Catalunya.svg/48px-Junts_per_Catalunya.svg.png"
  },
  {
    key : "pnv",
    party : "EAJ-PNV",
    ideology : 6,
    seats : 6,
    color : "#008000",
    vote : null,
    logo : "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/EAJlogo.svg/60px-EAJlogo.svg.png"
  },
  {
    key : "ehb",
    party : "EH Bildu",
    ideology : 3,
    seats : 4,
    color : "#b5cf18",
    vote : null,
    logo : "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/EHBilduLogoa2.png/44px-EHBilduLogoa2.png"
  },
  {
    key : "ns",
    party : "Navarra Suma",
    ideology : 6,
    seats : 2,
    color : "#2A52BE",
    vote : null,
    logo : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Logo_Navarra_Suma.png/47px-Logo_Navarra_Suma.png"
  },
  {
    key : "cc",
    party : "Coalición Canaria",
    ideology : 6,
    seats : 2,
    color : "#ffd700",
    vote : null,
    logo : "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Coalici%C3%B3n_Canaria.svg/45px-Coalici%C3%B3n_Canaria.svg.png"
  },
  {
    key : "com",
    party : "Compromís",
    ideology : 2,
    seats : 1,
    color : "#E65F00",
    vote : null,
    logo : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Comprom%C3%ADs_%28isotip%29.svg/39px-Comprom%C3%ADs_%28isotip%29.svg.png"
  },
  {
    key : "prc",
    party : "PRC",
    ideology : 4,
    seats : 1,
    color : "#C2CE0C",
    vote : null,
    logo : "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Logo_PRC.svg/59px-Logo_PRC.svg.png"
  }
]

// App header

class Title extends React.Component {

  render() {
    const bgImg = {backgroundImage : "url(" + this.props.bg + ")"}

    let mainTitle = this.props.text

    // If there is a secondary title, we add it next to main title
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


// An individual seat (circle) in parliament with a tooltip.
class Seat extends React.Component {

  render() {

    // Position is defined in polar coordinates: theta (angle) and r (radius)
    const seatStyle = {
      left : (50 + this.props.r * Math.cos(this.props.theta)) + "%",
      top : -(this.props.r * Math.sin(this.props.theta) - 50) + "%",
      color: this.props.color
    }

    const labelStyle = {
      left : (50 + this.props.r * Math.cos(this.props.theta)) + "%",
      top : -(this.props.r * Math.sin(this.props.theta) - 50) + "%",
    }

    let seat = <></>

    // icon depends on vote. Clicking changes vote.
    if(this.props.vote === true) {
        seat = <i className = "fas fa-check-circle seat" style = {seatStyle} onClick = {() => this.props.switchFunc(this.props.party, false)} />
    }
    if(this.props.vote === false) {
        seat = <i className = "fas fa-times-circle seat" style = {seatStyle} onClick = {() => this.props.switchFunc(this.props.party, null)} />
    }

    if(this.props.vote == null) {
        seat = <i className = "fas fa-circle seat" style = {seatStyle} onClick = {() => this.props.switchFunc(this.props.party, true)} />
    }

    return(
      <div>
        <span className = "tool-tip" style = {labelStyle}>{this.props.party + " (" + this.props.seats + "):"}<br />{this.props.vote == null ? "Abstención" : (this.props.vote ? "Sí" : "No")}</span>
        {seat}
      </div>
    )


  }
}

// Automatically creates a parliament with a given number of rows and seats using Seat elements.
class Parliament extends React.Component {

  render() {

    // First row length
    this.len = [120 * Math.PI];

    // For the following rows, length is increased 20% each time
    for(let i = 1; i < this.props.rows; i++) {
      this.len.push(this.len[0] * (1 + i/5))
    }

    // Length available per seat = total length / number of seats
    this.seatLength = this.len.reduce( (a, b) => a + b) / this.props.seats

    // Number of seats per row
    this.rows = this.len.map( (r, i) => Math.round(r / this.seatLength) )

    // Calculates total seats based on seats per row * number of rows
    const totalSeats = this.rows.reduce( (a, b) => a + b)

    // If seats are missing, they are added to the last row
    if(totalSeats < this.props.seats) {
      this.rows[this.props.rows - 1] += this.props.seats - totalSeats
    }

    // If there are too many seats, they are taken from the last row
    if(totalSeats > this.props.seats) {
      this.rows[this.props.rows - 1] -= totalSeats - this.props.seats
    }

    // Properties for each party
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

    // Sorts parties from left-wing to right-wing
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
    let rowSeats = 0;

    function assignSeatRows(remaining, id) {
      return(
        remaining < minimumSeatsPerRow ? (remainingSeats[id] < minimumSeatsPerRow && remaining > 0 ? remainingSeats[id] : 0) : remaining
      )
    }

    function sumTwo(a, b) {
      return(a + b)
    }

    function seatDif(s, i) {
      return(s - thisRowSeats[i])
    }

    function cumSum(v) {
      let o = []
      let s = []
      let sum = 0
      for(let i = 0; i < v.length; i++) {
        s = v.slice(0, i + 1)
        sum = 0
        for(let j = 0; j < s.length; j++) {
          sum += s[j]
        }
        o[i] = sum
      }
      return o
    }

    function correspondingSeats(remain) {
      return(Math.round(remain * rowSeats / remainingSeatsTotal))
    }

    function remainderSeats(rowseats) {
      return(Math.round(rowseats * rowSeats / assignedSeats))
    }

    function greaterThanMin(x) {
      return(x > minimumSeatsPerRow)
    }


    // Asigns seats row by row to each party proportionally
    for(let i = 0; i < this.props.rows; i++) {
      if(i === 1) {
        // If a party's proportion on a row is less than 3 seats, it is moved to the next one (prevents seats of the same party from lying on thin columns)
        minimumSeatsPerRow = 3
      }

      rowSeats = this.rows[i]

      thisRowSeats = remainingSeats.map(correspondingSeats).map(assignSeatRows)
      assignedSeats = thisRowSeats.reduce(sumTwo)

      // Asigns seats
      if(assignedSeats < this.rows[i]) {
        thisRowSeats = thisRowSeats.map(remainderSeats)
        assignedSeats = thisRowSeats.reduce(sumTwo)
      }

      // Adjusts extra or missing seats
      if(assignedSeats < this.rows[i]) {
        thisRowSeats[thisRowSeats.indexOf(Math.min(...thisRowSeats.filter(greaterThanMin)))] += this.rows[i] - assignedSeats
      }
      if(assignedSeats > this.rows[i]) {
        thisRowSeats[thisRowSeats.indexOf(Math.max(...thisRowSeats))] -= assignedSeats - this.rows[i]
      }


      seatCumSum = cumSum(thisRowSeats);

      rowOutput = {
        party : [],
        seats : [],
        votes: [],
        colors: [],
        active: []
      }

      // Saves the asignment

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

      remainingSeats = remainingSeats.map(seatDif)
      remainingSeatsTotal = remainingSeats.reduce(sumTwo)
    }

    // Angle between seats (polar coordinate)
    const thetaStepSize = this.rows.map((seats) => Math.PI / (seats - 1));
    const maxRadius = this.len[this.props.rows - 1]
    // Radius relative to maximum (last row) radius
    const normalizedRadius = this.len.map( (r, i) => r * 50 / maxRadius)
    const seats = this.rows.map((n, i) => (Array(n).fill(thetaStepSize[i]).map((t, j) => <Seat switchFunc = {this.props.switchFunc} party = {partyOutput.party[i][j]} seats = {partyOutput.seats[i][j]} r = {normalizedRadius[i]} theta = {Math.PI - t * j} vote = {partyOutput.votes[i][j]} color = {partyOutput.colors[i][j]} active = {partyOutput.active[i][j]} key = {"r" + i + "s" + j} />)));

    return(
      <div className = "parliament">
          {seats}
      </div>
    )
  }

}

// Creates a sliding switch that changes votes.
class Switch extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      transition: 0.7, // Transition time when switch is moved
      width: 0 // Switch element width
    }
    this.handleDrag = this.handleDrag.bind(this);
    this.updateSize = this.updateSize.bind(this);
    this.renderDraggable = this.renderDraggable.bind(this);
  }

  componentDidMount() {
    this.updateSize() // Gets element width
    window.addEventListener('resize', this.updateSize);
  }

  componentWillUnmount() {
    this.updateSize()
    window.removeEventListener('resize', this.updateSize);
  }


  updateSize() { // updates element width on window resize
    this.setState({
      width: this.switch.offsetWidth
    })
    this.left = this.switch.offsetLeft;
  }

  handleDrag(e) { // updates party vote when drag stops
    let x = e.pageX
    if(x === undefined || x === null) {
      x = e.changedTouches[0].clientX
    }
    let limits = []

    limits[0] = this.left + this.state.width / 3
    limits[1] = limits[0] + this.state.width / 3

    if(x < limits[0]) {
      this.props.switchFunc(this.props.party, true)
    } else if(x < limits[1]) {
      this.props.switchFunc(this.props.party, null)
    } else {
      this.props.switchFunc(this.props.party, false)
    }
  }

  renderDraggable(s) { // renders the draggable button once this.state.width is ready
    let posX = 0

    // Initial position is determined by party vote.
    if(this.props.position === true) {
      posX = -this.state.width/2 + 20
    }

    if(this.props.position === false) {
      posX = this.state.width/2 - 20
    }

    return(
      <Draggable position = {{x: posX, y: 0}} bounds = "parent" axis="x" onStop = {e => this.handleDrag(e)}>
        <div style = {s} className = "switch-btn" />
      </Draggable>
    )
  }

  render() {

    const style = {
      backgroundColor : this.props.color
    }

    let styleBtn = {
      borderColor : this.props.color,
      backgroundImage : "url(" + this.props.logo + ")",
      transition: "transform " + this.state.transition + "s"
    }

    return(
      <div style = {style} ref = {(e) => this.switch = e} className = "switch" onMouseDown = {() => this.setState({transition : 0})} onMouseUp = {() => this.setState({transition : 0.7})}>
        <div className = "switch-section" onClick = {() => this.props.switchFunc(this.props.party, this.props.position === true ? null : true)} />
        <div className = "switch-section" onClick = {() => this.props.switchFunc(this.props.party, this.props.position == null ? true : null)} />
        <div className = "switch-section" onClick = {() => this.props.switchFunc(this.props.party, this.props.position === false ? null : false)} />
        <span className = "switch-label">{this.props.party + this.props.seats}</span>
        {this.state.width && this.renderDraggable(styleBtn)}
      </div>
    )
  }
}

// Generic grey button that performs an action on click.
class Button extends React.Component {
  render() {
    const icon = this.props.icon.length > 0 ? <i className = {this.props.icon} /> : <></>

    return(
      <button className = "grey-btn" onClick = {(e) => this.props.func(e, null)}>{icon}{this.props.label}</button>
    )
  }
}

// Graphic showing yes votes vs. no votes.
class Majorities extends React.Component {
  render() {
    const props = [this.props.yes, this.props.neutral, this.props.no]
    const total = props.reduce((a,b) => a+b)
    // Gets the angle that each option should take.
    const angles = props.map((x, i) => Math.PI * x / total)

    // Calculates simple and absolute majorities
    const majAbs = total % 2 === 0 ? total / 2 + 1 : Math.floor(total / 2) + 1
    const majSim = props[2] + 1

    // Calculates rotation angles for majority lines
    const majSimpleRot = {
      display: majSim >= majAbs || props[0] >= majAbs ? "none" : "inline-block",
      transform: "translateY(-50%) rotate(" + -Math.PI * (1 - majSim / total) + "rad)"
    }

    const majAbsRot = {
      transform: "translateY(-50%) rotate(" + -Math.PI * (1 - majAbs / total) + "rad)"
    }

    return(
      <div className="parliament">
        <div className = "maj-center" />
        <div className = "maj simple" style = {majSimpleRot}><span><span className = "maj-check" style = {{opacity: props[0] >= majSim ? 1 : 0}} role = "img" aria-label = "Mayoría alcanzada">✅</span>{"May. simple (" + majSim + ")"}</span></div>
        <div className = "maj abs" style = {majAbsRot}><span><span className = "maj-check" style = {{opacity: props[0] >= majAbs ? 1 : 0}} role = "img" aria-label = "Mayoría alcanzada">✅</span>{"May. absoluta (" + majAbs + ")"}</span></div>
        <div className= "votes-overlay" />
        <div className= "votes votes-true" style = {{transform: "translate(-50%, -50%) rotate(" + angles[0] + "rad)"}} />
        <div className= "votes votes-neutral" />
        <div className= "votes votes-false"style = {{transform: "translate(-50%, -50%) rotate(-" + angles[2] + "rad)"}} />
      </div>
      // Circle rotates to take corresponding angle
    )
  }
}

// A count for votes on each option and the result
class Count extends React.Component {

  render() {
    const votes = [this.props.yes, this.props.neutral, this.props.no];
    const names = ["Sí", "Abstención", "No"];
    const count = votes.map( (v, i) => <div className = "result-component" key = {i}><span>{names[i]}</span><div>{v}</div>{v > 0 ? <div className = "tool-tip">{this.props.parties.filter(o => o.vote === (i === 0 ? true : (i === 1 ? null : false))).map((p, j) => <div key = {j} className = "switch-btn" style = {{borderColor: p.color, backgroundImage: "url(" + p.logo + ")"}} />)}</div> : <></>}</div>)
    // Checks if there's simple (1) or absolute majority (0), or none (2)
    const resultid = votes[0] / votes.reduce((a,b) => a+b) > .5 ?  0 : (votes[0] > votes[2] ?  1 : 2)
    const results = [<>Mayoría<br />absoluta<br /><span role="img" aria-label="Hay mayoría absoluta">🤝</span></>, <>Mayoría<br />simple<br /><span role ="img" aria-label="Hay mayoría simple">🤝</span></>, <>Sin<br />mayoría<br /><span role="img" aria-label="No hay mayorías">👎</span></>]

    return(
      <div className = "count">
        {count}
        <div key = {"result" + resultid} className = "count-result"><span>{results[resultid]}</span></div>
      </div>
    )
  }
}

// Creates a pre-populated textarea with a "Copy" button.
class Copiable extends React.Component {
  constructor(props) {
    super(props)
    this.copyToClipboard = this.copyToClipboard.bind(this)
    this.state = {
      copied : false
    }
  }

  // Handles "Copy" button click
  copyToClipboard(e) {
    this.textArea.select()
    document.execCommand('copy')
    e.target.focus()
    this.setState({
      copied: true
    })
  } // Button text changes to "Copiado" if copy was succesful

  render() {
    const btn = this.state.copied ? <><i className="fas fa-check"></i> Copiado</> : <><i className="far fa-clipboard"></i> Copiar</>

    return(
      <div className = "copiable">
        <textarea ref = {(textarea) => this.textArea = textarea} readOnly = {true} defaultValue = {this.props.children} />
      {document.queryCommandSupported('copy') &&
      <button onClick = {(e) => this.copyToClipboard(e)}>{btn}</button>}
      </div>
      // Renders the copy button only if feature is supported by browser
    )
  }
}

// Shows a modal dialog with a title and content.
class ShareDialog extends React.Component {
  render() {
    return(
      <div className = "card dialog-box">
        <h5>{this.props.title}</h5>
        <p>{this.props.label}</p>
        {this.props.children}
      </div>
    )
  }
}

// Root App element
class App extends React.Component {

  constructor(props) {
    super(props);

    // Parses URL for pre-defined votes.
    const query = queryString.parse(this.props.location.search)

    let initialParties = Array.from(parties)

    // Saves URL query votes in state
    for(let i = 0; i < initialParties.length; i++) {
      if(Object.keys(query).includes(initialParties[i].key)) {
        initialParties[i].vote = query[initialParties[i].key] === "1" ? true : (query[initialParties[i].key] === "0" ? false : null)
      }
    }

    this.state = {
      parties : initialParties,
      dialog : false
    }

    this.changeVote = this.changeVote.bind(this)
    this.changeAllVotes = this.changeAllVotes.bind(this)
    this.toggleDialog = this.toggleDialog.bind(this)
  }

  // Changes votes of party "party" to "vote" and updates URL
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

    let currentUrlParams = new URLSearchParams(window.location.search)
    if(vote == null) {
      currentUrlParams.delete(p[i].key)
    } else {
      currentUrlParams.set(p[i].key, vote ? 1 : 0)
    }
    this.props.history.push(window.location.pathname + "?" + currentUrlParams.toString())
  }

  // Changes all votes to "vote" and updates URL
  changeAllVotes(e, vote) {
    let p = Array.from(this.state.parties)
    let currentUrlParams = new URLSearchParams(window.location.search)

    for(let j = 0; j < p.length; j++) {
      p[j].active = p[j].vote !== vote ? true : false
      p[j].vote = vote
      currentUrlParams.delete(p[j].key)
    }

    this.props.history.push(window.location.pathname + "?" + currentUrlParams.toString())

    this.setState({
      parties: p
    })
  }

  // Toggles modal dialog
  toggleDialog(e) {
    e.preventDefault()
    if(e.target === e.currentTarget) {
      this.setState({
        dialog: !this.state.dialog
      })
   }
  }

  render() {

    // Array of vote changing switches. One for each defined party.
    const switches = this.state.parties.map((o, i) => <Switch key = {i} party = {o.party} translate = {o.party === this.state.dragging ? this.state.switch_translate : 0} seats = {" (" + o.seats + ")"} switchFunc = {this.changeVote} color = {o.color} position = {o.vote} logo = {o.logo} />)
    // Summary of votes
    const votes = [true, false, null].map(x => this.state.parties.filter(y => y.vote === x).map(o => o.seats).reduce( (a, b) => a + b, 0) )
    // Reset button. Only renders if at least one vote is casted.
    const button = votes[0] + votes[1] > 0 ? <Button func = {this.changeAllVotes} label = "Reiniciar" icon = "fas fa-undo" /> : <></>

    return(
      <>
        {this.state.dialog ? <div className = "overlay" onClick = {(e) => this.toggleDialog(e)}><ShareDialog title = "Compartir pacto" label = "Usa este link para compartir tu pacto" btn = "Ok"><Copiable>{window.location.href}</Copiable><Button label = "Ok" icon = "" func = {this.toggleDialog} /></ShareDialog></div> : <></>}
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
          <div className = "col-lg-6 col-sm-12">
            <div className = "row">
              <div className = "col-lg-6 col-sm-12 button-middle">
                {button}
                <Majorities yes = {votes[0]} no =  {votes[1]} neutral =  {votes[2]} />
                <Count yes = {votes[0]} no =  {votes[1]} neutral =  {votes[2]} parties = {this.state.parties} />
                <div className = "row social">
                  <div className = "col-6">
                    <Button label = "Compartir pacto" icon = "fas fa-share-alt" func = {this.toggleDialog} />
                  </div>
                  <div className = "col-6">
                    <a className = "twitter-share-button" href={encodeURI("https://twitter.com/intent/tweet?text=Mira el pacto de investidura que he creado: ") + window.location.href.replace(/&/g, "%26")} target = "_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i>Compartir en Twitter</a>
                  </div>
                </div>
              </div>
              <div className = "col-lg-6 col-sm-12 column-up">
                <Parliament seats = {seatCount} rows = {rowCount} parties = {this.state.parties} switchFunc = {this.changeVote} />
              </div>
            </div>

          </div>
        </div>
      </>
    )
  }
}

export default App;

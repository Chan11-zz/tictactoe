import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                b: [
                    ['-', '-', '-'],
                    ['-', '-', '-'],
                    ['-', '-', '-']
                ],
                player: 'x',
                winner: null,
                bool: true,
                track: []
            };
            this.update = this.update.bind(this);
            this.findRow = this.findRow.bind(this);
            this.findCol = this.findCol.bind(this);
            this.display = this.display.bind(this);
            this.checkWinner = this.checkWinner.bind(this);
            this.displayWinner = this.displayWinner.bind(this);
            this.reset = this.reset.bind(this);
        }
        display(id) {
            this.state.track.push(id)
            this.setState({ track: this.state.track })
            //console.log(this.state.track);
            var btn = document.getElementById(id);
            btn.innerHTML = this.state.player;
            //console.log(id);
            return
        }
        update(number) {

            if (this.state.bool) {
                //console.log("in update & player is ", this.state.player);
                this.display(number);
                this.setState({ player: 'o', bool: false });
            } else {
                //console.log("in update & player is ", this.state.player);
                this.display(number);
                this.setState({ player: 'x', bool: true });
            }
            var row = this.findRow(number);
            var col;
            (number > 2) ? col = this.findCol(number): col = number;
            this.state.b[row][col] = this.state.player;
            this.setState({
                b: this.state.b
            });
            //console.log(this.state.b);

            this.displayWinner();
        }

        displayWinner() {
            var winner = this.checkWinner();
            (winner == 10) ? this.setState({ winner: 'X' }): (winner == -10) ? this.setState({ winner: '0' }) : null;
        }
        reset() {
            this.state.track.map(function(item) {
                var btn = document.getElementById(item);
                btn.innerHTML = "";
            }.bind(this));
            this.setState({
                b: [
                    ['-', '-', '-'],
                    ['-', '-', '-'],
                    ['-', '-', '-']
                ],
                player: 'x',
                winner: null,
                bool: true,
                track: []
            });
        }
        findRow(number) {
            var row;
            switch (number) {
                case 0:
                case 1:
                case 2:
                    row = 0;
                    break;
                case 3:
                case 4:
                case 5:
                    row = 1;
                    break;
                case 6:
                case 7:
                case 8:
                    row = 2;
                    break;
            }
            return row;
        }
        findCol(number) {
                var col;
                switch (number) {
                    case 3:
                        col = 0;
                        break;
                    case 4:
                        col = 1;
                        break;
                    case 5:
                        col = 2;
                        break;
                    case 6:
                        col = 0;
                        break;
                    case 7:
                        col = 1;
                        break;
                    case 8:
                        col = 2;
                        break;
                }
                return col;
            }
            //
        checkWinner() {
            // Checking for Rows for X or O victory.
            for (var row = 0; row < 3; row++) {
                if (this.state.b[row][0] == this.state.b[row][1] &&
                    this.state.b[row][1] == this.state.b[row][2]) {
                    if (this.state.b[row][0] == 'x')
                        return +10;
                    else if (this.state.b[row][0] == 'o')
                        return -10;
                }
            }

            // Checking for Columns for X or O victory.
            for (var col = 0; col < 3; col++) {
                if (this.state.b[0][col] == this.state.b[1][col] &&
                    this.state.b[1][col] == this.state.b[2][col]) {
                    if (this.state.b[0][col] == 'x')
                        return +10;

                    else if (this.state.b[0][col] == 'o')
                        return -10;
                }
            }

            // Checking for Diagonals for X or O victory.
            if (this.state.b[0][0] == this.state.b[1][1] && this.state.b[1][1] == this.state.b[2][2]) {
                if (this.state.b[0][0] == 'x')
                    return +10;
                else if (this.state.b[0][0] == 'o')
                    return -10;
            }

            if (this.state.b[0][2] == this.state.b[1][1] && this.state.b[1][1] == this.state.b[2][0]) {
                if (this.state.b[0][2] == 'x')
                    return +10;
                else if (this.state.b[0][2] == 'o')
                    return -10;
            }

        }

//
	render() {
		var creator=[0,3,6].map(function(item,index){
			return <Table number={item} key={index} update={this.update} player={this.state.player}/>
		}.bind(this));
		var winner;
		(this.state.winner) ? winner='Winner:"'+ this.state.winner +'"' : winner=""
		return (
			<div>
			<div id="heading">Tic Tac Toe</div>
			<div id="selection"><p>Player 1: "X" , Player 2: "O"</p></div>
			<table>
				<tbody>
					{creator}
				</tbody>
			</table>
			<div id="winner">{winner}</div>
			<div><button id="reset" onClick={this.reset}>Reset</button></div>
			</div>
		);
	}
};

class Table extends React.Component{
	render() {
		return (
			<tr>
				<td><Button id={this.props.number} update={this.props.update} /></td>
				<td><Button id={this.props.number+1} update={this.props.update} /></td>
				<td><Button id={this.props.number+2} update={this.props.update} /></td>
			</tr>
		);
	}
};

class Button extends React.Component{
	render() {
		return (
			<button className="btn" id={this.props.id} onClick={
				() => {
					this.props.update(this.props.id);
				} 
			}></button>
		);
	}
};

ReactDOM.render(<App/>,document.querySelector('.container'));

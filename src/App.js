import { Component } from "react";
import Result from "./Result";

class App extends Component {
  state = {
    people: [],
  };
  handleSubmit = (e) => {
    this.setState({ people: [] });
    e.preventDefault();
    const character = e.target["Character"].value;
    let i = 1;
    while (i <= 9) {
      fetch(`https://swapi-thinkful.herokuapp.com/api/people/?page=${i}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error(response.statusText);
        })
        .then((responseJson) => {
          responseJson.results.forEach((element) => {
            if (element.name.includes(character)) {
              this.setState({
                people: [...this.state.people, element.name],
              });
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
      i++;
    }
  };
  render() {
    return (
      <div>
        <h1>Star Wars API</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="inputdiv">
            <label htmlFor="Character">Character: </label>
            <input type="text" name="Character" id="Character" required />
          </div>
          <br />
          <input type="submit" value="Search" />
        </form>
        <ul>
          {this.state.people.map((e, i) => (
            <li key={i}>
              <Result name={e} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;

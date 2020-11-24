import { Component } from "react";
import Result from "./Result";
import Loader from "react-loader-spinner";
class App extends Component {
  state = {
    result: [],
    loader: false,
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ result: [], loader: true });
    setTimeout(() => {
      this.setState({ loader: false });
    }, 3000);
    const character = e.target["Character"].value;
    e.target["Character"].value = "";
    const resource = e.target["resource"].value;
    fetch(`https://swapi-thinkful.herokuapp.com/api/${resource}/`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then((responseJson) => {
        let i = Math.ceil(responseJson.count / 10);
        for (let x = 1; x <= i; x++) {
          fetch(
            `https://swapi-thinkful.herokuapp.com/api/${resource}/?page=${x}`
          )
            .then((res) => {
              if (res.ok) return res.json();
            })
            .then((result) => {
              result.results.forEach((element) => {
                if (resource === "films") {
                  if (element.title.includes(character)) {
                    this.setState({
                      result: [...this.state.result, element.title],
                      loader: false,
                    });
                  }
                } else {
                  if (element.name.includes(character)) {
                    this.setState({
                      result: [...this.state.result, element.name],
                      loader: false,
                    });
                  }
                }
              });
            })
            .catch((error) => {
              console.error({ error });
            });
        }
      });
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
          <div className="inputdiv">
            <label htmlFor="resource">Resource Type</label>
            <select id="resource" name="folderId" required>
              <option value="people">Characters</option>
              <option value="planets">Planets</option>
              <option value="starships">Starships</option>
              <option value="vehicles">Vehicles</option>
              <option value="films">Films</option>
              <option value="species">Species</option>
            </select>
          </div>
          <br />
          <input type="submit" value="Search" />
          <br />
          <br />
        </form>
        <ul>
          {this.state.loader ? (
            <Loader type="ThreeDots" color="Black" timeout={3000} />
          ) : (
            this.state.result.map((e, i) => (
              <li key={i}>
                <Result name={e} />
              </li>
            ))
          )}
        </ul>
      </div>
    );
  }
}

export default App;

// import React, { Component } from "react";
// import logo from "./logo.svg";
// import axios from "axios";
// import "./App.css";

// // tutorial credit https://upmostly.com/tutorials/using-axios-with-react-api-requests
// export class App extends Component {
//   componentDidMount() {
//     axios
//       .get("http://localhost:8080/api/tasks")
//       .then(response => {
//         // this.setState({ imageURL: response.data.message });
//         console.log(response.data);
//       })
//       .catch(error => {
//         console.log(error);
//       });
//     // fetch("http://localhost:8080/api/tasks")
//     //   .then(response => response.json())
//     //   .then(data => this.setState({ data }));
//   }
//   constructor(props) {
//     super(props);
//     this.state = {
//       imageURL: ""
//     };
//   }
//   render() {
//     const { imageURL } = this.state;
//     return <img src={imageURL} alt="loading" />;
//   }
// }

// export default App;

import React, { Component } from "react";
import Header from "./components/layout/Header";
import "./App.css";
import axios from "axios";
import Todos from "./components/Todos";
import AddTodo from "./components/AddTodo";

class App extends Component {
  state = {
    todos: []
  };

  componentDidMount() {
    axios
      .get("http://localhost:8080/api/tasks")
      .then(res => this.setState({ todos: res.data }));
  }
  // componentDidMount() {
  //   axios
  //     .get("http://localhost:8080/api/tasks")
  //     .then(response => {
  //       // this.setState({ imageURL: response.data.message });
  //       console.log(response.data);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }
  markComplete = id => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
          axios
            .get(`http://localhost:8080/api/completed?id=${id}`)
            .then(console.log("worked"));
        }
        return todo;
      })
    });
  };

  delTodo = id => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`).then(res =>
      this.setState({
        todos: [...this.state.todos.filter(todo => todo.id !== id)]
      })
    );
  };

  addTodo = title => {
    // const newTodo = {
    //   id: uuid.v4(),
    //   title,
    //   complete: false
    // }
    axios
      .post("https://jsonplaceholder.typicode.com/todos", {
        title,
        complete: false
      })
      .then(res => this.setState({ todos: [...this.state.todos, res.data] }));
  };
  render() {
    return (
      <div className="App">
        <div className="container">
          <Header />
          <AddTodo AddTodo={this.addTodo} />
          <Todos
            todos={this.state.todos}
            markComplete={this.markComplete}
            delTodo={this.delTodo}
          />
        </div>
      </div>
    );
  }
}

export default App;

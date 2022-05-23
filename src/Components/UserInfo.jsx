import React from 'react';
import {getUser, getUserTodos} from '../helper/users';

export class UserInfo extends React.Component {
  state = {
    user: null,
    todos: [],
  };

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.userId !== this.props.userId) {
      this.loadData();
    }
  }

  async loadData() {
    const [user, todos] = await Promise.all([
      getUser(this.props.userId),
      getUserTodos(this.props.userId),
    ]);

    this.setState({ user, todos });
  }

  render() {
    const { todos, user } = this.state;

    if (!user) {
      return 'Loading...'
    }

    return (
      <div className="card">
        <div className="card-content">
          <div className="media">
            <div className="media-content">
              <p className="title is-4">{user.name}</p>
              <p className="subtitle is-6">{user.email}</p>
            </div>
          </div>

          <div className="content">
            <p className="title is-5">Todos:</p>

            {todos.map(todo => (
              <li key={todo.id}>
                <label className="checkbox">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    readOnly
                  />
                  {todo.title}
                </label>
              </li>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

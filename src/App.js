import React from 'react';
import 'bulma';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.css';
import classnames from 'classnames';

import { UsersTable } from './Components/UsersTable';
import { getUsers } from './helper/users';
import { UserInfo } from './Components/UserInfo';
import { LoadingError } from "./Components/LoadingError";

class App extends React.Component {
  state = {
    users: [],
    userId: 0,
    loading: false,
    hasLoadingError: false,
  };

  loadUsers = async () => {
    this.setState({
      loading: true,
      hasLoadingError: false,
      isInitialized: false,
    })

    try {
      const users = await getUsers();
      this.setState({
        users,
        loading: false,
        isInitialized: true,
      });
    } catch {
      this.setState({
        hasLoadingError: true,
        loading: false
      })
    }
  }

  render() {
    const {
      users,
      userId,
      loading,
      hasLoadingError,
      isInitialized,
    } = this.state;

    return (
      <section className="section">
        <div className="container">
          <h1 className="title">Mate Academy</h1>

          <div className="columns is-mobile">
            <div className="column">
              {!isInitialized ? (
                <button
                  className={classnames('button', 'is-link', {
                    'is-loading': loading
                  })}
                  onClick={this.loadUsers}
                >
                  Load users
                </button>
              ) : (
                 users.length > 0 ? (
                   <UsersTable
                     users={users}
                     selectedUserId={userId}
                     selectUser={(userId) => {
                       this.setState({userId})
                     }}
                   />
                 ) : (
                   'No users yet'
                 )
              )}
            </div>

            {userId !== 0 && (
              <div className="column">
                <UserInfo
                  userId={userId}
                />
              </div>
            )}
          </div>

          {hasLoadingError && <LoadingError />}
        </div>
      </section>
    );
  }
}

export default App;


// @flow
import React, { Component } from 'react';
import Field from '../../ui/Field';
import styles from './styles.css';

type Props = {
  history: Object;
};

type State = {
  name: string,
  password: string,
  passwordConf: string,
  showReg: boolean,
  answear: string,
};

export default class Login extends Component<Props, State> {
  state = {
    name: '',
    password: '',
    passwordConf: '',
    showReg: false,
    answear: '',
  }

  reg = () => {
    const { history } = this.props;
    const { name, password, passwordConf } = this.state;
    console.log('login', this.state);
    fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      // body: JSON.stringify(this.state),
      body: JSON.stringify({ query: `{reg(name:"${name}", password:"${password}", passwordConf:"${passwordConf}"){error,message,token}}` }),
    })
      .then((res: Object) => res.json())
      .then((resp: Object) => {
        if (resp.data.reg.error === 0) {
          localStorage.setItem('token', resp.data.reg.token);
          history.push('/main');
        }
        if (resp.data.reg.error === 1000) {
          this.setState({ answear: resp.data.reg.message }) 
        }
      });
  }

  login = () => {
    const { history } = this.props;
    const { name, password } = this.state;

    console.log('login', this.state);
    fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      // body: JSON.stringify(this.state),
      body: JSON.stringify({ query: `{login(name:"${name}", password:"${password}"){error,message,token}}` }),
    })
      .then(res => res.json())
      .then((resp) => {
        if (resp.data.login.error === 0) {
          localStorage.setItem('token', resp.data.login.token);
          history.push('/main');
        }
        if (resp.data.login.error === 1000) {
          this.setState({ answear: resp.data.login.message }) 
        }
      });
  }

  fb = () => {
    window.location.href = 'http://localhost:3005/api/auth/facebook';
  }

  updateFields = (text: string, name: string) => {
    const updateData = {};

    updateData[name] = text;

    this.setState(updateData);
  }

  render() {
    const {
      name,
      password,
      passwordConf,
      showReg,
      answear,
    } = this.state;

    return (
      <div className={styles.container}>
        <div className={styles.name}>
          {showReg ? 'Sing up' : 'Sing in'}
        </div>
        <div className={styles.fields}>
          <div className={styles.answear}>
            {answear}
          </div>
          <Field
            type="text"
            name="name"
            placeholder="login"
            value={name}
            updateFields={this.updateFields}
          />
          <Field
            type="password"
            name="password"
            placeholder="password"
            value={password}
            updateFields={this.updateFields}
          />
          {showReg
            && <>
              <Field
                type="password"
                name="passwordConf"
                placeholder="confirm password"
                value={passwordConf}
                updateFields={this.updateFields}
              />
            </>
          }
        </div>
        <div onClick={showReg ? this.reg : this.login} className={`${styles.btn} ${styles['btn-login']}`}>
          Continue
        </div>
        <div onClick={() => {this.setState({showReg: !showReg})}} className={`${styles.btn} ${styles['btn-change']}`}>
          {showReg ? 'Sing in' : 'Sing up'}
        </div>
        <div onClick={this.fb} className={`${styles.btn} ${styles['btn-change']}`}>
          FB
        </div>
      </div>
    );
  }
}

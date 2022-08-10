import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
//import AuthService from '../../service/auth-service';
//import API from '../../config';
//import { setToken, setProfile, setNickname } from '../../utils';
import styled from 'styled-components';
import './css/Login.css';

const Login = () => {
  const navigate = useNavigate();

  const goToMain = () => {
    navigate('/boardList');
  };


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [data, setData] = useState('');

  //일반 로그인
  let loginok = localStorage.loginok;
  useEffect (()=> {

  },[loginok])


  const onSubmit = e => {
    e.preventdefalut();
    console.log('Received values of form: ', e);
    axios.post("http://localhost/9001/user/Login", {username,password})
    .then(res => {
        if(res.data === 0){
            console.log('username',username)
            console.log('pass',password)
            alert("아이디 또는 비밀번호가 맞지 않습니다")
        }else{
            localStorage.loginok='yes';
            localStorage.myname=username;
            goToMain();
          }
        })
      }
  
  // 밑에는 JWT
  /*
    axios.get(idCheckURL + username).then(res => {
      if (res.data === 0) {
        alert('존재하지 않은 아이디 입니다.');
      } else {
        axios
          .post(loginchkurl, { username, password, withCredentials: true })
          .then(res => {
            if (res.data === 0) {
              alert('비밀번호가 맞지 않습니다.');
            } else {
              AuthService.login(username, password, {
                withCredentials: true,
              }).then(res => {
                console.log(res);
                localStorage.loginok = 'yes';
                localStorage.username = username;
                const jwttoken = res.token;
                const profile = res.profile;
                //window.location.reload(); //새로고침

                //USER정보 불러오기
                AuthService.getProfile(username).then(res => {
                  setToken(jwttoken);
                  goToMain();
                });
              });
            }
          });
      }
    });
  };
  */


  return (
    <LoginSection>
      <LoginBox>
        <div className="regis-form">
          <br />
          <form onSubmit={onSubmit}>
            <img alt="" 
            // src={duckimg}
            style={{ width: '80px' }} />
            <div className="int-area">
              <input
                type="text"
                name="username"
                id="username"
                autoComplete="off"
                required
                onChange={e => {
                  setUsername(e.target.value);
                }}
              />
              <label>USER NAME</label>
            </div>
            <div className="int-area">
              <input
                type="password"
                name="password"
                id="password"
                autoComplete="off"
                required
                onChange={e => {
                  setPassword(e.target.value);
                }}
              />
              <label>PASSWORD</label>
            </div>
            <div className="btn-area">
              <button type="submit">LOGIN</button>
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div className="caption">
              <a href="/forgotPassword">Forgot Password?</a> /{' '}
              <a href="/register">Register</a>
            </div>
            <br />
            <br />
            <br />
          </form>
        </div>
      </LoginBox>
    </LoginSection>
  );
};

export default Login;


const LoginSection = styled.section`
  min-height: calc(100vh - 500px);
  padding: 130px 0 200px;
  text-align: center;
  ${props => props.theme.wrapper};
`;

const LoginBox = styled.div`
  width: 420px;
  margin: 0 auto;
  padding: 30px 20px;
  border: 1px solid #eee;
`;


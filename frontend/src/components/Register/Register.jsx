import React, { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { setToken, setProfile, setNickname } from '../../utils';
import styled from 'styled-components';
import './css/register.css';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Button from '@mui/material/Button';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { appendErrors, useForm } from 'react-hook-form';
import { getValue } from '@testing-library/user-event/dist/utils';
import axios from 'axios';

const Register = () => {
    const navi = useNavigate();
    const favoriteBtn = useRef(null);
    //HOOK FORM
    const {
        register,
        handleSubmit,
        watch,
        trigger,
        setValue,
        getValues,
        formState: { isSubmitting, isDirty, errors },
    } = useForm({
        mode: 'onChange',
    });

    const onSubmit = async data => {
        await new Promise(r => setTimeout(r, 1000));
        console.log(data, errors);

        if (!btnOk) {
            alert('아이디 중복체크를 해주세요');
            return;
        }
        //회원가입 axios
        const signupurl = 'http://localhost:9001/user/register';
        axios.post(signupurl, data).then(res => {
            console.log(res.data);
            //프로필사진 넣기 axios
            const username = setValue('username');
            const insertProfileUrl = 'http://localhost:9001/api/instprf';
            axios
                .post(insertProfileUrl, { username: userName, profile })
                .then(res => {
                    //console.log(userName, profile);
                    navi('/user/login');
            });
        });
    };

    //---------프로필 사진 관련
    const [profile, setProfile] = useState(); //img1
    const photoInput = useRef();
    const imgChange = () => {
        photoInput.current.click();
    };

    let uploadUrl = 'http://localhost:9001/api/upload';
    let photoUrl = 'http://localhost:9001/save/';

    //이미지 업로드
    const imageUpload = e => {
        const uploadFile = e.target.files[0];
        const imageFile = new FormData();
        imageFile.append('uploadFile', uploadFile);
/*
        axios({
            method: 'post',
            url: uploadUrl,
            data: imageFile,
            headers: { 'content-Type': 'multipart/form-data' },
        })
            .then(res => {
                setProfile(res.data);
            })
            .catch(err => {
                alert(err);
            });
*/            
    };

    // 비밀번호 확인
    const password = useRef();
    password.current = watch('password');


    //-----USERID(username) 중복확인
    const userName = getValues('username');
    const [btnOk, setBtnOk] = useState(false);

    const onIdJungbok = () => {
        console.log(userName);
        if (userName === '') {
            alert('아이디를 입력해주세요!');
            return;
        } else {
            const url =
                'http://localhost:9001/user/idcheck?username=' + userName;
            axios.get(url)
            .then(res => {
                if (res.data === 0) {
                    setBtnOk(true);
                    alert('가입 가능한 아이디입니다.');
                    favoriteBtn.current.style.color = '#03d85e';
                    favoriteBtn.current.style.fontWeight = 'bold';
                } 
           else {
                    setBtnOk(false);
                    alert('이미 가입되어있는아이디 입니다.');
                }
        });
     }
    };


    return (
        <LoginSection>
            <LoginBox>
                <div className="login-form">
                    <div className="regis_title">
                        <h2>같이 해요와 함께</h2>
                        <br />
                        <h2>소중한 친구를 만들어보세요</h2>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <br />

                        <div className="profileimg">
                            {/* 이미지출력 */}
                            <img alt=""
                                className="user_profile" />
                                {/*src={photoUrl + profile}*/}
                        </div>
                        <div className="photo_icon">
                            <IconButton
                                color="primary"
                                aria-label="upload picture"
                                component="label"
                                style={{ color: '#ffbe3bee' }}
                            >
                                <input
                                    hidden
                                    accept="image/*"
                                    type="file"
                                    multiple
                                    onChange={imageUpload}
                                />
                                <PhotoCamera />
                            </IconButton>
                        </div>
                        <br />

                        <div className="int-area1">
                            <input
                                type="text"
                                name="username"
                                id="username"
                                autoComplete="off"
                                required
                                aria-invalid={
                                    !isDirty ? undefined : errors.username ? 'true' : 'false'
                                }
                                {...register('username', {
                                    minLength: {
                                        value: 5,
                                        message: '5글자 이상 입력해주세요',
                                    },
                                    pattern: {
                                        value: /^[A-za-z0-9가-힣]{3,10}$/,
                                        message: '가능한 문자: 영문 대소문자, 글자 단위 한글, 숫자',
                                    },
                                })}
                            />
                            <label>USER ID</label>
                        </div>
                        {errors.username && (
                            <div className="regis-error1">
                                <WarningAmberIcon style={{ fontSize: 'small' }} />
                                {errors.username.message}
                            </div>
                        )}
                        <Button
                            size="small"
                            onClick={onIdJungbok}
                            className="jungbok-button"
                            style={{ color: 'gray', marginLeft: '265px' }}
                            startIcon={<CheckCircleOutlineIcon />}
                            ref={favoriteBtn}
                        >
                            중복확인
                        </Button>
                        <div className="int-area1">
                            <input
                                type="text"
                                name="realname"
                                id="realname"
                                autoComplete="off"
                                required
                                aria-invalid={
                                    !isDirty ? undefined : errors.realname ? 'true' : 'false'
                                }
                                {...register('realname')}
                            />
                            <label>NICK NAME</label>
                        </div>
                        {errors.realname && (
                            <div className="regis-error">{errors.realname.message}</div>
                        )}
                        <div className="int-area1">
                            <input
                                type="text"
                                name="email"
                                id="email"
                                autoComplete="off"
                                required
                                aria-invalid={
                                    !isDirty ? undefined : errors.email ? 'true' : 'false'
                                }
                                {...register('email', {
                                    pattern: {
                                        value: /\S+@\S+\.\S+/,
                                        message: '이메일 형식에 맞게 입력해주세요',
                                    },
                                })}
                            />
                            <label>E-MAIL</label>
                        </div>
                        {errors.email && (
                            <div className="regis-error">
                                <WarningAmberIcon style={{ fontSize: 'small' }} />
                                {errors.email.message}
                            </div>
                        )}
                        <div className="int-area1">
                            <input
                                type="password"
                                name="password"
                                id="password"
                                autoComplete="off"
                                required
                                aria-invalid={
                                    !isDirty ? undefined : errors.password ? 'true' : 'false'
                                }
                                {...register('password', {
                                    pattern: {
                                        value: /^(?=.*\d)(?=.*[a-zA-Zs]).{8,}/,
                                        message: '8자이상, 영문, 숫자를 혼용하여 주세요.',
                                    },
                                })}
                            />
                            <label>PASSWORD</label>
                        </div>
                        {errors.password && (
                            <div className="regis-error3">
                                <WarningAmberIcon style={{ fontSize: 'small' }} />
                                {errors.password.message}
                            </div>
                        )}
                        <div className="int-area1 ms-2">
                            <input
                                type="password"
                                autoComplete="off"
                                required
                                {...register('password_confirm', {
                                    required: (
                                        <div className="regis-error">
                                            <WarningAmberIcon style={{ fontSize: 'small', marginTop: 3 }} />
                                            비밀번호를 다시 입력해주세요
                                        </div>
                                    ),
                                    validate: value => value === password.current,
                                    onChange: () => {
                                        trigger('password_confirm');
                                    },
                                    onBlur: () => {
                                        trigger('password_confirm');
                                    },
                                })}
                            />
                            {errors.password_confirm && (
                                <p>{errors.password_confirm.message}</p>
                            )}
                            {errors.password_confirm &&
                                errors.password_confirm.type === 'validate' && (
                                    <div className="regis-error">
                                        <WarningAmberIcon style={{ fontSize: 'small', marginTop:3 }} />
                                        비밀번호가 일치하지 않습니다.
                                    </div>
                                )}
                            <label>PASSWORD CONFIRM</label>
                        </div>
                        <div className="btn-area1">
                            <button type="submit" disabled={isSubmitting}>
                                REGISTER
                            </button>
                        </div>
                    </form>
                </div>
            </LoginBox>
        </LoginSection>
    );
};

export default Register;

const LoginSection = styled.section`
min-height: calc(100vh - 500px);
padding: 130px 0 200px;
text-align: center;
${props => props.theme.wrapper};
`;

const LoginBox = styled.div`
width: 400px;
margin: 0 auto;
padding: 30px 20px;
border: 1px solid #eee;
`;
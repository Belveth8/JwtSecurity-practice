import { Button, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { getPostByNo } from '../../Data';
import './css/BoardDetail.css';

const BoardDetail = ({ history, location, match }) => {
    const [data, setData] = useState({});

    const { no } = useParams();

    useEffect(() => {
        setData(getPostByNo(no));
    }, []);
    

// react V6에선 useHistory를 지원하지 않는다. navigator를 써야하는데
// history.listen 예정 세션을 기억해 돌아가는 기능은 없다.
//대신 뒤에 인자 값에 정수를 넣으면 브라우저의 방문기록이 남아있는 경로들을 앞 뒤로 탐색할 수 있다
const navi = useNavigate();
// 뒤로가기 함수
const goBack = () => {
    navi(-1);
}

    return (
        <div style={{ marginTop: 30 }}>
            <h2 align="center" style={{ marginTop: 15 }}>게시글 상세정보</h2>

            <div className="post-view-wrapper">
                {
                    data ? (
                        <>
                            <div className="post-view-row">
                                <label>게시글 번호</label>
                                <label>{data.no}</label>
                            </div>
                            <div className="post-view-row">
                                <label>제목</label>
                                <label>{data.title}</label>
                            </div>
                            <div className="post-view-row">
                                <label>작성자</label>
                                <label>{data.name}</label>
                            </div>
                            <div className="post-view-row">
                                <label>작성일</label>
                                <label>{data.createDate}</label>
                            </div>
                            <div className="post-view-row">
                                <label>조회수</label>
                                <label>{data.readCount}</label>
                            </div>
                            <div className="post-view-row">
                                <label>내용</label>
                                <div>
                                    {
                                        data.content
                                    }
                                </div>
                            </div>
                        </>
                    ) : '해당 게시글을 찾을 수 없습니다.'
                }
                <div>
                    <Stack direction="row" spacing={2}>
                        <Button
                            variant="outlined"
                            onClick={goBack}
                        >
                            뒤로가기
                        </Button>
                    </Stack>
                </div>
            </div>
        </div>
    )
}

export default BoardDetail;
import { Button, Stack } from '@mui/material';
import React, { useState, useEffect, useParams } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { postList } from '../../Data';
import TableColumn from '../Table/TableColumn';
import TableComponent from '../Table/TableComponent';
import TableRowCom from '../Table/TableRowCom';
import axios from 'axios';

const BoardList = props => {
  const [dataList, setDataList] = useState([]);
  const navi = useNavigate();

  const goForm = () => {
    navi('/boardForm')
  }
  
  const {currentPage} = useParams();
  let pagelistUrl = process.env.REACT_APP_SPRING_URL + "board/pagelist?currentPage=" + currentPage;

  /*
  const pageList = () => {
    axios.get(pagelistUrl)
    .then(res=>{
        console.log("성콩",res.data)
        setDataList(res.data);
    })
}
*/

  return (
    <div style={{ marginTop: 30 }}>
      <TableComponent headersName={['글번호', '제목','작성자', '등록일', '조회수']}>
        {
          postList ? dataList.map((item, index) => {
            return (
              <TableRowCom key={index}>
                <TableColumn>{item.no}</TableColumn>
                <TableColumn>
                  <Link to={`/boardDetail/${item.no}/${currentPage}`}>{item.title}</Link>
                </TableColumn>
                <TableColumn>{item.name}</TableColumn>
                <TableColumn>{item.createDate}</TableColumn>
                <TableColumn>{item.readCount}</TableColumn>
              </TableRowCom>
            )
          }) : ''
        }
      </TableComponent>
      <div style={{ display:'inline-block', float:'right', marginRight: 400 , marginTop: 25 }}>
      <Stack direction="row" spacing={2}>
        <Button
          variant="outlined"
          onClick={goForm }
        >
          글쓰기
        </Button>
      </Stack>
      </div>
    </div>
  )
}

export default BoardList;
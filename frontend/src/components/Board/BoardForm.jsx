import { Button, Container, Fab, FormControl, Input, InputAdornment, InputLabel, OutlinedInput, Stack, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React from 'react'
import { useNavigate } from 'react-router';

function BoardForm() {
    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const [values1, setValues1] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });
    
    const navi = useNavigate();

    const handleChange = (prop) => e => {
        setValues({ ...values, [prop]: e.target.value });
    };
    const handleChange2 = (prop) => e => {
        setValues1({ ...values1, [prop]: e.target.value });
    };
    const backTopage = () =>{
        navi(-1)
    }

    return (
        <Container>
            <FormControl fullWidth sx={{ m: 1 }} style={{ marginTop: 50 }}>
                <InputLabel htmlFor="outlined-adornment-amount">제목</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    value={values.amount}
                    onChange={handleChange('amount')}
                    startAdornment={<InputAdornment position="start"></InputAdornment>}
                    label="Amount"
                    placeholder='제목을 입력해주세요.'
                />
            </FormControl>
            <div>
                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                <TextField
                 label="Filled success"
                 variant="filled"
                 color="success"
                 focused
                 multiline={true}
                 rows={25}
                 placeholder='내용을 입력해주세요.'
                 onChange={ handleChange2 }
                 />
                </FormControl>
            </div>
            <div style={{ display: 'inline-block', float:'right', marginBlockEnd:15, padding: 15 }}>
            <Stack direction="row" spacing={2}>
                <Button
                 variant="outlined"
                 onClick={ backTopage }
                 >
                    뒤로가기
                 </Button>
                <Button
                 variant="outlined"
                 onClick={ backTopage }
                 >
                    작성완료
                 </Button>
            </Stack>
            </div>
        </Container>
    )
}

export default BoardForm
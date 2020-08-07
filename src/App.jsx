import React, {Component} from 'react';
import {Card, Container} from '@material-ui/core'
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class App extends Component {
    state = {
        url: '',
        message: ''
    }

    render() {
        return (
            <Container maxWidth="md">
                <Card>
                    <CardContent>
                        <div>
                            <TextField placeholder="웹후크 url을 입력하세요" fullWidth onChange={e => this.setState({url: e.target.value})}/>
                        </div>
                        <br/>
                        <div>
                            <TextField placeholder="메시지를 입력하세요" fullWidth multiline onChange={e => this.setState({message: e.target.value})}/>
                        </div>
                        <br/>
                        <div>
                            <Button onClick={this.send} variant="contained" fullWidth color="primary">전송</Button>
                        </div>
                    </CardContent>
                </Card>
            </Container>
        );
    }

    send = async () => {
        if (this.state.url === '') return alert('url은 비워놓을 수 없습니다.')
        if (this.state.message === '') return alert('메시지는 비워놓을 수 없습니다.')

        let data
        try {
            data = JSON.parse(this.state.message)
        } catch (e) {
            data = {content: this.state.message}
        }
        await fetch(this.state.url, {
            body: JSON.stringify(data),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(async res => {
                alert('전송되었습니다.')
            })
            .catch(e => alert(`전송 실패: ${e}`))
        console.log(data)
    }

}

export default App;

import React, {Component} from 'react';
import {Card, Container} from '@material-ui/core'
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import EmbedEditor from "./EmbedEditor";
import Embed from "./Embed";

class App extends Component {
    state = {
        url: '',
        message: '',
        embeds: []
    }

    render() {
        return (
            <Container maxWidth="md">
                <Card>
                    <CardContent>
                        <div>
                            <TextField placeholder="웹후크 url을 입력하세요" fullWidth
                                       onChange={e => this.setState({url: e.target.value})}/>
                        </div>
                        <br/>
                        <div>
                            <TextField placeholder="메시지를 입력하세요" fullWidth multiline
                                       onChange={e => this.setState({message: e.target.value})}/>
                        </div>
                        <br/>
                        <div>
                            <div>
                                <Button variant="outlined" color="secondary" onClick={() => {
                                    this.state.embeds.push(new Embed())
                                    this.forceUpdate()
                                }}>임베드 추가하기</Button>
                            </div>
                            <div>
                                {
                                    this.state.embeds.length === 0 ?
                                        "임베드가 없습니다."
                                        :
                                        this.state.embeds.map((embed, index) => (
                                            <EmbedEditor embed={embed} key={index} idx={index} delete={idx => {
                                                console.log(`[DELETE] Deleted embed #${idx}`)
                                                this.state.embeds.splice(idx, 1)
                                                this.forceUpdate()
                                            }} update={() => this.forceUpdate()}/>
                                        ))
                                }
                            </div>
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

        let data = {content: this.state.message, embeds: []}
        this.state.embeds.forEach(embed => {
            data.embeds.push(embed.asObject())
        })
        await fetch(this.state.url, {
            body: JSON.stringify(data),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(async res => {
                if (res.status !== 200) {
                    alert(`전송 실패: ${res.statusText}`)
                } else {
                    alert('전송되었습니다.')
                }
            })
            .catch(e => alert(`전송 실패: ${e.message}`))
        console.log(data)
    }

}

export default App;

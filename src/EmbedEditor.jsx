import React, {Component} from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import {Delete, Palette} from '@material-ui/icons'
import {ChromePicker} from 'react-color'
import Popover from "@material-ui/core/Popover";

class EmbedEditor extends Component {
    state = {
        picker: null
    }

    render() {
        return (
            <Card style={{marginTop: 10}}>
                <CardContent>
                    <Typography style={{width: '100%', display: 'flex'}} variant="h6">
                        제목: <TextField
                        value={this.props.embed.title}
                        onChange={e => {
                            this.props.embed.setTitle(e.target.value)
                            this.props.update()
                        }} style={{flexGrow: 1}}/>
                        <IconButton onClick={e => {
                            this.setState({picker: e.currentTarget})
                        }}>
                            <Palette/>
                        </IconButton>
                        <Popover
                        open={
                            Boolean(this.state.picker)
                        } anchorEl={this.state.picker}
                        onClose={() => this.setState({picker: null})}>
                            <ChromePicker onChange={color => {
                                this.props.embed.setColor(
                                    parseInt(color.hex.replace('#', '0x'))
                                )
                                this.props.update()
                            }} color={this.props.embed.color.toString(16).replace('0x', '#')}/>
                        </Popover>
                    </Typography>
                    <div>
                        <Typography variant="h6">
                            내용
                        </Typography>
                        <TextField multiline value={this.props.embed.description}
                                   onChange={e => {
                                       this.props.embed.setDescription(e.target.value)
                                       this.props.update()
                                   }} fullWidth/>
                    </div>
                </CardContent>
                <CardActions>
                    <IconButton onClick={() => {
                        this.props.delete(this.props.idx)
                    }}>
                        <Delete/>
                    </IconButton>
                </CardActions>
            </Card>
        );
    }
}

export default EmbedEditor;
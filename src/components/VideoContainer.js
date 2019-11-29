import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import '../styles/videocontainer.css'

class VideoContainer extends Component {

    state={
        time:''
    }

    // timeUpdate = (event) =>{
    //     this.setState({time:event.currentTarget.currentTime})
    // }

    render() {
        const props = this.props;
        let time;


        return (
            <Row>
                {props.videos.map((video, index) => {
                   
                    return (
                        <Col id={`videoSlot${index}`} key={video.url}>
                            <video className="videos" onTimeUpdate={() => this.props.timeUpdate(index)}>
                                <source src={video.url} type={video.type}/>
                            </video>
                            <br></br>
                            <div id={`videoDesc${index}`} className='text-center' style={{fontSize:'22px', color:'white'}}>{`video-${index + 1}`}</div>
                            <br></br>
                            <div id={`videoTime${index}`} className='text-center' style={{fontSize:'22px', color:'white'}}>00:00</div>
                        </Col>
                    )
                })}
            </Row>
        )
    }
}

export default VideoContainer;
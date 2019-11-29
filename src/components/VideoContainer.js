import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import '../styles/videocontainer.css'

class VideoContainer extends Component {

    render() {
        const props = this.props;

        return (
            <Row>
                {props.videos.map((video, index) => {
                   
                    return (
                        <Col id={`videoSlot${index}`} key={video.url}>
                            <video className="videos" controls>
                                <source src={video.url} type={video.type}/>
                            </video>
                            <br></br>
                            <div id={`videoDesc${index}`} className='text-center' style={{fontSize:'22px'}}>{`video-${index + 1}`}</div>
                        </Col>
                    )
                })}
            </Row>
        )
    }
}

export default VideoContainer;
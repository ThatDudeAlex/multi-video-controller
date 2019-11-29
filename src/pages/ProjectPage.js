import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import VideoContainer from '../components/VideoContainer'
import hotKeys from '../constants/hotkeys'

export default class ProjectPage extends Component {

    state = {
        allVideos: [],
        videosSelected: []
    }

    componentDidMount() {
        const getVideos = document.getElementsByTagName('video');
        const videos = [];

        for(let i = 0; i < getVideos.length; i++){
            videos.push(getVideos[i])
        }

        this.setState({allVideos:videos})

        document.body.addEventListener("keydown", this.hotKeyControls)
    }

    hotKeyControls = (event) => {
        const videos = this.state.allVideos

        switch(event.key){
            case (hotKeys.playOrPauseBtn1 || hotKeys.playOrPauseBtn2):
                this.playOrPause(videos)
                break;
            case (hotKeys.fastForward):
                break;
            case (hotKeys.rewind):
                break;
            case (hotKeys.nextFrame):
                break;
            case (hotKeys.prevFrame):
                break;
            default:
                break;
        }
    }

    // play or pause the videos
    playOrPause = (videos) => {
        videos.forEach(video => {
            // console.log(video.pause)
            if(video.paused)
                video.play()
            else
                video.pause()
        })
    }

    // fast-forward 5secs
    fastForward = () => {

    }

    // rewind 5secs
    rewind = () => {

    }

    // skip to next frame
    nextFrame = () => {

    }

    // go to previous frame
    prevFrame = () => {

    }

    // toggle between single & multi video control
    toggleSingleVideo = () => {

    }

    nextVideo = () => {

    }

    prevVideo = () => {
        
    }



    render() {

        const videos = [
            { url: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.ogv", type: "video/ogg" },
            { url: "http://media.w3.org/2010/05/sintel/trailer.mp4", type: "video/mp4" }
        ]

        return (
            <Container onKeyDown={this.playOrPause}>
                <VideoContainer videos={videos} />
            </Container>
        )
    }
}
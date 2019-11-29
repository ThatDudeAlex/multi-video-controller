import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import VideoContainer from '../components/VideoContainer'
import hotKeys from '../constants/hotkeys'
import hotkeys from '../constants/hotkeys';

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
            case (hotKeys.playOrPauseBtn1):
                this.playOrPause(videos)
                break;
            case (hotKeys.playOrPauseBtn2):
                this.playOrPause(videos)
                break;
            case (hotKeys.fastForward):
                this.fastForward(videos)
                break;
            case (hotKeys.rewind):
                this.rewind(videos)
                break;
            case (hotkeys.reStart):
                this.reStartVideo(videos)
                break;
            case (hotkeys.toggleSingleVideo):
                // this.reStartVideo(videos)
                break;
            default:
                break;
        }
    }

    // play or pause the videos
    playOrPause = (videos) => {
        videos.map(video => {
            if(!video.ended & video.paused)
                video.play()
            else
                video.pause()
        })
    }

    // fast-forward 5secs
    fastForward = (videos) => {
        videos.forEach(video => {
            if((video.currentTime + 2) < video.duration){
                video.currentTime += 2;
            }
            else{
                video.currentTime = video.duration;
            }
        })
    }

    // rewind 5secs
    rewind = (videos) => {
        videos.forEach(video => {
            if ((video.currentTime - 2) > 0) {
                video.currentTime -= 2;
            }
            else {
                video.currentTime = 0;
            }
        })
    }

    // toggle between single & multi video control
    toggleSingleVideo = () => {

    }

    nextVideo = () => {

    }

    prevVideo = () => {

    }

    reStartVideo = (videos) => {
        videos.map(video => {
            video.currentTime = 0;
        })
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
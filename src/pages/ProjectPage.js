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
            videos.push({video: getVideos[i], index: i})
        }

        this.setState({allVideos:videos, videosSelected:videos})

        document.body.addEventListener("keydown", this.hotKeyControls)
    }

    hotKeyControls = (event) => {
        const videos = this.state.videosSelected

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
                this.toggleSingleVideo(videos)
                break;
            case (hotkeys.nextVideo):
                this.nextVideo(videos)
                break;
            case (hotKeys.prevVideo):
                this.prevVideo(videos)
                break;
            default:
                break;
        }
    }

    // play or pause the videos
    playOrPause = (videos) => {
        videos.forEach(currentVideo => {
            const video = currentVideo.video;

            if (!video.ended & video.paused)
                video.play()
            else
                video.pause()
        })
    }

    // fast-forward 2secs
    fastForward = (videos) => {
        videos.forEach(currentVideo => {
            const video = currentVideo.video;

            if((video.currentTime + 2) < video.duration){
                video.currentTime += 2;
            }
            else{
                video.currentTime = video.duration;
            }
        })
    }

    // rewind 2secs
    rewind = (videos) => {
        videos.forEach(currentVideo => {
            const video = currentVideo.video;

            if ((video.currentTime - 2) > 0) {
                video.currentTime -= 2;
            }
            else {
                video.currentTime = 0;
            }
        })
    }

    // toggle between single & multi video control
    toggleSingleVideo = (videos) => {
        const allVideos = this.state.allVideos
        const selectedVideo = this.state.videosSelected[0];
        const index = selectedVideo.index;

        if(videos.length > 1){
            this.setState({videosSelected: [selectedVideo]})
            document.getElementById('videoDesc0').style.color = "#5cb5ea"
        }
        else if(videos.length === 1){
            document.getElementById(`videoDesc${index}`).style.color = "black"
            this.setState({ videosSelected: allVideos.map(vid => vid) })
        }
    }

    // controls the next videos
    nextVideo = (videos) => {
        const allVideos = this.state.allVideos;
        const lastIndex = allVideos.length - 1;
        const currIndex = videos[0].index;
        const nextIndex = ((currIndex + 1) <= lastIndex) ? (currIndex + 1) : 0;

        if (videos.length === 1) {
            document.getElementById(`videoDesc${currIndex}`).style.color = "black"
            document.getElementById(`videoDesc${nextIndex}`).style.color = "#5cb5ea"

            this.setState({ videosSelected: [allVideos[nextIndex]] })
        }
    }

    // controls the previous video 
    prevVideo = (videos) => {
        const allVideos = this.state.allVideos;
        const lastIndex = allVideos.length - 1;
        const currIndex = videos[0].index;
        const prevIndex = ((currIndex - 1) >= 0) ? (currIndex - 1) : lastIndex;

        document.getElementById(`videoDesc${currIndex}`).style.color = "black"
        document.getElementById(`videoDesc${prevIndex}`).style.color = "#5cb5ea"

        this.setState({ videosSelected: [allVideos[prevIndex]] })
    }

    // restarts all selected videos
    reStartVideo = (videos) => {
        videos.forEach(currentVideo => {
            const video = currentVideo.video;
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
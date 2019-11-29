import React, { Component } from 'react';
import { Container, Row, Col, Button} from 'react-bootstrap';
import VideoContainer from '../components/VideoContainer';
import InstructionModal from '../components/InstructionModal';
import hotKeys from '../constants/hotkeys';

export default class ProjectPage extends Component {

    state = {
        allVideos: [],
        videosSelected: [],
        showModal: false
    }

    componentDidMount() {
        const getVideos = document.getElementsByTagName('video');
        const videos = [];

        for(let i = 0; i < getVideos.length; i++){
            videos.push({video: getVideos[i], index: i, timeStampBookmarks: []})
        }

        this.setState({allVideos:videos, videosSelected:videos})

        document.body.addEventListener("keydown", this.hotKeyControls)
    }

    hotKeyControls = (event) => {
        const videos = this.state.videosSelected

        switch(event.key){
            case (hotKeys.playOrPauseBtn1):
                event.preventDefault();
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
            case (hotKeys.reStart):
                this.reStartVideo(videos)
                break;
            case (hotKeys.toggleSingleVideo):
                this.toggleSingleVideo(videos)
                break;
            case (hotKeys.nextVideo):
                this.nextVideo(videos)
                break;
            case (hotKeys.prevVideo):
                this.prevVideo(videos)
                break;
            case (hotKeys.bookmark):
                this.addBookmark(videos)
                break;
            default:
                break;
        }
    }

    // play or pause the videos
    playOrPause = (videos) => {
        videos.forEach(currentVideo => {
            const video = currentVideo.video;
            console.log(currentVideo.timeStampBookmarks)
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
            document.getElementById(`videoDesc${index}`).style.color = "white"
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
            document.getElementById(`videoDesc${currIndex}`).style.color = "white"
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

        document.getElementById(`videoDesc${currIndex}`).style.color = "white"
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

    // incomplete function still experimenting
    addBookmark = (videos) => {
        const allVideos = [];
        
        videos.forEach(currentVideo => {
            const index = currentVideo.index;
            const video = currentVideo.video;

            this.setState( prevState => {
                // New 'allVideos' array – a copy of the previous `allVideos` state 
                const updatedVideos = [...prevState.allVideos]
                console.log(updatedVideos)

                // A copy of the video bookmarks object we're targeting
                const updatedVideo= { ...updatedVideos[index]}
                console.log(updatedVideo.timeStampBookmarks)

                // Update the bookmarks
                updatedVideo.timeStampBookmarks.push(video.currentTime)
                console.log(updatedVideo)

                // Update the 'allVideos' array with the target videos's latest bookmarks
                // updatedVideos[index].timeStampBookmarks = updatedVideoBookmarks;

                // updatedVideo.timeStampBookmarks.push(currentVideo.currentTime)
                updatedVideos[index] = updatedVideo;
                // console.log(updatedVideos)

                return{
                    allVideos: updatedVideos
                }
            })
        })
    }

    toggleModal = () => {
        this.setState({showModal: !this.state.showModal})
    }

    timeUpdate = (index) => {
        this.state.videosSelected.forEach(video => {
            if(video.index === index){
                let timeDiv = document.getElementById(`videoTime${index}`)
                timeDiv.innerHTML = this.formatTime(video.video.currentTime)
            }
        })
    }

  // formats time in seconds into hr: min :sec
  formatTime(totalSeconds) {
    console.log(totalSeconds)
    // let hours = Math.floor(totalSeconds / 3600);
    // totalSeconds %= 3600;

    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);

    // if (hours < 10)
    //   hours = `0${hours}`;
    if (minutes < 10)
      minutes = `0${minutes}`;
    if (seconds < 10)
      seconds = `0${seconds}`;

    const form = `${minutes}:${seconds}`
    return form;
  }

    render() {
        const videos = [
            { url: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.ogv", type: "video/ogg" },
            { url: "http://media.w3.org/2010/05/sintel/trailer.mp4", type: "video/mp4" }
        ]
        

        return (
            <Container onKeyDown={this.playOrPause} fluid style={{backgroundColor:'black'}}>
                <InstructionModal showModal={this.state.showModal} toggleModal={this.toggleModal} />

                <Row>
                    <Col md={10}>
                        <h1 style={{color:'white'}}>Multi-Video Playback Controller</h1>
                    </Col>
                    <Col>
                        <Button variant='outline-primary' className='my-2' onClick={this.toggleModal}>Instructions</Button>
                    </Col>
                </Row>
                
                <VideoContainer videos={videos} timeUpdate={this.timeUpdate} />

            </Container>
        )
    }
}
import React from 'react';
import { Grid } from '@material-ui/core';
import youtube from './api/youtube';
import { SearchBar, VideoDetail, VideoList } from './components';

class App extends React.Component {
    state = {
        videos: [],
        selectedVideo: null,
    }

    componentDidMount() {
        this.handleSubmit('react js');
    }

    onVideoSelect = (video) => {
        this.setState({ ...this.state, selectedVideo: video })
    }

    handleSubmit = async (searchTerm) => {
        const response = await youtube.get('search', { 
            params: {
                part: 'snippet',
                maxResults: 15,
                key: 'AIzaSyBWyWvqzlMXZkmXYXnGqQEwqY5_vyDXKxk',
                q: searchTerm,
            }
        });
        this.setState({ videos: response.data.items, selectedVideo: response.data.items[0] });
    }

    render (){
        const { selectedVideo, videos } = this.state;
        return(
            <Grid justify="center" container spacing={10}>
                <Grid item xs={12}>
                    <Grid container spacing={10}>
                        <Grid item xs={12}>
                            <SearchBar onFormSubmit={this.handleSubmit} />
                        </Grid>
                        <Grid item xs={7}>
                            <VideoDetail video={selectedVideo}/>
                        </Grid>
                        <Grid item xs={5}>
                            <VideoList videos={videos} onVideoSelect={this.onVideoSelect}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}
//class based component



// const App = () => {
//     return (<h1>YouTube Clone App</h1>);
// }    //function based component

export default App;
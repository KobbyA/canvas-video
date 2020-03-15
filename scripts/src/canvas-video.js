import p5 from 'p5';

const setupVideo = () => {
    const video = document.createElement('video');
    video.src = 'blob:https://www.youtube.com/6093cf93-ae4f-46f3-ad94-b82d09b0785e';//raw video URL from the youtube video
    video.preload = 'auto';
    video.autoplay = true;
    video.width = 480;
    video.height = video.width * .5625;

    return video;
};

const init = e => {
    console.log('hello world');
    const playBtn = document.getElementById('start');
    const video = setupVideo();

    if( playBtn && video ){
        playBtn.addEventListener('click', () => video.play());
    }

    new p5(( sketch ) => {
        const width = 480;
        const height = 480 * .5625;// this height just makes the aspect ratio 16:9
        sketch.setup = () => {
            sketch.createCanvas(width, height);
        };

        sketch.draw = () => {
            if( !video.paused ){
                //draw the current playing frame
                const vidWidth = width / 2;
                const vidHeight = vidWidth * .5625;
                p5.image( video, 0, 0, vidWidth, vidHeight );

                //load the pixels and you get an array of pixels for this video frame that you can do stuff with/analyze
                p5.loadPixels();
                //there's now an array called pixels populated with the current video frames pixel data
                p5.push();
                p5.translate(vidWidth, 0);
                for( let x = 0; x < width/2; x++ ){
                    for( let y = 0; y < vidHeight; y++ ){
                        const px = y * vidWidth + x;
                        p5.stroke(p5.pixels[px + 3]);
                        p5.point(x, y);
                    }
                }
                p5.pop();
            }
        };
    }, document.getElementById('canvas-container'));
};

//initialize everything on when the page code has loaded
window.addEventListener('DOMContentLoaded', init);
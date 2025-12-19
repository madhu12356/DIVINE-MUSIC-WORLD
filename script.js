console.log("Welcome to Music World");


let songIndex = 0;
let audioElement = new Audio();
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));


let songs = [
    { songName: "Aaradhya", filePath: "songs/1 Aradhya (1).mp3", coverPath: "covers/1 image.png" },
    { songName: "Araduguluntada", filePath: "songs/2 Aaraduguluntada-SenSongsMp3.Co.mp3", coverPath: "covers/2 image.png" },
    { songName: "Changubhala", filePath: "songs/03 - Changubhala - SenSongsMp3.Co.mp3", coverPath: "covers/3 image.png" },
    { songName: "Priyathama", filePath: "songs/4 Priyathama Priyathama - SenSongsmp3.Co.mp3", coverPath: "covers/4image.png" },
    { songName: "Nene Nanine", filePath: "songs/5 Nene - Nanine - SenSongsmp3.Co.mp3", coverPath: "covers/5 image.png" },
    { songName: "Konchemu", filePath: "songs/6 Konchemu Konchemu - SenSongsMp3.Co.mp3", coverPath: "covers/6image.png" },
    { songName: "NaRojaNuvve", filePath: "songs/7 Na Roja Nuvve.mp3", coverPath: "covers/7image.png" },
    { songName: "Oh Baby", filePath: "songs/8 Oh Baby - SenSongsMp3.Co.mp3", coverPath: "covers/8 image.png" },
    { songName: "Ee Hridayam", filePath: "songs/9 Ee Hridayam - SenSongsmp3.Co.mp3", coverPath: "covers/9  image.png" },
    { songName: "vintunnava", filePath: "songs/10 Vintunnavaa - SenSongsmp3.Co.mp3", coverPath: "covers/10 image.png" },
];

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});


masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});


audioElement.addEventListener('timeupdate', () => {
    if (!isNaN(audioElement.duration)) {
        let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
        myProgressBar.value = progress;
    }
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, i) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = i;

        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');

        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();

        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    });
});


document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();

    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});


document.getElementById('previous').addEventListener('click', () => {
    songIndex = songIndex <= 0 ? songs.length - 1 : songIndex - 1;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();

    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

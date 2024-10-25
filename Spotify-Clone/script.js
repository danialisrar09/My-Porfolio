async function getsongs(){
    let a = await fetch("http://127.0.0.1:3000/songs/");
    let response = await a.text();
    console.log(response);

    let div =  document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];  
        if(element.href.endsWith(".mp3")){
            console.log(element.href);
            songs.push(element.href.split("-%20")[1])
        }
    }
    return songs
    


}

async function main() {
    // Get the list of all the songs
    let songs = await getsongs()
    console.log(songs);
    
    let song_UL = document.querySelector(".songslist").getElementsByTagName("ul")
    for (const song of song_UL) {
        song_UL.innerHTML = song_UL.innerHTML + `<li> ${song.replace("%20", " ")}</li>`
    }
 
    if (songs.length > 0) {
        var audio = new Audio(songs[0]);
        
        audio.addEventListener("loadeddata", () => {
            console.log(audio.duration, audio.currentSrc, audio.currentTime);
        });

        // Play the song after loading
        // audio.play();
    }
    
    
}

main()
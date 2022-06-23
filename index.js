const searchSong = document.getElementById("input");
const songsContainer = document.getElementById("song-of-song");
const submitSong = document.getElementById("submit");


submitSong.addEventListener('click', (e) => {
    e.preventDefault()
    songsContainer.innerHTML=''
    let text = searchSong.value;
    let replace = text.replace(" ", "%20")
    fetch(`https://genius.p.rapidapi.com/search?q=${replace}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "genius.p.rapidapi.com",
            "x-rapidapi-key": "c5cffcf162mshaa1800f5b611edbp1fef60jsn2631f0f85350"
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            // console.log(data.response.hits[0].result)

            data.response.hits.forEach(value =>{
                // console.log(value)
                // console.log(value.result.artist_names)
                // console.log(value.result.header_image_thumbnail_url)
                const artistName = value.result.artist_names
                const title = value.result.full_title
                const image = value.result.header_image_thumbnail_url
                const lyric = value.result.url


                songsContainer.innerHTML +=songResult(artistName,title,image,lyric)
            })
        });
    console.log(replace);

});


const songResult = (artistName, title, image, lyric) => {

    return `
<div class="col">
    <div class="card" style="width: 18rem;">
        <img src="${image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${artistName}</p>
            <a href="${lyric}" target="_blank" class="btn btn-success">Go to Lyrics</a>
        </div>
    </div>
</div>`
}

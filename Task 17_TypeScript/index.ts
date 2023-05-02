type APIFormat = 'json'|'xml';

const getTracksButton: Element|null = document.querySelector('.tracks__get-track');
const apiUrl: string = 'https://ws.audioscrobbler.com/2.0/';
const apiMethod: string = 'chart.gettopartists';
const apiKey: string = '7015782d084c6befe18ec5ed1fb69225';
const apiFormat: APIFormat = 'json';

interface ArtistsAtr {
    page: string;
    perPage: string;
    total: string;
    totalPages: string;
}

interface ArtistsImg {
    text: string;
    size: string;
}

interface Artist {
    image: ArtistsImg[];
    name: string;
    playcount: string;
    listeners: string;
    mbid: string;
    url: string 
}

interface ResponseData {
    artists: {
        attr: ArtistsAtr;
        artist: Artist[];
    } 
}

getTracksButton?.addEventListener('click', getTracksRequest)

function getTracksRequest(): void {

    const params = {
        method: apiMethod,
        api_key: apiKey,
        format: apiFormat,
    }
    fetch(`${apiUrl}?${new URLSearchParams(params)}`)
        .then(res => res.json())
        .then((data: ResponseData) => {
            console.log(data);
            return data;
        })
        .catch(e => console.error(e));
}

async function uploadSong(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="song-title"]').value;
    const bpm = document.querySelector('input[name="song-bpm"]').value;
    const key = document.querySelector('input[name="song-key"]').value;
    const artist_id = document.querySelector('select[name="artist-select"]').value;

    if (title && bpm && key && artist_id) {
        console.log(title, bpm, key, artist_id);
        const response = await fetch(`/api/songs`, {
            method: 'POST',
            body: JSON.stringify({
                title,
                bpm,
                key,
                artist_id
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert(response.statusText);
        };
    }
}

document.querySelector('.new-song').addEventListener('submit', uploadSong);
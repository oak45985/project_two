async function uploadSong(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="song-title"]').value;
    const artist_name = document.querySelector('input[name="song-artist"]').value;
    const artist_webpage = document.querySelector('input[name="song-artist-wp"]').value;
    const bpm = document.querySelector('input[name="song-bpm"]').value;
    const key = document.querySelector('input[name="song-key"]').value;

    if (title && artist_name && artist_webpage && bpm && key) {
        const response = await fetch(`/api/songs`, {
            method: 'POST',
            body: JSON.stringify({
                title,
                artist_name,
                artist_webpage,
                bpm,
                key
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
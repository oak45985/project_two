async function uploadArtist(event) {
    event.preventDefault();

    const artist_name = document.querySelector('input[name="song-artist"]').value;
    const artist_webpage = document.querySelector('input[name="song-artist-wp"]').value;

    if (artist_name && artist_webpage) {
        const response = await fetch(`/api/artists`, {
            method: 'POST',
            body: JSON.stringify({
                artist_name,
                artist_webpage,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.replace('/uploadsong');
        } else {
            alert(response.statusText);
        };
    }
}

document.querySelector('.new-artist').addEventListener('submit', uploadArtist);
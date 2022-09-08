async function uploadSong(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="song-title"]').value;
    const bpm = document.querySelector('input[name="song-bpm"]').value;
    const key = document.querySelector('input[name="song-key"]').value;

    if (title && bpm && key) {
        const response = await fetch(`/api/songs`, {
            method: 'POST',
            body: JSON.stringify({
                title,
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
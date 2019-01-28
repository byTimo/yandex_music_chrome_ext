function fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
}

function createButton(className, callback) {
    var button = document.createElement("button");
    button.appendChild(document.createTextNode("copy"))
    button.classList.add(className);
    button.onclick = callback;
    return button;
}

setInterval(function () {
    if (!document.querySelector(".player-controls__track-container__copy")) {
        const container = document.querySelector(".player-controls__track-container");
        if (container) {
            container.appendChild(createButton("player-controls__track-container__copy", function () {
                const title = document.querySelector(".track__title").textContent;
                const artists = document.querySelector(".track__artists").textContent;
                const ver = document.querySelector(".track__ver") ? document.querySelector(".track__ver").textContent : ""
                var name = `${artists} ${title} ${ver}`
                fallbackCopyTextToClipboard(name);
            }))
        }
    }
}, 3000);

setInterval(() => {
    document.querySelectorAll(".d-track").forEach(track => {
        if (!track.querySelector(".track_copy")) {
            const container = track.querySelector(".d-track__actions");
            if (container) {
                container.appendChild(createButton("track_copy", function () {
                    const artists = track.querySelector(".d-track__artists").textContent;
                    const title = track.querySelector(".d-track__title").textContent;
                    const ver = track.querySelector(".d-track__version") ? track.querySelector(".d-track__version").textContent : "";
                    var name = `${artists} ${title} ${ver}`;
                    fallbackCopyTextToClipboard(name);
                }))
            }
        }
    })
}, 3000);
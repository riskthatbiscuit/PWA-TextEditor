const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt = event;
    installBtn.style.visibility = "visible";
    textHeader.textContent = "Click the button to install!";
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const choiceResult = await deferredPrompt.userChoice;
        
        if (choiceResult.outcome === "accepted") {
        textHeader.textContent = "Successfully installed!";
        butInstall.style.visibility = "hidden";
        } else {
        textHeader.textContent = "Installation declined.";
        }

    deferredPrompt = null;
    }
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    textHeader.textContent = "Successfully installed!";
    console.log("👍", "appinstalled", event);
});



let browserInstallCommand;

const installButton = document.getElementById('pwa-install-btn');
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    browserInstallCommand = event;
    installButton.style.display = 'block';
});

installButton.addEventListener('click', async () => {
    if (!browserInstallCommand) {
        return;
    }
    
    browserInstallCommand.prompt();
    
    const choice = await browserInstallCommand.userChoice;
    console.log("User chose: " + choice.outcome); 
    
    browserInstallCommand = null;
    
    installButton.style.display = 'none';
});
window.addEventListener('appinstalled', () => {
    installButton.style.display = 'none';
});

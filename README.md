web
===

Because of Cross-origin-policy when testing the app locally, Chrome must be started with the `--disable-web-security` flag:

**\*nix with chromium:**

    chromium-browser --disable-web-security

**mac:**

    open "Google chrome" --disable-web-security

**Windows with chrome:**

    open the command prompt:
        Run -> type cmd and press enter
    navigate to the folder where chrome.exe is stored
        Default command: cd C:\Program Files <x86>\Google\Chrome\Application
    open chrome with a new user data directory with disabled web security:
        chrome.exe --user-data-dir="C:/Chrome dev session" --disable-web-security
	
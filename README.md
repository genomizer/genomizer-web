web
===

Because of Cross-origin-policy when testing the app locally, Chrome must be started with the `--disable-web-security` flag:

**\*nix:**

    chromium-browser --disable-web-security

**mac:**

    open "Google chrome" --disable-web-security

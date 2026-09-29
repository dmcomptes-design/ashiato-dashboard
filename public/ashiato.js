(function() {
    const script = document.currentScript;
    if (!script) return;
    const siteId = script.getAttribute('data-site-id');
    const apiUrl = script.getAttribute('data-api-url') || 'https://api.ton-domaine.com/api/collect';

    function track() {
        const data = {
            site_id: siteId,
            path: window.location.pathname,
            referrer: document.referrer || null,
            screen_width: window.innerWidth
        };

        if (navigator.sendBeacon) {
            navigator.sendBeacon(apiUrl, JSON.stringify(data));
        } else {
            fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
                keepalive: true
            }).catch(() => {});
        }
    }

    track();
})();
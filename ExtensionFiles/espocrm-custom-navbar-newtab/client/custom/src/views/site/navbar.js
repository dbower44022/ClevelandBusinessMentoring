/**
 * CBM customization — open external navbar URL tabs (e.g. "Documentation")
 * in a new browser tab instead of navigating away from the CRM.
 *
 * Registered via custom/Espo/Custom/Resources/metadata/clientDefs/App.json
 * (the `navbarView` key, read by views/site/header). Extends the core
 * navbar view and only adds target="_blank" to nav links whose href is an
 * external http(s) URL — i.e. the URL tab items, leaving all internal
 * navigation untouched.
 *
 * NOTE: custom client code must use the AMD define() form (EspoCRM's loader
 * does not consume raw ES-module import/export here).
 */
define('custom:views/site/navbar', ['views/site/navbar'], (NavbarSiteView) => {

    return class extends NavbarSiteView {

        afterRender() {
            super.afterRender();
            this.cbmApplyExternalLinkTargets();
        }

        cbmApplyExternalLinkTargets() {
            if (!this.element) {
                return;
            }

            const externalUrls = (this.urlList || [])
                .map(item => item.url)
                .filter(url => typeof url === 'string' && /^https?:\/\//i.test(url));

            if (!externalUrls.length) {
                return;
            }

            this.element.querySelectorAll('a').forEach(a => {
                const href = a.getAttribute('href');

                if (href && externalUrls.includes(href)) {
                    a.setAttribute('target', '_blank');
                    a.setAttribute('rel', 'noopener noreferrer');
                }
            });
        }
    };
});

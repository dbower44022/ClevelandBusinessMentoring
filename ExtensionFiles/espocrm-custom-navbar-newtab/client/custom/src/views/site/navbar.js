/**
 * CBM customization — navbar enhancements:
 *   1. Open external "URL" tabs (e.g. "CBM Documentation") in a new browser tab.
 *   2. A global "Help" button (fixed, bottom-right) that opens context-relevant
 *      documentation in a separate, movable browser window. Fixed positioning
 *      keeps it reliable across navbar layout modes (top / side).
 *
 * Registered via custom/Espo/Custom/Resources/metadata/clientDefs/App.json
 * (the `navbarView` key). Extends the core navbar view.
 * NOTE: custom client code must use the AMD define() form.
 */
define('custom:views/site/navbar', ['views/site/navbar'], (NavbarSiteView) => {

    const DOCS_BASE = 'https://docs.clevelandbusinessmentors.org';

    // Curated scope -> documentation URL. Anything not listed falls back to a
    // BookStack search, then the docs home. Extend as the docs grow.
    const HELP_MAP = {
        'Admin':       DOCS_BASE + '/books/espocrm-system-guide',
        'CEngagement': DOCS_BASE + '/books/mentor-guide',
        'CSession':    DOCS_BASE + '/books/mentor-guide',
    };

    return class extends NavbarSiteView {

        afterRender() {
            super.afterRender();
            this.cbmApplyExternalLinkTargets();
            this.cbmInjectHelpButton();
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

        cbmInjectHelpButton() {
            // Re-render safe: remove any previous instance.
            document.querySelectorAll('.cbm-help-btn').forEach(el => el.remove());

            const a = document.createElement('a');
            a.className = 'cbm-help-btn';
            a.setAttribute('role', 'button');
            a.setAttribute('tabindex', '0');
            a.title = 'Help - open documentation for this screen';
            a.innerHTML = '<span class="fas fa-circle-question"></span> Help';
            a.style.cssText = [
                'position:fixed', 'bottom:20px', 'right:20px', 'z-index:2147483647',
                'background:#FFA726', 'color:#fff', 'padding:8px 16px',
                'border-radius:24px', 'font-size:14px', 'font-weight:600',
                'cursor:pointer', 'text-decoration:none', 'line-height:1.4',
                'box-shadow:0 2px 8px rgba(0,0,0,0.3)'
            ].join(';');
            a.addEventListener('click', e => {
                e.preventDefault();
                this.cbmOpenHelp();
            });

            document.body.appendChild(a);
        }

        cbmCurrentScope() {
            let url = '';

            try {
                url = this.getRouter().getCurrentUrl() || '';
            } catch (e) {
                return null;
            }

            const scope = url.replace(/^#/, '').split('/')[0];

            if (!scope || scope === 'Home') {
                return null;
            }

            return scope;
        }

        cbmOpenHelp() {
            const scope = this.cbmCurrentScope();

            let url;

            if (scope && HELP_MAP[scope]) {
                url = HELP_MAP[scope];
            } else if (scope) {
                let term = scope;

                try {
                    term = this.getLanguage().translate(scope, 'scopeNames') || scope;
                } catch (e) {}

                url = DOCS_BASE + '/search?term=' + encodeURIComponent(term);
            } else {
                url = DOCS_BASE;
            }

            const win = window.open(
                url,
                'cbmHelp',
                'popup,width=940,height=880,scrollbars=yes,resizable=yes'
            );

            if (win) {
                try { win.focus(); } catch (e) {}
            }
        }
    };
});

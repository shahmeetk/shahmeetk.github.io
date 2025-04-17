// Google Analytics 4 Event Tracking
document.addEventListener('DOMContentLoaded', function() {
    // Track PDF resume downloads
    const pdfResumeLink = document.querySelector('a[href="assets/cloud-and-ai-practice-lead.pdf"]');
    if (pdfResumeLink) {
        pdfResumeLink.addEventListener('click', function() {
            gtag('event', 'download', {
                'event_category': 'resume',
                'event_label': 'PDF Resume Download',
                'value': 1
            });
            console.log('PDF Resume download tracked');
        });
    }

    // Track external link clicks
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', function() {
            const url = this.getAttribute('href');
            gtag('event', 'click', {
                'event_category': 'external_link',
                'event_label': url,
                'value': 1
            });
            console.log('External link click tracked: ' + url);
        });
    });

    // Track section views using Intersection Observer
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                gtag('event', 'view_section', {
                    'event_category': 'engagement',
                    'event_label': sectionId,
                    'value': 1
                });
                console.log('Section view tracked: ' + sectionId);
                // Unobserve after first view to prevent multiple triggers
                sectionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% of the section is visible

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});

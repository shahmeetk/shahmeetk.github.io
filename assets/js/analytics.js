// Google Analytics 4 Enhanced Event Tracking
(function() {
    // Send a direct page view event
    if (typeof gtag === 'function') {
        gtag('event', 'direct_page_view', {
            'page_title': document.title,
            'page_location': window.location.href,
            'page_path': window.location.pathname,
            'send_to': 'G-WXYSSSTTMB'
        });
        console.log('Direct page view event sent');
    } else {
        console.error('gtag function not available for direct page view');
    }
})();

document.addEventListener('DOMContentLoaded', function() {
    // Check if gtag function exists
    if (typeof gtag !== 'function') {
        console.error('Google Analytics gtag function not found. Make sure the Google Analytics script is loaded correctly.');
        return;
    }

    try {
        // Track page view with custom dimension
        gtag('event', 'page_view', {
            'page_title': document.title,
            'page_location': window.location.href,
            'page_path': window.location.pathname,
            'send_to': 'G-WXYSSSTTMB'
        });
        console.log('Page view tracked: ' + document.title);
        
        // Track PDF resume downloads
        const pdfResumeLink = document.querySelector('a[href="assets/cloud-and-ai-practice-lead.pdf"]');
        if (pdfResumeLink) {
            pdfResumeLink.addEventListener('click', function() {
                gtag('event', 'download', {
                    'event_category': 'resume',
                    'event_label': 'PDF Resume Download',
                    'value': 1,
                    'send_to': 'G-WXYSSSTTMB'
                });
                console.log('PDF Resume download tracked');
            });
        }
        
        // Track online resume view
        const onlineResumeLink = document.querySelector('a[href^="https://rxresu.me"]');
        if (onlineResumeLink) {
            onlineResumeLink.addEventListener('click', function() {
                gtag('event', 'view_item', {
                    'event_category': 'resume',
                    'event_label': 'Online Resume View',
                    'value': 1,
                    'send_to': 'G-WXYSSSTTMB'
                });
                console.log('Online Resume view tracked');
            });
        }

        // Track all external link clicks
        const externalLinks = document.querySelectorAll('a[href^="http"]');
        externalLinks.forEach(link => {
            link.addEventListener('click', function() {
                const url = this.getAttribute('href');
                gtag('event', 'click', {
                    'event_category': 'external_link',
                    'event_label': url,
                    'value': 1,
                    'send_to': 'G-WXYSSSTTMB'
                });
                console.log('External link click tracked: ' + url);
            });
        });
        
        // Track navigation menu clicks
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                const linkText = this.textContent.trim();
                gtag('event', 'navigation', {
                    'event_category': 'navigation',
                    'event_label': linkText,
                    'value': 1,
                    'send_to': 'G-WXYSSSTTMB'
                });
                console.log('Navigation click tracked: ' + linkText);
            });
        });
        
        // Track social media clicks
        const socialLinks = document.querySelectorAll('.social-links a');
        socialLinks.forEach(link => {
            link.addEventListener('click', function() {
                const platform = this.getAttribute('href').includes('linkedin') ? 'LinkedIn' :
                               this.getAttribute('href').includes('github') ? 'GitHub' :
                               this.getAttribute('href').includes('blogs') ? 'Blog' : 'Email';
                gtag('event', 'social', {
                    'event_category': 'social',
                    'event_label': platform,
                    'value': 1,
                    'send_to': 'G-WXYSSSTTMB'
                });
                console.log('Social media click tracked: ' + platform);
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
                        'value': 1,
                        'send_to': 'G-WXYSSSTTMB'
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
        
        // Track certificate view clicks
        const certificateLink = document.querySelector('a[href^="https://github.com/shahmeetk/Certificates"]');
        if (certificateLink) {
            certificateLink.addEventListener('click', function() {
                gtag('event', 'view_item', {
                    'event_category': 'certificates',
                    'event_label': 'View All Certificates',
                    'value': 1,
                    'send_to': 'G-WXYSSSTTMB'
                });
                console.log('Certificates view tracked');
            });
        }
        
        // Track blog link clicks
        const blogLink = document.querySelector('a[href^="https://shahmeetk.github.io/blogs/"]');
        if (blogLink) {
            blogLink.addEventListener('click', function() {
                gtag('event', 'view_item', {
                    'event_category': 'blog',
                    'event_label': 'Visit Tech Blog',
                    'value': 1,
                    'send_to': 'G-WXYSSSTTMB'
                });
                console.log('Blog visit tracked');
            });
        }
        
        // Send a test event to verify tracking is working
        gtag('event', 'test_event', {
            'event_category': 'testing',
            'event_label': 'Analytics Test',
            'value': 1,
            'send_to': 'G-WXYSSSTTMB'
        });
        console.log('Test event sent to Google Analytics');
        
    } catch (error) {
        console.error('Error in Google Analytics tracking:', error);
    }
});

// Add a fallback in case DOMContentLoaded already fired
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    console.log('DOM already loaded, triggering analytics manually');
    // Dispatch a custom event to trigger the analytics
    document.dispatchEvent(new Event('DOMContentLoaded'));
}

document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab');
    const tabsContainer = document.querySelector('.tabs-container');
    const sections = document.querySelectorAll('.page-section');

    // Smooth Scroll on Tab Click
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = tab.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                const header = document.querySelector('.tabs-header');
                const headerHeight = header ? header.offsetHeight : 55;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + (window.pageYOffset || document.documentElement.scrollTop || 0) - headerHeight + 5;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scrollspy: Highlight Active Tab on Page Scroll
    function updateActiveTabOnScroll() {
        const header = document.querySelector('.tabs-header');
        const headerHeight = header ? header.offsetHeight : 55;
        const scrollPosition = (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0) + headerHeight + 60;

        let currentSectionId = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        // Special case for bottom of page (Contact section)
        const scrollBottom = window.innerHeight + (window.pageYOffset || document.documentElement.scrollTop || 0);
        const totalHeight = Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight
        );

        if (scrollBottom >= totalHeight - 60) {
            const lastSection = sections[sections.length - 1];
            if (lastSection) {
                currentSectionId = lastSection.getAttribute('id');
            }
        }

        if (currentSectionId) {
            tabs.forEach(tab => {
                if (tab.getAttribute('data-target') === currentSectionId) {
                    if (!tab.classList.contains('active')) {
                        tabs.forEach(t => t.classList.remove('active'));
                        tab.classList.add('active');

                        // Auto-scroll tab container so active tab is visible on mobile
                        if (tabsContainer) {
                            const tabOffsetLeft = tab.offsetLeft;
                            const tabWidth = tab.offsetWidth;
                            const containerWidth = tabsContainer.offsetWidth;
                            tabsContainer.scrollTo({
                                left: tabOffsetLeft - (containerWidth / 2) + (tabWidth / 2),
                                behavior: 'smooth'
                            });
                        }
                    }
                }
            });
        }
    }

    window.addEventListener('scroll', updateActiveTabOnScroll, { passive: true });
    window.addEventListener('resize', updateActiveTabOnScroll, { passive: true });
    updateActiveTabOnScroll(); // Initial check on load

    // Accordion toggle logic for About Me
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            item.classList.toggle('open');
        });
    });

    // Project card click toggle
    const projectHeaders = document.querySelectorAll('.project-card-header');
    projectHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const card = header.parentElement;
            card.classList.toggle('open');
        });
    });

    // Internship images dropdown toggle
    const showImagesBtns = document.querySelectorAll('.show-images-btn');
    showImagesBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const container = btn.closest('.internship-images-toggle');
            if (container) {
                container.classList.toggle('open');
            }
        });
    });

    // Copy Email ID functionality
    const copyEmailBtn = document.getElementById('copy-email-btn');
    const copyBtnLabel = document.getElementById('copy-btn-label');
    const emailToCopy = "naveenpandian.official2004@gmail.com";

    if (copyEmailBtn && copyBtnLabel) {
        copyEmailBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(emailToCopy).then(() => {
                const originalText = copyBtnLabel.innerText;
                copyBtnLabel.innerText = "Copied!";
                copyEmailBtn.style.backgroundColor = "var(--text-white)";
                copyEmailBtn.style.color = "#000000";

                setTimeout(() => {
                    copyBtnLabel.innerText = originalText;
                    copyEmailBtn.style.backgroundColor = "";
                    copyEmailBtn.style.color = "";
                }, 2000);
            }).catch(err => {
                console.error("Failed to copy email: ", err);
            });
        });
    }
});

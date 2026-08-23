document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab');
    const sliderTrack = document.getElementById('slider-track');
    const dropdownItems = document.querySelectorAll('.dropdown-item');

    function activateTabByIndex(targetIndex) {
        tabs.forEach(t => t.classList.remove('active'));
        const targetTab = document.querySelector(`.tab[data-target="${targetIndex}"]`);
        if (targetTab) {
            targetTab.classList.add('active');
        }
        const translateXValue = -(targetIndex * 100);
        sliderTrack.style.transform = `translateX(${translateXValue}vw)`;
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            const targetIndex = tab.getAttribute('data-target');
            if (targetIndex !== null) {
                activateTabByIndex(targetIndex);
            }
        });
    });

    dropdownItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            const targetIndex = item.getAttribute('data-target');
            if (targetIndex !== null) {
                activateTabByIndex(targetIndex);
            }
        });
    });

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

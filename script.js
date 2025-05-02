// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for header height
                behavior: 'smooth'
            });
        });
    });
    
    // Sticky header effect
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .use-case, .deployment-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    const elementsToAnimate = document.querySelectorAll('.feature-card, .use-case, .deployment-card');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Run animation check on load and scroll
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
    
    // Deployment animation for in-place deployment
    const inPlaceServers = document.querySelectorAll('.in-place .server');
    
    function animateInPlaceDeployment() {
        inPlaceServers.forEach((server, index) => {
            setTimeout(() => {
                server.style.backgroundColor = '#ff3e7f';
                
                setTimeout(() => {
                    server.style.backgroundColor = '';
                    server.style.boxShadow = '0 0 10px rgba(0, 194, 255, 0.5)';
                }, 1000);
            }, index * 500);
        });
    }
    
    // Deployment animation for blue/green deployment
    const blueServers = document.querySelectorAll('.blue-green .blue .server');
    const greenServers = document.querySelectorAll('.blue-green .green .server');
    const deploymentSwitch = document.querySelector('.deployment-switch');
    
    function animateBlueGreenDeployment() {
        // Start with blue active
        blueServers.forEach(server => {
            server.style.boxShadow = '0 0 10px rgba(52, 152, 219, 0.8)';
        });
        
        greenServers.forEach(server => {
            server.style.opacity = '0.5';
        });
        
        // After delay, switch to green
        setTimeout(() => {
            deploymentSwitch.style.transform = 'scale(1.2)';
            deploymentSwitch.style.color = '#2ecc71';
            
            setTimeout(() => {
                blueServers.forEach(server => {
                    server.style.opacity = '0.5';
                    server.style.boxShadow = 'none';
                });
                
                greenServers.forEach(server => {
                    server.style.opacity = '1';
                    server.style.boxShadow = '0 0 10px rgba(46, 204, 113, 0.8)';
                });
                
                setTimeout(() => {
                    deploymentSwitch.style.transform = 'scale(1)';
                    deploymentSwitch.style.color = '';
                }, 1000);
            }, 500);
        }, 2000);
    }
    
    // Run deployment animations periodically
    setInterval(animateInPlaceDeployment, 5000);
    setInterval(animateBlueGreenDeployment, 7000);
    
    // Initial run of animations
    setTimeout(animateInPlaceDeployment, 1000);
    setTimeout(animateBlueGreenDeployment, 2000);
});

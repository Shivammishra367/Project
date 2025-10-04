// Enhanced Mobile Navigation
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navOverlay = document.getElementById('navOverlay');

// Mobile Navigation Toggle
hamburger.addEventListener('click', function () {
    navMenu.classList.toggle('active');
    navOverlay.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking overlay
navOverlay.addEventListener('click', function () {
    navMenu.classList.remove('active');
    navOverlay.classList.remove('active');
    hamburger.classList.remove('active');
});

// Close mobile menu when clicking nav links
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', function () {
        navMenu.classList.remove('active');
        navOverlay.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Feedback Form Functionality
document.addEventListener('DOMContentLoaded', function () {
    const feedbackForm = document.getElementById('feedbackForm');
    const clearFormBtn = document.getElementById('clearForm');
    const clearAllBtn = document.getElementById('clearAll');
    const feedbackList = document.getElementById('feedbackList');
    const contactForm = document.getElementById('contactForm');

    // Initialize feedbacks array
    let feedbacks = [];

    // Load feedbacks from localStorage
    try {
        const storedFeedbacks = localStorage.getItem('teacherFeedbacks');
        if (storedFeedbacks) {
            feedbacks = JSON.parse(storedFeedbacks);
        }
    } catch (error) {
        console.error('Error loading feedbacks from localStorage:', error);
        feedbacks = [];
    }

    updateFeedbackList();

    // Submit feedback form
    feedbackForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        const teacherName = document.getElementById('teacherName').value.trim();
        const subject = document.getElementById('subject').value;

        // Get all rating values with validation
        const effectiveness = getRadioValue('effectiveness');
        const communication = getRadioValue('communication');
        const knowledge = getRadioValue('knowledge');
        const management = getRadioValue('management');
        const punctuality = getRadioValue('punctuality');
        const support = getRadioValue('support');
        const aids = getRadioValue('aids');
        const satisfaction = getRadioValue('satisfaction');

        const comments = document.getElementById('comments').value.trim();

        // Validate required fields
        if (!teacherName) {
            showNotification('Please enter teacher name!', 'error');
            return;
        }

        if (!subject) {
            showNotification('Please select a subject!', 'error');
            return;
        }

        if (!effectiveness || !communication || !knowledge || !management ||
            !punctuality || !support || !aids || !satisfaction) {
            showNotification('Please rate all categories!', 'error');
            return;
        }

        if (!comments) {
            showNotification('Please provide comments!', 'error');
            return;
        }

        // Create feedback object
        const feedback = {
            id: Date.now(),
            teacherName,
            subject,
            effectiveness,
            communication,
            knowledge,
            management,
            punctuality,
            support,
            aids,
            satisfaction,
            comments,
            date: new Date().toLocaleDateString('en-IN'),
            time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
            timestamp: new Date().toISOString()
        };

        // Add to feedbacks array
        feedbacks.push(feedback);

        // Save to localStorage
        try {
            localStorage.setItem('teacherFeedbacks', JSON.stringify(feedbacks));
            console.log('Feedback saved successfully:', feedback);
        } catch (error) {
            console.error('Error saving feedback to localStorage:', error);
            showNotification('Error saving feedback!', 'error');
            return;
        }

        // Update UI
        updateFeedbackList();
        feedbackForm.reset();

        // Reset rating styles
        resetRatingStyles();

        // Show success message with animation
        showNotification('🎉 Thank you for your valuable feedback!', 'success');

        // Add celebration effect
        addCelebrationEffect();
    });

    // Helper function to get radio button value
    function getRadioValue(name) {
        const selected = document.querySelector(`input[name="${name}"]:checked`);
        return selected ? selected.value : null;
    }

    // Helper function to reset rating styles
    function resetRatingStyles() {
        document.querySelectorAll('.rating-option label').forEach(label => {
            label.style.background = '';
            label.style.color = '';
            label.style.transform = '';
        });
    }

    // Celebration effect
    function addCelebrationEffect() {
        const celebration = document.createElement('div');
        celebration.className = 'celebration-effect';

        // Create multiple confetti elements
        for (let i = 0; i < 20; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'celebration-confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDelay = Math.random() * 2 + 's';
            confetti.style.background = getRandomColor();
            celebration.appendChild(confetti);
        }

        document.body.appendChild(celebration);

        setTimeout(() => {
            celebration.remove();
        }, 3000);
    }

    function getRandomColor() {
        const colors = [
            'linear-gradient(45deg, #ff6b6b, #feca57)',
            'linear-gradient(45deg, #48dbfb, #0abde3)',
            'linear-gradient(45deg, #ff9ff3, #f368e0)',
            'linear-gradient(45deg, #00d2d3, #54a0ff)',
            'linear-gradient(45deg, #5f27cd, #341f97)'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // Clear form
    clearFormBtn.addEventListener('click', function () {
        feedbackForm.reset();
        resetRatingStyles();
        showNotification('Form cleared successfully!', 'info');
    });

    // Clear all feedbacks
    clearAllBtn.addEventListener('click', function () {
        if (confirm('Are you sure you want to delete all feedbacks? This action cannot be undone.')) {
            feedbacks = [];
            try {
                localStorage.setItem('teacherFeedbacks', JSON.stringify(feedbacks));
                updateFeedbackList();
                showNotification('All feedbacks cleared successfully!', 'info');
            } catch (error) {
                console.error('Error clearing feedbacks:', error);
                showNotification('Error clearing feedbacks!', 'error');
            }
        }
    });

    // Contact form submission
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Simple validation
        if (!name || !email || !message) {
            showNotification('Please fill all fields!', 'error');
            return;
        }

        // In a real application, you would send this data to a server
        console.log('Contact form submitted:', { name, email, message });

        contactForm.reset();
        showNotification('Thank you for your message! We will get back to you soon.', 'success');
    });

    // Update feedback list
    function updateFeedbackList() {
        feedbackList.innerHTML = '';

        if (!feedbacks || feedbacks.length === 0) {
            feedbackList.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">
                        <i class="fas fa-comments"></i>
                    </div>
                    <h3>No Feedback Yet</h3>
                    <p>Be the first to share your feedback!</p>
                    <div class="empty-cta">
                        <i class="fas fa-arrow-left"></i>
                        <span>Use the form to submit your review</span>
                    </div>
                </div>
            `;
            return;
        }

        // Group feedbacks by teacher
        const feedbacksByTeacher = {};
        feedbacks.forEach(feedback => {
            if (!feedbacksByTeacher[feedback.teacherName]) {
                feedbacksByTeacher[feedback.teacherName] = [];
            }
            feedbacksByTeacher[feedback.teacherName].push(feedback);
        });

        // Show latest first
        Object.keys(feedbacksByTeacher).forEach(teacherName => {
            const teacherFeedbacks = feedbacksByTeacher[teacherName];

            const teacherSection = document.createElement('div');
            teacherSection.className = 'teacher-feedback-section';

            // Calculate average rating for teacher
            const avgRating = calculateAverageRating(teacherFeedbacks);
            const teacherInitials = getInitials(teacherName);

            teacherSection.innerHTML = `
                <div class="teacher-header">
                    <div class="teacher-avatar">
                        <div class="avatar-circle">${teacherInitials}</div>
                        <div class="teacher-info">
                            <h4>${teacherName}</h4>
                            <div class="teacher-stats">
                                <span class="feedback-count">${teacherFeedbacks.length} review${teacherFeedbacks.length > 1 ? 's' : ''}</span>
                                <span class="avg-rating">
                                    <span class="stars">${generateStars(avgRating)}</span>
                                    ${avgRating.toFixed(1)}/5
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="teacher-performance">
                        <div class="performance-chart">
                            ${generatePerformanceChart(teacherFeedbacks)}
                        </div>
                    </div>
                </div>
                <div class="teacher-feedbacks">
                    ${teacherFeedbacks
                    .slice()
                    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                    .map((feedback, index) => createFeedbackItem(feedback, index))
                    .join('')}
                </div>
            `;
            feedbackList.appendChild(teacherSection);
        });
    }

    // Calculate average rating for a teacher
    function calculateAverageRating(feedbacks) {
        const total = feedbacks.reduce((sum, feedback) => {
            return sum + parseInt(feedback.satisfaction);
        }, 0);
        return total / feedbacks.length;
    }

    // Get initials from teacher name
    function getInitials(name) {
        return name.split(' ')
            .map(word => word.charAt(0))
            .join('')
            .toUpperCase()
            .slice(0, 2);
    }

    // Generate star rating
    function generateStars(rating) {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

        return '★'.repeat(fullStars) + (halfStar ? '½' : '') + '☆'.repeat(emptyStars);
    }

    // Generate performance chart
    function generatePerformanceChart(feedbacks) {
        const categories = ['effectiveness', 'communication', 'knowledge', 'management', 'punctuality', 'support', 'aids'];
        const categoryNames = {
            effectiveness: 'Teaching',
            communication: 'Communication',
            knowledge: 'Knowledge',
            management: 'Management',
            punctuality: 'Punctuality',
            support: 'Support',
            aids: 'Teaching Aids'
        };

        let chartHTML = '';
        categories.forEach(category => {
            const avg = feedbacks.reduce((sum, fb) => sum + parseInt(fb[category]), 0) / feedbacks.length;
            const percentage = (avg / 5) * 100;

            chartHTML += `
                <div class="chart-item">
                    <span class="chart-label">${categoryNames[category]}</span>
                    <div class="chart-bar">
                        <div class="chart-fill" style="width: ${percentage}%"></div>
                    </div>
                    <span class="chart-value">${avg.toFixed(1)}</span>
                </div>
            `;
        });

        return chartHTML;
    }

    // Create individual feedback item
    function createFeedbackItem(feedback, index) {
        const getEmoji = (rating) => {
            const ratingNum = parseInt(rating);
            switch (ratingNum) {
                case 1: return '😞';
                case 2: return '😐';
                case 3: return '😊';
                case 4: return '😄';
                case 5: return '🤩';
                default: return '😊';
            }
        };

        const getRatingColor = (rating) => {
            const ratingNum = parseInt(rating);
            switch (ratingNum) {
                case 1: return '#ff4757';
                case 2: return '#ffa502';
                case 3: return '#2ed573';
                case 4: return '#1e90ff';
                case 5: return '#5352ed';
                default: return '#747d8c';
            }
        };

        const getSentiment = (rating) => {
            const ratingNum = parseInt(rating);
            switch (ratingNum) {
                case 1: return 'Poor';
                case 2: return 'Fair';
                case 3: return 'Good';
                case 4: return 'Very Good';
                case 5: return 'Excellent';
                default: return 'Good';
            }
        };

        return `
            <div class="feedback-item" style="animation-delay: ${index * 0.1}s">
                <div class="feedback-header">
                    <div class="feedback-subject-badge">
                        <i class="fas fa-book"></i>
                        ${feedback.subject}
                    </div>
                    <div class="feedback-overall">
                        <div class="overall-rating" style="background: ${getRatingColor(feedback.satisfaction)}">
                            <span class="rating-number">${feedback.satisfaction}</span>
                            <span class="rating-emoji">${getEmoji(feedback.satisfaction)}</span>
                        </div>
                        <div class="sentiment">${getSentiment(feedback.satisfaction)}</div>
                    </div>
                </div>
                
                <div class="feedback-ratings-grid">
                    <div class="rating-pill" style="border-left-color: ${getRatingColor(feedback.effectiveness)}">
                        <span class="pill-label">Teaching</span>
                        <span class="pill-rating">${feedback.effectiveness}/5 ${getEmoji(feedback.effectiveness)}</span>
                    </div>
                    <div class="rating-pill" style="border-left-color: ${getRatingColor(feedback.communication)}">
                        <span class="pill-label">Communication</span>
                        <span class="pill-rating">${feedback.communication}/5 ${getEmoji(feedback.communication)}</span>
                    </div>
                    <div class="rating-pill" style="border-left-color: ${getRatingColor(feedback.knowledge)}">
                        <span class="pill-label">Knowledge</span>
                        <span class="pill-rating">${feedback.knowledge}/5 ${getEmoji(feedback.knowledge)}</span>
                    </div>
                    <div class="rating-pill" style="border-left-color: ${getRatingColor(feedback.management)}">
                        <span class="pill-label">Management</span>
                        <span class="pill-rating">${feedback.management}/5 ${getEmoji(feedback.management)}</span>
                    </div>
                    <div class="rating-pill" style="border-left-color: ${getRatingColor(feedback.punctuality)}">
                        <span class="pill-label">Punctuality</span>
                        <span class="pill-rating">${feedback.punctuality}/5 ${getEmoji(feedback.punctuality)}</span>
                    </div>
                    <div class="rating-pill" style="border-left-color: ${getRatingColor(feedback.support)}">
                        <span class="pill-label">Support</span>
                        <span class="pill-rating">${feedback.support}/5 ${getEmoji(feedback.support)}</span>
                    </div>
                    <div class="rating-pill" style="border-left-color: ${getRatingColor(feedback.aids)}">
                        <span class="pill-label">Teaching Aids</span>
                        <span class="pill-rating">${feedback.aids}/5 ${getEmoji(feedback.aids)}</span>
                    </div>
                </div>
                
                <div class="feedback-comment-card">
                    <div class="comment-header">
                        <i class="fas fa-quote-left"></i>
                        <span>Student's Comments</span>
                    </div>
                    <div class="comment-text">"${feedback.comments}"</div>
                </div>
                
                <div class="feedback-footer">
                    <div class="feedback-date">
                        <i class="far fa-calendar"></i>
                        ${feedback.date} at ${feedback.time}
                    </div>
                    <div class="feedback-actions">
                        <span class="feedback-id">#${feedback.id.toString().slice(-6)}</span>
                    </div>
                </div>
            </div>
        `;
    }

    // Enhanced rating selection
    document.querySelectorAll('.rating-option input').forEach(radio => {
        radio.addEventListener('change', function () {
            // Remove any existing selected styles from siblings
            const parentGroup = this.closest('.rating-group');
            parentGroup.querySelectorAll('.rating-option label').forEach(label => {
                label.style.background = '';
                label.style.color = '';
                label.style.transform = '';
            });

            // Style the selected option
            if (this.checked) {
                const label = this.nextElementSibling;
                label.style.background = 'var(--primary-light)';
                label.style.color = 'white';
                label.style.transform = 'scale(1.05)';
            }
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Update active nav link
                document.querySelectorAll('.nav-menu a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', function () {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-menu a');

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Footer animation
    const footerItems = document.querySelectorAll('.footer-column ul li, .contact-item-footer');

    footerItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';

        setTimeout(() => {
            item.style.transition = 'all 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 100 * index);
    });

    // Debug: Check if localStorage is working
    console.log('Current feedbacks in localStorage:', feedbacks);
});

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);

    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', function () {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }
    });
}

// Get appropriate icon for notification type
function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'check-circle';
        case 'warning': return 'exclamation-triangle';
        case 'error': return 'times-circle';
        default: return 'info-circle';
    }
}

// Debug function to check localStorage
function debugLocalStorage() {
    console.log('LocalStorage contents:');
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        console.log(`${key}:`, localStorage.getItem(key));
    }
}

// Call debug function on load
window.addEventListener('load', debugLocalStorage);
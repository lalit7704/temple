// ===== HEADER INTERACTIONS - NEW REDESIGN =====

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileOverlay = document.querySelector('.mobile-overlay');
  const closeMenu = document.querySelector('.close-menu');
  
  // Toggle mobile menu
  if (menuToggle) {
    menuToggle.addEventListener('click', function(e) {
      e.preventDefault();
      mobileMenu?.classList.toggle('active');
      mobileOverlay?.classList.toggle('active');
      document.body.style.overflow = mobileMenu?.classList.contains('active') ? 'hidden' : '';
    });
  }
  
  // Close menu button
  if (closeMenu) {
    closeMenu.addEventListener('click', function(e) {
      e.preventDefault();
      mobileMenu?.classList.remove('active');
      mobileOverlay?.classList.remove('active');
      document.body.style.overflow = '';
    });
  }
  
  // Close menu on overlay click
  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', function() {
      mobileMenu?.classList.remove('active');
      mobileOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  }
  
  // Mobile dropdown menus
  const dropdownTriggers = document.querySelectorAll('.dropdown-trigger');
  dropdownTriggers.forEach(trigger => {
    trigger.addEventListener('click', function(e) {
      e.preventDefault();
      const parentLi = this.closest('.mobile-dropdown');
      const submenu = parentLi?.querySelector('.mobile-submenu');
      
      // Close other open dropdowns
      document.querySelectorAll('.mobile-dropdown').forEach(li => {
        if (li !== parentLi) {
          li.classList.remove('open');
        }
      });
      
      // Toggle current dropdown
      parentLi?.classList.toggle('open');
    });
  });
  
  // Close mobile menu when clicking a link
  const mobileLinks = document.querySelectorAll('.mobile-menu-list a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', function() {
      // Don't close for dropdown triggers
      if (!this.classList.contains('dropdown-trigger')) {
        mobileMenu?.classList.remove('active');
        mobileOverlay?.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });
});

// Back to Top Button
window.addEventListener('scroll', function() {
  const backTopBtn = document.querySelector('.back-top-btn');
  if (!backTopBtn) return;
  
  if (window.scrollY > 300) {
    backTopBtn.classList.add('show');
  } else {
    backTopBtn.classList.remove('show');
  }
});

// Back to top click handler
document.addEventListener('click', function(e) {
  const backTopLink = e.target.closest('.back-top-btn a');
  if (backTopLink) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
});

// Contact form submission handler - sends to lalit@gmail.com via FormSubmit.co
function handleFormSubmit(event, formId) {
  event.preventDefault();
  
  var form = document.getElementById(formId);
  var messageDiv = document.getElementById(formId === 'contactFormIndex' ? 'formMessageIndex' : 'formMessagePage');
  
  // Show loading message
  messageDiv.style.display = 'block';
  messageDiv.style.backgroundColor = '#fff3cd';
  messageDiv.style.color = '#856404';
  messageDiv.style.border = '1px solid #ffc107';
  messageDiv.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending message...';
  
  // Submit form via fetch to FormSubmit.co
  var formData = new FormData(form);
  
  fetch(form.action, {
    method: 'POST',
    body: formData
  })
  .then(function(response) {
    if (response.ok) {
      messageDiv.style.backgroundColor = '#d4edda';
      messageDiv.style.color = '#155724';
      messageDiv.style.border = '1px solid #c3e6cb';
      messageDiv.innerHTML = '<i class="fa-solid fa-check-circle"></i> Message sent successfully! We will get back to you soon.';
      form.reset();
      setTimeout(function() {
        messageDiv.style.display = 'none';
      }, 5000);
    } else {
      throw new Error('Form submission failed');
    }
  })
  .catch(function(error) {
    messageDiv.style.backgroundColor = '#f8d7da';
    messageDiv.style.color = '#721c24';
    messageDiv.style.border = '1px solid #f5c6cb';
    messageDiv.innerHTML = '<i class="fa-solid fa-exclamation-circle"></i> Error sending message. Please try again or email us directly at <strong>lalit@gmail.com</strong>';
  });
}


// Global header & sidebar interactions (pure JavaScript, works on all pages)

// Toggle mobile sidebar open/close
document.addEventListener('click', function (event) {
  var bar = event.target.closest('.bar');
  if (bar) {
    event.preventDefault();
    var sidebar = document.querySelector('.side-bar');
    if (sidebar) {
      sidebar.classList.toggle('slide01');
    }
    return;
  }

  var closeBtn = event.target.closest('.close');
  if (closeBtn) {
    event.preventDefault();
    var sidebarClose = document.querySelector('.side-bar');
    if (sidebarClose) {
      sidebarClose.classList.toggle('slide01');
    }
    return;
  }

  // Sidebar dropdowns (About / News) – toggle on tap in mobile view
  var sidebarLink = event.target.closest('.sidebar-third-a > a');
  if (sidebarLink) {
    event.preventDefault();
    var parentLi = sidebarLink.closest('.sidebar-third-a');
    if (parentLi) {
      parentLi.classList.toggle('open');
    }
    return;
  }

  // Back to top button
  var backTop = event.target.closest('.back-top');
  if (backTop) {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
});

// Show / hide back-to-top on scroll
window.addEventListener('scroll', function () {
  var backTopBtn = document.querySelector('.back-top');
  if (!backTopBtn) return;

  if (window.scrollY > 50) {
    backTopBtn.classList.add('h');
  } else {
    backTopBtn.classList.remove('h');
  }
});

// Poll for back-to-top button existence (handles async header loading)
function initBackToTop() {
  var checkInterval = setInterval(function() {
    var backTopBtn = document.querySelector('.back-top');
    if (backTopBtn) {
      clearInterval(checkInterval);
      // Initial check in case page is loaded mid-scroll
      if (window.scrollY > 50) {
        backTopBtn.classList.add('h');
      }
    }
  }, 100);
  
  // Stop polling after 5 seconds to prevent infinite checking
  setTimeout(function() {
    clearInterval(checkInterval);
  }, 5000);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBackToTop);
} else {
  initBackToTop();
}

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


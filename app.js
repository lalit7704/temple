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


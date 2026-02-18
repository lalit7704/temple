// Sidebar toggle
function openSidebar(){ document.getElementById('sidebar').classList.add('active'); }
function closeSidebar(){ document.getElementById('sidebar').classList.remove('active'); }

// Back to top
window.onscroll = function(){
  let topBtn = document.getElementById('backTop');
  if(window.scrollY > 200){ topBtn.style.display='block'; }
  else{ topBtn.style.display='none'; }
};
function scrollTop(){ window.scrollTo({ top:0, behavior:'smooth' }); }

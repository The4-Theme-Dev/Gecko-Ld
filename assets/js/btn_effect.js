
document.addEventListener('DOMContentLoaded',function(){
  if(window.innerWidth < 1024){
    return;
  }
  document.querySelectorAll('.btn_xkxl').forEach(button => button.innerHTML = '<div><span>' + button.textContent.trim().split('').join('</span><span>') + '</span></div>');
})
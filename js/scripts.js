menuToggler.addEventListener('click', ev => {
  menu.classList.toggle('open');
  menuToggler.classList.toggle('open');
  main.classList.toggle('open');
  footer.classList.toggle('open');
});

showPreview.addEventListener('click', ev => {
  ev.preventDefault();
  resultFrom.innerHTML = contactEmail.value;
  resultSubject.innerHTML = contactSubject.value;
  resultMessage.innerHTML = contactMessage.value;
  result.classList.toggle('open');
});

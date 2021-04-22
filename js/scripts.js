menuToggler.addEventListener('click', ev => {
  menu.classList.toggle('open');
  menuToggler.classList.toggle('open');
  main.classList.toggle('open');
  footer.classList.toggle('open');
});

showPreview.addEventListener('click', ev => {
  //stop the form from being submitted
  ev.preventDefault();
  //if it is the first time the button was pressed, show the results box
  if(!result.classList.contains('open'))
  {
    result.classList.toggle('open');
  }
  //change the contents of the box to match the new contents
  resultFrom.innerHTML = contactEmail.value;
  resultSubject.innerHTML = contactSubject.value;
  resultMessage.innerHTML = contactMessage.value;
});

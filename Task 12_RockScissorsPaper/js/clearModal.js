const clearModal = (e) => {
  const modal = document.querySelector('.modal');
  if (e.target === modal) {
    modal.style.display = 'none';
  }
}
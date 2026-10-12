// Initialization has already resolved saved choice → device → Day in the head.
const root = document.documentElement;
const button = document.querySelector('.theme-control');
if (button) {
  const updateName = () => button.setAttribute('aria-label', root.dataset.theme === 'day' ? 'Switch to Evening' : 'Switch to Day');
  updateName();
  button.addEventListener('click', () => {
    const theme = root.dataset.theme === 'day' ? 'evening' : 'day';
    root.dataset.theme = theme;
    updateName();
    try { window.localStorage.setItem('field-notes-theme', theme); } catch { /* The root retains this visit's explicit choice. */ }
  });
  button.hidden = false;
}

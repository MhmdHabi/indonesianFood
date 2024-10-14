const LoadingIndicator = {
  render() {
    return `
      <div class="loading-container">
        <div class="spinner"></div> 
      </div>
    `;
  },

  show() {
    document.querySelector('.loading-container').style.display = 'flex';
  },

  hide() {
    document.querySelector('.loading-container').style.display = 'none';
  },
};

export default LoadingIndicator;

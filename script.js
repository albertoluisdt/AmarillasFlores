onload = () => {
  document.body.classList.remove("container");

  // Card/Letter functionality
  const cardIcon = document.getElementById('cardIcon');
  const cardContainer = document.getElementById('cardContainer');
  const messageModal = document.getElementById('messageModal');
  const closeBtn = document.getElementById('closeBtn');
  const fallingMessages = document.getElementById('fallingMessages');

  // Function to create falling "Te amo" messages
  function createFallingMessages() {
    // Prevent multiple calls by checking if already running
    if (fallingMessages.dataset.running === 'true') {
      return;
    }

    // Mark as running
    fallingMessages.dataset.running = 'true';

    // Clear any existing messages first
    fallingMessages.innerHTML = '';

    const colors = ['purple', 'white'];
    const messageCount = 10;
    let createdMessages = 0;

    const createSingleMessage = (index) => {
      if (createdMessages >= messageCount) return;

      const message = document.createElement('div');
      message.className = `falling-message ${colors[index % 2]}`;
      message.textContent = 'Te amo';
      message.style.left = (Math.random() * 80 + 10) + '%';
      message.style.top = '-50px';

      // Use a unique ID to track each message
      message.id = `falling-msg-${Date.now()}-${index}`;

      fallingMessages.appendChild(message);
      createdMessages++;

      // Remove this specific message after animation
      setTimeout(() => {
        const msgToRemove = document.getElementById(message.id);
        if (msgToRemove && msgToRemove.parentNode) {
          msgToRemove.parentNode.removeChild(msgToRemove);
        }
      }, 4000);
    };

    // Create messages with staggered timing
    for (let i = 0; i < messageCount; i++) {
      setTimeout(() => createSingleMessage(i), i * 200);
    }

    // Reset the running flag after all animations complete
    setTimeout(() => {
      fallingMessages.innerHTML = '';
      fallingMessages.dataset.running = 'false';
    }, 6000);
  }

  // Function to move card to corner with popup effect
  function moveCardToCorner() {
    // Only animate if not already in corner
    if (!cardContainer.classList.contains('moved-to-corner')) {
      // First: popup out from center
      cardContainer.classList.add('popup-out');

      // After popup-out completes, add moved-to-corner class for popup-in
      setTimeout(() => {
        cardContainer.classList.add('moved-to-corner');
      }, 400); // 400ms matches the popup-out duration
    }
  }

  // Function to show message
  function showMessage() {
    messageModal.classList.add('show');
  }

  // Function to close message
  function closeMessage() {
    messageModal.classList.remove('show');
    // Create falling messages
    createFallingMessages();
    // Move card to corner after message is closed
    setTimeout(moveCardToCorner, 100);
  }

  // Show message when card is clicked
  cardIcon.addEventListener('click', showMessage);

  // Close message when close button is clicked
  closeBtn.addEventListener('click', closeMessage);

  // Close message when clicking outside the modal content
  messageModal.addEventListener('click', (e) => {
    if (e.target === messageModal) {
      closeMessage();
    }
  });

  // Close message with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && messageModal.classList.contains('show')) {
      closeMessage();
    }
  });
};
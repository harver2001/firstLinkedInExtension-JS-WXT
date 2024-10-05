const predefinedText = "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.";  // Predefined text

// Function to create and inject the modal into the page
function createModal(clickedChat) {
    if (document.querySelector('.custom-modal')) return;  // Prevent multiple modals

    // Create modal background
    const modalBg = document.createElement('div');
    modalBg.className = 'custom-modal-bg';
    modalBg.style = `
        position: fixed;
        top: 0; left: 0;
        width: 100%; height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    `;

    // Create modal box with increased width
    const modalBox = document.createElement('div');
    modalBox.className = 'custom-modal';
    modalBox.style = `
        background-color: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        width: 450px;  // Increased width
        max-height: 400px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        align-items: stretch;
    `;

    // Chat container (for user input and predefined text)
    const chatContainer = document.createElement('div');
    chatContainer.className = 'chat-container';
    chatContainer.style = `
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;
    `;

    // Function to append chat bubbles
    function appendChatBubble(text, alignSelf, backgroundColor, textColor) {
        const chatBubble = document.createElement('div');
        chatBubble.textContent = text;
        chatBubble.style = `
            background-color: ${backgroundColor};
            color: ${textColor};
            padding: 10px;
            margin-bottom: 10px;
            border-radius: 8px;
            align-self: ${alignSelf};
            max-width: 70%;
        `;
        chatContainer.appendChild(chatBubble);
    }

    // Container for input and buttons
    const inputContainer = document.createElement('div');
    inputContainer.style = `
        display: flex;
        flex-direction: column;
    `;

    // Input field for typing messages
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.placeholder = 'Your prompt';
    inputField.style = `
        width: 100%;
        padding: 10px;
        margin-bottom: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
        color: black;  // Set text color to black
    `;

    // Button container
    const buttonContainer = document.createElement('div');
    buttonContainer.style = `
        display: flex;
        justify-content: flex-end; // Align buttons to the right
    `;

    // Insert button (copies predefined text to LinkedIn chat)
    const insertButton = document.createElement('button');
    insertButton.textContent = 'Insert';
    insertButton.style = `
        padding: 10px;
        background-color: whitesmoke;  // Set to whitesmoke
        color: black;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        margin-right: 10px;  // Add space between buttons
        display: none;  // Initially hidden
    `;
    insertButton.onclick = () => {
        if (clickedChat) {
            clickedChat.innerHTML = predefinedText;  // Copy predefined text to LinkedIn chat input
            inputField.value = ''; // Clear the input field
            inputField.placeholder = ''; // Remove placeholder after insert
        }
    };

    // Generate button (inserts predefined text into chat area)
    const generateButton = document.createElement('button');
    generateButton.style = `
        padding: 10px;
        background-color: #0073b1;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    `;

    // Logo for the Generate button
    const generateLogo = document.createElement('img');
    generateLogo.src = 'https://your-logo-url.com/logo.png';  // Replace with your logo URL
    generateLogo.style = `
        width: 20px; 
        height: 20px; 
        margin-left: 5px;  // Add space between text and logo
    `;
    generateButton.appendChild(generateLogo);
    generateButton.textContent = ' Generate';  // Add text alongside the logo

    generateButton.onclick = () => {
        const userInput = inputField.value;
        if (userInput) {
            appendChatBubble(userInput, 'flex-end', '#e0e0e0', 'black');  // User input on the right
            appendChatBubble(predefinedText, 'flex-start', '#d8eaff', 'black');  // Predefined response on the left
            inputField.value = '';  // Clear input field
            inputField.placeholder = ''; // Remove placeholder after generation
            chatContainer.scrollTop = chatContainer.scrollHeight;  // Scroll to bottom

            // Show the Insert button after the first generation
            insertButton.style.display = 'block';
        }
    };

    // Regenerate button (for predefined text generation)
    const regenerateButton = document.createElement('button');
    regenerateButton.textContent = 'Regenerate';
    regenerateButton.style = `
        padding: 10px;
        background-color: #0073b1;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        width: 100%;
        margin-top: 10px;
        display: none;  // Initially hidden
    `;
    regenerateButton.onclick = () => {
        const userInput = inputField.value;
        if (userInput) {
            appendChatBubble(userInput, 'flex-end', '#e0e0e0', 'black');  // User input on the right
            appendChatBubble(predefinedText, 'flex-start', '#d8eaff', 'black');  // Predefined response on the left
            inputField.value = '';  // Clear input field
            inputField.placeholder = ''; // Remove placeholder after generation
            chatContainer.scrollTop = chatContainer.scrollHeight;  // Scroll to bottom
        }
    };

    // Append elements to input container
    inputContainer.appendChild(inputField);
    buttonContainer.appendChild(insertButton);
    buttonContainer.appendChild(generateButton);
    inputContainer.appendChild(buttonContainer);
    inputContainer.appendChild(regenerateButton);  // Add regenerate button to the input container

    // Append chatContainer and inputContainer to modal box
    modalBox.appendChild(chatContainer);
    modalBox.appendChild(inputContainer);

    // Append modal box to modal background
    modalBg.appendChild(modalBox);

    // Append modal to the body
    document.body.appendChild(modalBg);

    // Close modal on background click
    modalBg.onclick = (e) => {
        if (e.target === modalBg) {
            document.body.removeChild(modalBg);
        }
    };
}

// Function to inject logo into LinkedIn chat
function injectLogo() {
    const chatSelector = '.msg-form__contenteditable';  // LinkedIn's chat input box
    const chatElements = document.querySelectorAll(chatSelector);

    chatElements.forEach(chat => {
        if (!chat.querySelector('.custom-logo')) {
            const logoImg = document.createElement('img');
            logoImg.src = 'https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTExL3Jhd3BpeGVsb2ZmaWNlMjFfc3Ryb2tlX291dGxpbmVfb2Zfc2ltcGxlX2Zsb3dlcl93aWxkZm9sd2VyX2luX19lZTdhYTYzYi0xNzY3LTQ0NjYtODBkNC02ZDBjOGM1YzM5MmRfMS5wbmc.png';  // Replace with your logo URL
            logoImg.className = 'custom-logo';
            logoImg.style = 'width: 40px; height: 40px; position: absolute; right: 10px; bottom: 10px; cursor: pointer;';

            // Add click event to open modal
            logoImg.addEventListener('click', () => createModal(chat));

            chat.appendChild(logoImg);
        }
    });
}

// Observe DOM changes and inject the logo when a new chat opens
const observer = new MutationObserver(() => {
    injectLogo();
});

observer.observe(document.body, { childList: true, subtree: true });
injectLogo();

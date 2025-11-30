// Use this URL to fetch NASA APOD JSON data.
const apodData = 'https://cdn.jsdelivr.net/gh/GCA-Classroom/apod/data.json';
// Get the gallery container element
const gallery = document.getElementById('gallery');

// Get modal elements
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
const closeBtn = document.querySelector('.close');

// The URL to fetch NASA APOD data from
const API_URL = 'https://cdn.jsdelivr.net/gh/GCA-Classroom/apod/data.json';

// Function to fetch data from the API
async function fetchAPODData() {
    try {
        console.log('Starting fetch...'); // Add this line
        
        // Make a fetch request to get the data
        const response = await fetch(API_URL);
        
        console.log('Response received:', response); // Add this line
        
        // Convert the response to JSON format
        const data = await response.json();
        
        console.log('Data received:', data); // Add this line
        
        // Display the data in the gallery
        displayGallery(data);
    } catch (error) {
        // If there's an error, show it in the console
        console.error('Error fetching data:', error);
    }
}

// Function to display the gallery
function displayGallery(apodArray) {
    // Loop through each APOD item in the array
    apodArray.forEach(item => {
        // Create a card element for each item
        const card = document.createElement('div');
        card.className = 'card';
        
        // Decide which image to show (thumbnail for videos, url for images)
        let imageUrl = item.media_type === 'video' ? item.thumbnail_url : item.url;
        
        // Create the HTML content for the card
        card.innerHTML = `
            <img src="${imageUrl}" alt="${item.title}">
            <h3>${item.title}</h3>
            <p>${item.date}</p>
        `;
        
        // Add click event to open modal with details
        card.addEventListener('click', () => showModal(item));
        
        // Add the card to the gallery
        gallery.appendChild(card);
    });
}

// Function to show the modal with item details
function showModal(item) {
    // Create content based on media type
    let mediaContent = '';
    
    if (item.media_type === 'video') {
        // For videos, embed the YouTube video
        mediaContent = `<iframe width="560" height="315" src="${item.url}" frameborder="0" allowfullscreen></iframe>`;
    } else {
        // For images, show the high-res image
        mediaContent = `<img src="${item.hdurl || item.url}" alt="${item.title}">`;
    }
    
    // Set the modal content
    modalBody.innerHTML = `
        ${mediaContent}
        <h2>${item.title}</h2>
        <p><strong>Date:</strong> ${item.date}</p>
        <p>${item.explanation}</p>
    `;
    
    // Show the modal
    modal.style.display = 'block';
}

// Close modal when clicking the X button
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close modal when clicking outside of it
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Start the app by fetching the data
fetchAPODData();
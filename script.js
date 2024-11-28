// Simulated user and admin credentials (in a real application, this would be handled server-side)
const users = [
    { email: "amanv4674@gmail.com", password: "@Aman123" },
];

const admins = [
    { email: "vermaman03@gmail.com", password: "P@ssw0rd" },
];

// Simulated event types data (in a real application, this would come from a server)
const eventTypes = [
    { id: 1, name: "Party", description: "Celebrate any occasion with a fun-filled party", price: 1000 },
    { id: 2, name: "Ceremony", description: "Formal events for special occasions", price: 1500 },
    { id: 3, name: "Marriage", description: "Beautiful wedding ceremonies and receptions", price: 5000 },
    { id: 4, name: "Function", description: "General purpose events for various needs", price: 2000 },
    { id: 5, name: "Office Party", description: "Corporate events and team building activities", price: 3000 },
    { id: 6, name: "College Event", description: "Academic and social events for students", price: 2500 },
    { id: 7, name: "Birthday Celebration", description: "Special birthday parties for all ages", price: 1200 },
    { id: 8, name: "Conference", description: "Professional gatherings for various industries", price: 4000 },
    { id: 9, name: "Product Launch", description: "Exciting events to introduce new products", price: 3500 },
    { id: 10, name: "Charity Gala", description: "Elegant fundraising events for good causes", price: 4500 }
];

// Simulated event data (in a real application, this would be stored in a database)
let events = [];

// User Login
const userLoginForm = document.getElementById('userLoginForm');
if (userLoginForm) {
    userLoginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('userEmail').value;
        const password = document.getElementById('userPassword').value;
        
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            alert('Login successful!');
            window.location.href = 'select-event.html';
        } else {
            alert('Invalid credentials. Please try again.');
        }
    });
}

// Admin Login
const adminLoginForm = document.getElementById('adminLoginForm');
if (adminLoginForm) {
    adminLoginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('adminEmail').value;
        const password = document.getElementById('adminPassword').value;
        
        const admin = admins.find(a => a.email === email && a.password === password);
        if (admin) {
            alert('Login successful!');
            window.location.href = 'admin-dashboard.html';
        } else {
            alert('Invalid credentials. Please try again.');
        }
    });
}

// Event Type Selection
const eventTypeGrid = document.getElementById('eventTypeGrid');
if (eventTypeGrid) {
    eventTypes.forEach(eventType => {
        const eventTypeElement = document.createElement('div');
        eventTypeElement.classList.add('event-type');
        eventTypeElement.innerHTML = `
            <h3>${eventType.name}</h3>
            <p>${eventType.description}</p>
            <p class="price">$${eventType.price}</p>
            <button class="btn btn-primary select-event" data-event-id="${eventType.id}">Select</button>
        `;
        eventTypeGrid.appendChild(eventTypeElement);
    });

    // Add event listeners to the select buttons
    const selectButtons = document.querySelectorAll('.select-event');
    selectButtons.forEach(button => {
        button.addEventListener('click', function() {
            const eventId = this.getAttribute('data-event-id');
            const selectedEvent = eventTypes.find(event => event.id === parseInt(eventId));
            if (selectedEvent) {
                localStorage.setItem('selectedEventType', JSON.stringify(selectedEvent));
                window.location.href = 'book-event.html';
            }
        });
    });
}

// Update Book Event form to include selected event type
const bookEventForm = document.getElementById('bookEventForm');
if (bookEventForm) {
    const selectedEventType = JSON.parse(localStorage.getItem('selectedEventType'));
    if (selectedEventType) {
        const eventTypeDisplay = document.createElement('div');
        eventTypeDisplay.classList.add('selected-event-type');
        eventTypeDisplay.innerHTML = `
            <h3>Selected Event Type: ${selectedEventType.name}</h3>
            <p>Price: $${selectedEventType.price}</p>
        `;
        bookEventForm.insertBefore(eventTypeDisplay, bookEventForm.firstChild);
    }

    bookEventForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const eventName = document.getElementById('eventName').value;
        const eventDate = document.getElementById('eventDate').value;
        const eventTime = document.getElementById('eventTime').value;
        const attendees = document.getElementById('attendees').value;
        const eventDescription = document.getElementById('eventDescription').value;
        
        const newEvent = { 
            ...selectedEventType,
            eventName, 
            eventDate, 
            eventTime, 
            attendees, 
            eventDescription 
        };
        events.push(newEvent);
        alert('Event booked successfully!');
        bookEventForm.reset();
        localStorage.removeItem('selectedEventType');
        
        // In a real application, you would send this data to a server
        console.log('New event booked:', newEvent);
    });
}

// Admin Dashboard
const eventList = document.getElementById('eventList');
if (eventList) {
    // Display all events (in a real application, this would fetch data from a server)
    events.forEach(event => {
        const eventItem = document.createElement('div');
        eventItem.classList.add('event-item');
        eventItem.innerHTML = `
            <h3>${event.eventName}</h3>
            <p>Type: ${event.name}</p>
            <p>Price: $${event.price}</p>
            <p>Date: ${event.eventDate}</p>
            <p>Time: ${event.eventTime}</p>
            <p>Attendees: ${event.attendees}</p>
            <p>Description: ${event.eventDescription}</p>
        `;
        const timerElement = startEventTimer(event.eventDate, event.eventTime);
        eventItem.appendChild(timerElement);
        eventList.appendChild(eventItem);
    });
}

// Logout functionality
const logoutLinks = document.querySelectorAll('#logoutLink');
logoutLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        // In a real application, you would invalidate the session on the server
        alert('You have been logged out.');
        window.location.href = 'index.html';
    });
});

// Timer functionality
function startEventTimer(eventDate, eventTime) {
    const eventDateTime = new Date(eventDate + 'T' + eventTime);
    const timerElement = document.createElement('div');
    timerElement.classList.add('event-timer');
    
    function updateTimer() {
        const now = new Date();
        const difference = eventDateTime - now;
        
        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);
            
            timerElement.textContent = `Time until event: ${days}d ${hours}h ${minutes}m ${seconds}s`;
        } else {
            timerElement.textContent = 'Event has started!';
            clearInterval(timerInterval);
        }
    }
    
    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);
    
    return timerElement;
}


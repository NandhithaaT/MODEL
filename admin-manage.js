// Check admin role
if (localStorage.getItem('role') !== 'admin') {
    window.location.href = 'admin-login.html';
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const eventForm = document.getElementById('event-form');
    const eventList = document.getElementById('event-list');
    let events = JSON.parse(localStorage.getItem('events') || '[]');
  
    function saveEvents() {
      localStorage.setItem('events', JSON.stringify(events));
    }
  
    function renderEvents() {
      eventList.innerHTML = '';
      events.forEach(event => {
        const li = document.createElement('li');
        li.innerHTML = `
          <strong>${event.name}</strong><br>
          Date: ${event.date}<br>
          ${event.description}<br>
          <button onclick="deleteEvent(${event.id})">Delete</button>
        `;
        eventList.appendChild(li);
      });
    }
  
    window.deleteEvent = id => {
      events = events.filter(e => e.id !== id);
      saveEvents();
      // Also remove registrations for deleted events
      let registrations = JSON.parse(localStorage.getItem('registrations') || '[]');
      registrations = registrations.filter(r => r.eventId !== id);
      localStorage.setItem('registrations', JSON.stringify(registrations));
      renderEvents();
    };
  
    eventForm.addEventListener('submit', e => {
      e.preventDefault();
      const name = document.getElementById('event-name').value;
      const date = document.getElementById('event-date').value;
      const description = document.getElementById('event-description').value;
      const newEvent = { id: Date.now(), name, date, description };
      events.push(newEvent);
      saveEvents();
      renderEvents();
      eventForm.reset();
    });
  
    renderEvents();
  });
  
if (localStorage.getItem('role') !== 'user') {
    window.location.href = 'user-login.html';
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const selectEvent = document.getElementById('select-event');
    const registrationForm = document.getElementById('registration-form');
    const registrationList = document.getElementById('registration-list');
    const attendeeNameInput = document.getElementById('attendee-name');
  
    let events = JSON.parse(localStorage.getItem('events') || '[]');
    let registrations = JSON.parse(localStorage.getItem('registrations') || '[]');
  
    // Fill attendee name from stored username
    attendeeNameInput.value = localStorage.getItem('username') || '';
  
    function saveRegistrations() {
      localStorage.setItem('registrations', JSON.stringify(registrations));
    }
  
    function populateEventOptions() {
      selectEvent.innerHTML = '';
      events.forEach(event => {
        const option = document.createElement('option');
        option.value = event.id;
        option.textContent = event.name;
        selectEvent.appendChild(option);
      });
    }
  
    function renderRegistrations() {
      registrationList.innerHTML = '';
      const username = localStorage.getItem('username') || '';
      const userRegs = registrations.filter(r => r.attendeeName === username);
  
      if (userRegs.length === 0) {
        registrationList.innerHTML = '<li>No registrations yet.</li>';
      } else {
        userRegs.forEach(reg => {
          const li = document.createElement('li');
          li.textContent = `Registered for ${reg.eventName}`;
          registrationList.appendChild(li);
        });
      }
    }
  
    registrationForm.addEventListener('submit', e => {
      e.preventDefault();
      const attendeeName = attendeeNameInput.value;
      const eventId = parseInt(selectEvent.value);
      const event = events.find(e => e.id === eventId);
  
      if (event) {
        // Prevent duplicate registration for same user and event
        const exists = registrations.some(
          r => r.attendeeName === attendeeName && r.eventId === eventId
        );
        if (exists) {
          alert('You have already registered for this event.');
          return;
        }
  
        const reg = {
          id: Date.now(),
          attendeeName,
          eventId,
          eventName: event.name,
        };
        registrations.push(reg);
        saveRegistrations();
        renderRegistrations();
      }
    });
  
    populateEventOptions();
    renderRegistrations();
  });
  
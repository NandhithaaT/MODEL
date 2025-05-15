if (localStorage.getItem('role') !== 'admin') {
    window.location.href = 'admin-login.html';
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const scheduleList = document.getElementById('schedule-list');
  
    function getEvents() {
      return JSON.parse(localStorage.getItem('events') || '[]');
    }
  
    function getRegistrations() {
      return JSON.parse(localStorage.getItem('registrations') || '[]');
    }
  
    function renderSchedule() {
      const events = getEvents();
      const registrations = getRegistrations();
  
      scheduleList.innerHTML = '';
  
      events.forEach(event => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${event.name}</strong> on ${event.date}<br><em>Attendees:</em>`;
        const attendeeList = document.createElement('ul');
  
        const attendees = registrations.filter(r => r.eventId === event.id);
        if (attendees.length) {
          attendees.forEach(reg => {
            const item = document.createElement('li');
            item.textContent = reg.attendeeName;
            attendeeList.appendChild(item);
          });
        } else {
          const item = document.createElement('li');
          item.textContent = 'No attendees yet.';
          attendeeList.appendChild(item);
        }
  
        li.appendChild(attendeeList);
        scheduleList.appendChild(li);
      });
    }
  
    renderSchedule();
  });
  
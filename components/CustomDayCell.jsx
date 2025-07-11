// Location: frontend/src/components/CustomDayCell.jsx

function CustomDayCell({ date, events }) {
  return (
    <div className="custom-day-cell">
      <div className="day-number">{date.getDate()}</div>
      <div className="day-events">
        {events.map(event => (
          <div key={event.resource.id} className="day-event-item">
            <div className="event-time">9:00 AM</div> {/* We'll use a placeholder time for now */}
            <div className="event-title">{event.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomDayCell;

// "React" has been removed from this import line
import { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import CustomDayCell from '../components/CustomDayCell';

const locales = { 'en-US': enUS };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

function CalendarPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5001/api/jobs')
      .then(res => res.json())
      .then(data => {
        const formattedEvents = data.map(job => ({
          title: `${job.customerName} - ${job.serviceType}`,
          start: new Date(job.serviceDate),
          end: new Date(job.serviceDate),
          allDay: true,
          resource: job,
        }));
        setEvents(formattedEvents);
      })
      .catch(err => console.error("Failed to fetch jobs:", err));
  }, []);

  const calendarComponents = {
    month: {
      dateHeader: ({ date }) => {
        const dayEvents = events.filter(e => 
          new Date(e.start).toDateString() === date.toDateString()
        );
        return <CustomDayCell date={date} events={dayEvents} />;
      },
    },
  };

  return (
    <div className="content-container">
       <h1 className="page-title">Schedule</h1>
       <div className="content-section" style={{ height: '80vh', marginTop: '2rem', padding: '10px' }}>
         <Calendar
            localizer={localizer}
            events={[]} 
            components={calendarComponents}
            style={{ height: '100%' }}
         />
       </div>
    </div>
  );
}

export default CalendarPage;
